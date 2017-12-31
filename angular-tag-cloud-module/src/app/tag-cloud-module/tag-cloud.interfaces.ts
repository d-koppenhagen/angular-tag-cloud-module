export interface CloudData {
  text: string;
  weight?: number;
  link?: string;
  external?: boolean;
  color?: string;
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
}
