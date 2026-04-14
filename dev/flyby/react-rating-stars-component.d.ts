declare module 'react-rating-stars-component' {
  interface ReactStarsProps {
    activeColor?: string;
    a11y?: boolean;
    classNames?: string;
    count?: number;
    edit?: boolean;
    isHalf?: boolean;
    onChange?: (newRating: number) => void;
    emptyIcon?: React.ReactElement;
    halfIcon?: React.ReactElement;
    filledIcon?: React.ReactElement;
    size?: number;
    value?: number;
  }

  declare const ReactStars: React.FC<ReactStarsProps>;

  export default ReactStars;
}
