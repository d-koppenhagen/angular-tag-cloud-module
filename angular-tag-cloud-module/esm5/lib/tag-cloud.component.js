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
var TagCloudComponent = /** @class */ (function () {
    function TagCloudComponent(el, r2) {
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
    TagCloudComponent.prototype.onResize = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        window.clearTimeout(this._timeoutId);
        this._timeoutId = window.setTimeout((/**
         * @return {?}
         */
        function () {
            if (_this.realignOnResize) {
                _this.reDraw();
            }
        }), 200);
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    TagCloudComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        this.reDraw(changes);
    };
    /**
     * @param {?=} changes
     * @return {?}
     */
    TagCloudComponent.prototype.reDraw = /**
     * @param {?=} changes
     * @return {?}
     */
    function (changes) {
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
        var width = this.width;
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
    };
    /**
     * @return {?}
     */
    TagCloudComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this.afterInit.emit();
    };
    /**
     * @return {?}
     */
    TagCloudComponent.prototype.ngAfterContentChecked = /**
     * @return {?}
     */
    function () {
        this.afterChecked.emit();
    };
    // helper to generate a descriptive string for an entry to use when sorting alphabetically
    // helper to generate a descriptive string for an entry to use when sorting alphabetically
    /**
     * @param {?} entry
     * @return {?}
     */
    TagCloudComponent.prototype.descriptiveEntry = 
    // helper to generate a descriptive string for an entry to use when sorting alphabetically
    /**
     * @param {?} entry
     * @return {?}
     */
    function (entry) {
        /** @type {?} */
        var description = entry.text;
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
    };
    /**
     * @return {?}
     */
    TagCloudComponent.prototype.drawWordCloud = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // Sort alphabetically to ensure that, all things being equal, words are placed uniformly
        this._dataArr.sort((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        function (a, b) { return (_this.descriptiveEntry(a)).localeCompare(_this.descriptiveEntry(b)); }));
        // Sort this._dataArr from the word with the highest weight to the one with the lowest
        this._dataArr.sort((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        function (a, b) { return b.weight - a.weight; }));
        this._dataArr.forEach((/**
         * @param {?} elem
         * @param {?} index
         * @return {?}
         */
        function (elem, index) {
            _this.drawWord(index, elem);
        }));
    };
    // Helper function to test if an element overlaps others
    // Helper function to test if an element overlaps others
    /**
     * @param {?} currentEl
     * @param {?} otherEl
     * @return {?}
     */
    TagCloudComponent.prototype.hitTest = 
    // Helper function to test if an element overlaps others
    /**
     * @param {?} currentEl
     * @param {?} otherEl
     * @return {?}
     */
    function (currentEl, otherEl) {
        // Check elements for overlap one by one, stop and return false as soon as an overlap is found
        for (var i = 0; i < otherEl.length; i++) {
            if (this.overlapping(currentEl, otherEl[i])) {
                return true;
            }
        }
        return false;
    };
    // Pairwise overlap detection
    // Pairwise overlap detection
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    TagCloudComponent.prototype.overlapping = 
    // Pairwise overlap detection
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    function (a, b) {
        return (Math.abs(2.0 * a.offsetLeft + a.offsetWidth - 2.0 * b.offsetLeft - b.offsetWidth) < a.offsetWidth + b.offsetWidth &&
            Math.abs(2.0 * a.offsetTop + a.offsetHeight - 2.0 * b.offsetTop - b.offsetHeight) < a.offsetHeight + b.offsetHeight)
            ? true : false;
    };
    // Function to draw a word, by moving it in spiral until it finds a suitable empty place. This will be iterated on each word.
    // Function to draw a word, by moving it in spiral until it finds a suitable empty place. This will be iterated on each word.
    /**
     * @param {?} index
     * @param {?} word
     * @return {?}
     */
    TagCloudComponent.prototype.drawWord = 
    // Function to draw a word, by moving it in spiral until it finds a suitable empty place. This will be iterated on each word.
    /**
     * @param {?} index
     * @param {?} word
     * @return {?}
     */
    function (index, word) {
        var _this = this;
        // Define the ID attribute of the span that will wrap the word
        /** @type {?} */
        var angle = this.randomizeAngle ? 6.28 * Math.random() : 0;
        /** @type {?} */
        var radius = 0.0;
        /** @type {?} */
        var weight = 5;
        /** @type {?} */
        var wordSpan;
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
                    console.log("[TagCloud strict] Weight property " + word.weight + " > 10. Fallback to 10 as you are using strict mode", word);
                }
                else if (word.weight < 1) { // fallback to 1
                    weight = 1;
                    console.log("[TagCloud strict] Given weight property " + word.weight + " < 1. Fallback to 1 as you are using strict mode", word);
                }
                else if (word.weight % 1 !== 0) { // round if given value is not an integer
                    weight = Math.round(word.weight);
                    console.log("[TagCloud strict] Given weight property " + word.weight + " is not an integer. Rounded value to " + weight, word);
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
        var thatClicked = this.clicked;
        wordSpan.onclick = (/**
         * @return {?}
         */
        function () {
            thatClicked.emit(word);
        });
        /** @type {?} */
        var node = this.r2.createText(word.text);
        // set color
        if (word.color) {
            this.r2.setStyle(wordSpan, 'color', word.color);
        }
        /** @type {?} */
        var transformString = '';
        // set color
        if (word.rotate) {
            transformString = "rotate(" + word.rotate + "deg)";
            this.r2.setStyle(wordSpan, 'transform', transformString);
        }
        // Append href if there's a link alongwith the tag
        if (word.link) {
            /** @type {?} */
            var wordLink = this.r2.createElement('a');
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
            function () {
                _this.r2.setStyle(wordSpan, 'transition', "transform " + _this.zoomOnHover.transitionTime + "s");
                _this.r2.setStyle(wordSpan, 'transform', "scale(" + _this.zoomOnHover.scale + ") " + transformString);
                _this.r2.setStyle(wordSpan, 'transition-delay', _this.zoomOnHover.delay + "s");
                if (_this.zoomOnHover.color) {
                    word.link
                        ? _this.r2.setStyle(node, 'color', _this.zoomOnHover.color)
                        : _this.r2.setStyle(wordSpan, 'color', _this.zoomOnHover.color);
                }
            });
            wordSpan.onmouseout = (/**
             * @return {?}
             */
            function () {
                _this.r2.setStyle(wordSpan, 'transform', "none " + transformString);
                word.link
                    ? _this.r2.removeStyle(node, 'color')
                    : _this.r2.removeStyle(wordSpan, 'color');
            });
        }
        wordSpan.appendChild(node);
        this.r2.appendChild(this.el.nativeElement, wordSpan);
        /** @type {?} */
        var width = wordSpan.offsetWidth;
        /** @type {?} */
        var height = wordSpan.offsetHeight;
        /** @type {?} */
        var left = this._options.center.x;
        /** @type {?} */
        var top = this._options.center.y;
        // Save a reference to the style property, for better performance
        /** @type {?} */
        var wordStyle = wordSpan.style;
        wordStyle.position = 'absolute';
        // place the first word
        wordStyle.left = left + 'px';
        wordStyle.top = top + 'px';
        // add tooltip if provided
        if (word.tooltip) {
            this.r2.addClass(wordSpan, 'tooltip');
            /** @type {?} */
            var tooltipSpan = this.r2.createElement('span');
            tooltipSpan.className = 'tooltiptext';
            /** @type {?} */
            var text = this.r2.createText(word.tooltip);
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
    };
    TagCloudComponent.decorators = [
        { type: Component, args: [{
                    selector: 'angular-tag-cloud, ng-tag-cloud, ngtc',
                    template: '',
                    styles: [":host{font-family:Helvetica,Arial,sans-serif;font-size:10px;line-height:normal;color:#09f;overflow:hidden;position:relative;display:block}span{padding:0}span.w10{font-size:550%}span.w9{font-size:500%}span.w8{font-size:450%}span.w7{font-size:400%}span.w6{font-size:350%}span.w5{font-size:300%}span.w4{font-size:250%}span.w3{font-size:200%}span.w2{font-size:150%}a:hover,span.w10,span.w8,span.w9{color:#0cf}span.w7{color:#39d}span.w6{color:#90c5f0}span.w5{color:#90a0dd}span.w4{color:#90c5f0}span.w3{color:#a0ddff}span.w2{color:#9ce}span.w1{font-size:100%;color:#aab5f0}.tooltip .tooltiptext{visibility:hidden;width:inherit;background-color:#555;color:#fff;text-align:center;border-radius:6px;padding:5px 10px;position:absolute;bottom:100%;left:0;opacity:0;transition:opacity .3s}.tooltip .tooltiptext::after{content:\"\";position:absolute;top:100%;left:50%;margin-left:-5px;border-width:5px;border-style:solid;border-color:#555 transparent transparent}.tooltip:hover .tooltiptext{visibility:visible;opacity:1}"]
                }] }
    ];
    /** @nocollapse */
    TagCloudComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
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
    return TagCloudComponent;
}());
export { TagCloudComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLWNsb3VkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItdGFnLWNsb3VkLW1vZHVsZS8iLCJzb3VyY2VzIjpbImxpYi90YWctY2xvdWQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUlULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLFVBQVUsRUFDVixTQUFTLEVBRVQsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBRzdDLG1DQVdDOzs7SUFWQyxvQ0FBYTs7Ozs7SUFLYiwyQ0FBb0I7O0lBQ3BCLHNDQUdFOztBQUdKO0lBMEJFLDJCQUNVLEVBQWMsRUFDZCxFQUFhO1FBRGIsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUNkLE9BQUUsR0FBRixFQUFFLENBQVc7UUFyQmQsVUFBSyxHQUFJLEdBQUcsQ0FBQztRQUNiLFdBQU0sR0FBSSxHQUFHLENBQUM7UUFDZCxhQUFRLEdBQUksSUFBSSxDQUFDO1FBQ2pCLFdBQU0sR0FBSSxLQUFLLENBQUM7UUFDaEIsZ0JBQVcsR0FBd0IsRUFBRSxjQUFjLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFDMUYsb0JBQWUsR0FBSSxLQUFLLENBQUM7UUFDekIsbUJBQWMsR0FBSSxLQUFLLENBQUM7UUFFdkIsWUFBTyxHQUE2QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3ZELGdCQUFXLEdBQWlDLElBQUksWUFBWSxFQUFFLENBQUM7UUFDL0QsY0FBUyxHQUF3QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3BELGlCQUFZLEdBQXdCLElBQUksWUFBWSxFQUFFLENBQUM7UUFHekQsd0JBQW1CLEdBQWtCLEVBQUUsQ0FBQztJQVE1QyxDQUFDOzs7OztJQUdMLG9DQUFROzs7O0lBRFIsVUFDUyxLQUFLO1FBRGQsaUJBUUM7UUFO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Z1EzQyx3QkFBQztDQUFBLEFBL1JELElBK1JDO1NBMVJZLGlCQUFpQjs7O0lBQzVCLGlDQUEyQjs7SUFDM0Isa0NBQXNCOztJQUN0QixtQ0FBdUI7O0lBQ3ZCLHFDQUEwQjs7SUFDMUIsbUNBQXlCOztJQUN6Qix3Q0FBbUc7O0lBQ25HLDRDQUFrQzs7SUFDbEMsMkNBQWlDOztJQUVqQyxvQ0FBaUU7O0lBQ2pFLHdDQUF5RTs7SUFDekUsc0NBQThEOztJQUM5RCx5Q0FBaUU7Ozs7O0lBRWpFLHFDQUE4Qjs7Ozs7SUFDOUIsZ0RBQWdEOzs7OztJQUVoRCxxQ0FBdUM7Ozs7O0lBQ3ZDLHVDQUFtQjs7Ozs7SUFHakIsK0JBQXNCOzs7OztJQUN0QiwrQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsXG4gICAgICAgICBPbkNoYW5nZXMsXG4gICAgICAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgICAgICAgQWZ0ZXJDb250ZW50Q2hlY2tlZCxcbiAgICAgICAgIElucHV0LFxuICAgICAgICAgT3V0cHV0LFxuICAgICAgICAgRXZlbnRFbWl0dGVyLFxuICAgICAgICAgRWxlbWVudFJlZixcbiAgICAgICAgIFJlbmRlcmVyMixcbiAgICAgICAgIFNpbXBsZUNoYW5nZXMsXG4gICAgICAgICBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENsb3VkRGF0YSwgQ2xvdWRPcHRpb25zLCBab29tT25Ib3Zlck9wdGlvbnMgfSBmcm9tICcuL3RhZy1jbG91ZC5pbnRlcmZhY2VzJztcblxuaW50ZXJmYWNlIENsb3VkT3B0aW9uc0ludGVybmFsIGV4dGVuZHMgQ2xvdWRPcHRpb25zIHtcbiAgc3RlcDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBzZXR0aW5nIHRoZSBhc3BlY3QgcmF0aW8uIFRoaXMgdmFsdWUgaXMgY2FsY3VsYXRlZCBieSB0aGUgZ2l2ZW4gd2lkdGggYW5kIGhlaWdodFxuICAgKi9cbiAgYXNwZWN0UmF0aW86IG51bWJlcjtcbiAgY2VudGVyOiB7XG4gICAgeDogbnVtYmVyO1xuICAgIHk6IG51bWJlcjtcbiAgfTtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYW5ndWxhci10YWctY2xvdWQsIG5nLXRhZy1jbG91ZCwgbmd0YycsXG4gIHRlbXBsYXRlOiAnJyxcbiAgc3R5bGVVcmxzOiBbJy4vdGFnLWNsb3VkLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBUYWdDbG91ZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgQWZ0ZXJDb250ZW50SW5pdCwgQWZ0ZXJDb250ZW50Q2hlY2tlZCB7XG4gIEBJbnB1dCgpIGRhdGE6IENsb3VkRGF0YVtdO1xuICBASW5wdXQoKSB3aWR0aD8gPSA1MDA7XG4gIEBJbnB1dCgpIGhlaWdodD8gPSAzMDA7XG4gIEBJbnB1dCgpIG92ZXJmbG93PyA9IHRydWU7XG4gIEBJbnB1dCgpIHN0cmljdD8gPSBmYWxzZTtcbiAgQElucHV0KCkgem9vbU9uSG92ZXI/OiBab29tT25Ib3Zlck9wdGlvbnMgPSB7IHRyYW5zaXRpb25UaW1lOiAwLCBzY2FsZTogMSwgZGVsYXk6IDAsIGNvbG9yOiBudWxsIH07XG4gIEBJbnB1dCgpIHJlYWxpZ25PblJlc2l6ZT8gPSBmYWxzZTtcbiAgQElucHV0KCkgcmFuZG9taXplQW5nbGU/ID0gZmFsc2U7XG5cbiAgQE91dHB1dCgpIGNsaWNrZWQ/OiBFdmVudEVtaXR0ZXI8Q2xvdWREYXRhPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGRhdGFDaGFuZ2VzPzogRXZlbnRFbWl0dGVyPFNpbXBsZUNoYW5nZXM+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgYWZ0ZXJJbml0PzogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgYWZ0ZXJDaGVja2VkPzogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHByaXZhdGUgX2RhdGFBcnI6IENsb3VkRGF0YVtdO1xuICBwcml2YXRlIF9hbHJlYWR5UGxhY2VkV29yZHM6IEhUTUxFbGVtZW50W10gPSBbXTtcblxuICBwcml2YXRlIF9vcHRpb25zOiBDbG91ZE9wdGlvbnNJbnRlcm5hbDtcbiAgcHJpdmF0ZSBfdGltZW91dElkO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSByMjogUmVuZGVyZXIyXG4gICkgeyB9XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScsIFsnJGV2ZW50J10pXG4gIG9uUmVzaXplKGV2ZW50KSB7XG4gICAgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLl90aW1lb3V0SWQpO1xuICAgIHRoaXMuX3RpbWVvdXRJZCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmICh0aGlzLnJlYWxpZ25PblJlc2l6ZSkge1xuICAgICAgICB0aGlzLnJlRHJhdygpO1xuICAgICAgfVxuICAgIH0sIDIwMCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgdGhpcy5yZURyYXcoY2hhbmdlcyk7XG4gIH1cblxuICByZURyYXcoY2hhbmdlcz86IFNpbXBsZUNoYW5nZXMpIHtcbiAgICB0aGlzLmRhdGFDaGFuZ2VzLmVtaXQoY2hhbmdlcyk7XG4gICAgdGhpcy5fYWxyZWFkeVBsYWNlZFdvcmRzID0gW107XG5cbiAgICAvLyBjaGVjayBpZiBkYXRhIGlzIG5vdCBudWxsIG9yIGVtcHR5XG4gICAgaWYgKCF0aGlzLmRhdGEpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ2FuZ3VsYXItdGFnLWNsb3VkOiBObyBkYXRhIHBhc3NlZC4gUGxlYXNlIHBhc3MgYW4gQXJyYXkgb2YgQ2xvdWREYXRhJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gdmFsdWVzIGNoYW5nZWQsIHJlc2V0IGNsb3VkXG4gICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmlubmVySFRNTCA9ICcnO1xuXG4gICAgLy8gc2V0IHZhbHVlIGNoYW5nZXNcbiAgICBpZiAoY2hhbmdlcyAmJiBjaGFuZ2VzWydkYXRhJ10pIHtcbiAgICAgIHRoaXMuX2RhdGFBcnIgPSBjaGFuZ2VzWydkYXRhJ10uY3VycmVudFZhbHVlO1xuICAgIH1cblxuICAgIGxldCB3aWR0aCA9IHRoaXMud2lkdGg7XG4gICAgaWYgKHRoaXMuZWwubmF0aXZlRWxlbWVudC5wYXJlbnROb2RlLm9mZnNldFdpZHRoID4gMFxuICAgICAgJiYgd2lkdGggPD0gMVxuICAgICAgJiYgd2lkdGggPiAwXG4gICAgKSB7XG4gICAgICB3aWR0aCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5wYXJlbnROb2RlLm9mZnNldFdpZHRoICogd2lkdGg7XG4gICAgfVxuXG4gICAgLy8gc2V0IG9wdGlvbnNcbiAgICB0aGlzLl9vcHRpb25zID0ge1xuICAgICAgc3RlcDogMi4wLFxuICAgICAgYXNwZWN0UmF0aW86ICh3aWR0aCAvIHRoaXMuaGVpZ2h0KSxcbiAgICAgIHdpZHRoOiB3aWR0aCxcbiAgICAgIGhlaWdodDogdGhpcy5oZWlnaHQsXG4gICAgICBjZW50ZXI6IHtcbiAgICAgICAgeDogKHdpZHRoIC8gMi4wKSxcbiAgICAgICAgeTogKHRoaXMuaGVpZ2h0IC8gMi4wKVxuICAgICAgfSxcbiAgICAgIG92ZXJmbG93OiB0aGlzLm92ZXJmbG93LFxuICAgICAgem9vbU9uSG92ZXI6IHRoaXMuem9vbU9uSG92ZXJcbiAgICB9O1xuXG4gICAgdGhpcy5yMi5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd3aWR0aCcsIHRoaXMuX29wdGlvbnMud2lkdGggKyAncHgnKTtcbiAgICB0aGlzLnIyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2hlaWdodCcsIHRoaXMuX29wdGlvbnMuaGVpZ2h0ICsgJ3B4Jyk7XG4gICAgLy8gZHJhdyB0aGUgY2xvdWRcbiAgICB0aGlzLmRyYXdXb3JkQ2xvdWQoKTtcbiAgfVxuXG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMuYWZ0ZXJJbml0LmVtaXQoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIHtcbiAgICB0aGlzLmFmdGVyQ2hlY2tlZC5lbWl0KCk7XG4gIH1cblxuICAvLyBoZWxwZXIgdG8gZ2VuZXJhdGUgYSBkZXNjcmlwdGl2ZSBzdHJpbmcgZm9yIGFuIGVudHJ5IHRvIHVzZSB3aGVuIHNvcnRpbmcgYWxwaGFiZXRpY2FsbHlcbiAgZGVzY3JpcHRpdmVFbnRyeShlbnRyeTogQ2xvdWREYXRhKTogc3RyaW5nIHtcbiAgICBsZXQgZGVzY3JpcHRpb24gPSBlbnRyeS50ZXh0O1xuICAgIGlmIChlbnRyeS5jb2xvcikge1xuICAgICAgZGVzY3JpcHRpb24gKz0gJy0nICsgZW50cnkuY29sb3I7XG4gICAgfVxuICAgIGlmIChlbnRyeS5leHRlcm5hbCkge1xuICAgICAgZGVzY3JpcHRpb24gKz0gJy0nICsgZW50cnkuZXh0ZXJuYWw7XG4gICAgfVxuICAgIGlmIChlbnRyeS5saW5rKSB7XG4gICAgICBkZXNjcmlwdGlvbiArPSAnLScgKyBlbnRyeS5saW5rO1xuICAgIH1cbiAgICBpZiAoZW50cnkucm90YXRlKSB7XG4gICAgICBkZXNjcmlwdGlvbiArPSAnLScgKyBlbnRyeS5yb3RhdGU7XG4gICAgfVxuICAgIHJldHVybiBkZXNjcmlwdGlvbjtcbiAgfVxuXG4gIGRyYXdXb3JkQ2xvdWQgKCkge1xuICAgIC8vIFNvcnQgYWxwaGFiZXRpY2FsbHkgdG8gZW5zdXJlIHRoYXQsIGFsbCB0aGluZ3MgYmVpbmcgZXF1YWwsIHdvcmRzIGFyZSBwbGFjZWQgdW5pZm9ybWx5XG4gICAgdGhpcy5fZGF0YUFyci5zb3J0KCAoYSwgYikgPT4gKHRoaXMuZGVzY3JpcHRpdmVFbnRyeShhKSkubG9jYWxlQ29tcGFyZSh0aGlzLmRlc2NyaXB0aXZlRW50cnkoYikpKTtcbiAgICAvLyBTb3J0IHRoaXMuX2RhdGFBcnIgZnJvbSB0aGUgd29yZCB3aXRoIHRoZSBoaWdoZXN0IHdlaWdodCB0byB0aGUgb25lIHdpdGggdGhlIGxvd2VzdFxuICAgIHRoaXMuX2RhdGFBcnIuc29ydCgoYSwgYikgPT4gYi53ZWlnaHQgLSBhLndlaWdodCk7XG4gICAgdGhpcy5fZGF0YUFyci5mb3JFYWNoKChlbGVtLCBpbmRleCkgPT4ge1xuICAgICAgdGhpcy5kcmF3V29yZChpbmRleCwgZWxlbSk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBIZWxwZXIgZnVuY3Rpb24gdG8gdGVzdCBpZiBhbiBlbGVtZW50IG92ZXJsYXBzIG90aGVyc1xuICBoaXRUZXN0KGN1cnJlbnRFbDogSFRNTEVsZW1lbnQsIG90aGVyRWw6IEhUTUxFbGVtZW50W10pOiBib29sZWFuIHtcbiAgICAvLyBDaGVjayBlbGVtZW50cyBmb3Igb3ZlcmxhcCBvbmUgYnkgb25lLCBzdG9wIGFuZCByZXR1cm4gZmFsc2UgYXMgc29vbiBhcyBhbiBvdmVybGFwIGlzIGZvdW5kXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvdGhlckVsLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5vdmVybGFwcGluZyhjdXJyZW50RWwsIG90aGVyRWxbaV0pKSB7IHJldHVybiB0cnVlOyB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIFBhaXJ3aXNlIG92ZXJsYXAgZGV0ZWN0aW9uXG4gIG92ZXJsYXBwaW5nKGE6IEhUTUxFbGVtZW50LCBiOiBIVE1MRWxlbWVudCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoTWF0aC5hYnMoMi4wICogYS5vZmZzZXRMZWZ0ICsgYS5vZmZzZXRXaWR0aCAgLSAyLjAgKiBiLm9mZnNldExlZnQgLSBiLm9mZnNldFdpZHRoKSAgPCBhLm9mZnNldFdpZHRoICArIGIub2Zmc2V0V2lkdGggJiZcbiAgICAgICAgICAgIE1hdGguYWJzKDIuMCAqIGEub2Zmc2V0VG9wICArIGEub2Zmc2V0SGVpZ2h0IC0gMi4wICogYi5vZmZzZXRUb3AgIC0gYi5vZmZzZXRIZWlnaHQpIDwgYS5vZmZzZXRIZWlnaHQgKyBiLm9mZnNldEhlaWdodClcbiAgICA/IHRydWUgOiBmYWxzZTtcbiAgfVxuXG4gIC8vIEZ1bmN0aW9uIHRvIGRyYXcgYSB3b3JkLCBieSBtb3ZpbmcgaXQgaW4gc3BpcmFsIHVudGlsIGl0IGZpbmRzIGEgc3VpdGFibGUgZW1wdHkgcGxhY2UuIFRoaXMgd2lsbCBiZSBpdGVyYXRlZCBvbiBlYWNoIHdvcmQuXG4gIGRyYXdXb3JkKGluZGV4OiBudW1iZXIsIHdvcmQ6IENsb3VkRGF0YSkge1xuICAgIC8vIERlZmluZSB0aGUgSUQgYXR0cmlidXRlIG9mIHRoZSBzcGFuIHRoYXQgd2lsbCB3cmFwIHRoZSB3b3JkXG4gICAgbGV0IGFuZ2xlID0gdGhpcy5yYW5kb21pemVBbmdsZSA/IDYuMjggKiBNYXRoLnJhbmRvbSgpIDogMCxcbiAgICAgICAgcmFkaXVzID0gMC4wLFxuICAgICAgICB3ZWlnaHQgPSA1LFxuICAgICAgICB3b3JkU3BhbjogSFRNTEVsZW1lbnQ7XG5cbiAgICAvLyBDaGVjayBpZiBtaW4od2VpZ2h0KSA+IG1heCh3ZWlnaHQpIG90aGVyd2lzZSB1c2UgZGVmYXVsdFxuICAgIGlmICh0aGlzLl9kYXRhQXJyWzBdLndlaWdodCA+IHRoaXMuX2RhdGFBcnJbdGhpcy5fZGF0YUFyci5sZW5ndGggLSAxXS53ZWlnaHQpIHtcbiAgICAgIC8vIGNoZWNrIGlmIHN0cmljdCBtb2RlIGlzIGFjdGl2ZVxuICAgICAgaWYgKCF0aGlzLnN0cmljdCkgeyAvLyBMaW5lYXJseSBtYXAgdGhlIG9yaWdpbmFsIHdlaWdodCB0byBhIGRpc2NyZXRlIHNjYWxlIGZyb20gMSB0byAxMFxuICAgICAgICB3ZWlnaHQgPSBNYXRoLnJvdW5kKCh3b3JkLndlaWdodCAtIHRoaXMuX2RhdGFBcnJbdGhpcy5fZGF0YUFyci5sZW5ndGggLSAxXS53ZWlnaHQpIC9cbiAgICAgICAgICAgICAgICAgICh0aGlzLl9kYXRhQXJyWzBdLndlaWdodCAtIHRoaXMuX2RhdGFBcnJbdGhpcy5fZGF0YUFyci5sZW5ndGggLSAxXS53ZWlnaHQpICogOS4wKSArIDE7XG4gICAgICB9IGVsc2UgeyAvLyB1c2UgZ2l2ZW4gdmFsdWUgZm9yIHdlaWd0aCBkaXJlY3RseVxuICAgICAgICAvLyBmYWxsYmFjayB0byAxMFxuICAgICAgICBpZiAod29yZC53ZWlnaHQgPiAxMCkge1xuICAgICAgICAgIHdlaWdodCA9IDEwO1xuICAgICAgICAgIGNvbnNvbGUubG9nKGBbVGFnQ2xvdWQgc3RyaWN0XSBXZWlnaHQgcHJvcGVydHkgJHt3b3JkLndlaWdodH0gPiAxMC4gRmFsbGJhY2sgdG8gMTAgYXMgeW91IGFyZSB1c2luZyBzdHJpY3QgbW9kZWAsIHdvcmQpO1xuICAgICAgICB9IGVsc2UgaWYgKHdvcmQud2VpZ2h0IDwgMSkgeyAvLyBmYWxsYmFjayB0byAxXG4gICAgICAgICAgd2VpZ2h0ID0gMTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhgW1RhZ0Nsb3VkIHN0cmljdF0gR2l2ZW4gd2VpZ2h0IHByb3BlcnR5ICR7d29yZC53ZWlnaHR9IDwgMS4gRmFsbGJhY2sgdG8gMSBhcyB5b3UgYXJlIHVzaW5nIHN0cmljdCBtb2RlYCwgd29yZCk7XG4gICAgICAgIH0gZWxzZSBpZiAod29yZC53ZWlnaHQgJSAxICE9PSAwKSB7IC8vIHJvdW5kIGlmIGdpdmVuIHZhbHVlIGlzIG5vdCBhbiBpbnRlZ2VyXG4gICAgICAgICAgd2VpZ2h0ID0gTWF0aC5yb3VuZCh3b3JkLndlaWdodCk7XG4gICAgICAgICAgY29uc29sZS5sb2coYFtUYWdDbG91ZCBzdHJpY3RdIEdpdmVuIHdlaWdodCBwcm9wZXJ0eSAke3dvcmQud2VpZ2h0fSBpcyBub3QgYW4gaW50ZWdlci4gUm91bmRlZCB2YWx1ZSB0byAke3dlaWdodH1gLCB3b3JkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3ZWlnaHQgPSB3b3JkLndlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ3JlYXRlIGEgbmV3IHNwYW4gYW5kIGluc2VydCBub2RlLlxuICAgIHdvcmRTcGFuID0gdGhpcy5yMi5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgd29yZFNwYW4uY2xhc3NOYW1lID0gJ3cnICsgd2VpZ2h0O1xuXG4gICAgY29uc3QgdGhhdENsaWNrZWQgPSB0aGlzLmNsaWNrZWQ7XG4gICAgd29yZFNwYW4ub25jbGljayA9ICgpID0+IHtcbiAgICAgIHRoYXRDbGlja2VkLmVtaXQod29yZCk7XG4gICAgfTtcblxuICAgIGxldCBub2RlID0gdGhpcy5yMi5jcmVhdGVUZXh0KHdvcmQudGV4dCk7XG5cbiAgICAvLyBzZXQgY29sb3JcbiAgICBpZiAod29yZC5jb2xvcikge1xuICAgICAgdGhpcy5yMi5zZXRTdHlsZSh3b3JkU3BhbiwgJ2NvbG9yJywgd29yZC5jb2xvcik7XG4gICAgfVxuXG4gICAgbGV0IHRyYW5zZm9ybVN0cmluZyA9ICcnO1xuXG4gICAgLy8gc2V0IGNvbG9yXG4gICAgaWYgKHdvcmQucm90YXRlKSB7XG4gICAgICB0cmFuc2Zvcm1TdHJpbmcgPSBgcm90YXRlKCR7d29yZC5yb3RhdGV9ZGVnKWA7XG4gICAgICB0aGlzLnIyLnNldFN0eWxlKHdvcmRTcGFuLCAndHJhbnNmb3JtJywgdHJhbnNmb3JtU3RyaW5nKTtcbiAgICB9XG5cbiAgICAvLyBBcHBlbmQgaHJlZiBpZiB0aGVyZSdzIGEgbGluayBhbG9uZ3dpdGggdGhlIHRhZ1xuICAgIGlmICh3b3JkLmxpbmspIHtcbiAgICAgIGNvbnN0IHdvcmRMaW5rID0gdGhpcy5yMi5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICB3b3JkTGluay5ocmVmID0gd29yZC5saW5rO1xuXG4gICAgICBpZiAod29yZC5leHRlcm5hbCAhPT0gdW5kZWZpbmVkICYmIHdvcmQuZXh0ZXJuYWwpIHtcbiAgICAgICAgd29yZExpbmsudGFyZ2V0ID0gJ19ibGFuayc7XG4gICAgICB9XG5cbiAgICAgIHdvcmRMaW5rLmFwcGVuZENoaWxkKG5vZGUpO1xuICAgICAgbm9kZSA9IHdvcmRMaW5rO1xuICAgIH1cblxuICAgIC8vIHNldCB6b29tT3B0aW9uXG4gICAgaWYgKHRoaXMuem9vbU9uSG92ZXIgJiYgdGhpcy56b29tT25Ib3Zlci5zY2FsZSAhPT0gMSkge1xuICAgICAgaWYgKCF0aGlzLnpvb21PbkhvdmVyLnRyYW5zaXRpb25UaW1lKSB7IHRoaXMuem9vbU9uSG92ZXIudHJhbnNpdGlvblRpbWUgPSAwOyB9XG4gICAgICBpZiAoIXRoaXMuem9vbU9uSG92ZXIuc2NhbGUpIHsgdGhpcy56b29tT25Ib3Zlci5zY2FsZSA9IDE7IH1cblxuICAgICAgd29yZFNwYW4ub25tb3VzZW92ZXIgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMucjIuc2V0U3R5bGUod29yZFNwYW4sICd0cmFuc2l0aW9uJywgYHRyYW5zZm9ybSAke3RoaXMuem9vbU9uSG92ZXIudHJhbnNpdGlvblRpbWV9c2ApO1xuICAgICAgICB0aGlzLnIyLnNldFN0eWxlKHdvcmRTcGFuLCAndHJhbnNmb3JtJywgYHNjYWxlKCR7dGhpcy56b29tT25Ib3Zlci5zY2FsZX0pICR7dHJhbnNmb3JtU3RyaW5nfWApO1xuICAgICAgICB0aGlzLnIyLnNldFN0eWxlKHdvcmRTcGFuLCAndHJhbnNpdGlvbi1kZWxheScsIGAke3RoaXMuem9vbU9uSG92ZXIuZGVsYXl9c2ApO1xuICAgICAgICBpZiAodGhpcy56b29tT25Ib3Zlci5jb2xvcikge1xuICAgICAgICAgIHdvcmQubGlua1xuICAgICAgICAgICAgPyB0aGlzLnIyLnNldFN0eWxlKG5vZGUsICdjb2xvcicsIHRoaXMuem9vbU9uSG92ZXIuY29sb3IpXG4gICAgICAgICAgICA6IHRoaXMucjIuc2V0U3R5bGUod29yZFNwYW4sICdjb2xvcicsIHRoaXMuem9vbU9uSG92ZXIuY29sb3IpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICB3b3JkU3Bhbi5vbm1vdXNlb3V0ID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnIyLnNldFN0eWxlKHdvcmRTcGFuLCAndHJhbnNmb3JtJywgYG5vbmUgJHt0cmFuc2Zvcm1TdHJpbmd9YCk7XG4gICAgICAgIHdvcmQubGlua1xuICAgICAgICAgID8gdGhpcy5yMi5yZW1vdmVTdHlsZShub2RlLCAnY29sb3InKVxuICAgICAgICAgIDogdGhpcy5yMi5yZW1vdmVTdHlsZSh3b3JkU3BhbiwgJ2NvbG9yJyk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIHdvcmRTcGFuLmFwcGVuZENoaWxkKG5vZGUpO1xuICAgIHRoaXMucjIuYXBwZW5kQ2hpbGQodGhpcy5lbC5uYXRpdmVFbGVtZW50LCB3b3JkU3Bhbik7XG5cbiAgICBjb25zdCB3aWR0aCA9IHdvcmRTcGFuLm9mZnNldFdpZHRoO1xuICAgIGNvbnN0IGhlaWdodCA9IHdvcmRTcGFuLm9mZnNldEhlaWdodDtcbiAgICBsZXQgbGVmdCA9IHRoaXMuX29wdGlvbnMuY2VudGVyLng7XG4gICAgbGV0IHRvcCA9IHRoaXMuX29wdGlvbnMuY2VudGVyLnk7XG5cbiAgICAvLyBTYXZlIGEgcmVmZXJlbmNlIHRvIHRoZSBzdHlsZSBwcm9wZXJ0eSwgZm9yIGJldHRlciBwZXJmb3JtYW5jZVxuICAgIGNvbnN0IHdvcmRTdHlsZSA9IHdvcmRTcGFuLnN0eWxlO1xuICAgIHdvcmRTdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG5cbiAgICAvLyBwbGFjZSB0aGUgZmlyc3Qgd29yZFxuICAgIHdvcmRTdHlsZS5sZWZ0ID0gbGVmdCArICdweCc7XG4gICAgd29yZFN0eWxlLnRvcCA9IHRvcCArICdweCc7XG5cbiAgICAvLyBhZGQgdG9vbHRpcCBpZiBwcm92aWRlZFxuICAgIGlmICh3b3JkLnRvb2x0aXApIHtcbiAgICAgIHRoaXMucjIuYWRkQ2xhc3Mod29yZFNwYW4sICd0b29sdGlwJyk7XG4gICAgICBjb25zdCB0b29sdGlwU3BhbiA9IHRoaXMucjIuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgdG9vbHRpcFNwYW4uY2xhc3NOYW1lID0gJ3Rvb2x0aXB0ZXh0JztcbiAgICAgIGNvbnN0IHRleHQgPSB0aGlzLnIyLmNyZWF0ZVRleHQod29yZC50b29sdGlwKTtcbiAgICAgIHRvb2x0aXBTcGFuLmFwcGVuZENoaWxkKHRleHQpO1xuICAgICAgd29yZFNwYW4uYXBwZW5kQ2hpbGQodG9vbHRpcFNwYW4pO1xuICAgIH1cblxuICAgIHdoaWxlICh0aGlzLmhpdFRlc3Qod29yZFNwYW4sIHRoaXMuX2FscmVhZHlQbGFjZWRXb3JkcykpIHtcbiAgICAgIHJhZGl1cyArPSB0aGlzLl9vcHRpb25zLnN0ZXA7XG4gICAgICBhbmdsZSArPSAoaW5kZXggJSAyID09PSAwID8gMSA6IC0xKSAqIHRoaXMuX29wdGlvbnMuc3RlcDtcblxuICAgICAgbGVmdCA9IHRoaXMuX29wdGlvbnMuY2VudGVyLnggLSAod2lkdGggLyAyLjApICsgKHJhZGl1cyAqIE1hdGguY29zKGFuZ2xlKSkgKiB0aGlzLl9vcHRpb25zLmFzcGVjdFJhdGlvO1xuICAgICAgdG9wID0gdGhpcy5fb3B0aW9ucy5jZW50ZXIueSArIHJhZGl1cyAqIE1hdGguc2luKGFuZ2xlKSAtIChoZWlnaHQgLyAyLjApO1xuXG4gICAgICB3b3JkU3R5bGUubGVmdCA9IGxlZnQgKyAncHgnO1xuICAgICAgd29yZFN0eWxlLnRvcCA9IHRvcCArICdweCc7XG4gICAgfVxuXG4gICAgLy8gRG9uJ3QgcmVuZGVyIHdvcmQgaWYgcGFydCBvZiBpdCB3b3VsZCBiZSBvdXRzaWRlIHRoZSBjb250YWluZXJcbiAgICBpZiAoXG4gICAgICAhdGhpcy5fb3B0aW9ucy5vdmVyZmxvdyAmJlxuICAgICAgKGxlZnQgPCAwIHx8IHRvcCA8IDAgfHwgKGxlZnQgKyB3aWR0aCkgPiB0aGlzLl9vcHRpb25zLndpZHRoIHx8XG4gICAgICAodG9wICsgaGVpZ2h0KSA+IHRoaXMuX29wdGlvbnMuaGVpZ2h0KVxuICAgICkge1xuICAgICAgd29yZFNwYW4ucmVtb3ZlKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fYWxyZWFkeVBsYWNlZFdvcmRzLnB1c2god29yZFNwYW4pO1xuICB9XG5cbn1cbiJdfQ==