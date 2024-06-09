import {
  Component,
  ElementRef,
  Renderer2,
  HostListener,
  input,
  output,
  effect,
  inject,
  model,
  computed,
  ChangeDetectionStrategy
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

const DEFAULT_HEIGHT = 400;
const DEFAULT_WIDTH = 1;
const DEFAULT_STEP = 1;

@Component({
  standalone: true,
  selector: 'angular-tag-cloud, ng-tag-cloud, ngtc',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '',
  styleUrls: ['./tag-cloud.component.scss'],
})
export class TagCloudComponent {
  data = input<CloudData[]>([]);
  width = input<number>();
  height = input<number>();
  step = input<number>();
  overflow = input<boolean>();
  strict = input<boolean>();
  zoomOnHover = input<ZoomOnHoverOptions>();
  realignOnResize = input<boolean>();
  randomizeAngle = input<boolean>();
  background = input<string>();
  font = input<string>();
  delay = input<number>();
  config = input<CloudOptions>({});
  log = input<'warn' | 'debug' | false>();

  clicked = output<CloudData>();
  // dataChanges = output<SimpleChanges>();
  afterInit = output<void>();
  afterChecked = output<void>();

  private localConfig = computed(() => {
    const config = this.config()
    const localConfig: CloudOptions = {
      ...config, // override default width params in config object
      width: this.width() || config.width || 500,
      height: this.height() || config.height || 300,
      overflow: this.overflow() ?? (config.overflow || true),
      strict: this.strict() ?? (config.strict || false),
      zoomOnHover: this.zoomOnHover() || config.zoomOnHover || {
        transitionTime: 0,
        scale: 1,
        delay: 0,
      },
      realignOnResize: this.realignOnResize() ?? (config.realignOnResize || false),
      randomizeAngle: this.randomizeAngle() ?? (config.randomizeAngle || false),
      step: this.step() || config.step || 2.0,
      log: this.log() || config.log || false,
      delay: this.delay() || config.delay,
      background: this.background() || config.background,
      font: this.font() || config.font
    };
    return localConfig;
  });

  public cloudDataHtmlElements: HTMLElement[] = [];
  private dataArr: CloudData[] = [];

  private options!: CloudOptionsInternal;
  private timeoutId: number | undefined;

  get calculatedWidth(): number {
    let width = this.localConfig().width || this.width() || DEFAULT_WIDTH;
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
    let height = this.localConfig().height || this.height() || DEFAULT_HEIGHT;
    if (
      this.el.nativeElement.parentNode.offsetHeight > 0 &&
      height <= 1 &&
      height > 0
    ) {
      height = this.el.nativeElement.parentNode.offsetHeight * height;
    }
    return height;
  }

  private el = inject(ElementRef);
  private r2 = inject(Renderer2);

  @HostListener('window:resize', ['$event']) onResize(event: any) {
    this.logMessage('debug', 'rezisze triggered');
    window.clearTimeout(this.timeoutId);
    this.timeoutId = window.setTimeout(() => {
      if (this.options.realignOnResize) {
        this.reDraw();
      }
    }, 200);
  }

  constructor() {
    const el = this.el.nativeElement;
    effect(() => {
      // this.logMessage('debug', 'ngOnChanges fired', changes);
      // set default values
      const config = this.localConfig();
      this.logMessage('warn', 'cloud configuration', config);

      // set the basic font style if property is provided
      if (config.font) {
        this.r2.setStyle(el, 'font', config.font);
      }

      // set a background image if property is provided
      if (config.background) {
        this.r2.setStyle(el, 'background', config.background);
      }
      this.reDraw();
    });
  }

  // ngAfterContentInit() {
  //   this.afterInit?.emit();
  //   this.logMessage('debug', 'afterInit emitted');
  // }

  // ngAfterContentChecked() {
  //   this.afterChecked?.emit();
  //   this.logMessage('debug', 'afterChecked emitted');
  // }

  /**
   * re-draw the word cloud
   * @param changes the change set
   */
  reDraw() {
    // this.dataChanges?.emit(changes);
    this.afterChecked?.emit();
    this.logMessage('debug', 'dataChanges emitted');
    this.cloudDataHtmlElements = [];

    // check if data is not null or empty
    if (!this.data()) {
      console.error(
        'angular-tag-cloud: No data passed. Please pass an Array of CloudData',
      );
      return;
    }

    // values changed, reset cloud
    this.el.nativeElement.innerHTML = '';

    // set value changes
    if (this.data()) {
      this.dataArr = this.data();
    }

    // set options
    this.options = {
      ...this.localConfig(),
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
   * @param rect the DOM rectangle that represents the element's bounds
   */
  private hitTest(rect: DOMRect): boolean {
    // Check elements for overlap one by one, stop and return false as soon as an overlap is found
    for (const item of this.cloudDataHtmlElements) {
      if (this.overlapping(rect, item)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Pairwise overlap detection
   * @param rect the DOM rectangle that represents the element's bounds
   * @param e2 the second element for overlap detection
   */
  private overlapping(rect: DOMRect, e2: HTMLElement) {
    const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = e2;
    const offsetRight = offsetLeft + offsetWidth;
    const offsetBottom = offsetTop + offsetHeight;

    const overlap = !(
      rect.right < offsetLeft ||
      rect.left > offsetRight ||
      rect.bottom < offsetTop ||
      rect.top > offsetBottom
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
    wordLink.href = word.link || '';

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
    link: string | undefined,
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
        if (this.options.zoomOnHover?.transitionTime) {
          this.r2.setStyle(
            el,
            'transition',
            `transform ${this.options.zoomOnHover.transitionTime}s`,
          );
        }
        if (this.options.zoomOnHover?.scale) {
          this.r2.setStyle(
            el,
            'transform',
            `scale(${this.options.zoomOnHover.scale}) ${transformString}`,
          );
        }
        if (this.options.zoomOnHover?.delay) {
          this.r2.setStyle(
            el,
            'transition-delay',
            `${this.options.zoomOnHover.delay}s`,
          );
        }
        if (this.options.zoomOnHover?.color) {
          link
            ? this.r2.setStyle(node, 'color', this.options.zoomOnHover.color)
            : this.r2.setStyle(el, 'color', this.options.zoomOnHover.color);
        }
      };

      el.onmouseout = () => {
        this.r2.setStyle(el, 'transform', `none ${transformString}`);
        if (this.options.zoomOnHover?.color) {
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
    let left =
      useFixedPosition && word.position?.left
        ? word.position.left
        : this.options.center.x - width / 2;
    let top =
      useFixedPosition && word.position?.top
        ? word.position.top
        : this.options.center.y - height / 2;

    // place the first word
    wordStyle.left = left + 'px';
    wordStyle.top = top + 'px';

    // delayed appearance
    if (this.options.delay) {
      wordSpan.classList.add('tag-animation-delay');
      // add custom css properties
      wordStyle.setProperty(
        '--tag-animation-delay',
        `${this.options.delay * index}ms`,
      );
    }

    // default case: place randomly
    if (!useFixedPosition) {
      // do not place the first word always right in the middle
      if (index === 0) {
        wordStyle.left =
          left + (Math.random() - 0.5) * 2 * (this.calculatedWidth / 5) + 'px';
        wordStyle.top =
          top +
          (Math.random() - 0.5) * 2 * (this.calculatedHeight / 5) +
          '30px';
      } else {
        while (
          this.options.width &&
          this.options.height &&
          wordSpan.offsetHeight &&
          wordSpan.offsetWidth &&
          this.hitTest(new DOMRect(left, top, wordSpan.offsetWidth, wordSpan.offsetHeight))
        ) {
          radius += this.options.step || DEFAULT_STEP;
          angle +=
            (index % 2 === 0 ? 1 : -1) * (this.options.step || DEFAULT_STEP);

          left =
            this.options.center.x -
            width / 2.0 +
            radius * Math.cos(angle) * this.options.aspectRatio;
          top = this.options.center.y + radius * Math.sin(angle) - height / 2.0;
        }

        wordStyle.left = left + 'px';
        wordStyle.top = top + 'px';
      }
    }

    // Don't render word if part of it would be outside the container
    if (
      !this.options.overflow &&
      (left < 0 ||
        top < 0 ||
        left + width > this.calculatedWidth ||
        top + height > this.calculatedHeight)
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
      this.clicked?.emit(word);
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
    if (!this.localConfig()) {
      return;
    }
    if (this.localConfig().log === 'debug') {
      console.log(`[AngularTagCloudModule ${level}]`, ...args);
    } else if (this.localConfig().log === 'warn' && level === 'warn') {
      console.warn(`[AngularTagCloudModule ${level}]`, ...args);
    }
  }
}
