import { FC } from "react";

const FadeInImage: FC<FadeInImageProps> = ({ alt, id, src, height, width, className, loading, sizes }) => {
  //   const [showImg, setShowImg] = useState(false);

  //   useEffect(() => {
  //     setTimeout(() => {
  //       setShowImg(true);
  //     }, 0);
  //   }, []);

  return (
    <img
      id={id}
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      draggable={false}
      // layout={layout}
      // objectFit={objectFit}
      sizes={sizes}
      // placeholder={placeholder}
      // quality={quality}
      // onLoad={() => {
      //   setShowImg(true);
      // }}
      width={width}
      height={height}
      // fill={fill}
      // priority={priority}
      // objectPosition={objectPosition}
    />
  );
};

interface FadeInImageProps {
  src: string;
  alt: string;
  id?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
  //   placeholder?: PlaceholderValue;
  fill?: boolean;
  wrapperClassName?: string;
  wrapperStyle?: React.CSSProperties;
  // fetchPriority?: "high" | "low" | "auto";
  layout?: string;
  className?: string;
  sizes?: string;
  objectPosition?: string;
  loading?: "eager" | "lazy";
  objectFit?: string;
  transitionDuration?: number;
}

export default FadeInImage;
