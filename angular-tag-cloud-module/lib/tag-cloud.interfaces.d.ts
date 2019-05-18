/**
 * Defines the attributes for a single Cloud element
 */
export interface CloudData {
    /**
     * Set the text string for the Cloud element
     */
    text: string;
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
     */
    weight?: number;
    /**
     * Specifies optionally a link target for this element
     */
    link?: string;
    /**
     * If you configured a link for this element, you can set the value for `external` to true, so force the link to be opened in a new tab.
     */
    external?: boolean;
    /**
     * Specifies a valid CSS color string for colorizing the element.
     * This will override probably your CSS setttings
     */
    color?: string;
    /**
     * Set a value between 1 and 360 degrees to let the word appear rotated
     */
    rotate?: number;
    /**
     * Define a tooltip text
     */
    tooltip?: string;
}
/**
 * Specify options for the whole TagCloud
 */
export interface CloudOptions {
    /**
     * Defines the width of the TacCloud container
     */
    width?: number;
    /**
     * Defines the height of the TacCloud container
     */
    height?: number;
    /**
     * Defines weather elements that does not fit in the container should be hidden or just cutted at the container borders
     */
    overflow?: boolean;
    /**
     * Define Option which will take effect when hovering with the cursor over the elements
     */
    zoomOnHover?: ZoomOnHoverOptions;
    /**
     * Enable or disable automatic resize if boundaries are changing
     */
    realignOnResize?: boolean;
    /**
     * Enable or disable randomly determining an angle when it is not explicitly set
     */
    randomizeAngle?: boolean;
}
/**
 * Specify Options for elements that will be hovered by the cursor
 */
export interface ZoomOnHoverOptions {
    /**
     * Set the scale for the zoom
     */
    scale: number;
    /**
     * Set optionally a time value for the transition from the current element size to this one defines in `scale`.
     */
    transitionTime?: number;
    /**
     * Set optionally a delay (in seconds). Setting this e.g. to `2` will have the effect that the zoom will appear with 2s delay time.
     */
    delay?: number;
    /**
     * Define a color which will replace the current color when hovering over the item.
     * This will override probably your CSS setttings
     */
    color?: string;
}
