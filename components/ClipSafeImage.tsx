import { withBasePath } from "@/lib/paths";

interface Props {
  src: string;
  alt: string;
  className: string;
}

/** Spot photos we don't have crop rights for — must be shown in full, never clipped. */
const NO_CROP_MARKERS = ["/images/stores/mingei/"];

/**
 * Drop-in replacement for a cropped <img>. Most photos fill their box with
 * object-cover; ones in NO_CROP_MARKERS instead show the full, uncropped
 * image (object-contain) over a blurred, scaled-up copy of itself so the box
 * still looks filled instead of letterboxed.
 */
export default function ClipSafeImage({ src, alt, className }: Props) {
  const resolved = withBasePath(src);
  const noCrop = NO_CROP_MARKERS.some((marker) => src.includes(marker));

  if (!noCrop) {
    return (
      <img src={resolved} alt={alt} className={`${className} object-cover`} />
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={resolved}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full scale-125 object-cover blur-md brightness-75"
      />
      <img
        src={resolved}
        alt={alt}
        className="absolute inset-0 h-full w-full object-contain"
      />
    </div>
  );
}
