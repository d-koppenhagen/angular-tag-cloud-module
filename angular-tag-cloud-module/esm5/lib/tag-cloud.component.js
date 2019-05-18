/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
        this.alreadyPlacedWords = [];
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
        window.clearTimeout(this.timeoutId);
        this.timeoutId = window.setTimeout((/**
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
        /** @type {?} */
        var width = this.width;
        if (this.el.nativeElement.parentNode.offsetWidth > 0
            && width <= 1
            && width > 0) {
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
        this.dataArr.sort((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        function (a, b) { return (_this.descriptiveEntry(a)).localeCompare(_this.descriptiveEntry(b)); }));
        // Sort this._dataArr from the word with the highest weight to the one with the lowest
        this.dataArr.sort((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        function (a, b) { return b.weight - a.weight; }));
        this.dataArr.forEach((/**
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
        var e_1, _a;
        try {
            // Check elements for overlap one by one, stop and return false as soon as an overlap is found
            for (var otherEl_1 = tslib_1.__values(otherEl), otherEl_1_1 = otherEl_1.next(); !otherEl_1_1.done; otherEl_1_1 = otherEl_1.next()) {
                var item = otherEl_1_1.value;
                if (this.overlapping(currentEl, item)) {
                    return true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (otherEl_1_1 && !otherEl_1_1.done && (_a = otherEl_1.return)) _a.call(otherEl_1);
            }
            finally { if (e_1) throw e_1.error; }
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
        if (this.dataArr[0].weight > this.dataArr[this.dataArr.length - 1].weight) {
            // check if strict mode is active
            if (!this.strict) { // Linearly map the original weight to a discrete scale from 1 to 10
                weight = Math.round((word.weight - this.dataArr[this.dataArr.length - 1].weight) /
                    (this.dataArr[0].weight - this.dataArr[this.dataArr.length - 1].weight) * 9.0) + 1;
            }
            else { // use given value for weigth directly
                // fallback to 10
                if (word.weight > 10) {
                    weight = 10;
                    console.warn("[TagCloud strict] Weight property " + word.weight + " > 10. Fallback to 10 as you are using strict mode", word);
                }
                else if (word.weight < 1) { // fallback to 1
                    weight = 1;
                    console.warn("[TagCloud strict] Given weight property " + word.weight + " < 1. Fallback to 1 as you are using strict mode", word);
                }
                else if (word.weight % 1 !== 0) { // round if given value is not an integer
                    weight = Math.round(word.weight);
                    console.warn("[TagCloud strict] Given weight property " + word.weight + " is not an integer. Rounded value to " + weight, word);
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
        var left = this.options.center.x;
        /** @type {?} */
        var top = this.options.center.y;
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
        while (this.hitTest(wordSpan, this.alreadyPlacedWords)) {
            radius += this.options.step;
            angle += (index % 2 === 0 ? 1 : -1) * this.options.step;
            left = this.options.center.x - (width / 2.0) + (radius * Math.cos(angle)) * this.options.aspectRatio;
            top = this.options.center.y + radius * Math.sin(angle) - (height / 2.0);
            wordStyle.left = left + 'px';
            wordStyle.top = top + 'px';
        }
        // Don't render word if part of it would be outside the container
        if (!this.options.overflow &&
            (left < 0 || top < 0 || (left + width) > this.options.width ||
                (top + height) > this.options.height)) {
            wordSpan.remove();
            return;
        }
        this.alreadyPlacedWords.push(wordSpan);
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
    TagCloudComponent.prototype.dataArr;
    /**
     * @type {?}
     * @private
     */
    TagCloudComponent.prototype.alreadyPlacedWords;
    /**
     * @type {?}
     * @private
     */
    TagCloudComponent.prototype.options;
    /**
     * @type {?}
     * @private
     */
    TagCloudComponent.prototype.timeoutId;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLWNsb3VkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItdGFnLWNsb3VkLW1vZHVsZS8iLCJzb3VyY2VzIjpbImxpYi90YWctY2xvdWQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFJVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixVQUFVLEVBQ1YsU0FBUyxFQUVULFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OztBQUc3QyxtQ0FXQzs7O0lBVkMsb0NBQWE7Ozs7O0lBS2IsMkNBQW9COztJQUNwQixzQ0FHRTs7QUFHSjtJQTBCRSwyQkFDVSxFQUFjLEVBQ2QsRUFBYTtRQURiLE9BQUUsR0FBRixFQUFFLENBQVk7UUFDZCxPQUFFLEdBQUYsRUFBRSxDQUFXO1FBckJkLFVBQUssR0FBRyxHQUFHLENBQUM7UUFDWixXQUFNLEdBQUcsR0FBRyxDQUFDO1FBQ2IsYUFBUSxHQUFHLElBQUksQ0FBQztRQUNoQixXQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2YsZ0JBQVcsR0FBdUIsRUFBRSxjQUFjLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFDekYsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFDeEIsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFFdEIsWUFBTyxHQUE2QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3ZELGdCQUFXLEdBQWlDLElBQUksWUFBWSxFQUFFLENBQUM7UUFDL0QsY0FBUyxHQUF3QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3BELGlCQUFZLEdBQXdCLElBQUksWUFBWSxFQUFFLENBQUM7UUFHekQsdUJBQWtCLEdBQWtCLEVBQUUsQ0FBQztJQVEzQyxDQUFDOzs7OztJQUVzQyxvQ0FBUTs7OztJQUFuRCxVQUFvRCxLQUFVO1FBQTlELGlCQU9D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QThSQztTQXpSWSxpQkFBaUI7OztJQUM1QixpQ0FBMkI7O0lBQzNCLGtDQUFxQjs7SUFDckIsbUNBQXNCOztJQUN0QixxQ0FBeUI7O0lBQ3pCLG1DQUF3Qjs7SUFDeEIsd0NBQWtHOztJQUNsRyw0Q0FBaUM7O0lBQ2pDLDJDQUFnQzs7SUFFaEMsb0NBQWlFOztJQUNqRSx3Q0FBeUU7O0lBQ3pFLHNDQUE4RDs7SUFDOUQseUNBQWlFOzs7OztJQUVqRSxvQ0FBNkI7Ozs7O0lBQzdCLCtDQUErQzs7Ozs7SUFFL0Msb0NBQXNDOzs7OztJQUN0QyxzQ0FBa0I7Ozs7O0lBR2hCLCtCQUFzQjs7Ozs7SUFDdEIsK0JBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LFxuICAgICAgICAgT25DaGFuZ2VzLFxuICAgICAgICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICAgICAgIEFmdGVyQ29udGVudENoZWNrZWQsXG4gICAgICAgICBJbnB1dCxcbiAgICAgICAgIE91dHB1dCxcbiAgICAgICAgIEV2ZW50RW1pdHRlcixcbiAgICAgICAgIEVsZW1lbnRSZWYsXG4gICAgICAgICBSZW5kZXJlcjIsXG4gICAgICAgICBTaW1wbGVDaGFuZ2VzLFxuICAgICAgICAgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDbG91ZERhdGEsIENsb3VkT3B0aW9ucywgWm9vbU9uSG92ZXJPcHRpb25zIH0gZnJvbSAnLi90YWctY2xvdWQuaW50ZXJmYWNlcyc7XG5cbmludGVyZmFjZSBDbG91ZE9wdGlvbnNJbnRlcm5hbCBleHRlbmRzIENsb3VkT3B0aW9ucyB7XG4gIHN0ZXA6IG51bWJlcjtcblxuICAvKipcbiAgICogc2V0dGluZyB0aGUgYXNwZWN0IHJhdGlvLiBUaGlzIHZhbHVlIGlzIGNhbGN1bGF0ZWQgYnkgdGhlIGdpdmVuIHdpZHRoIGFuZCBoZWlnaHRcbiAgICovXG4gIGFzcGVjdFJhdGlvOiBudW1iZXI7XG4gIGNlbnRlcjoge1xuICAgIHg6IG51bWJlcjtcbiAgICB5OiBudW1iZXI7XG4gIH07XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FuZ3VsYXItdGFnLWNsb3VkLCBuZy10YWctY2xvdWQsIG5ndGMnLFxuICB0ZW1wbGF0ZTogJycsXG4gIHN0eWxlVXJsczogWycuL3RhZy1jbG91ZC5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgVGFnQ2xvdWRDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIEFmdGVyQ29udGVudEluaXQsIEFmdGVyQ29udGVudENoZWNrZWQge1xuICBASW5wdXQoKSBkYXRhOiBDbG91ZERhdGFbXTtcbiAgQElucHV0KCkgd2lkdGggPSA1MDA7XG4gIEBJbnB1dCgpIGhlaWdodCA9IDMwMDtcbiAgQElucHV0KCkgb3ZlcmZsb3cgPSB0cnVlO1xuICBASW5wdXQoKSBzdHJpY3QgPSBmYWxzZTtcbiAgQElucHV0KCkgem9vbU9uSG92ZXI6IFpvb21PbkhvdmVyT3B0aW9ucyA9IHsgdHJhbnNpdGlvblRpbWU6IDAsIHNjYWxlOiAxLCBkZWxheTogMCwgY29sb3I6IG51bGwgfTtcbiAgQElucHV0KCkgcmVhbGlnbk9uUmVzaXplID0gZmFsc2U7XG4gIEBJbnB1dCgpIHJhbmRvbWl6ZUFuZ2xlID0gZmFsc2U7XG5cbiAgQE91dHB1dCgpIGNsaWNrZWQ/OiBFdmVudEVtaXR0ZXI8Q2xvdWREYXRhPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGRhdGFDaGFuZ2VzPzogRXZlbnRFbWl0dGVyPFNpbXBsZUNoYW5nZXM+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgYWZ0ZXJJbml0PzogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgYWZ0ZXJDaGVja2VkPzogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHByaXZhdGUgZGF0YUFycjogQ2xvdWREYXRhW107XG4gIHByaXZhdGUgYWxyZWFkeVBsYWNlZFdvcmRzOiBIVE1MRWxlbWVudFtdID0gW107XG5cbiAgcHJpdmF0ZSBvcHRpb25zOiBDbG91ZE9wdGlvbnNJbnRlcm5hbDtcbiAgcHJpdmF0ZSB0aW1lb3V0SWQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHIyOiBSZW5kZXJlcjJcbiAgKSB7IH1cblxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJywgWyckZXZlbnQnXSkgb25SZXNpemUoZXZlbnQ6IGFueSkge1xuICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy50aW1lb3V0SWQpO1xuICAgIHRoaXMudGltZW91dElkID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMucmVhbGlnbk9uUmVzaXplKSB7XG4gICAgICAgIHRoaXMucmVEcmF3KCk7XG4gICAgICB9XG4gICAgfSwgMjAwKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICB0aGlzLnJlRHJhdyhjaGFuZ2VzKTtcbiAgfVxuXG4gIHJlRHJhdyhjaGFuZ2VzPzogU2ltcGxlQ2hhbmdlcykge1xuICAgIHRoaXMuZGF0YUNoYW5nZXMuZW1pdChjaGFuZ2VzKTtcbiAgICB0aGlzLmFscmVhZHlQbGFjZWRXb3JkcyA9IFtdO1xuXG4gICAgLy8gY2hlY2sgaWYgZGF0YSBpcyBub3QgbnVsbCBvciBlbXB0eVxuICAgIGlmICghdGhpcy5kYXRhKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdhbmd1bGFyLXRhZy1jbG91ZDogTm8gZGF0YSBwYXNzZWQuIFBsZWFzZSBwYXNzIGFuIEFycmF5IG9mIENsb3VkRGF0YScpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIHZhbHVlcyBjaGFuZ2VkLCByZXNldCBjbG91ZFxuICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5pbm5lckhUTUwgPSAnJztcblxuICAgIC8vIHNldCB2YWx1ZSBjaGFuZ2VzXG4gICAgaWYgKGNoYW5nZXMgJiYgY2hhbmdlcy5kYXRhKSB7XG4gICAgICB0aGlzLmRhdGFBcnIgPSBjaGFuZ2VzLmRhdGEuY3VycmVudFZhbHVlO1xuICAgIH1cblxuICAgIGxldCB3aWR0aCA9IHRoaXMud2lkdGg7XG4gICAgaWYgKHRoaXMuZWwubmF0aXZlRWxlbWVudC5wYXJlbnROb2RlLm9mZnNldFdpZHRoID4gMFxuICAgICAgJiYgd2lkdGggPD0gMVxuICAgICAgJiYgd2lkdGggPiAwXG4gICAgKSB7XG4gICAgICB3aWR0aCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5wYXJlbnROb2RlLm9mZnNldFdpZHRoICogd2lkdGg7XG4gICAgfVxuXG4gICAgLy8gc2V0IG9wdGlvbnNcbiAgICB0aGlzLm9wdGlvbnMgPSB7XG4gICAgICBzdGVwOiAyLjAsXG4gICAgICBhc3BlY3RSYXRpbzogKHdpZHRoIC8gdGhpcy5oZWlnaHQpLFxuICAgICAgd2lkdGgsXG4gICAgICBoZWlnaHQ6IHRoaXMuaGVpZ2h0LFxuICAgICAgY2VudGVyOiB7XG4gICAgICAgIHg6ICh3aWR0aCAvIDIuMCksXG4gICAgICAgIHk6ICh0aGlzLmhlaWdodCAvIDIuMClcbiAgICAgIH0sXG4gICAgICBvdmVyZmxvdzogdGhpcy5vdmVyZmxvdyxcbiAgICAgIHpvb21PbkhvdmVyOiB0aGlzLnpvb21PbkhvdmVyXG4gICAgfTtcblxuICAgIHRoaXMucjIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnd2lkdGgnLCB0aGlzLm9wdGlvbnMud2lkdGggKyAncHgnKTtcbiAgICB0aGlzLnIyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2hlaWdodCcsIHRoaXMub3B0aW9ucy5oZWlnaHQgKyAncHgnKTtcbiAgICAvLyBkcmF3IHRoZSBjbG91ZFxuICAgIHRoaXMuZHJhd1dvcmRDbG91ZCgpO1xuICB9XG5cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgdGhpcy5hZnRlckluaXQuZW1pdCgpO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCkge1xuICAgIHRoaXMuYWZ0ZXJDaGVja2VkLmVtaXQoKTtcbiAgfVxuXG4gIC8vIGhlbHBlciB0byBnZW5lcmF0ZSBhIGRlc2NyaXB0aXZlIHN0cmluZyBmb3IgYW4gZW50cnkgdG8gdXNlIHdoZW4gc29ydGluZyBhbHBoYWJldGljYWxseVxuICBkZXNjcmlwdGl2ZUVudHJ5KGVudHJ5OiBDbG91ZERhdGEpOiBzdHJpbmcge1xuICAgIGxldCBkZXNjcmlwdGlvbiA9IGVudHJ5LnRleHQ7XG4gICAgaWYgKGVudHJ5LmNvbG9yKSB7XG4gICAgICBkZXNjcmlwdGlvbiArPSAnLScgKyBlbnRyeS5jb2xvcjtcbiAgICB9XG4gICAgaWYgKGVudHJ5LmV4dGVybmFsKSB7XG4gICAgICBkZXNjcmlwdGlvbiArPSAnLScgKyBlbnRyeS5leHRlcm5hbDtcbiAgICB9XG4gICAgaWYgKGVudHJ5LmxpbmspIHtcbiAgICAgIGRlc2NyaXB0aW9uICs9ICctJyArIGVudHJ5Lmxpbms7XG4gICAgfVxuICAgIGlmIChlbnRyeS5yb3RhdGUpIHtcbiAgICAgIGRlc2NyaXB0aW9uICs9ICctJyArIGVudHJ5LnJvdGF0ZTtcbiAgICB9XG4gICAgcmV0dXJuIGRlc2NyaXB0aW9uO1xuICB9XG5cbiAgZHJhd1dvcmRDbG91ZCgpIHtcbiAgICAvLyBTb3J0IGFscGhhYmV0aWNhbGx5IHRvIGVuc3VyZSB0aGF0LCBhbGwgdGhpbmdzIGJlaW5nIGVxdWFsLCB3b3JkcyBhcmUgcGxhY2VkIHVuaWZvcm1seVxuICAgIHRoaXMuZGF0YUFyci5zb3J0KChhLCBiKSA9PiAodGhpcy5kZXNjcmlwdGl2ZUVudHJ5KGEpKS5sb2NhbGVDb21wYXJlKHRoaXMuZGVzY3JpcHRpdmVFbnRyeShiKSkpO1xuICAgIC8vIFNvcnQgdGhpcy5fZGF0YUFyciBmcm9tIHRoZSB3b3JkIHdpdGggdGhlIGhpZ2hlc3Qgd2VpZ2h0IHRvIHRoZSBvbmUgd2l0aCB0aGUgbG93ZXN0XG4gICAgdGhpcy5kYXRhQXJyLnNvcnQoKGEsIGIpID0+IGIud2VpZ2h0IC0gYS53ZWlnaHQpO1xuICAgIHRoaXMuZGF0YUFyci5mb3JFYWNoKChlbGVtLCBpbmRleCkgPT4ge1xuICAgICAgdGhpcy5kcmF3V29yZChpbmRleCwgZWxlbSk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBIZWxwZXIgZnVuY3Rpb24gdG8gdGVzdCBpZiBhbiBlbGVtZW50IG92ZXJsYXBzIG90aGVyc1xuICBoaXRUZXN0KGN1cnJlbnRFbDogSFRNTEVsZW1lbnQsIG90aGVyRWw6IEhUTUxFbGVtZW50W10pOiBib29sZWFuIHtcbiAgICAvLyBDaGVjayBlbGVtZW50cyBmb3Igb3ZlcmxhcCBvbmUgYnkgb25lLCBzdG9wIGFuZCByZXR1cm4gZmFsc2UgYXMgc29vbiBhcyBhbiBvdmVybGFwIGlzIGZvdW5kXG4gICAgZm9yIChjb25zdCBpdGVtIG9mIG90aGVyRWwpIHtcbiAgICAgIGlmICh0aGlzLm92ZXJsYXBwaW5nKGN1cnJlbnRFbCwgaXRlbSkpIHsgcmV0dXJuIHRydWU7IH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gUGFpcndpc2Ugb3ZlcmxhcCBkZXRlY3Rpb25cbiAgb3ZlcmxhcHBpbmcoYTogSFRNTEVsZW1lbnQsIGI6IEhUTUxFbGVtZW50KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChNYXRoLmFicygyLjAgKiBhLm9mZnNldExlZnQgKyBhLm9mZnNldFdpZHRoICAtIDIuMCAqIGIub2Zmc2V0TGVmdCAtIGIub2Zmc2V0V2lkdGgpICA8IGEub2Zmc2V0V2lkdGggICsgYi5vZmZzZXRXaWR0aCAmJlxuICAgICAgICAgICAgTWF0aC5hYnMoMi4wICogYS5vZmZzZXRUb3AgICsgYS5vZmZzZXRIZWlnaHQgLSAyLjAgKiBiLm9mZnNldFRvcCAgLSBiLm9mZnNldEhlaWdodCkgPCBhLm9mZnNldEhlaWdodCArIGIub2Zmc2V0SGVpZ2h0KVxuICAgID8gdHJ1ZSA6IGZhbHNlO1xuICB9XG5cbiAgLy8gRnVuY3Rpb24gdG8gZHJhdyBhIHdvcmQsIGJ5IG1vdmluZyBpdCBpbiBzcGlyYWwgdW50aWwgaXQgZmluZHMgYSBzdWl0YWJsZSBlbXB0eSBwbGFjZS4gVGhpcyB3aWxsIGJlIGl0ZXJhdGVkIG9uIGVhY2ggd29yZC5cbiAgZHJhd1dvcmQoaW5kZXg6IG51bWJlciwgd29yZDogQ2xvdWREYXRhKSB7XG4gICAgLy8gRGVmaW5lIHRoZSBJRCBhdHRyaWJ1dGUgb2YgdGhlIHNwYW4gdGhhdCB3aWxsIHdyYXAgdGhlIHdvcmRcbiAgICBsZXQgYW5nbGUgPSB0aGlzLnJhbmRvbWl6ZUFuZ2xlID8gNi4yOCAqIE1hdGgucmFuZG9tKCkgOiAwO1xuICAgIGxldCByYWRpdXMgPSAwLjA7XG4gICAgbGV0IHdlaWdodCA9IDU7XG4gICAgbGV0IHdvcmRTcGFuOiBIVE1MRWxlbWVudDtcblxuICAgIC8vIENoZWNrIGlmIG1pbih3ZWlnaHQpID4gbWF4KHdlaWdodCkgb3RoZXJ3aXNlIHVzZSBkZWZhdWx0XG4gICAgaWYgKHRoaXMuZGF0YUFyclswXS53ZWlnaHQgPiB0aGlzLmRhdGFBcnJbdGhpcy5kYXRhQXJyLmxlbmd0aCAtIDFdLndlaWdodCkge1xuICAgICAgLy8gY2hlY2sgaWYgc3RyaWN0IG1vZGUgaXMgYWN0aXZlXG4gICAgICBpZiAoIXRoaXMuc3RyaWN0KSB7IC8vIExpbmVhcmx5IG1hcCB0aGUgb3JpZ2luYWwgd2VpZ2h0IHRvIGEgZGlzY3JldGUgc2NhbGUgZnJvbSAxIHRvIDEwXG4gICAgICAgIHdlaWdodCA9IE1hdGgucm91bmQoKHdvcmQud2VpZ2h0IC0gdGhpcy5kYXRhQXJyW3RoaXMuZGF0YUFyci5sZW5ndGggLSAxXS53ZWlnaHQpIC9cbiAgICAgICAgICAgICAgICAgICh0aGlzLmRhdGFBcnJbMF0ud2VpZ2h0IC0gdGhpcy5kYXRhQXJyW3RoaXMuZGF0YUFyci5sZW5ndGggLSAxXS53ZWlnaHQpICogOS4wKSArIDE7XG4gICAgICB9IGVsc2UgeyAvLyB1c2UgZ2l2ZW4gdmFsdWUgZm9yIHdlaWd0aCBkaXJlY3RseVxuICAgICAgICAvLyBmYWxsYmFjayB0byAxMFxuICAgICAgICBpZiAod29yZC53ZWlnaHQgPiAxMCkge1xuICAgICAgICAgIHdlaWdodCA9IDEwO1xuICAgICAgICAgIGNvbnNvbGUud2FybihgW1RhZ0Nsb3VkIHN0cmljdF0gV2VpZ2h0IHByb3BlcnR5ICR7d29yZC53ZWlnaHR9ID4gMTAuIEZhbGxiYWNrIHRvIDEwIGFzIHlvdSBhcmUgdXNpbmcgc3RyaWN0IG1vZGVgLCB3b3JkKTtcbiAgICAgICAgfSBlbHNlIGlmICh3b3JkLndlaWdodCA8IDEpIHsgLy8gZmFsbGJhY2sgdG8gMVxuICAgICAgICAgIHdlaWdodCA9IDE7XG4gICAgICAgICAgY29uc29sZS53YXJuKGBbVGFnQ2xvdWQgc3RyaWN0XSBHaXZlbiB3ZWlnaHQgcHJvcGVydHkgJHt3b3JkLndlaWdodH0gPCAxLiBGYWxsYmFjayB0byAxIGFzIHlvdSBhcmUgdXNpbmcgc3RyaWN0IG1vZGVgLCB3b3JkKTtcbiAgICAgICAgfSBlbHNlIGlmICh3b3JkLndlaWdodCAlIDEgIT09IDApIHsgLy8gcm91bmQgaWYgZ2l2ZW4gdmFsdWUgaXMgbm90IGFuIGludGVnZXJcbiAgICAgICAgICB3ZWlnaHQgPSBNYXRoLnJvdW5kKHdvcmQud2VpZ2h0KTtcbiAgICAgICAgICBjb25zb2xlLndhcm4oYFtUYWdDbG91ZCBzdHJpY3RdIEdpdmVuIHdlaWdodCBwcm9wZXJ0eSAke3dvcmQud2VpZ2h0fSBpcyBub3QgYW4gaW50ZWdlci4gUm91bmRlZCB2YWx1ZSB0byAke3dlaWdodH1gLCB3b3JkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3ZWlnaHQgPSB3b3JkLndlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ3JlYXRlIGEgbmV3IHNwYW4gYW5kIGluc2VydCBub2RlLlxuICAgIHdvcmRTcGFuID0gdGhpcy5yMi5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgd29yZFNwYW4uY2xhc3NOYW1lID0gJ3cnICsgd2VpZ2h0O1xuXG4gICAgY29uc3QgdGhhdENsaWNrZWQgPSB0aGlzLmNsaWNrZWQ7XG4gICAgd29yZFNwYW4ub25jbGljayA9ICgpID0+IHtcbiAgICAgIHRoYXRDbGlja2VkLmVtaXQod29yZCk7XG4gICAgfTtcblxuICAgIGxldCBub2RlID0gdGhpcy5yMi5jcmVhdGVUZXh0KHdvcmQudGV4dCk7XG5cbiAgICAvLyBzZXQgY29sb3JcbiAgICBpZiAod29yZC5jb2xvcikge1xuICAgICAgdGhpcy5yMi5zZXRTdHlsZSh3b3JkU3BhbiwgJ2NvbG9yJywgd29yZC5jb2xvcik7XG4gICAgfVxuXG4gICAgbGV0IHRyYW5zZm9ybVN0cmluZyA9ICcnO1xuXG4gICAgLy8gc2V0IGNvbG9yXG4gICAgaWYgKHdvcmQucm90YXRlKSB7XG4gICAgICB0cmFuc2Zvcm1TdHJpbmcgPSBgcm90YXRlKCR7d29yZC5yb3RhdGV9ZGVnKWA7XG4gICAgICB0aGlzLnIyLnNldFN0eWxlKHdvcmRTcGFuLCAndHJhbnNmb3JtJywgdHJhbnNmb3JtU3RyaW5nKTtcbiAgICB9XG5cbiAgICAvLyBBcHBlbmQgaHJlZiBpZiB0aGVyZSdzIGEgbGluayBhbG9uZ3dpdGggdGhlIHRhZ1xuICAgIGlmICh3b3JkLmxpbmspIHtcbiAgICAgIGNvbnN0IHdvcmRMaW5rID0gdGhpcy5yMi5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICB3b3JkTGluay5ocmVmID0gd29yZC5saW5rO1xuXG4gICAgICBpZiAod29yZC5leHRlcm5hbCAhPT0gdW5kZWZpbmVkICYmIHdvcmQuZXh0ZXJuYWwpIHtcbiAgICAgICAgd29yZExpbmsudGFyZ2V0ID0gJ19ibGFuayc7XG4gICAgICB9XG5cbiAgICAgIHdvcmRMaW5rLmFwcGVuZENoaWxkKG5vZGUpO1xuICAgICAgbm9kZSA9IHdvcmRMaW5rO1xuICAgIH1cblxuICAgIC8vIHNldCB6b29tT3B0aW9uXG4gICAgaWYgKHRoaXMuem9vbU9uSG92ZXIgJiYgdGhpcy56b29tT25Ib3Zlci5zY2FsZSAhPT0gMSkge1xuICAgICAgaWYgKCF0aGlzLnpvb21PbkhvdmVyLnRyYW5zaXRpb25UaW1lKSB7IHRoaXMuem9vbU9uSG92ZXIudHJhbnNpdGlvblRpbWUgPSAwOyB9XG4gICAgICBpZiAoIXRoaXMuem9vbU9uSG92ZXIuc2NhbGUpIHsgdGhpcy56b29tT25Ib3Zlci5zY2FsZSA9IDE7IH1cblxuICAgICAgd29yZFNwYW4ub25tb3VzZW92ZXIgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMucjIuc2V0U3R5bGUod29yZFNwYW4sICd0cmFuc2l0aW9uJywgYHRyYW5zZm9ybSAke3RoaXMuem9vbU9uSG92ZXIudHJhbnNpdGlvblRpbWV9c2ApO1xuICAgICAgICB0aGlzLnIyLnNldFN0eWxlKHdvcmRTcGFuLCAndHJhbnNmb3JtJywgYHNjYWxlKCR7dGhpcy56b29tT25Ib3Zlci5zY2FsZX0pICR7dHJhbnNmb3JtU3RyaW5nfWApO1xuICAgICAgICB0aGlzLnIyLnNldFN0eWxlKHdvcmRTcGFuLCAndHJhbnNpdGlvbi1kZWxheScsIGAke3RoaXMuem9vbU9uSG92ZXIuZGVsYXl9c2ApO1xuICAgICAgICBpZiAodGhpcy56b29tT25Ib3Zlci5jb2xvcikge1xuICAgICAgICAgIHdvcmQubGlua1xuICAgICAgICAgICAgPyB0aGlzLnIyLnNldFN0eWxlKG5vZGUsICdjb2xvcicsIHRoaXMuem9vbU9uSG92ZXIuY29sb3IpXG4gICAgICAgICAgICA6IHRoaXMucjIuc2V0U3R5bGUod29yZFNwYW4sICdjb2xvcicsIHRoaXMuem9vbU9uSG92ZXIuY29sb3IpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICB3b3JkU3Bhbi5vbm1vdXNlb3V0ID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnIyLnNldFN0eWxlKHdvcmRTcGFuLCAndHJhbnNmb3JtJywgYG5vbmUgJHt0cmFuc2Zvcm1TdHJpbmd9YCk7XG4gICAgICAgIHdvcmQubGlua1xuICAgICAgICAgID8gdGhpcy5yMi5yZW1vdmVTdHlsZShub2RlLCAnY29sb3InKVxuICAgICAgICAgIDogdGhpcy5yMi5yZW1vdmVTdHlsZSh3b3JkU3BhbiwgJ2NvbG9yJyk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIHdvcmRTcGFuLmFwcGVuZENoaWxkKG5vZGUpO1xuICAgIHRoaXMucjIuYXBwZW5kQ2hpbGQodGhpcy5lbC5uYXRpdmVFbGVtZW50LCB3b3JkU3Bhbik7XG5cbiAgICBjb25zdCB3aWR0aCA9IHdvcmRTcGFuLm9mZnNldFdpZHRoO1xuICAgIGNvbnN0IGhlaWdodCA9IHdvcmRTcGFuLm9mZnNldEhlaWdodDtcbiAgICBsZXQgbGVmdCA9IHRoaXMub3B0aW9ucy5jZW50ZXIueDtcbiAgICBsZXQgdG9wID0gdGhpcy5vcHRpb25zLmNlbnRlci55O1xuXG4gICAgLy8gU2F2ZSBhIHJlZmVyZW5jZSB0byB0aGUgc3R5bGUgcHJvcGVydHksIGZvciBiZXR0ZXIgcGVyZm9ybWFuY2VcbiAgICBjb25zdCB3b3JkU3R5bGUgPSB3b3JkU3Bhbi5zdHlsZTtcbiAgICB3b3JkU3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuXG4gICAgLy8gcGxhY2UgdGhlIGZpcnN0IHdvcmRcbiAgICB3b3JkU3R5bGUubGVmdCA9IGxlZnQgKyAncHgnO1xuICAgIHdvcmRTdHlsZS50b3AgPSB0b3AgKyAncHgnO1xuXG4gICAgLy8gYWRkIHRvb2x0aXAgaWYgcHJvdmlkZWRcbiAgICBpZiAod29yZC50b29sdGlwKSB7XG4gICAgICB0aGlzLnIyLmFkZENsYXNzKHdvcmRTcGFuLCAndG9vbHRpcCcpO1xuICAgICAgY29uc3QgdG9vbHRpcFNwYW4gPSB0aGlzLnIyLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgIHRvb2x0aXBTcGFuLmNsYXNzTmFtZSA9ICd0b29sdGlwdGV4dCc7XG4gICAgICBjb25zdCB0ZXh0ID0gdGhpcy5yMi5jcmVhdGVUZXh0KHdvcmQudG9vbHRpcCk7XG4gICAgICB0b29sdGlwU3Bhbi5hcHBlbmRDaGlsZCh0ZXh0KTtcbiAgICAgIHdvcmRTcGFuLmFwcGVuZENoaWxkKHRvb2x0aXBTcGFuKTtcbiAgICB9XG5cbiAgICB3aGlsZSAodGhpcy5oaXRUZXN0KHdvcmRTcGFuLCB0aGlzLmFscmVhZHlQbGFjZWRXb3JkcykpIHtcbiAgICAgIHJhZGl1cyArPSB0aGlzLm9wdGlvbnMuc3RlcDtcbiAgICAgIGFuZ2xlICs9IChpbmRleCAlIDIgPT09IDAgPyAxIDogLTEpICogdGhpcy5vcHRpb25zLnN0ZXA7XG5cbiAgICAgIGxlZnQgPSB0aGlzLm9wdGlvbnMuY2VudGVyLnggLSAod2lkdGggLyAyLjApICsgKHJhZGl1cyAqIE1hdGguY29zKGFuZ2xlKSkgKiB0aGlzLm9wdGlvbnMuYXNwZWN0UmF0aW87XG4gICAgICB0b3AgPSB0aGlzLm9wdGlvbnMuY2VudGVyLnkgKyByYWRpdXMgKiBNYXRoLnNpbihhbmdsZSkgLSAoaGVpZ2h0IC8gMi4wKTtcblxuICAgICAgd29yZFN0eWxlLmxlZnQgPSBsZWZ0ICsgJ3B4JztcbiAgICAgIHdvcmRTdHlsZS50b3AgPSB0b3AgKyAncHgnO1xuICAgIH1cblxuICAgIC8vIERvbid0IHJlbmRlciB3b3JkIGlmIHBhcnQgb2YgaXQgd291bGQgYmUgb3V0c2lkZSB0aGUgY29udGFpbmVyXG4gICAgaWYgKFxuICAgICAgIXRoaXMub3B0aW9ucy5vdmVyZmxvdyAmJlxuICAgICAgKGxlZnQgPCAwIHx8IHRvcCA8IDAgfHwgKGxlZnQgKyB3aWR0aCkgPiB0aGlzLm9wdGlvbnMud2lkdGggfHxcbiAgICAgICh0b3AgKyBoZWlnaHQpID4gdGhpcy5vcHRpb25zLmhlaWdodClcbiAgICApIHtcbiAgICAgIHdvcmRTcGFuLnJlbW92ZSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuYWxyZWFkeVBsYWNlZFdvcmRzLnB1c2god29yZFNwYW4pO1xuICB9XG5cbn1cbiJdfQ==