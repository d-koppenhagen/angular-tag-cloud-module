import { Component,
         OnChanges,
         AfterContentInit,
         AfterContentChecked,
         Input,
         Output,
         EventEmitter,
         ElementRef,
         Renderer2,
         SimpleChanges,
         HostListener } from '@angular/core';
import { CloudData, CloudOptions, ZoomOnHoverOptions } from './tag-cloud.interfaces';

interface CloudOptionsInternal extends CloudOptions {
  step: number;

  /**
   * setting the aspect ratio. This value is calculated by the given width and height
   */
  aspectRatio: number;
  center: {
    x: number;
    y: number;
  };
}

@Component({
  selector: 'angular-tag-cloud, ng-tag-cloud, ngtc',
  template: '',
  styleUrls: ['./tag-cloud.component.css']
})
export class TagCloudComponent implements OnChanges, AfterContentInit, AfterContentChecked {
  @Input() data: CloudData[];
  @Input() width;
  @Input() height;
  @Input() overflow;
  @Input() strict;
  @Input() zoomOnHover: ZoomOnHoverOptions;
  @Input() realignOnResize;
  @Input() randomizeAngle;
  @Input() config: CloudOptions;

  @Output() clicked?: EventEmitter<CloudData> = new EventEmitter();
  @Output() dataChanges?: EventEmitter<SimpleChanges> = new EventEmitter();
  @Output() afterInit?: EventEmitter<void> = new EventEmitter();
  @Output() afterChecked?: EventEmitter<void> = new EventEmitter();

  private dataArr: CloudData[];
  private alreadyPlacedWords: HTMLElement[] = [];

  private options: CloudOptionsInternal;
  private timeoutId;

  constructor(
    private el: ElementRef,
    private r2: Renderer2
  ) { }

  @HostListener('window:resize', ['$event']) onResize(event: any) {
    window.clearTimeout(this.timeoutId);
    this.timeoutId = window.setTimeout(() => {
      if (this.options.realignOnResize) {
        this.reDraw();
      }
    }, 200);
  }

  ngOnChanges(changes: SimpleChanges) {
    // set default values
    this.config = {
      width: 500,
      height: 300,
      overflow: true,
      strict: false,
      zoomOnHover: {
        transitionTime: 0,
        scale: 1,
        delay: 0,
        color: null
      },
      realignOnResize: false,
      randomizeAngle: false,
      ...this.config // override default width params in config object
    };

    // override properties if explicitly set
    if (this.width) { this.config.width = this.width; }
    if (this.height) { this.config.height = this.height; }
    if (typeof this.overflow === 'boolean') { this.config.overflow = this.overflow; }
    if (typeof this.strict === 'boolean') { this.config.strict = this.strict; }
    if (typeof this.realignOnResize === 'boolean') { this.config.realignOnResize = this.realignOnResize; }
    if (typeof this.randomizeAngle === 'boolean') { this.config.randomizeAngle = this.randomizeAngle; }
    if (this.zoomOnHover) { this.config.zoomOnHover = this.zoomOnHover; }

    this.reDraw(changes);
  }

  reDraw(changes?: SimpleChanges) {
    this.dataChanges.emit(changes);
    this.alreadyPlacedWords = [];

    // check if data is not null or empty
    if (!this.data) {
      console.error('angular-tag-cloud: No data passed. Please pass an Array of CloudData');
      return;
    }

    // values changed, reset cloud
    this.el.nativeElement.innerHTML = '';

    // set value changes
    if (changes && changes.data) {
      this.dataArr = changes.data.currentValue;
    }

    // calculate width and height
    let width = this.config.width;
    if (this.el.nativeElement.parentNode.offsetWidth > 0
      && width <= 1
      && width > 0
    ) {
      width = this.el.nativeElement.parentNode.offsetWidth * width;
    }
    const height = this.config.height;

    // set options
    this.options = {
      ...this.config,
      step: 2.0,
      aspectRatio: (width / height),
      width,
      center: {
        x: (width / 2.0),
        y: (height / 2.0)
      }
    };

    this.r2.setStyle(this.el.nativeElement, 'width', this.options.width + 'px');
    this.r2.setStyle(this.el.nativeElement, 'height', this.options.height + 'px');
    // draw the cloud
    this.drawWordCloud();
  }


  ngAfterContentInit() {
    this.afterInit.emit();
  }

  ngAfterContentChecked() {
    this.afterChecked.emit();
  }

  // helper to generate a descriptive string for an entry to use when sorting alphabetically
  descriptiveEntry(entry: CloudData): string {
    let description = entry.text;
    if (entry.color) {
      description += '-' + entry.color;
    }
    if (entry.external) {
      description += '-' + entry.external;
    }
    if (entry.link) {
      description += '-' + entry.link;
    }
    if (entry.rotate) {
      description += '-' + entry.rotate;
    }
    return description;
  }

  drawWordCloud() {
    // Sort alphabetically to ensure that, all things being equal, words are placed uniformly
    this.dataArr.sort((a, b) => (this.descriptiveEntry(a)).localeCompare(this.descriptiveEntry(b)));
    // Sort this._dataArr from the word with the highest weight to the one with the lowest
    this.dataArr.sort((a, b) => b.weight - a.weight);
    this.dataArr.forEach((elem, index) => {
      this.drawWord(index, elem);
    });
  }

  // Helper function to test if an element overlaps others
  hitTest(currentEl: HTMLElement, otherEl: HTMLElement[]): boolean {
    // Check elements for overlap one by one, stop and return false as soon as an overlap is found
    for (const item of otherEl) {
      if (this.overlapping(currentEl, item)) { return true; }
    }
    return false;
  }

  // Pairwise overlap detection
  overlapping(a: HTMLElement, b: HTMLElement): boolean {
    return (Math.abs(2.0 * a.offsetLeft + a.offsetWidth  - 2.0 * b.offsetLeft - b.offsetWidth)  < a.offsetWidth  + b.offsetWidth &&
            Math.abs(2.0 * a.offsetTop  + a.offsetHeight - 2.0 * b.offsetTop  - b.offsetHeight) < a.offsetHeight + b.offsetHeight)
    ? true : false;
  }

  // Function to draw a word, by moving it in spiral until it finds a suitable empty place. This will be iterated on each word.
  drawWord(index: number, word: CloudData) {
    // Define the ID attribute of the span that will wrap the word
    let angle = this.options.randomizeAngle ? 6.28 * Math.random() : 0;
    let radius = 0.0;
    let weight = 5;
    let wordSpan: HTMLElement;

    // Check if min(weight) > max(weight) otherwise use default
    if (this.dataArr[0].weight > this.dataArr[this.dataArr.length - 1].weight) {
      // check if strict mode is active
      if (!this.options.strict) { // Linearly map the original weight to a discrete scale from 1 to 10
        weight = Math.round((word.weight - this.dataArr[this.dataArr.length - 1].weight) /
                  (this.dataArr[0].weight - this.dataArr[this.dataArr.length - 1].weight) * 9.0) + 1;
      } else { // use given value for weigth directly
        // fallback to 10
        if (word.weight > 10) {
          weight = 10;
          console.warn(`[TagCloud strict] Weight property ${word.weight} > 10. Fallback to 10 as you are using strict mode`, word);
        } else if (word.weight < 1) { // fallback to 1
          weight = 1;
          console.warn(`[TagCloud strict] Given weight property ${word.weight} < 1. Fallback to 1 as you are using strict mode`, word);
        } else if (word.weight % 1 !== 0) { // round if given value is not an integer
          weight = Math.round(word.weight);
          console.warn(`[TagCloud strict] Given weight property ${word.weight} is not an integer. Rounded value to ${weight}`, word);
        } else {
          weight = word.weight;
        }

      }
    }

    // Create a new span and insert node.
    wordSpan = this.r2.createElement('span');
    wordSpan.className = 'w' + weight;

    const thatClicked = this.clicked;
    wordSpan.onclick = () => {
      thatClicked.emit(word);
    };

    let node = this.r2.createText(word.text);

    // set color
    if (word.color) {
      this.r2.setStyle(wordSpan, 'color', word.color);
    }

    let transformString = '';

    // set color
    if (word.rotate) {
      transformString = `rotate(${word.rotate}deg)`;
      this.r2.setStyle(wordSpan, 'transform', transformString);
    }

    // Append href if there's a link alongwith the tag
    if (word.link) {
      const wordLink = this.r2.createElement('a');
      wordLink.href = word.link;

      if (word.external !== undefined && word.external) {
        wordLink.target = '_blank';
      }

      wordLink.appendChild(node);
      node = wordLink;
    }

    // set zoomOption
    if (this.options.zoomOnHover && this.options.zoomOnHover.scale !== 1) {
      if (!this.options.zoomOnHover.transitionTime) { this.options.zoomOnHover.transitionTime = 0; }
      if (!this.options.zoomOnHover.scale) { this.options.zoomOnHover.scale = 1; }

      wordSpan.onmouseover = () => {
        this.r2.setStyle(wordSpan, 'transition', `transform ${this.options.zoomOnHover.transitionTime}s`);
        this.r2.setStyle(wordSpan, 'transform', `scale(${this.options.zoomOnHover.scale}) ${transformString}`);
        this.r2.setStyle(wordSpan, 'transition-delay', `${this.options.zoomOnHover.delay}s`);
        if (this.options.zoomOnHover.color) {
          word.link
            ? this.r2.setStyle(node, 'color', this.options.zoomOnHover.color)
            : this.r2.setStyle(wordSpan, 'color', this.options.zoomOnHover.color);
        }
      };

      wordSpan.onmouseout = () => {
        this.r2.setStyle(wordSpan, 'transform', `none ${transformString}`);
        word.link
          ? this.r2.removeStyle(node, 'color')
          : this.r2.removeStyle(wordSpan, 'color');
      };
    }

    wordSpan.appendChild(node);
    this.r2.appendChild(this.el.nativeElement, wordSpan);

    const width = wordSpan.offsetWidth;
    const height = wordSpan.offsetHeight;
    let left = this.options.center.x;
    let top = this.options.center.y;

    // Save a reference to the style property, for better performance
    const wordStyle = wordSpan.style;
    wordStyle.position = 'absolute';

    // place the first word
    wordStyle.left = left + 'px';
    wordStyle.top = top + 'px';

    // add tooltip if provided
    if (word.tooltip) {
      this.r2.addClass(wordSpan, 'tooltip');
      const tooltipSpan = this.r2.createElement('span');
      tooltipSpan.className = 'tooltiptext';
      const text = this.r2.createText(word.tooltip);
      tooltipSpan.appendChild(text);
      wordSpan.appendChild(tooltipSpan);
    }

    while (this.hitTest(wordSpan, this.alreadyPlacedWords)) {
      radius += this.options.step;
      angle += (index % 2 === 0 ? 1 : -1) * this.options.step;

      left = this.options.center.x - (width / 2.0) + (radius * Math.cos(angle)) * this.options.aspectRatio;
      top = this.options.center.y + radius * Math.sin(angle) - (height / 2.0);

      wordStyle.left = left + 'px';
      wordStyle.top = top + 'px';
    }

    // Don't render word if part of it would be outside the container
    if (
      !this.options.overflow &&
      (left < 0 || top < 0 || (left + width) > this.options.width ||
      (top + height) > this.options.height)
    ) {
      wordSpan.remove();
      return;
    }

    this.alreadyPlacedWords.push(wordSpan);
  }

}
