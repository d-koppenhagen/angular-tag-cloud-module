import { Component,
         OnChanges,
         AfterContentInit,
         AfterContentChecked,
         Input,
         Output,
         EventEmitter,
         ElementRef,
         Renderer2,
         SimpleChanges } from '@angular/core';
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
  @Input() width? = 500;
  @Input() height? = 300;
  @Input() overflow? = true;
  @Input() strict? = false;
  @Input() zoomOnHover?: ZoomOnHoverOptions = { transitionTime: 0, scale: 1, delay: 0 };

  @Output() clicked?: EventEmitter<CloudData> = new EventEmitter();
  @Output() dataChanges?: EventEmitter<SimpleChanges> = new EventEmitter();
  @Output() afterInit?: EventEmitter<void> = new EventEmitter();
  @Output() afterChecked?: EventEmitter<void> = new EventEmitter();

  dataArr: CloudData[];
  alreadyPlacedWords: HTMLElement[] = [];

  options: CloudOptionsInternal;

  constructor(
    private el: ElementRef,
    private r2: Renderer2
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    this.dataChanges.emit(changes);
    this.alreadyPlacedWords = [];


    // check if data is not null or empty
    if (!this.data) {
      console.error('angular-tag-cloud: No data passed. Please pass an Array of CloudData');
      return;
    }
    if (this.data.length === 0) {
      console.log('angular-tag-cloud: Empty dataset');
      return;
    }

    // values changed, reset cloud
    this.el.nativeElement.innerHTML = '';

    // set value changes
    if (changes['data']) {
      this.dataArr = changes['data'].currentValue;
    }

    let width = this.width;
    if (this.el.nativeElement.parentNode.offsetWidth > 0
      && width <= 1
      && width > 0
    ) {
      width = this.el.nativeElement.parentNode.offsetWidth * width;
    }

    // set options
    this.options = {
      step: 2.0,
      aspectRatio: (width / this.height),
      width: width,
      height: this.height,
      center: {
        x: (width / 2.0),
        y: (this.height / 2.0)
      },
      overflow: this.overflow,
      zoomOnHover: this.zoomOnHover
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

  drawWordCloud () {
    // Sort this.dataArr from the word with the highest weight to the one with the lowest
    this.dataArr.sort((a, b) => b.weight - a.weight);

    this.dataArr.forEach((elem, index) => {
      this.drawWord(index, elem);
    });
  }

  // Helper function to test if an element overlaps others
  hitTest(currentEl: HTMLElement, otherEl: HTMLElement[]): boolean {
    // Check elements for overlap one by one, stop and return false as soon as an overlap is found
    for (let i = 0; i < otherEl.length; i++) {
      if (this.overlapping(currentEl, otherEl[i])) { return true; }
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
    let angle = 6.28 * Math.random(),
        radius = 0.0,
        weight = 5,
        wordSpan: HTMLElement;

    // Check if min(weight) > max(weight) otherwise use default
    if (this.dataArr[0].weight > this.dataArr[this.dataArr.length - 1].weight) {
      // check if strict mode is active
      if (!this.strict) { // Linearly map the original weight to a discrete scale from 1 to 10
        weight = Math.round((word.weight - this.dataArr[this.dataArr.length - 1].weight) /
                  (this.dataArr[0].weight - this.dataArr[this.dataArr.length - 1].weight) * 9.0) + 1;
      } else { // use given value for weigth directly
        // fallback to 10
        if (word.weight > 10) {
          weight = 10;
          console.log(`[TagCloud strict] Weight property ${word.weight} > 10. Fallback to 10 as you are using strict mode`, word);
        } else if (word.weight < 1) { // fallback to 1
          weight = 1;
          console.log(`[TagCloud strict] Given weight property ${word.weight} < 1. Fallback to 1 as you are using strict mode`, word);
        } else if (word.weight % 1 !== 0) { // round if given value is not an integer
          weight = Math.round(word.weight);
          console.log(`[TagCloud strict] Given weight property ${word.weight} is not an integer. Rounded value to ${weight}`, word);
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

    // set zoomOption
    if (this.zoomOnHover && this.zoomOnHover.scale !== 1) {
      if (!this.zoomOnHover.transitionTime) { this.zoomOnHover.transitionTime = 0; }
      if (!this.zoomOnHover.scale) { this.zoomOnHover.scale = 1; }

      wordSpan.onmouseover = () => {
        this.r2.setStyle(wordSpan, 'transition', `transform ${this.zoomOnHover.transitionTime}s`);
        this.r2.setStyle(wordSpan, 'transform', `scale(${this.zoomOnHover.scale}) ${transformString}`);
        this.r2.setStyle(wordSpan, 'transition-delay', `${this.zoomOnHover.delay}s`);
      };

      wordSpan.onmouseout = () => {
        this.r2.setStyle(wordSpan, 'transform', `scale(1) ${transformString}`);
      };
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
