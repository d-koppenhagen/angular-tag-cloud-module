import {
  Component,
  OnChanges,
  AfterContentInit,
  AfterContentChecked,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  Renderer2,
  SimpleChanges,
  HostListener,
} from '@angular/core';
import {
  CloudData,
  CloudOptions,
  ZoomOnHoverOptions,
} from './tag-cloud.interfaces';

interface CloudOptionsInternal extends CloudOptions {
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
  styleUrls: ['./tag-cloud.component.css'],
})
export class TagCloudComponent
  implements OnChanges, AfterContentInit, AfterContentChecked {
  @Input() data: CloudData[];
  @Input() width: number;
  @Input() height: number;
  @Input() step: number;
  @Input() overflow: boolean;
  @Input() strict: boolean;
  @Input() zoomOnHover: ZoomOnHoverOptions;
  @Input() realignOnResize: boolean;
  @Input() randomizeAngle: boolean;
  @Input() background: string;
  @Input() font: string;
  @Input() delay: number;
  @Input() config: CloudOptions;
  @Input() log: 'warn' | 'debug' | false;

  @Output() clicked?: EventEmitter<CloudData> = new EventEmitter();
  @Output() dataChanges?: EventEmitter<SimpleChanges> = new EventEmitter();
  @Output() afterInit?: EventEmitter<void> = new EventEmitter();
  @Output() afterChecked?: EventEmitter<void> = new EventEmitter();

  public cloudDataHtmlElements: HTMLElement[] = [];
  private dataArr: CloudData[];

  private options: CloudOptionsInternal;
  private timeoutId: number;

  get calculatedWidth(): number {
    let width = this.config.width;
    if (
      this.el.nativeElement.parentNode.offsetWidth > 0 &&
      width <= 1 &&
      width > 0
    ) {
      width = this.el.nativeElement.parentNode.offsetWidth * width;
    }
    return width;
  }

  get calculatedHeight(): number {
    let height = this.config.height;
    if (
      this.el.nativeElement.parentNode.offsetHeight > 0 &&
      height <= 1 &&
      height > 0
    ) {
      height = this.el.nativeElement.parentNode.offsetHeight * height;
    }
    return height;
  }

  constructor(private el: ElementRef, private r2: Renderer2) {}

  @HostListener('window:resize', ['$event']) onResize(event: any) {
    this.logMessage('debug', 'rezisze triggered');
    window.clearTimeout(this.timeoutId);
    this.timeoutId = window.setTimeout(() => {
      if (this.options.realignOnResize) {
        this.reDraw();
      }
    }, 200);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.logMessage('debug', 'ngOnChanges fired', changes);
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
        color: null,
      },
      realignOnResize: false,
      randomizeAngle: false,
      background: null,
      font: null,
      step: 2.0,
      log: false,
      delay: null,
      ...this.config, // override default width params in config object
    };

    // override properties if explicitly set
    if (this.width) {
      this.config.width = this.width;
    }
    if (this.height) {
      this.config.height = this.height;
    }
    if (typeof this.overflow === 'boolean') {
      this.config.overflow = this.overflow;
    }
    if (typeof this.strict === 'boolean') {
      this.config.strict = this.strict;
    }
    if (typeof this.realignOnResize === 'boolean') {
      this.config.realignOnResize = this.realignOnResize;
    }
    if (typeof this.randomizeAngle === 'boolean') {
      this.config.randomizeAngle = this.randomizeAngle;
    }
    if (typeof this.background === 'string') {
      this.config.background = this.background;
    }
    if (typeof this.font === 'string') {
      this.config.font = this.font;
    }
    if (this.zoomOnHover) {
      this.config.zoomOnHover = this.zoomOnHover;
    }
    if (this.step) {
      this.config.step = this.step;
    }
    if (this.log) {
      this.config.log = this.log;
    }
    if (this.delay) {
      this.config.delay = this.delay;
    }

    this.logMessage('warn', 'cloud configuration', this.config);

    // set the basic font style if property is provided
    if (this.config.font) {
      this.r2.setStyle(this.el.nativeElement, 'font', this.config.font);
    }

    // set a background image if property is provided
    if (this.config.background) {
      this.r2.setStyle(
        this.el.nativeElement,
        'background',
        this.config.background,
      );
    }

    this.reDraw(changes);
  }

  ngAfterContentInit() {
    this.afterInit.emit();
    this.logMessage('debug', 'afterInit emitted');
  }

  ngAfterContentChecked() {
    this.afterChecked.emit();
    this.logMessage('debug', 'afterChecked emitted');
  }

  /**
   * re-draw the word cloud
   * @param changes the change set
   */
  reDraw(changes?: SimpleChanges) {
    this.dataChanges.emit(changes);
    this.afterChecked.emit();
    this.logMessage('debug', 'dataChanges emitted');
    this.cloudDataHtmlElements = [];

    // check if data is not null or empty
    if (!this.data) {
      console.error(
        'angular-tag-cloud: No data passed. Please pass an Array of CloudData',
      );
      return;
    }

    // values changed, reset cloud
    this.el.nativeElement.innerHTML = '';

    // set value changes
    if (changes && changes.data) {
      this.dataArr = changes.data.currentValue;
    }

    // set options
    this.options = {
      ...this.config,
      aspectRatio: this.calculatedWidth / this.calculatedHeight,
      width: this.calculatedWidth,
      height: this.calculatedHeight,
      center: {
        x: this.calculatedWidth / 2.0,
        y: this.calculatedHeight / 2.0,
      },
    };

    // set the dimensions
    this.r2.setStyle(this.el.nativeElement, 'width', this.options.width + 'px');
    this.r2.setStyle(
      this.el.nativeElement,
      'height',
      this.options.height + 'px',
    );

    // draw the cloud
    this.drawWordCloud();
    this.logMessage('debug', 'reDraw finished');
  }

  /**
   * helper to generate a descriptive string for an entry to use when sorting alphabetically
   * @param entry the cloud entry to be used
   */
  private descriptiveEntry(entry: CloudData): string {
    let description = entry.text;
    description += entry.color ? `-${entry.color}` : '';
    description += entry.external ? `-${entry.external}` : '';
    description += entry.link ? `-${entry.link}` : '';
    description += entry.rotate ? `-${entry.rotate}` : '';
    return description;
  }

  /**
   * proceed draw the cloud
   */
  private drawWordCloud() {
    // Sort alphabetically to ensure that, all things being equal, words are placed uniformly
    this.dataArr.sort((a, b) =>
      this.descriptiveEntry(a).localeCompare(this.descriptiveEntry(b)),
    );
    // Sort this._dataArr from the word with the highest weight to the one with the lowest
    this.dataArr.sort((a, b) => b.weight - a.weight);
    // place fixed elements first
    const elementsWithFixedPositions = this.dataArr.filter(
      (item) => item.position,
    );
    const elementsWithRandomPositions = this.dataArr.filter(
      (item) => !item.position,
    );
    elementsWithFixedPositions.forEach((elem, index) => {
      this.drawWord(index, elem);
    });
    elementsWithRandomPositions.forEach((elem, index) => {
      this.drawWord(index, elem);
    });
  }

  /**
   * Helper function to test if an element overlaps others
   * @param testEl the HTML Element to be tested
   */
  private hitTest(testEl: HTMLElement): boolean {
    // Check elements for overlap one by one, stop and return false as soon as an overlap is found
    for (const item of this.cloudDataHtmlElements) {
      if (this.overlapping(testEl, item)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Pairwise overlap detection
   * @param e1 the first element for overlap detection
   * @param e2 the second element for overlap detection
   */
  private overlapping(e1: HTMLElement, e2: HTMLElement) {
    const rect1 = e1.getBoundingClientRect();
    const rect2 = e2.getBoundingClientRect();

    const overlap = !(
      rect1.right < rect2.left ||
      rect1.left > rect2.right ||
      rect1.bottom < rect2.top ||
      rect1.top > rect2.bottom
    );
    return overlap;
  }

  /**
   * Check if min(weight) > max(weight) otherwise use default
   * @param word the particular word configuration
   */
  private getWeightForWord(word: CloudData): number {
    let weight = 5;
    if (this.dataArr[0].weight > this.dataArr[this.dataArr.length - 1].weight) {
      // check if strict mode is active
      if (!this.options.strict) {
        // Linearly map the original weight to a discrete scale from 1 to 10
        weight =
          Math.round(
            ((word.weight - this.dataArr[this.dataArr.length - 1].weight) /
              (this.dataArr[0].weight -
                this.dataArr[this.dataArr.length - 1].weight)) *
              9.0,
          ) + 1;
      } else {
        // use given value for weigth directly
        // fallback to 10
        if (word.weight > 10) {
          weight = 10;
          this.logMessage(
            'warn',
            `[TagCloud strict] Weight property ${word.weight} > 10. Fallback to 10 as you are using strict mode`,
            word,
          );
        } else if (word.weight < 1) {
          // fallback to 1
          weight = 1;
          this.logMessage(
            'warn',
            `[TagCloud strict] Given weight property ${word.weight} < 1. Fallback to 1 as you are using strict mode`,
            word,
          );
        } else if (word.weight % 1 !== 0) {
          // round if given value is not an integer
          weight = Math.round(word.weight);
          this.logMessage(
            'warn',
            `[TagCloud strict] Given weight property ${word.weight} is not an integer. Rounded value to ${weight}`,
            word,
          );
        } else {
          weight = word.weight;
        }
      }
    }
    return weight;
  }

  /**
   * change the HTMLElements color style
   * @param el the HTML element
   * @param color the CSS color value
   */
  private setWordColor(el: HTMLElement, color: string) {
    this.r2.setStyle(el, 'color', color);
  }

  /**
   * Add a tooltip to the element
   * @param el the HTML element
   * @param tooltip the tooltip text
   */
  private setTooltip(el: HTMLElement, tooltip: string) {
    this.r2.addClass(el, 'tooltip');
    const tooltipSpan = this.r2.createElement('span');
    tooltipSpan.className = 'tooltiptext';
    const text = this.r2.createText(tooltip);
    tooltipSpan.appendChild(text);
    el.appendChild(tooltipSpan);
  }

  /**
   * change the HTMLElements rotation style
   * @param el the HTML element
   * @param deg the rotation value (degrees)
   */
  private setWordRotation(el: HTMLElement, deg?: number): string {
    const transformString = deg ? `rotate(${deg}deg)` : '';
    this.r2.setStyle(el, 'transform', transformString);
    return transformString;
  }

  /**
   * wrap the given node into an HTML anchor element
   * @param node the HTML node that should be wrapped
   * @param word the particular word configuration
   */
  private wrapNodeIntoAnchorElement(
    node: HTMLElement,
    word: CloudData,
  ): HTMLAnchorElement {
    const wordLink: HTMLAnchorElement = this.r2.createElement('a');
    wordLink.href = word.link;

    if (word.external !== undefined && word.external) {
      wordLink.target = '_blank';
    }

    wordLink.appendChild(node);
    return wordLink;
  }

  /**
   * wrap the given node into an HTML anchor element
   * @param node the HTML node that should be wrapped
   * @param word the particular word configuration
   */
  private applyZoomStyle(
    node: HTMLElement,
    el: HTMLElement,
    link: string,
    transformString: string,
  ) {
    if (this.options.zoomOnHover && this.options.zoomOnHover.scale !== 1) {
      if (!this.options.zoomOnHover.transitionTime) {
        this.options.zoomOnHover.transitionTime = 0;
      }
      if (!this.options.zoomOnHover.scale) {
        this.options.zoomOnHover.scale = 1;
      }

      el.onmouseover = () => {
        this.r2.setStyle(
          el,
          'transition',
          `transform ${this.options.zoomOnHover.transitionTime}s`,
        );
        this.r2.setStyle(
          el,
          'transform',
          `scale(${this.options.zoomOnHover.scale}) ${transformString}`,
        );
        this.r2.setStyle(
          el,
          'transition-delay',
          `${this.options.zoomOnHover.delay}s`,
        );
        if (this.options.zoomOnHover.color) {
          link
            ? this.r2.setStyle(node, 'color', this.options.zoomOnHover.color)
            : this.r2.setStyle(el, 'color', this.options.zoomOnHover.color);
        }
      };

      el.onmouseout = () => {
        this.r2.setStyle(el, 'transform', `none ${transformString}`);
        if (this.options.zoomOnHover.color) {
          link
            ? this.r2.removeStyle(node, 'color')
            : this.r2.removeStyle(el, 'color');
        }
      };
    }
  }

  /**
   * Place the word at a calculated position
   * @param wordSpan The HTML Span element to be placed
   * @param word The word to be placed
   * @param index The index of the element
   */
  private setPosition(
    wordSpan: HTMLSpanElement,
    word: CloudData,
    index: number,
  ) {
    let angle = this.options.randomizeAngle ? 6.28 * Math.random() : 0;
    let radius = 0;
    // Save a reference to the style property, for better performance
    const wordStyle = wordSpan.style;
    wordStyle.position = 'absolute';

    const useFixedPosition: boolean = Boolean(
      word.position && word.position.left && word.position.top,
    );

    const width = wordSpan.offsetWidth;
    const height = wordSpan.offsetHeight;
    let left = useFixedPosition
      ? word.position.left
      : this.options.center.x - width / 2;
    let top = useFixedPosition
      ? word.position.top
      : this.options.center.y - height / 2;

    // place the first word
    wordStyle.left = left + 'px';
    wordStyle.top = top + 'px';

    // delayed appearance
    if (this.options.delay) {
      wordStyle.animation = 'fadeIn 0.5s';
      wordStyle.opacity = '0';
      wordStyle.animationFillMode = 'forwards';
      wordStyle.animationDelay = `${this.options.delay * index}ms`;
    }

    // default case: place randomly
    if (!useFixedPosition) {
      // do not place the first word always right in the middle
      if (index === 0) {
        wordStyle.left =
          left + (Math.random() - 0.5) * 2 * (this.options.width / 5) + 'px';
        wordStyle.top =
          top + (Math.random() - 0.5) * 2 * (this.options.height / 5) + '30px';
      } else {
        while (
          this.options.width &&
          this.options.height &&
          wordSpan.offsetHeight &&
          wordSpan.offsetWidth &&
          this.hitTest(wordSpan)
        ) {
          radius += this.options.step;
          angle += (index % 2 === 0 ? 1 : -1) * this.options.step;

          left =
            this.options.center.x -
            width / 2.0 +
            radius * Math.cos(angle) * this.options.aspectRatio;
          top = this.options.center.y + radius * Math.sin(angle) - height / 2.0;

          wordStyle.left = left + 'px';
          wordStyle.top = top + 'px';
        }
      }
    }

    // Don't render word if part of it would be outside the container
    if (
      !this.options.overflow &&
      (left < 0 ||
        top < 0 ||
        left + width > this.options.width ||
        top + height > this.options.height)
    ) {
      this.logMessage(
        'warn',
        "Word did not fit into the cloud and overflow is set to 'false'. The element will be removed",
        wordSpan,
      );
      wordSpan.remove();
      return;
    }
  }

  /**
   * Methods to draw a word, by moving it in spiral until it finds a suitable empty place.
   * This will be iterated on each word.
   * @param index the index number for the word
   * @param word the particular word configuration
   */
  private drawWord(index: number, word: CloudData) {
    let wordSpan: HTMLSpanElement;

    // get calculated word weight
    const weight: number = this.getWeightForWord(word);

    // Create a new span and insert node.
    wordSpan = this.r2.createElement('span');
    wordSpan.className = `w${weight}`;

    // emit onclick event
    wordSpan.onclick = () => {
      this.clicked.emit(word);
    };

    // Put the word (and its tooltip) in foreground when cursor is above
    wordSpan.onmouseenter = () => {
      wordSpan.style.zIndex = '2';
    };

    // Otherwise, restore standard priority
    wordSpan.onmouseleave = () => {
      wordSpan.style.zIndex = '1';
    };

    // append word text
    let node = this.r2.createText(word.text);

    // set color
    if (word.color) this.setWordColor(wordSpan, word.color);

    // rotate word possibly
    const transformString = this.setWordRotation(wordSpan, word.rotate);

    // Append href if there's a link along with the tag
    if (word.link) node = this.wrapNodeIntoAnchorElement(node, word);

    // set zoomOption
    if (this.options.zoomOnHover && this.options.zoomOnHover.scale !== 1) {
      this.applyZoomStyle(node, wordSpan, word.link, transformString);
    }

    wordSpan.appendChild(node);
    this.r2.appendChild(this.el.nativeElement, wordSpan);

    // add tooltip if provided
    if (word.tooltip) this.setTooltip(wordSpan, word.tooltip);

    // set a unique id
    wordSpan.id = `angular-tag-cloud-item-${index}`;

    // define the elements position
    this.setPosition(wordSpan, word, index);

    this.logMessage('debug', 'Adds new word <span>', wordSpan);
    this.cloudDataHtmlElements.push(wordSpan);

    this.logMessage('debug', 'Placed words', this.cloudDataHtmlElements);
  }

  /**
   * Log messages to console
   * @param level the log level
   * @param args extra args to be logged
   */
  private logMessage(level: 'warn' | 'debug' | false, ...args: any) {
    if (!this.config) {
      return;
    }
    if (this.config.log === 'debug') {
      console.log(`[AngularTagCloudModule ${level}]`, ...args);
    } else if (this.config.log === 'warn' && level === 'warn') {
      console.warn(`[AngularTagCloudModule ${level}]`, ...args);
    }
  }
}
