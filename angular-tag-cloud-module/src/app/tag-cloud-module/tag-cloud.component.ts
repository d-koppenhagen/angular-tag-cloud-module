import { Component,
         OnChanges,
         OnInit,
         AfterContentInit,
         AfterContentChecked,
         Input,
         Output,
         EventEmitter,
         ElementRef,
         Renderer,
         Renderer2,
         SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CloudData, CloudOptions } from './tag-cloud.interfaces';

@Component({
  selector: 'angular-tag-cloud',
  template: '',
  styles: [`
    /* fonts */
    :host {
      font-family: "Helvetica", "Arial", sans-serif;
      font-size: 10px;
      line-height: normal;
    }
    :host /deep/ a:host {
      font-size: inherit;
      text-decoration: none;
    }
    :host /deep/ span.w10 { font-size: 550%; }
    :host /deep/ span.w9 { font-size: 500%; }
    :host /deep/ span.w8 { font-size: 450%; }
    :host /deep/ span.w7 { font-size: 400%; }
    :host /deep/ span.w6 { font-size: 350%; }
    :host /deep/ span.w5 { font-size: 300%; }
    :host /deep/ span.w4 { font-size: 250%; }
    :host /deep/ span.w3 { font-size: 200%; }
    :host /deep/ span.w2 { font-size: 150%; }
    :host /deep/ span.w1 { font-size: 100%; }

    /* colors */
    :host /deep/ a { color: inherit; }
    :host /deep/ a:hover { color: #0df; }
    :host /deep/ a:hover { color: #0cf; }
    :host /deep/ span.w10 { color: #0cf; }
    :host /deep/ span.w9 { color: #0cf; }
    :host /deep/ span.w8 { color: #0cf; }
    :host /deep/ span.w7 { color: #39d; }
    :host /deep/ span.w6 { color: #90c5f0; }
    :host /deep/ span.w5 { color: #90a0dd; }
    :host /deep/ span.w4 { color: #90c5f0; }
    :host /deep/ span.w3 { color: #a0ddff; }
    :host /deep/ span.w2 { color: #99ccee; }
    :host /deep/ span.w1 { color: #aab5f0; }

    /* layout */
    :host {
      color: #09f;
      overflow: hidden;
      position: relative;
      display: block;
    }
    :host /deep/ span { padding: 0; }
  `]
})
export class TagCloudComponent implements OnInit, OnChanges, AfterContentInit, AfterContentChecked {
  @Input() data: CloudData[];
  @Input() width: number;
  @Input() height: number;
  @Input() overflow: boolean;
  @Input() strict: boolean;

  @Output() clicked: EventEmitter<CloudData> = new EventEmitter();
  @Output() afterInit: EventEmitter<void> = new EventEmitter();
  @Output() afterChecked: EventEmitter<void> = new EventEmitter();

  dataArr: CloudData[];
  alreadyPlacedWords: HTMLElement[] = [];

  options: CloudOptions;

  constructor(
    private el: ElementRef,
    private renderer: Renderer,
    private r2: Renderer2,
    private sanitizer: DomSanitizer
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    // values changed, reset cloud
    this.el.nativeElement.innerHTML = '';

    // set value changes8
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
      step : 2.0,
      aspectRatio : (width / this.height),
      width: width,
      height: this.height,
      center: {
        x: (width / 2.0),
        y: (this.height / 2.0)
      },
      overflow: this.overflow
    };

    this.r2.setStyle(this.el.nativeElement, 'width', this.options.width + 'px');
    this.r2.setStyle(this.el.nativeElement, 'height', this.options.height + 'px');
    // draw the cloud
    this.drawWordCloud();
  }

  ngOnInit() {
    if (!this.data) {
      console.error('angular-tag-cloud: No data passed. Please pass an Array of CloudData');
      return;
    }

    if (!this.width) { this.width = 500; }
    if (!this.height) { this.height = 300; }
    if (!this.overflow) { this.overflow = true; }
    if (!this.strict) { this.strict = false; }

    this.r2.setStyle(this.el.nativeElement, 'width', this.options.width + 'px');
    this.r2.setStyle(this.el.nativeElement, 'height', this.options.height + 'px');
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
  hitTest(currentEl: HTMLElement, otherEl: HTMLElement[]) {
    // Check elements for overlap one by one, stop and return false as soon as an overlap is found
    for (let i = 0; i < otherEl.length; i++) {
      if (this.overlapping(currentEl, otherEl[i])) { return true; }
    }
    return false;
  }

  // Pairwise overlap detection
  overlapping(a: HTMLElement, b: HTMLElement) {
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
