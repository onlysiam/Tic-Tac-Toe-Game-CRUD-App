import { cn } from "@lib/utils/style";
import NextImage from "next/image";
import { useEffect, useState, MouseEventHandler } from "react";
import images from "@resources/images";

interface ImageComponentProps {
  className?: string;
  src: string;
  alt?: string;
  onErrorImage?: string;
  onClick?: MouseEventHandler<HTMLImageElement>;
}

const Image: React.FC<ImageComponentProps> = ({
  className,
  src,
  alt = "image",
  onErrorImage,
  onClick,
}) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(src);

  useEffect(() => {
    if (!src) {
      setImageUrl(onErrorImage ?? images.placeholders.image);
    } else {
      setImageUrl(src);
    }
  }, [src, onErrorImage]);

  if (!imageUrl) return null;

  return (
    <NextImage
      className={cn("shrink-0", className)}
      loader={() => imageUrl}
      unoptimized
      src={imageUrl}
      alt={alt}
      height={100}
      width={100}
      referrerPolicy="no-referrer"
      onClick={onClick}
      onError={() => {
        if (onErrorImage) setImageUrl(onErrorImage);
      }}
    />
  );
};

export default Image;
