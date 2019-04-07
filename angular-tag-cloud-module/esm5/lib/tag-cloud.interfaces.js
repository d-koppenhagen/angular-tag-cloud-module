/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Defines the attributes for a single Cloud element
 * @record
 */
export function CloudData() { }
if (false) {
    /**
     * Set the text string for the Cloud element
     * @type {?}
     */
    CloudData.prototype.text;
    /**
     * set the weight for the element.
     *
     * The `weight` property defines the relative importance of the word (such as the number of occurrencies, etc.).
     * The range of values is arbitrary, and they will be linearly mapped to a discrete scale from 1 to 10.
     * In fact passing just one word to the array has the effect that this is relative to other elements.
     * As there aren't any other elements in that case it's result is that the element becomes a container
     * with the class `w5` - right in the middle of the discret scale.
     * The given value for `weight` is not directly mapped to the CSS-class.
     * For example you can use also a value like `123` or `34` - it will always be mapped to a scale from 1 to 10
     * relativly to the other array elements.
     * If you don't want that the tag cloud is calculating the values manually,
     * set the `strict` property to `true` and use integer values `1` to `10` within the `weight` property.
     * @type {?|undefined}
     */
    CloudData.prototype.weight;
    /**
     * Specifies optionally a link target for this element
     * @type {?|undefined}
     */
    CloudData.prototype.link;
    /**
     * If you configured a link for this element, you can set the value for `external` to true, so force the link to be opened in a new tab.
     * @type {?|undefined}
     */
    CloudData.prototype.external;
    /**
     * Specifies a valid CSS color string for colorizing the element.
     * This will override probably your CSS setttings
     * @type {?|undefined}
     */
    CloudData.prototype.color;
    /**
     * Set a value between 1 and 360 degrees to let the word appear rotated
     * @type {?|undefined}
     */
    CloudData.prototype.rotate;
    /**
     * Define a tooltip text
     * @type {?|undefined}
     */
    CloudData.prototype.tooltip;
}
/**
 * Specify options for the whole TagCloud
 * @record
 */
export function CloudOptions() { }
if (false) {
    /**
     * Defines the width of the TacCloud container
     * @type {?|undefined}
     */
    CloudOptions.prototype.width;
    /**
     * Defines the height of the TacCloud container
     * @type {?|undefined}
     */
    CloudOptions.prototype.height;
    /**
     * Defines weather elements that does not fit in the container should be hidden or just cutted at the container borders
     * @type {?|undefined}
     */
    CloudOptions.prototype.overflow;
    /**
     * Define Option which will take effect when hovering with the cursor over the elements
     * @type {?|undefined}
     */
    CloudOptions.prototype.zoomOnHover;
    /**
     * Enable or disable automatic resize if boundaries are changing
     * @type {?|undefined}
     */
    CloudOptions.prototype.realignOnResize;
    /**
     * Enable or disable randomly determining an angle when it is not explicitly set
     * @type {?|undefined}
     */
    CloudOptions.prototype.randomizeAngle;
}
/**
 * Specify Options for elements that will be hovered by the cursor
 * @record
 */
export function ZoomOnHoverOptions() { }
if (false) {
    /**
     * Set the scale for the zoom
     * @type {?}
     */
    ZoomOnHoverOptions.prototype.scale;
    /**
     * Set optionally a time value for the transition from the current element size to this one defines in `scale`.
     * @type {?|undefined}
     */
    ZoomOnHoverOptions.prototype.transitionTime;
    /**
     * Set optionally a delay (in seconds). Setting this e.g. to `2` will have the effect that the zoom will appear with 2s delay time.
     * @type {?|undefined}
     */
    ZoomOnHoverOptions.prototype.delay;
    /**
     * Define a color which will replace the current color when hovering over the item.
     * This will override probably your CSS setttings
     * @type {?|undefined}
     */
    ZoomOnHoverOptions.prototype.color;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLWNsb3VkLmludGVyZmFjZXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXRhZy1jbG91ZC1tb2R1bGUvIiwic291cmNlcyI6WyJsaWIvdGFnLWNsb3VkLmludGVyZmFjZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFHQSwrQkF5Q0M7Ozs7OztJQXJDQyx5QkFBYTs7Ozs7Ozs7Ozs7Ozs7OztJQWViLDJCQUFnQjs7Ozs7SUFJaEIseUJBQWM7Ozs7O0lBSWQsNkJBQW1COzs7Ozs7SUFLbkIsMEJBQWU7Ozs7O0lBSWYsMkJBQWdCOzs7OztJQUloQiw0QkFBaUI7Ozs7OztBQU1uQixrQ0F5QkM7Ozs7OztJQXJCQyw2QkFBZTs7Ozs7SUFJZiw4QkFBZ0I7Ozs7O0lBSWhCLGdDQUFtQjs7Ozs7SUFJbkIsbUNBQWlDOzs7OztJQUlqQyx1Q0FBMEI7Ozs7O0lBSTFCLHNDQUF5Qjs7Ozs7O0FBTTNCLHdDQWtCQzs7Ozs7O0lBZEMsbUNBQWM7Ozs7O0lBSWQsNENBQXdCOzs7OztJQUl4QixtQ0FBZTs7Ozs7O0lBS2YsbUNBQWUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIERlZmluZXMgdGhlIGF0dHJpYnV0ZXMgZm9yIGEgc2luZ2xlIENsb3VkIGVsZW1lbnRcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBDbG91ZERhdGEge1xuICAvKipcbiAgICogU2V0IHRoZSB0ZXh0IHN0cmluZyBmb3IgdGhlIENsb3VkIGVsZW1lbnRcbiAgICovXG4gIHRleHQ6IHN0cmluZztcbiAgLyoqXG4gICAqIHNldCB0aGUgd2VpZ2h0IGZvciB0aGUgZWxlbWVudC5cbiAgICpcbiAgICogVGhlIGB3ZWlnaHRgIHByb3BlcnR5IGRlZmluZXMgdGhlIHJlbGF0aXZlIGltcG9ydGFuY2Ugb2YgdGhlIHdvcmQgKHN1Y2ggYXMgdGhlIG51bWJlciBvZiBvY2N1cnJlbmNpZXMsIGV0Yy4pLlxuICAgKiBUaGUgcmFuZ2Ugb2YgdmFsdWVzIGlzIGFyYml0cmFyeSwgYW5kIHRoZXkgd2lsbCBiZSBsaW5lYXJseSBtYXBwZWQgdG8gYSBkaXNjcmV0ZSBzY2FsZSBmcm9tIDEgdG8gMTAuXG4gICAqIEluIGZhY3QgcGFzc2luZyBqdXN0IG9uZSB3b3JkIHRvIHRoZSBhcnJheSBoYXMgdGhlIGVmZmVjdCB0aGF0IHRoaXMgaXMgcmVsYXRpdmUgdG8gb3RoZXIgZWxlbWVudHMuXG4gICAqIEFzIHRoZXJlIGFyZW4ndCBhbnkgb3RoZXIgZWxlbWVudHMgaW4gdGhhdCBjYXNlIGl0J3MgcmVzdWx0IGlzIHRoYXQgdGhlIGVsZW1lbnQgYmVjb21lcyBhIGNvbnRhaW5lclxuICAgKiB3aXRoIHRoZSBjbGFzcyBgdzVgIC0gcmlnaHQgaW4gdGhlIG1pZGRsZSBvZiB0aGUgZGlzY3JldCBzY2FsZS5cbiAgICogVGhlIGdpdmVuIHZhbHVlIGZvciBgd2VpZ2h0YCBpcyBub3QgZGlyZWN0bHkgbWFwcGVkIHRvIHRoZSBDU1MtY2xhc3MuXG4gICAqIEZvciBleGFtcGxlIHlvdSBjYW4gdXNlIGFsc28gYSB2YWx1ZSBsaWtlIGAxMjNgIG9yIGAzNGAgLSBpdCB3aWxsIGFsd2F5cyBiZSBtYXBwZWQgdG8gYSBzY2FsZSBmcm9tIDEgdG8gMTBcbiAgICogcmVsYXRpdmx5IHRvIHRoZSBvdGhlciBhcnJheSBlbGVtZW50cy5cbiAgICogSWYgeW91IGRvbid0IHdhbnQgdGhhdCB0aGUgdGFnIGNsb3VkIGlzIGNhbGN1bGF0aW5nIHRoZSB2YWx1ZXMgbWFudWFsbHksXG4gICAqIHNldCB0aGUgYHN0cmljdGAgcHJvcGVydHkgdG8gYHRydWVgIGFuZCB1c2UgaW50ZWdlciB2YWx1ZXMgYDFgIHRvIGAxMGAgd2l0aGluIHRoZSBgd2VpZ2h0YCBwcm9wZXJ0eS5cbiAgICovXG4gIHdlaWdodD86IG51bWJlcjtcbiAgLyoqXG4gICAqIFNwZWNpZmllcyBvcHRpb25hbGx5IGEgbGluayB0YXJnZXQgZm9yIHRoaXMgZWxlbWVudFxuICAgKi9cbiAgbGluaz86IHN0cmluZztcbiAgLyoqXG4gICAqIElmIHlvdSBjb25maWd1cmVkIGEgbGluayBmb3IgdGhpcyBlbGVtZW50LCB5b3UgY2FuIHNldCB0aGUgdmFsdWUgZm9yIGBleHRlcm5hbGAgdG8gdHJ1ZSwgc28gZm9yY2UgdGhlIGxpbmsgdG8gYmUgb3BlbmVkIGluIGEgbmV3IHRhYi5cbiAgICovXG4gIGV4dGVybmFsPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIFNwZWNpZmllcyBhIHZhbGlkIENTUyBjb2xvciBzdHJpbmcgZm9yIGNvbG9yaXppbmcgdGhlIGVsZW1lbnQuXG4gICAqIFRoaXMgd2lsbCBvdmVycmlkZSBwcm9iYWJseSB5b3VyIENTUyBzZXR0dGluZ3NcbiAgICovXG4gIGNvbG9yPzogc3RyaW5nO1xuICAvKipcbiAgICogU2V0IGEgdmFsdWUgYmV0d2VlbiAxIGFuZCAzNjAgZGVncmVlcyB0byBsZXQgdGhlIHdvcmQgYXBwZWFyIHJvdGF0ZWRcbiAgICovXG4gIHJvdGF0ZT86IG51bWJlcjtcbiAgLyoqXG4gICAqIERlZmluZSBhIHRvb2x0aXAgdGV4dFxuICAgKi9cbiAgdG9vbHRpcD86IHN0cmluZztcbn1cblxuLyoqXG4gKiBTcGVjaWZ5IG9wdGlvbnMgZm9yIHRoZSB3aG9sZSBUYWdDbG91ZFxuICovXG5leHBvcnQgaW50ZXJmYWNlIENsb3VkT3B0aW9ucyB7XG4gIC8qKlxuICAgKiBEZWZpbmVzIHRoZSB3aWR0aCBvZiB0aGUgVGFjQ2xvdWQgY29udGFpbmVyXG4gICAqL1xuICB3aWR0aD86IG51bWJlcjtcbiAgLyoqXG4gICAqIERlZmluZXMgdGhlIGhlaWdodCBvZiB0aGUgVGFjQ2xvdWQgY29udGFpbmVyXG4gICAqL1xuICBoZWlnaHQ/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBEZWZpbmVzIHdlYXRoZXIgZWxlbWVudHMgdGhhdCBkb2VzIG5vdCBmaXQgaW4gdGhlIGNvbnRhaW5lciBzaG91bGQgYmUgaGlkZGVuIG9yIGp1c3QgY3V0dGVkIGF0IHRoZSBjb250YWluZXIgYm9yZGVyc1xuICAgKi9cbiAgb3ZlcmZsb3c/OiBib29sZWFuO1xuICAvKipcbiAgICogRGVmaW5lIE9wdGlvbiB3aGljaCB3aWxsIHRha2UgZWZmZWN0IHdoZW4gaG92ZXJpbmcgd2l0aCB0aGUgY3Vyc29yIG92ZXIgdGhlIGVsZW1lbnRzXG4gICAqL1xuICB6b29tT25Ib3Zlcj86IFpvb21PbkhvdmVyT3B0aW9ucztcbiAgLyoqXG4gICAqIEVuYWJsZSBvciBkaXNhYmxlIGF1dG9tYXRpYyByZXNpemUgaWYgYm91bmRhcmllcyBhcmUgY2hhbmdpbmdcbiAgICovXG4gIHJlYWxpZ25PblJlc2l6ZT86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBFbmFibGUgb3IgZGlzYWJsZSByYW5kb21seSBkZXRlcm1pbmluZyBhbiBhbmdsZSB3aGVuIGl0IGlzIG5vdCBleHBsaWNpdGx5IHNldFxuICAgKi9cbiAgcmFuZG9taXplQW5nbGU/OiBib29sZWFuO1xufVxuXG4vKipcbiAqIFNwZWNpZnkgT3B0aW9ucyBmb3IgZWxlbWVudHMgdGhhdCB3aWxsIGJlIGhvdmVyZWQgYnkgdGhlIGN1cnNvclxuICovXG5leHBvcnQgaW50ZXJmYWNlIFpvb21PbkhvdmVyT3B0aW9ucyB7XG4gIC8qKlxuICAgKiBTZXQgdGhlIHNjYWxlIGZvciB0aGUgem9vbVxuICAgKi9cbiAgc2NhbGU6IG51bWJlcjtcbiAgLyoqXG4gICAqIFNldCBvcHRpb25hbGx5IGEgdGltZSB2YWx1ZSBmb3IgdGhlIHRyYW5zaXRpb24gZnJvbSB0aGUgY3VycmVudCBlbGVtZW50IHNpemUgdG8gdGhpcyBvbmUgZGVmaW5lcyBpbiBgc2NhbGVgLlxuICAgKi9cbiAgdHJhbnNpdGlvblRpbWU/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBTZXQgb3B0aW9uYWxseSBhIGRlbGF5IChpbiBzZWNvbmRzKS4gU2V0dGluZyB0aGlzIGUuZy4gdG8gYDJgIHdpbGwgaGF2ZSB0aGUgZWZmZWN0IHRoYXQgdGhlIHpvb20gd2lsbCBhcHBlYXIgd2l0aCAycyBkZWxheSB0aW1lLlxuICAgKi9cbiAgZGVsYXk/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBEZWZpbmUgYSBjb2xvciB3aGljaCB3aWxsIHJlcGxhY2UgdGhlIGN1cnJlbnQgY29sb3Igd2hlbiBob3ZlcmluZyBvdmVyIHRoZSBpdGVtLlxuICAgKiBUaGlzIHdpbGwgb3ZlcnJpZGUgcHJvYmFibHkgeW91ciBDU1Mgc2V0dHRpbmdzXG4gICAqL1xuICBjb2xvcj86IHN0cmluZztcbn1cbiJdfQ==