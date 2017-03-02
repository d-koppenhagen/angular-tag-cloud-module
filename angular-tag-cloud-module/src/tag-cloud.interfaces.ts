export interface CloudData {
  text: string;
  weight?: number;
  link?: string;
  external?: boolean;
  color?: string;
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
