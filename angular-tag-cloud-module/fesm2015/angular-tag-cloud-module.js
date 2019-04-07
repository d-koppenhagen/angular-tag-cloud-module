import { Component, Input, Output, EventEmitter, ElementRef, Renderer2, HostListener, NgModule } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TagCloudComponent {
    /**
     * @param {?} el
     * @param {?} r2
     */
    constructor(el, r2) {
        this.el = el;
        this.r2 = r2;
        this.width = 500;
        this.height = 300;
        this.overflow = true;
        this.strict = false;
        this.zoomOnHover = { transitionTime: 0, scale: 1, delay: 0, color: null };
        this.realignOnResize = false;
        this.randomizeAngle = false;
        this.clicked = new EventEmitter();
        this.dataChanges = new EventEmitter();
        this.afterInit = new EventEmitter();
        this.afterChecked = new EventEmitter();
        this._alreadyPlacedWords = [];
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onResize(event) {
        window.clearTimeout(this._timeoutId);
        this._timeoutId = window.setTimeout((/**
         * @return {?}
         */
        () => {
            if (this.realignOnResize) {
                this.reDraw();
            }
        }), 200);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        this.reDraw(changes);
    }
    /**
     * @param {?=} changes
     * @return {?}
     */
    reDraw(changes) {
        this.dataChanges.emit(changes);
        this._alreadyPlacedWords = [];
        // check if data is not null or empty
        if (!this.data) {
            console.error('angular-tag-cloud: No data passed. Please pass an Array of CloudData');
            return;
        }
        // values changed, reset cloud
        this.el.nativeElement.innerHTML = '';
        // set value changes
        if (changes && changes['data']) {
            this._dataArr = changes['data'].currentValue;
        }
        /** @type {?} */
        let width = this.width;
        if (this.el.nativeElement.parentNode.offsetWidth > 0
            && width <= 1
            && width > 0) {
            width = this.el.nativeElement.parentNode.offsetWidth * width;
        }
        // set options
        this._options = {
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
        this.r2.setStyle(this.el.nativeElement, 'width', this._options.width + 'px');
        this.r2.setStyle(this.el.nativeElement, 'height', this._options.height + 'px');
        // draw the cloud
        this.drawWordCloud();
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.afterInit.emit();
    }
    /**
     * @return {?}
     */
    ngAfterContentChecked() {
        this.afterChecked.emit();
    }
    // helper to generate a descriptive string for an entry to use when sorting alphabetically
    /**
     * @param {?} entry
     * @return {?}
     */
    descriptiveEntry(entry) {
        /** @type {?} */
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
    /**
     * @return {?}
     */
    drawWordCloud() {
        // Sort alphabetically to ensure that, all things being equal, words are placed uniformly
        this._dataArr.sort((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        (a, b) => (this.descriptiveEntry(a)).localeCompare(this.descriptiveEntry(b))));
        // Sort this._dataArr from the word with the highest weight to the one with the lowest
        this._dataArr.sort((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        (a, b) => b.weight - a.weight));
        this._dataArr.forEach((/**
         * @param {?} elem
         * @param {?} index
         * @return {?}
         */
        (elem, index) => {
            this.drawWord(index, elem);
        }));
    }
    // Helper function to test if an element overlaps others
    /**
     * @param {?} currentEl
     * @param {?} otherEl
     * @return {?}
     */
    hitTest(currentEl, otherEl) {
        // Check elements for overlap one by one, stop and return false as soon as an overlap is found
        for (let i = 0; i < otherEl.length; i++) {
            if (this.overlapping(currentEl, otherEl[i])) {
                return true;
            }
        }
        return false;
    }
    // Pairwise overlap detection
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    overlapping(a, b) {
        return (Math.abs(2.0 * a.offsetLeft + a.offsetWidth - 2.0 * b.offsetLeft - b.offsetWidth) < a.offsetWidth + b.offsetWidth &&
            Math.abs(2.0 * a.offsetTop + a.offsetHeight - 2.0 * b.offsetTop - b.offsetHeight) < a.offsetHeight + b.offsetHeight)
            ? true : false;
    }
    // Function to draw a word, by moving it in spiral until it finds a suitable empty place. This will be iterated on each word.
    /**
     * @param {?} index
     * @param {?} word
     * @return {?}
     */
    drawWord(index, word) {
        // Define the ID attribute of the span that will wrap the word
        /** @type {?} */
        let angle = this.randomizeAngle ? 6.28 * Math.random() : 0;
        /** @type {?} */
        let radius = 0.0;
        /** @type {?} */
        let weight = 5;
        /** @type {?} */
        let wordSpan;
        // Check if min(weight) > max(weight) otherwise use default
        if (this._dataArr[0].weight > this._dataArr[this._dataArr.length - 1].weight) {
            // check if strict mode is active
            if (!this.strict) { // Linearly map the original weight to a discrete scale from 1 to 10
                weight = Math.round((word.weight - this._dataArr[this._dataArr.length - 1].weight) /
                    (this._dataArr[0].weight - this._dataArr[this._dataArr.length - 1].weight) * 9.0) + 1;
            }
            else { // use given value for weigth directly
                // fallback to 10
                if (word.weight > 10) {
                    weight = 10;
                    console.log(`[TagCloud strict] Weight property ${word.weight} > 10. Fallback to 10 as you are using strict mode`, word);
                }
                else if (word.weight < 1) { // fallback to 1
                    weight = 1;
                    console.log(`[TagCloud strict] Given weight property ${word.weight} < 1. Fallback to 1 as you are using strict mode`, word);
                }
                else if (word.weight % 1 !== 0) { // round if given value is not an integer
                    weight = Math.round(word.weight);
                    console.log(`[TagCloud strict] Given weight property ${word.weight} is not an integer. Rounded value to ${weight}`, word);
                }
                else {
                    weight = word.weight;
                }
            }
        }
        // Create a new span and insert node.
        wordSpan = this.r2.createElement('span');
        wordSpan.className = 'w' + weight;
        /** @type {?} */
        const thatClicked = this.clicked;
        wordSpan.onclick = (/**
         * @return {?}
         */
        () => {
            thatClicked.emit(word);
        });
        /** @type {?} */
        let node = this.r2.createText(word.text);
        // set color
        if (word.color) {
            this.r2.setStyle(wordSpan, 'color', word.color);
        }
        /** @type {?} */
        let transformString = '';
        // set color
        if (word.rotate) {
            transformString = `rotate(${word.rotate}deg)`;
            this.r2.setStyle(wordSpan, 'transform', transformString);
        }
        // Append href if there's a link alongwith the tag
        if (word.link) {
            /** @type {?} */
            const wordLink = this.r2.createElement('a');
            wordLink.href = word.link;
            if (word.external !== undefined && word.external) {
                wordLink.target = '_blank';
            }
            wordLink.appendChild(node);
            node = wordLink;
        }
        // set zoomOption
        if (this.zoomOnHover && this.zoomOnHover.scale !== 1) {
            if (!this.zoomOnHover.transitionTime) {
                this.zoomOnHover.transitionTime = 0;
            }
            if (!this.zoomOnHover.scale) {
                this.zoomOnHover.scale = 1;
            }
            wordSpan.onmouseover = (/**
             * @return {?}
             */
            () => {
                this.r2.setStyle(wordSpan, 'transition', `transform ${this.zoomOnHover.transitionTime}s`);
                this.r2.setStyle(wordSpan, 'transform', `scale(${this.zoomOnHover.scale}) ${transformString}`);
                this.r2.setStyle(wordSpan, 'transition-delay', `${this.zoomOnHover.delay}s`);
                if (this.zoomOnHover.color) {
                    word.link
                        ? this.r2.setStyle(node, 'color', this.zoomOnHover.color)
                        : this.r2.setStyle(wordSpan, 'color', this.zoomOnHover.color);
                }
            });
            wordSpan.onmouseout = (/**
             * @return {?}
             */
            () => {
                this.r2.setStyle(wordSpan, 'transform', `none ${transformString}`);
                word.link
                    ? this.r2.removeStyle(node, 'color')
                    : this.r2.removeStyle(wordSpan, 'color');
            });
        }
        wordSpan.appendChild(node);
        this.r2.appendChild(this.el.nativeElement, wordSpan);
        /** @type {?} */
        const width = wordSpan.offsetWidth;
        /** @type {?} */
        const height = wordSpan.offsetHeight;
        /** @type {?} */
        let left = this._options.center.x;
        /** @type {?} */
        let top = this._options.center.y;
        // Save a reference to the style property, for better performance
        /** @type {?} */
        const wordStyle = wordSpan.style;
        wordStyle.position = 'absolute';
        // place the first word
        wordStyle.left = left + 'px';
        wordStyle.top = top + 'px';
        // add tooltip if provided
        if (word.tooltip) {
            this.r2.addClass(wordSpan, 'tooltip');
            /** @type {?} */
            const tooltipSpan = this.r2.createElement('span');
            tooltipSpan.className = 'tooltiptext';
            /** @type {?} */
            const text = this.r2.createText(word.tooltip);
            tooltipSpan.appendChild(text);
            wordSpan.appendChild(tooltipSpan);
        }
        while (this.hitTest(wordSpan, this._alreadyPlacedWords)) {
            radius += this._options.step;
            angle += (index % 2 === 0 ? 1 : -1) * this._options.step;
            left = this._options.center.x - (width / 2.0) + (radius * Math.cos(angle)) * this._options.aspectRatio;
            top = this._options.center.y + radius * Math.sin(angle) - (height / 2.0);
            wordStyle.left = left + 'px';
            wordStyle.top = top + 'px';
        }
        // Don't render word if part of it would be outside the container
        if (!this._options.overflow &&
            (left < 0 || top < 0 || (left + width) > this._options.width ||
                (top + height) > this._options.height)) {
            wordSpan.remove();
            return;
        }
        this._alreadyPlacedWords.push(wordSpan);
    }
}
TagCloudComponent.decorators = [
    { type: Component, args: [{
                selector: 'angular-tag-cloud, ng-tag-cloud, ngtc',
                template: '',
                styles: [":host{font-family:Helvetica,Arial,sans-serif;font-size:10px;line-height:normal;color:#09f;overflow:hidden;position:relative;display:block}span{padding:0}span.w10{font-size:550%}span.w9{font-size:500%}span.w8{font-size:450%}span.w7{font-size:400%}span.w6{font-size:350%}span.w5{font-size:300%}span.w4{font-size:250%}span.w3{font-size:200%}span.w2{font-size:150%}a:hover,span.w10,span.w8,span.w9{color:#0cf}span.w7{color:#39d}span.w6{color:#90c5f0}span.w5{color:#90a0dd}span.w4{color:#90c5f0}span.w3{color:#a0ddff}span.w2{color:#9ce}span.w1{font-size:100%;color:#aab5f0}.tooltip .tooltiptext{visibility:hidden;width:inherit;background-color:#555;color:#fff;text-align:center;border-radius:6px;padding:5px 10px;position:absolute;bottom:100%;left:0;opacity:0;transition:opacity .3s}.tooltip .tooltiptext::after{content:\"\";position:absolute;top:100%;left:50%;margin-left:-5px;border-width:5px;border-style:solid;border-color:#555 transparent transparent}.tooltip:hover .tooltiptext{visibility:visible;opacity:1}"]
            }] }
];
/** @nocollapse */
TagCloudComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
TagCloudComponent.propDecorators = {
    data: [{ type: Input }],
    width: [{ type: Input }],
    height: [{ type: Input }],
    overflow: [{ type: Input }],
    strict: [{ type: Input }],
    zoomOnHover: [{ type: Input }],
    realignOnResize: [{ type: Input }],
    randomizeAngle: [{ type: Input }],
    clicked: [{ type: Output }],
    dataChanges: [{ type: Output }],
    afterInit: [{ type: Output }],
    afterChecked: [{ type: Output }],
    onResize: [{ type: HostListener, args: ['window:resize', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TagCloudModule {
}
TagCloudModule.decorators = [
    { type: NgModule, args: [{
                declarations: [TagCloudComponent],
                exports: [TagCloudComponent],
                entryComponents: [TagCloudComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { TagCloudModule, TagCloudComponent };

//# sourceMappingURL=angular-tag-cloud-module.js.map