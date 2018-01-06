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
   * Specifies a valid CSS color string for colorizing the element
   */
  color?: string;
  /**
   * Set a value between 1 and 360 degrees to let the word appear rotated
   */
  rotate?: number;
}

export interface CloudOptions {
  step?: number;
  aspectRatio?: number;
  width?: number;
  height?: number;
  center?: {
    x: number;
    y: number;
  };
  overflow?: boolean;
  zoomOnHover?: ZoomOnHoverOptions;
}

export interface ZoomOnHoverOptions {
  scale: number;
  transitionTime?: number;
  delay?: number;
}
