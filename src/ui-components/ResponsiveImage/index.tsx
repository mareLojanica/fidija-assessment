import React from "react";
import { ResponsiveImageProps } from "../../types/ui-component.types";

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  alt,
  src,
  className,
  webpSrc,
  avifSrc,
  smallSrc,
  mediumSrc,
  fallbackComponent,
}) => {
  return src ? (
    <picture className={className}>
      {avifSrc && <source srcSet={avifSrc} type="image/avif" />}
      {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
      {smallSrc && <source media="(max-width: 600px)" srcSet={smallSrc} />}
      {mediumSrc && <source media="(max-width: 1200px)" srcSet={mediumSrc} />}
      <img src={src} alt={alt} className={className} loading="lazy" />
    </picture>
  ) : (
    fallbackComponent || <div role="img" aria-label="No image available" />
  );
};

export default ResponsiveImage;
