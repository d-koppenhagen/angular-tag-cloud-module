(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('angular-tag-cloud-module', ['exports', '@angular/core'], factory) :
    (factory((global['angular-tag-cloud-module'] = {}),global.ng.core));
}(this, (function (exports,core) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
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
            this.clicked = new core.EventEmitter();
            this.dataChanges = new core.EventEmitter();
            this.afterInit = new core.EventEmitter();
            this.afterChecked = new core.EventEmitter();
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
                this._timeoutId = window.setTimeout(( /**
                 * @return {?}
                 */function () {
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
                this._dataArr.sort(( /**
                 * @param {?} a
                 * @param {?} b
                 * @return {?}
                 */function (a, b) { return (_this.descriptiveEntry(a)).localeCompare(_this.descriptiveEntry(b)); }));
                // Sort this._dataArr from the word with the highest weight to the one with the lowest
                this._dataArr.sort(( /**
                 * @param {?} a
                 * @param {?} b
                 * @return {?}
                 */function (a, b) { return b.weight - a.weight; }));
                this._dataArr.forEach(( /**
                 * @param {?} elem
                 * @param {?} index
                 * @return {?}
                 */function (elem, index) {
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
                wordSpan.onclick = ( /**
                 * @return {?}
                 */function () {
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
                    wordSpan.onmouseover = ( /**
                     * @return {?}
                     */function () {
                        _this.r2.setStyle(wordSpan, 'transition', "transform " + _this.zoomOnHover.transitionTime + "s");
                        _this.r2.setStyle(wordSpan, 'transform', "scale(" + _this.zoomOnHover.scale + ") " + transformString);
                        _this.r2.setStyle(wordSpan, 'transition-delay', _this.zoomOnHover.delay + "s");
                        if (_this.zoomOnHover.color) {
                            word.link
                                ? _this.r2.setStyle(node, 'color', _this.zoomOnHover.color)
                                : _this.r2.setStyle(wordSpan, 'color', _this.zoomOnHover.color);
                        }
                    });
                    wordSpan.onmouseout = ( /**
                     * @return {?}
                     */function () {
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
            { type: core.Component, args: [{
                        selector: 'angular-tag-cloud, ng-tag-cloud, ngtc',
                        template: '',
                        styles: [":host{font-family:Helvetica,Arial,sans-serif;font-size:10px;line-height:normal;color:#09f;overflow:hidden;position:relative;display:block}span{padding:0}span.w10{font-size:550%}span.w9{font-size:500%}span.w8{font-size:450%}span.w7{font-size:400%}span.w6{font-size:350%}span.w5{font-size:300%}span.w4{font-size:250%}span.w3{font-size:200%}span.w2{font-size:150%}a:hover,span.w10,span.w8,span.w9{color:#0cf}span.w7{color:#39d}span.w6{color:#90c5f0}span.w5{color:#90a0dd}span.w4{color:#90c5f0}span.w3{color:#a0ddff}span.w2{color:#9ce}span.w1{font-size:100%;color:#aab5f0}.tooltip .tooltiptext{visibility:hidden;width:inherit;background-color:#555;color:#fff;text-align:center;border-radius:6px;padding:5px 10px;position:absolute;bottom:100%;left:0;opacity:0;transition:opacity .3s}.tooltip .tooltiptext::after{content:\"\";position:absolute;top:100%;left:50%;margin-left:-5px;border-width:5px;border-style:solid;border-color:#555 transparent transparent}.tooltip:hover .tooltiptext{visibility:visible;opacity:1}"]
                    }] }
        ];
        /** @nocollapse */
        TagCloudComponent.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: core.Renderer2 }
            ];
        };
        TagCloudComponent.propDecorators = {
            data: [{ type: core.Input }],
            width: [{ type: core.Input }],
            height: [{ type: core.Input }],
            overflow: [{ type: core.Input }],
            strict: [{ type: core.Input }],
            zoomOnHover: [{ type: core.Input }],
            realignOnResize: [{ type: core.Input }],
            randomizeAngle: [{ type: core.Input }],
            clicked: [{ type: core.Output }],
            dataChanges: [{ type: core.Output }],
            afterInit: [{ type: core.Output }],
            afterChecked: [{ type: core.Output }],
            onResize: [{ type: core.HostListener, args: ['window:resize', ['$event'],] }]
        };
        return TagCloudComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var TagCloudModule = /** @class */ (function () {
        function TagCloudModule() {
        }
        TagCloudModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [TagCloudComponent],
                        exports: [TagCloudComponent],
                        entryComponents: [TagCloudComponent]
                    },] }
        ];
        return TagCloudModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.TagCloudModule = TagCloudModule;
    exports.TagCloudComponent = TagCloudComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=angular-tag-cloud-module.umd.js.map