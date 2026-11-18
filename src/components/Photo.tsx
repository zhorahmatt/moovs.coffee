import { photoSrcSet, photoUrl, type Media } from "@/lib/media";

type Props = {
  media: Media;
  /** Server-side crop ratio, e.g. "4:5". Omit to keep the original frame. */
  ratio?: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Decorative photos pass an empty alt. */
  decorative?: boolean;
  maxWidth?: number;
  /** Motion hooks read by the motion system. */
  reveal?: boolean;
  parallax?: boolean;
};

/**
 * Responsive photo. The wrapper carries the photo's dominant tone, so the
 * layout keeps its shape and colour while loading or if the file is missing.
 */
export function Photo({ media, ratio, sizes, priority, className, decorative, maxWidth = 1920, reveal, parallax }: Props) {
  return (
    <span
      className={`photo ${className ?? ""}`}
      style={{ backgroundColor: media.tone }}
      data-image-reveal={reveal ? "" : undefined}
      data-parallax={parallax ? "" : undefined}
    >
      <img
        src={photoUrl(media, 1080, ratio)}
        srcSet={photoSrcSet(media, ratio, maxWidth)}
        sizes={sizes}
        alt={decorative ? "" : media.alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        style={media.focus ? { objectPosition: media.focus } : undefined}
        data-credit={`${media.author} / Unsplash`}
      />
    </span>
  );
}
