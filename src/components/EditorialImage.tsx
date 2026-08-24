type EditorialImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** CSS aspect-ratio string, e.g. "3 / 4". Omit to keep intrinsic ratio. */
  ratio?: string;
  position?: string;
  priority?: boolean;
  caption?: string;
  zoom?: boolean;
  className?: string;
};

export function EditorialImage({
  src,
  alt,
  width,
  height,
  ratio,
  position = "center",
  priority = false,
  caption,
  zoom = true,
  className = "",
}: EditorialImageProps) {
  return (
    <figure className={className}>
      <div className="overflow-hidden bg-paper-dim" style={ratio ? { aspectRatio: ratio } : undefined}>
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          fetchPriority={priority ? "high" : "auto"}
          className={`h-full w-full object-cover ${zoom ? "img-zoom" : ""}`}
          style={{ objectPosition: position }}
        />
      </div>
      {caption ? (
        <figcaption className="meta mt-4 text-ink-muted">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
