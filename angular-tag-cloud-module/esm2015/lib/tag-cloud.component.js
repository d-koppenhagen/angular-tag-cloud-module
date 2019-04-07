/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ElementRef, Renderer2, HostListener } from '@angular/core';
/**
 * @record
 */
function CloudOptionsInternal() { }
if (false) {
    /** @type {?} */
    CloudOptionsInternal.prototype.step;
    /**
     * setting the aspect ratio. This value is calculated by the given width and height
     * @type {?}
     */
    CloudOptionsInternal.prototype.aspectRatio;
    /** @type {?} */
    CloudOptionsInternal.prototype.center;
}
export class TagCloudComponent {
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
if (false) {
    /** @type {?} */
    TagCloudComponent.prototype.data;
    /** @type {?} */
    TagCloudComponent.prototype.width;
    /** @type {?} */
    TagCloudComponent.prototype.height;
    /** @type {?} */
    TagCloudComponent.prototype.overflow;
    /** @type {?} */
    TagCloudComponent.prototype.strict;
    /** @type {?} */
    TagCloudComponent.prototype.zoomOnHover;
    /** @type {?} */
    TagCloudComponent.prototype.realignOnResize;
    /** @type {?} */
    TagCloudComponent.prototype.randomizeAngle;
    /** @type {?} */
    TagCloudComponent.prototype.clicked;
    /** @type {?} */
    TagCloudComponent.prototype.dataChanges;
    /** @type {?} */
    TagCloudComponent.prototype.afterInit;
    /** @type {?} */
    TagCloudComponent.prototype.afterChecked;
    /**
     * @type {?}
     * @private
     */
    TagCloudComponent.prototype._dataArr;
    /**
     * @type {?}
     * @private
     */
    TagCloudComponent.prototype._alreadyPlacedWords;
    /**
     * @type {?}
     * @private
     */
    TagCloudComponent.prototype._options;
    /**
     * @type {?}
     * @private
     */
    TagCloudComponent.prototype._timeoutId;
    /**
     * @type {?}
     * @private
     */
    TagCloudComponent.prototype.el;
    /**
     * @type {?}
     * @private
     */
    TagCloudComponent.prototype.r2;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLWNsb3VkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItdGFnLWNsb3VkLW1vZHVsZS8iLCJzb3VyY2VzIjpbImxpYi90YWctY2xvdWQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUlULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLFVBQVUsRUFDVixTQUFTLEVBRVQsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBRzdDLG1DQVdDOzs7SUFWQyxvQ0FBYTs7Ozs7SUFLYiwyQ0FBb0I7O0lBQ3BCLHNDQUdFOztBQVFKLE1BQU0sT0FBTyxpQkFBaUI7Ozs7O0lBcUI1QixZQUNVLEVBQWMsRUFDZCxFQUFhO1FBRGIsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUNkLE9BQUUsR0FBRixFQUFFLENBQVc7UUFyQmQsVUFBSyxHQUFJLEdBQUcsQ0FBQztRQUNiLFdBQU0sR0FBSSxHQUFHLENBQUM7UUFDZCxhQUFRLEdBQUksSUFBSSxDQUFDO1FBQ2pCLFdBQU0sR0FBSSxLQUFLLENBQUM7UUFDaEIsZ0JBQVcsR0FBd0IsRUFBRSxjQUFjLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFDMUYsb0JBQWUsR0FBSSxLQUFLLENBQUM7UUFDekIsbUJBQWMsR0FBSSxLQUFLLENBQUM7UUFFdkIsWUFBTyxHQUE2QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3ZELGdCQUFXLEdBQWlDLElBQUksWUFBWSxFQUFFLENBQUM7UUFDL0QsY0FBUyxHQUF3QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3BELGlCQUFZLEdBQXdCLElBQUksWUFBWSxFQUFFLENBQUM7UUFHekQsd0JBQW1CLEdBQWtCLEVBQUUsQ0FBQztJQVE1QyxDQUFDOzs7OztJQUdMLFFBQVEsQ0FBQyxLQUFLO1FBQ1osTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVTs7O1FBQUMsR0FBRyxFQUFFO1lBQ3ZDLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtnQkFDeEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQ2Y7UUFDSCxDQUFDLEdBQUUsR0FBRyxDQUFDLENBQUM7SUFDVixDQUFDOzs7OztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7Ozs7O0lBRUQsTUFBTSxDQUFDLE9BQXVCO1FBQzVCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxFQUFFLENBQUM7UUFFOUIscUNBQXFDO1FBQ3JDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2QsT0FBTyxDQUFDLEtBQUssQ0FBQyxzRUFBc0UsQ0FBQyxDQUFDO1lBQ3RGLE9BQU87U0FDUjtRQUVELDhCQUE4QjtRQUM5QixJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBRXJDLG9CQUFvQjtRQUNwQixJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDOUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxDQUFDO1NBQzlDOztZQUVHLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSztRQUN0QixJQUFJLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEdBQUcsQ0FBQztlQUMvQyxLQUFLLElBQUksQ0FBQztlQUNWLEtBQUssR0FBRyxDQUFDLEVBQ1o7WUFDQSxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7U0FDOUQ7UUFFRCxjQUFjO1FBQ2QsSUFBSSxDQUFDLFFBQVEsR0FBRztZQUNkLElBQUksRUFBRSxHQUFHO1lBQ1QsV0FBVyxFQUFFLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDbEMsS0FBSyxFQUFFLEtBQUs7WUFDWixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDbkIsTUFBTSxFQUFFO2dCQUNOLENBQUMsRUFBRSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7Z0JBQ2hCLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO2FBQ3ZCO1lBQ0QsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztTQUM5QixDQUFDO1FBRUYsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQzdFLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsQ0FBQztRQUMvRSxpQkFBaUI7UUFDakIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7Ozs7SUFHRCxrQkFBa0I7UUFDaEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN4QixDQUFDOzs7O0lBRUQscUJBQXFCO1FBQ25CLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDM0IsQ0FBQzs7Ozs7O0lBR0QsZ0JBQWdCLENBQUMsS0FBZ0I7O1lBQzNCLFdBQVcsR0FBRyxLQUFLLENBQUMsSUFBSTtRQUM1QixJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUU7WUFDZixXQUFXLElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7U0FDbEM7UUFDRCxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUU7WUFDbEIsV0FBVyxJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDO1NBQ3JDO1FBQ0QsSUFBSSxLQUFLLENBQUMsSUFBSSxFQUFFO1lBQ2QsV0FBVyxJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO1NBQ2pDO1FBQ0QsSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ2hCLFdBQVcsSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztTQUNuQztRQUNELE9BQU8sV0FBVyxDQUFDO0lBQ3JCLENBQUM7Ozs7SUFFRCxhQUFhO1FBQ1gseUZBQXlGO1FBQ3pGLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSTs7Ozs7UUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUM7UUFDbEcsc0ZBQXNGO1FBQ3RGLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSTs7Ozs7UUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTzs7Ozs7UUFBQyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUNwQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM3QixDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7Ozs7SUFHRCxPQUFPLENBQUMsU0FBc0IsRUFBRSxPQUFzQjtRQUNwRCw4RkFBOEY7UUFDOUYsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDdkMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFBRSxPQUFPLElBQUksQ0FBQzthQUFFO1NBQzlEO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOzs7Ozs7O0lBR0QsV0FBVyxDQUFDLENBQWMsRUFBRSxDQUFjO1FBQ3hDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxXQUFXLEdBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxHQUFJLENBQUMsQ0FBQyxXQUFXLEdBQUksQ0FBQyxDQUFDLFdBQVc7WUFDcEgsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLFNBQVMsR0FBSSxDQUFDLENBQUMsWUFBWSxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsU0FBUyxHQUFJLENBQUMsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUM7WUFDOUgsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ2pCLENBQUM7Ozs7Ozs7SUFHRCxRQUFRLENBQUMsS0FBYSxFQUFFLElBQWU7OztZQUVqQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7WUFDdEQsTUFBTSxHQUFHLEdBQUc7O1lBQ1osTUFBTSxHQUFHLENBQUM7O1lBQ1YsUUFBcUI7UUFFekIsMkRBQTJEO1FBQzNELElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUU7WUFDNUUsaUNBQWlDO1lBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsb0VBQW9FO2dCQUN0RixNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7b0JBQ3hFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDakc7aUJBQU0sRUFBRSxzQ0FBc0M7Z0JBQzdDLGlCQUFpQjtnQkFDakIsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsRUFBRTtvQkFDcEIsTUFBTSxHQUFHLEVBQUUsQ0FBQztvQkFDWixPQUFPLENBQUMsR0FBRyxDQUFDLHFDQUFxQyxJQUFJLENBQUMsTUFBTSxvREFBb0QsRUFBRSxJQUFJLENBQUMsQ0FBQztpQkFDekg7cUJBQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxFQUFFLGdCQUFnQjtvQkFDNUMsTUFBTSxHQUFHLENBQUMsQ0FBQztvQkFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLDJDQUEyQyxJQUFJLENBQUMsTUFBTSxrREFBa0QsRUFBRSxJQUFJLENBQUMsQ0FBQztpQkFDN0g7cUJBQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSx5Q0FBeUM7b0JBQzNFLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQ0FBMkMsSUFBSSxDQUFDLE1BQU0sd0NBQXdDLE1BQU0sRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO2lCQUMzSDtxQkFBTTtvQkFDTCxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztpQkFDdEI7YUFFRjtTQUNGO1FBRUQscUNBQXFDO1FBQ3JDLFFBQVEsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6QyxRQUFRLENBQUMsU0FBUyxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUM7O2NBRTVCLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTztRQUNoQyxRQUFRLENBQUMsT0FBTzs7O1FBQUcsR0FBRyxFQUFFO1lBQ3RCLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekIsQ0FBQyxDQUFBLENBQUM7O1lBRUUsSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFFeEMsWUFBWTtRQUNaLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNkLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2pEOztZQUVHLGVBQWUsR0FBRyxFQUFFO1FBRXhCLFlBQVk7UUFDWixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixlQUFlLEdBQUcsVUFBVSxJQUFJLENBQUMsTUFBTSxNQUFNLENBQUM7WUFDOUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRSxlQUFlLENBQUMsQ0FBQztTQUMxRDtRQUVELGtEQUFrRDtRQUNsRCxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7O2tCQUNQLFFBQVEsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUM7WUFDM0MsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBRTFCLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxTQUFTLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDaEQsUUFBUSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUM7YUFDNUI7WUFFRCxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNCLElBQUksR0FBRyxRQUFRLENBQUM7U0FDakI7UUFFRCxpQkFBaUI7UUFDakIsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxLQUFLLENBQUMsRUFBRTtZQUNwRCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUU7Z0JBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDO2FBQUU7WUFDOUUsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFO2dCQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQzthQUFFO1lBRTVELFFBQVEsQ0FBQyxXQUFXOzs7WUFBRyxHQUFHLEVBQUU7Z0JBQzFCLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxZQUFZLEVBQUUsYUFBYSxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUM7Z0JBQzFGLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUUsU0FBUyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssS0FBSyxlQUFlLEVBQUUsQ0FBQyxDQUFDO2dCQUMvRixJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsa0JBQWtCLEVBQUUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7Z0JBQzdFLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUU7b0JBQzFCLElBQUksQ0FBQyxJQUFJO3dCQUNQLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO3dCQUN6RCxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNqRTtZQUNILENBQUMsQ0FBQSxDQUFDO1lBRUYsUUFBUSxDQUFDLFVBQVU7OztZQUFHLEdBQUcsRUFBRTtnQkFDekIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRSxRQUFRLGVBQWUsRUFBRSxDQUFDLENBQUM7Z0JBQ25FLElBQUksQ0FBQyxJQUFJO29CQUNQLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDO29CQUNwQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQzdDLENBQUMsQ0FBQSxDQUFDO1NBQ0g7UUFFRCxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDOztjQUUvQyxLQUFLLEdBQUcsUUFBUSxDQUFDLFdBQVc7O2NBQzVCLE1BQU0sR0FBRyxRQUFRLENBQUMsWUFBWTs7WUFDaEMsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7O1lBQzdCLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7Y0FHMUIsU0FBUyxHQUFHLFFBQVEsQ0FBQyxLQUFLO1FBQ2hDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO1FBRWhDLHVCQUF1QjtRQUN2QixTQUFTLENBQUMsSUFBSSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUM7UUFDN0IsU0FBUyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDO1FBRTNCLDBCQUEwQjtRQUMxQixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDOztrQkFDaEMsV0FBVyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQztZQUNqRCxXQUFXLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQzs7a0JBQ2hDLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQzdDLFdBQVcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUIsUUFBUSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNuQztRQUVELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEVBQUU7WUFDdkQsTUFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1lBQzdCLEtBQUssSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFFekQsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUM7WUFDdkcsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQztZQUV6RSxTQUFTLENBQUMsSUFBSSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUM7WUFDN0IsU0FBUyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDO1NBQzVCO1FBRUQsaUVBQWlFO1FBQ2pFLElBQ0UsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVE7WUFDdkIsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLO2dCQUM1RCxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUN0QztZQUNBLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNsQixPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzFDLENBQUM7OztZQTdSRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHVDQUF1QztnQkFDakQsUUFBUSxFQUFFLEVBQUU7O2FBRWI7Ozs7WUF2QlEsVUFBVTtZQUNWLFNBQVM7OzttQkF3QmYsS0FBSztvQkFDTCxLQUFLO3FCQUNMLEtBQUs7dUJBQ0wsS0FBSztxQkFDTCxLQUFLOzBCQUNMLEtBQUs7OEJBQ0wsS0FBSzs2QkFDTCxLQUFLO3NCQUVMLE1BQU07MEJBQ04sTUFBTTt3QkFDTixNQUFNOzJCQUNOLE1BQU07dUJBYU4sWUFBWSxTQUFDLGVBQWUsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7OztJQXpCekMsaUNBQTJCOztJQUMzQixrQ0FBc0I7O0lBQ3RCLG1DQUF1Qjs7SUFDdkIscUNBQTBCOztJQUMxQixtQ0FBeUI7O0lBQ3pCLHdDQUFtRzs7SUFDbkcsNENBQWtDOztJQUNsQywyQ0FBaUM7O0lBRWpDLG9DQUFpRTs7SUFDakUsd0NBQXlFOztJQUN6RSxzQ0FBOEQ7O0lBQzlELHlDQUFpRTs7Ozs7SUFFakUscUNBQThCOzs7OztJQUM5QixnREFBZ0Q7Ozs7O0lBRWhELHFDQUF1Qzs7Ozs7SUFDdkMsdUNBQW1COzs7OztJQUdqQiwrQkFBc0I7Ozs7O0lBQ3RCLCtCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCxcbiAgICAgICAgIE9uQ2hhbmdlcyxcbiAgICAgICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgICAgICBBZnRlckNvbnRlbnRDaGVja2VkLFxuICAgICAgICAgSW5wdXQsXG4gICAgICAgICBPdXRwdXQsXG4gICAgICAgICBFdmVudEVtaXR0ZXIsXG4gICAgICAgICBFbGVtZW50UmVmLFxuICAgICAgICAgUmVuZGVyZXIyLFxuICAgICAgICAgU2ltcGxlQ2hhbmdlcyxcbiAgICAgICAgIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2xvdWREYXRhLCBDbG91ZE9wdGlvbnMsIFpvb21PbkhvdmVyT3B0aW9ucyB9IGZyb20gJy4vdGFnLWNsb3VkLmludGVyZmFjZXMnO1xuXG5pbnRlcmZhY2UgQ2xvdWRPcHRpb25zSW50ZXJuYWwgZXh0ZW5kcyBDbG91ZE9wdGlvbnMge1xuICBzdGVwOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIHNldHRpbmcgdGhlIGFzcGVjdCByYXRpby4gVGhpcyB2YWx1ZSBpcyBjYWxjdWxhdGVkIGJ5IHRoZSBnaXZlbiB3aWR0aCBhbmQgaGVpZ2h0XG4gICAqL1xuICBhc3BlY3RSYXRpbzogbnVtYmVyO1xuICBjZW50ZXI6IHtcbiAgICB4OiBudW1iZXI7XG4gICAgeTogbnVtYmVyO1xuICB9O1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhbmd1bGFyLXRhZy1jbG91ZCwgbmctdGFnLWNsb3VkLCBuZ3RjJyxcbiAgdGVtcGxhdGU6ICcnLFxuICBzdHlsZVVybHM6IFsnLi90YWctY2xvdWQuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFRhZ0Nsb3VkQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBBZnRlckNvbnRlbnRJbml0LCBBZnRlckNvbnRlbnRDaGVja2VkIHtcbiAgQElucHV0KCkgZGF0YTogQ2xvdWREYXRhW107XG4gIEBJbnB1dCgpIHdpZHRoPyA9IDUwMDtcbiAgQElucHV0KCkgaGVpZ2h0PyA9IDMwMDtcbiAgQElucHV0KCkgb3ZlcmZsb3c/ID0gdHJ1ZTtcbiAgQElucHV0KCkgc3RyaWN0PyA9IGZhbHNlO1xuICBASW5wdXQoKSB6b29tT25Ib3Zlcj86IFpvb21PbkhvdmVyT3B0aW9ucyA9IHsgdHJhbnNpdGlvblRpbWU6IDAsIHNjYWxlOiAxLCBkZWxheTogMCwgY29sb3I6IG51bGwgfTtcbiAgQElucHV0KCkgcmVhbGlnbk9uUmVzaXplPyA9IGZhbHNlO1xuICBASW5wdXQoKSByYW5kb21pemVBbmdsZT8gPSBmYWxzZTtcblxuICBAT3V0cHV0KCkgY2xpY2tlZD86IEV2ZW50RW1pdHRlcjxDbG91ZERhdGE+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgZGF0YUNoYW5nZXM/OiBFdmVudEVtaXR0ZXI8U2ltcGxlQ2hhbmdlcz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBhZnRlckluaXQ/OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBhZnRlckNoZWNrZWQ/OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHJpdmF0ZSBfZGF0YUFycjogQ2xvdWREYXRhW107XG4gIHByaXZhdGUgX2FscmVhZHlQbGFjZWRXb3JkczogSFRNTEVsZW1lbnRbXSA9IFtdO1xuXG4gIHByaXZhdGUgX29wdGlvbnM6IENsb3VkT3B0aW9uc0ludGVybmFsO1xuICBwcml2YXRlIF90aW1lb3V0SWQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHIyOiBSZW5kZXJlcjJcbiAgKSB7IH1cblxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJywgWyckZXZlbnQnXSlcbiAgb25SZXNpemUoZXZlbnQpIHtcbiAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVvdXRJZCk7XG4gICAgdGhpcy5fdGltZW91dElkID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMucmVhbGlnbk9uUmVzaXplKSB7XG4gICAgICAgIHRoaXMucmVEcmF3KCk7XG4gICAgICB9XG4gICAgfSwgMjAwKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICB0aGlzLnJlRHJhdyhjaGFuZ2VzKTtcbiAgfVxuXG4gIHJlRHJhdyhjaGFuZ2VzPzogU2ltcGxlQ2hhbmdlcykge1xuICAgIHRoaXMuZGF0YUNoYW5nZXMuZW1pdChjaGFuZ2VzKTtcbiAgICB0aGlzLl9hbHJlYWR5UGxhY2VkV29yZHMgPSBbXTtcblxuICAgIC8vIGNoZWNrIGlmIGRhdGEgaXMgbm90IG51bGwgb3IgZW1wdHlcbiAgICBpZiAoIXRoaXMuZGF0YSkge1xuICAgICAgY29uc29sZS5lcnJvcignYW5ndWxhci10YWctY2xvdWQ6IE5vIGRhdGEgcGFzc2VkLiBQbGVhc2UgcGFzcyBhbiBBcnJheSBvZiBDbG91ZERhdGEnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyB2YWx1ZXMgY2hhbmdlZCwgcmVzZXQgY2xvdWRcbiAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuaW5uZXJIVE1MID0gJyc7XG5cbiAgICAvLyBzZXQgdmFsdWUgY2hhbmdlc1xuICAgIGlmIChjaGFuZ2VzICYmIGNoYW5nZXNbJ2RhdGEnXSkge1xuICAgICAgdGhpcy5fZGF0YUFyciA9IGNoYW5nZXNbJ2RhdGEnXS5jdXJyZW50VmFsdWU7XG4gICAgfVxuXG4gICAgbGV0IHdpZHRoID0gdGhpcy53aWR0aDtcbiAgICBpZiAodGhpcy5lbC5uYXRpdmVFbGVtZW50LnBhcmVudE5vZGUub2Zmc2V0V2lkdGggPiAwXG4gICAgICAmJiB3aWR0aCA8PSAxXG4gICAgICAmJiB3aWR0aCA+IDBcbiAgICApIHtcbiAgICAgIHdpZHRoID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LnBhcmVudE5vZGUub2Zmc2V0V2lkdGggKiB3aWR0aDtcbiAgICB9XG5cbiAgICAvLyBzZXQgb3B0aW9uc1xuICAgIHRoaXMuX29wdGlvbnMgPSB7XG4gICAgICBzdGVwOiAyLjAsXG4gICAgICBhc3BlY3RSYXRpbzogKHdpZHRoIC8gdGhpcy5oZWlnaHQpLFxuICAgICAgd2lkdGg6IHdpZHRoLFxuICAgICAgaGVpZ2h0OiB0aGlzLmhlaWdodCxcbiAgICAgIGNlbnRlcjoge1xuICAgICAgICB4OiAod2lkdGggLyAyLjApLFxuICAgICAgICB5OiAodGhpcy5oZWlnaHQgLyAyLjApXG4gICAgICB9LFxuICAgICAgb3ZlcmZsb3c6IHRoaXMub3ZlcmZsb3csXG4gICAgICB6b29tT25Ib3ZlcjogdGhpcy56b29tT25Ib3ZlclxuICAgIH07XG5cbiAgICB0aGlzLnIyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3dpZHRoJywgdGhpcy5fb3B0aW9ucy53aWR0aCArICdweCcpO1xuICAgIHRoaXMucjIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnaGVpZ2h0JywgdGhpcy5fb3B0aW9ucy5oZWlnaHQgKyAncHgnKTtcbiAgICAvLyBkcmF3IHRoZSBjbG91ZFxuICAgIHRoaXMuZHJhd1dvcmRDbG91ZCgpO1xuICB9XG5cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgdGhpcy5hZnRlckluaXQuZW1pdCgpO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCkge1xuICAgIHRoaXMuYWZ0ZXJDaGVja2VkLmVtaXQoKTtcbiAgfVxuXG4gIC8vIGhlbHBlciB0byBnZW5lcmF0ZSBhIGRlc2NyaXB0aXZlIHN0cmluZyBmb3IgYW4gZW50cnkgdG8gdXNlIHdoZW4gc29ydGluZyBhbHBoYWJldGljYWxseVxuICBkZXNjcmlwdGl2ZUVudHJ5KGVudHJ5OiBDbG91ZERhdGEpOiBzdHJpbmcge1xuICAgIGxldCBkZXNjcmlwdGlvbiA9IGVudHJ5LnRleHQ7XG4gICAgaWYgKGVudHJ5LmNvbG9yKSB7XG4gICAgICBkZXNjcmlwdGlvbiArPSAnLScgKyBlbnRyeS5jb2xvcjtcbiAgICB9XG4gICAgaWYgKGVudHJ5LmV4dGVybmFsKSB7XG4gICAgICBkZXNjcmlwdGlvbiArPSAnLScgKyBlbnRyeS5leHRlcm5hbDtcbiAgICB9XG4gICAgaWYgKGVudHJ5LmxpbmspIHtcbiAgICAgIGRlc2NyaXB0aW9uICs9ICctJyArIGVudHJ5Lmxpbms7XG4gICAgfVxuICAgIGlmIChlbnRyeS5yb3RhdGUpIHtcbiAgICAgIGRlc2NyaXB0aW9uICs9ICctJyArIGVudHJ5LnJvdGF0ZTtcbiAgICB9XG4gICAgcmV0dXJuIGRlc2NyaXB0aW9uO1xuICB9XG5cbiAgZHJhd1dvcmRDbG91ZCAoKSB7XG4gICAgLy8gU29ydCBhbHBoYWJldGljYWxseSB0byBlbnN1cmUgdGhhdCwgYWxsIHRoaW5ncyBiZWluZyBlcXVhbCwgd29yZHMgYXJlIHBsYWNlZCB1bmlmb3JtbHlcbiAgICB0aGlzLl9kYXRhQXJyLnNvcnQoIChhLCBiKSA9PiAodGhpcy5kZXNjcmlwdGl2ZUVudHJ5KGEpKS5sb2NhbGVDb21wYXJlKHRoaXMuZGVzY3JpcHRpdmVFbnRyeShiKSkpO1xuICAgIC8vIFNvcnQgdGhpcy5fZGF0YUFyciBmcm9tIHRoZSB3b3JkIHdpdGggdGhlIGhpZ2hlc3Qgd2VpZ2h0IHRvIHRoZSBvbmUgd2l0aCB0aGUgbG93ZXN0XG4gICAgdGhpcy5fZGF0YUFyci5zb3J0KChhLCBiKSA9PiBiLndlaWdodCAtIGEud2VpZ2h0KTtcbiAgICB0aGlzLl9kYXRhQXJyLmZvckVhY2goKGVsZW0sIGluZGV4KSA9PiB7XG4gICAgICB0aGlzLmRyYXdXb3JkKGluZGV4LCBlbGVtKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIEhlbHBlciBmdW5jdGlvbiB0byB0ZXN0IGlmIGFuIGVsZW1lbnQgb3ZlcmxhcHMgb3RoZXJzXG4gIGhpdFRlc3QoY3VycmVudEVsOiBIVE1MRWxlbWVudCwgb3RoZXJFbDogSFRNTEVsZW1lbnRbXSk6IGJvb2xlYW4ge1xuICAgIC8vIENoZWNrIGVsZW1lbnRzIGZvciBvdmVybGFwIG9uZSBieSBvbmUsIHN0b3AgYW5kIHJldHVybiBmYWxzZSBhcyBzb29uIGFzIGFuIG92ZXJsYXAgaXMgZm91bmRcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG90aGVyRWwubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLm92ZXJsYXBwaW5nKGN1cnJlbnRFbCwgb3RoZXJFbFtpXSkpIHsgcmV0dXJuIHRydWU7IH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gUGFpcndpc2Ugb3ZlcmxhcCBkZXRlY3Rpb25cbiAgb3ZlcmxhcHBpbmcoYTogSFRNTEVsZW1lbnQsIGI6IEhUTUxFbGVtZW50KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChNYXRoLmFicygyLjAgKiBhLm9mZnNldExlZnQgKyBhLm9mZnNldFdpZHRoICAtIDIuMCAqIGIub2Zmc2V0TGVmdCAtIGIub2Zmc2V0V2lkdGgpICA8IGEub2Zmc2V0V2lkdGggICsgYi5vZmZzZXRXaWR0aCAmJlxuICAgICAgICAgICAgTWF0aC5hYnMoMi4wICogYS5vZmZzZXRUb3AgICsgYS5vZmZzZXRIZWlnaHQgLSAyLjAgKiBiLm9mZnNldFRvcCAgLSBiLm9mZnNldEhlaWdodCkgPCBhLm9mZnNldEhlaWdodCArIGIub2Zmc2V0SGVpZ2h0KVxuICAgID8gdHJ1ZSA6IGZhbHNlO1xuICB9XG5cbiAgLy8gRnVuY3Rpb24gdG8gZHJhdyBhIHdvcmQsIGJ5IG1vdmluZyBpdCBpbiBzcGlyYWwgdW50aWwgaXQgZmluZHMgYSBzdWl0YWJsZSBlbXB0eSBwbGFjZS4gVGhpcyB3aWxsIGJlIGl0ZXJhdGVkIG9uIGVhY2ggd29yZC5cbiAgZHJhd1dvcmQoaW5kZXg6IG51bWJlciwgd29yZDogQ2xvdWREYXRhKSB7XG4gICAgLy8gRGVmaW5lIHRoZSBJRCBhdHRyaWJ1dGUgb2YgdGhlIHNwYW4gdGhhdCB3aWxsIHdyYXAgdGhlIHdvcmRcbiAgICBsZXQgYW5nbGUgPSB0aGlzLnJhbmRvbWl6ZUFuZ2xlID8gNi4yOCAqIE1hdGgucmFuZG9tKCkgOiAwLFxuICAgICAgICByYWRpdXMgPSAwLjAsXG4gICAgICAgIHdlaWdodCA9IDUsXG4gICAgICAgIHdvcmRTcGFuOiBIVE1MRWxlbWVudDtcblxuICAgIC8vIENoZWNrIGlmIG1pbih3ZWlnaHQpID4gbWF4KHdlaWdodCkgb3RoZXJ3aXNlIHVzZSBkZWZhdWx0XG4gICAgaWYgKHRoaXMuX2RhdGFBcnJbMF0ud2VpZ2h0ID4gdGhpcy5fZGF0YUFyclt0aGlzLl9kYXRhQXJyLmxlbmd0aCAtIDFdLndlaWdodCkge1xuICAgICAgLy8gY2hlY2sgaWYgc3RyaWN0IG1vZGUgaXMgYWN0aXZlXG4gICAgICBpZiAoIXRoaXMuc3RyaWN0KSB7IC8vIExpbmVhcmx5IG1hcCB0aGUgb3JpZ2luYWwgd2VpZ2h0IHRvIGEgZGlzY3JldGUgc2NhbGUgZnJvbSAxIHRvIDEwXG4gICAgICAgIHdlaWdodCA9IE1hdGgucm91bmQoKHdvcmQud2VpZ2h0IC0gdGhpcy5fZGF0YUFyclt0aGlzLl9kYXRhQXJyLmxlbmd0aCAtIDFdLndlaWdodCkgL1xuICAgICAgICAgICAgICAgICAgKHRoaXMuX2RhdGFBcnJbMF0ud2VpZ2h0IC0gdGhpcy5fZGF0YUFyclt0aGlzLl9kYXRhQXJyLmxlbmd0aCAtIDFdLndlaWdodCkgKiA5LjApICsgMTtcbiAgICAgIH0gZWxzZSB7IC8vIHVzZSBnaXZlbiB2YWx1ZSBmb3Igd2VpZ3RoIGRpcmVjdGx5XG4gICAgICAgIC8vIGZhbGxiYWNrIHRvIDEwXG4gICAgICAgIGlmICh3b3JkLndlaWdodCA+IDEwKSB7XG4gICAgICAgICAgd2VpZ2h0ID0gMTA7XG4gICAgICAgICAgY29uc29sZS5sb2coYFtUYWdDbG91ZCBzdHJpY3RdIFdlaWdodCBwcm9wZXJ0eSAke3dvcmQud2VpZ2h0fSA+IDEwLiBGYWxsYmFjayB0byAxMCBhcyB5b3UgYXJlIHVzaW5nIHN0cmljdCBtb2RlYCwgd29yZCk7XG4gICAgICAgIH0gZWxzZSBpZiAod29yZC53ZWlnaHQgPCAxKSB7IC8vIGZhbGxiYWNrIHRvIDFcbiAgICAgICAgICB3ZWlnaHQgPSAxO1xuICAgICAgICAgIGNvbnNvbGUubG9nKGBbVGFnQ2xvdWQgc3RyaWN0XSBHaXZlbiB3ZWlnaHQgcHJvcGVydHkgJHt3b3JkLndlaWdodH0gPCAxLiBGYWxsYmFjayB0byAxIGFzIHlvdSBhcmUgdXNpbmcgc3RyaWN0IG1vZGVgLCB3b3JkKTtcbiAgICAgICAgfSBlbHNlIGlmICh3b3JkLndlaWdodCAlIDEgIT09IDApIHsgLy8gcm91bmQgaWYgZ2l2ZW4gdmFsdWUgaXMgbm90IGFuIGludGVnZXJcbiAgICAgICAgICB3ZWlnaHQgPSBNYXRoLnJvdW5kKHdvcmQud2VpZ2h0KTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhgW1RhZ0Nsb3VkIHN0cmljdF0gR2l2ZW4gd2VpZ2h0IHByb3BlcnR5ICR7d29yZC53ZWlnaHR9IGlzIG5vdCBhbiBpbnRlZ2VyLiBSb3VuZGVkIHZhbHVlIHRvICR7d2VpZ2h0fWAsIHdvcmQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdlaWdodCA9IHdvcmQud2VpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDcmVhdGUgYSBuZXcgc3BhbiBhbmQgaW5zZXJ0IG5vZGUuXG4gICAgd29yZFNwYW4gPSB0aGlzLnIyLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICB3b3JkU3Bhbi5jbGFzc05hbWUgPSAndycgKyB3ZWlnaHQ7XG5cbiAgICBjb25zdCB0aGF0Q2xpY2tlZCA9IHRoaXMuY2xpY2tlZDtcbiAgICB3b3JkU3Bhbi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgdGhhdENsaWNrZWQuZW1pdCh3b3JkKTtcbiAgICB9O1xuXG4gICAgbGV0IG5vZGUgPSB0aGlzLnIyLmNyZWF0ZVRleHQod29yZC50ZXh0KTtcblxuICAgIC8vIHNldCBjb2xvclxuICAgIGlmICh3b3JkLmNvbG9yKSB7XG4gICAgICB0aGlzLnIyLnNldFN0eWxlKHdvcmRTcGFuLCAnY29sb3InLCB3b3JkLmNvbG9yKTtcbiAgICB9XG5cbiAgICBsZXQgdHJhbnNmb3JtU3RyaW5nID0gJyc7XG5cbiAgICAvLyBzZXQgY29sb3JcbiAgICBpZiAod29yZC5yb3RhdGUpIHtcbiAgICAgIHRyYW5zZm9ybVN0cmluZyA9IGByb3RhdGUoJHt3b3JkLnJvdGF0ZX1kZWcpYDtcbiAgICAgIHRoaXMucjIuc2V0U3R5bGUod29yZFNwYW4sICd0cmFuc2Zvcm0nLCB0cmFuc2Zvcm1TdHJpbmcpO1xuICAgIH1cblxuICAgIC8vIEFwcGVuZCBocmVmIGlmIHRoZXJlJ3MgYSBsaW5rIGFsb25nd2l0aCB0aGUgdGFnXG4gICAgaWYgKHdvcmQubGluaykge1xuICAgICAgY29uc3Qgd29yZExpbmsgPSB0aGlzLnIyLmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgIHdvcmRMaW5rLmhyZWYgPSB3b3JkLmxpbms7XG5cbiAgICAgIGlmICh3b3JkLmV4dGVybmFsICE9PSB1bmRlZmluZWQgJiYgd29yZC5leHRlcm5hbCkge1xuICAgICAgICB3b3JkTGluay50YXJnZXQgPSAnX2JsYW5rJztcbiAgICAgIH1cblxuICAgICAgd29yZExpbmsuYXBwZW5kQ2hpbGQobm9kZSk7XG4gICAgICBub2RlID0gd29yZExpbms7XG4gICAgfVxuXG4gICAgLy8gc2V0IHpvb21PcHRpb25cbiAgICBpZiAodGhpcy56b29tT25Ib3ZlciAmJiB0aGlzLnpvb21PbkhvdmVyLnNjYWxlICE9PSAxKSB7XG4gICAgICBpZiAoIXRoaXMuem9vbU9uSG92ZXIudHJhbnNpdGlvblRpbWUpIHsgdGhpcy56b29tT25Ib3Zlci50cmFuc2l0aW9uVGltZSA9IDA7IH1cbiAgICAgIGlmICghdGhpcy56b29tT25Ib3Zlci5zY2FsZSkgeyB0aGlzLnpvb21PbkhvdmVyLnNjYWxlID0gMTsgfVxuXG4gICAgICB3b3JkU3Bhbi5vbm1vdXNlb3ZlciA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5yMi5zZXRTdHlsZSh3b3JkU3BhbiwgJ3RyYW5zaXRpb24nLCBgdHJhbnNmb3JtICR7dGhpcy56b29tT25Ib3Zlci50cmFuc2l0aW9uVGltZX1zYCk7XG4gICAgICAgIHRoaXMucjIuc2V0U3R5bGUod29yZFNwYW4sICd0cmFuc2Zvcm0nLCBgc2NhbGUoJHt0aGlzLnpvb21PbkhvdmVyLnNjYWxlfSkgJHt0cmFuc2Zvcm1TdHJpbmd9YCk7XG4gICAgICAgIHRoaXMucjIuc2V0U3R5bGUod29yZFNwYW4sICd0cmFuc2l0aW9uLWRlbGF5JywgYCR7dGhpcy56b29tT25Ib3Zlci5kZWxheX1zYCk7XG4gICAgICAgIGlmICh0aGlzLnpvb21PbkhvdmVyLmNvbG9yKSB7XG4gICAgICAgICAgd29yZC5saW5rXG4gICAgICAgICAgICA/IHRoaXMucjIuc2V0U3R5bGUobm9kZSwgJ2NvbG9yJywgdGhpcy56b29tT25Ib3Zlci5jb2xvcilcbiAgICAgICAgICAgIDogdGhpcy5yMi5zZXRTdHlsZSh3b3JkU3BhbiwgJ2NvbG9yJywgdGhpcy56b29tT25Ib3Zlci5jb2xvcik7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHdvcmRTcGFuLm9ubW91c2VvdXQgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMucjIuc2V0U3R5bGUod29yZFNwYW4sICd0cmFuc2Zvcm0nLCBgbm9uZSAke3RyYW5zZm9ybVN0cmluZ31gKTtcbiAgICAgICAgd29yZC5saW5rXG4gICAgICAgICAgPyB0aGlzLnIyLnJlbW92ZVN0eWxlKG5vZGUsICdjb2xvcicpXG4gICAgICAgICAgOiB0aGlzLnIyLnJlbW92ZVN0eWxlKHdvcmRTcGFuLCAnY29sb3InKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgd29yZFNwYW4uYXBwZW5kQ2hpbGQobm9kZSk7XG4gICAgdGhpcy5yMi5hcHBlbmRDaGlsZCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIHdvcmRTcGFuKTtcblxuICAgIGNvbnN0IHdpZHRoID0gd29yZFNwYW4ub2Zmc2V0V2lkdGg7XG4gICAgY29uc3QgaGVpZ2h0ID0gd29yZFNwYW4ub2Zmc2V0SGVpZ2h0O1xuICAgIGxldCBsZWZ0ID0gdGhpcy5fb3B0aW9ucy5jZW50ZXIueDtcbiAgICBsZXQgdG9wID0gdGhpcy5fb3B0aW9ucy5jZW50ZXIueTtcblxuICAgIC8vIFNhdmUgYSByZWZlcmVuY2UgdG8gdGhlIHN0eWxlIHByb3BlcnR5LCBmb3IgYmV0dGVyIHBlcmZvcm1hbmNlXG4gICAgY29uc3Qgd29yZFN0eWxlID0gd29yZFNwYW4uc3R5bGU7XG4gICAgd29yZFN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcblxuICAgIC8vIHBsYWNlIHRoZSBmaXJzdCB3b3JkXG4gICAgd29yZFN0eWxlLmxlZnQgPSBsZWZ0ICsgJ3B4JztcbiAgICB3b3JkU3R5bGUudG9wID0gdG9wICsgJ3B4JztcblxuICAgIC8vIGFkZCB0b29sdGlwIGlmIHByb3ZpZGVkXG4gICAgaWYgKHdvcmQudG9vbHRpcCkge1xuICAgICAgdGhpcy5yMi5hZGRDbGFzcyh3b3JkU3BhbiwgJ3Rvb2x0aXAnKTtcbiAgICAgIGNvbnN0IHRvb2x0aXBTcGFuID0gdGhpcy5yMi5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICB0b29sdGlwU3Bhbi5jbGFzc05hbWUgPSAndG9vbHRpcHRleHQnO1xuICAgICAgY29uc3QgdGV4dCA9IHRoaXMucjIuY3JlYXRlVGV4dCh3b3JkLnRvb2x0aXApO1xuICAgICAgdG9vbHRpcFNwYW4uYXBwZW5kQ2hpbGQodGV4dCk7XG4gICAgICB3b3JkU3Bhbi5hcHBlbmRDaGlsZCh0b29sdGlwU3Bhbik7XG4gICAgfVxuXG4gICAgd2hpbGUgKHRoaXMuaGl0VGVzdCh3b3JkU3BhbiwgdGhpcy5fYWxyZWFkeVBsYWNlZFdvcmRzKSkge1xuICAgICAgcmFkaXVzICs9IHRoaXMuX29wdGlvbnMuc3RlcDtcbiAgICAgIGFuZ2xlICs9IChpbmRleCAlIDIgPT09IDAgPyAxIDogLTEpICogdGhpcy5fb3B0aW9ucy5zdGVwO1xuXG4gICAgICBsZWZ0ID0gdGhpcy5fb3B0aW9ucy5jZW50ZXIueCAtICh3aWR0aCAvIDIuMCkgKyAocmFkaXVzICogTWF0aC5jb3MoYW5nbGUpKSAqIHRoaXMuX29wdGlvbnMuYXNwZWN0UmF0aW87XG4gICAgICB0b3AgPSB0aGlzLl9vcHRpb25zLmNlbnRlci55ICsgcmFkaXVzICogTWF0aC5zaW4oYW5nbGUpIC0gKGhlaWdodCAvIDIuMCk7XG5cbiAgICAgIHdvcmRTdHlsZS5sZWZ0ID0gbGVmdCArICdweCc7XG4gICAgICB3b3JkU3R5bGUudG9wID0gdG9wICsgJ3B4JztcbiAgICB9XG5cbiAgICAvLyBEb24ndCByZW5kZXIgd29yZCBpZiBwYXJ0IG9mIGl0IHdvdWxkIGJlIG91dHNpZGUgdGhlIGNvbnRhaW5lclxuICAgIGlmIChcbiAgICAgICF0aGlzLl9vcHRpb25zLm92ZXJmbG93ICYmXG4gICAgICAobGVmdCA8IDAgfHwgdG9wIDwgMCB8fCAobGVmdCArIHdpZHRoKSA+IHRoaXMuX29wdGlvbnMud2lkdGggfHxcbiAgICAgICh0b3AgKyBoZWlnaHQpID4gdGhpcy5fb3B0aW9ucy5oZWlnaHQpXG4gICAgKSB7XG4gICAgICB3b3JkU3Bhbi5yZW1vdmUoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9hbHJlYWR5UGxhY2VkV29yZHMucHVzaCh3b3JkU3Bhbik7XG4gIH1cblxufVxuIl19