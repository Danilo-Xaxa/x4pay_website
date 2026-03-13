import React from "react";

const getWebPPath = (src) => {
  const lastDot = src.lastIndexOf(".");
  if (lastDot === -1) return null;
  return src.substring(0, lastDot) + ".webp";
};

const OptimizedImage = ({ src, alt, loading = "lazy", className, style }) => {
  const webpSrc = getWebPPath(src);

  return (
    <picture>
      {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
      <img
        src={src}
        alt={alt}
        loading={loading}
        className={className}
        style={style}
      />
    </picture>
  );
};

export default OptimizedImage;
