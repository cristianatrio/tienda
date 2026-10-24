/** Wordmark with a crescent moon; decorative, the parent link carries the name. */
export function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      airkids
      <svg viewBox="0 0 24 24" width="0.8em" height="0.8em">
        <path
          d="M15.5 2.5a9.5 9.5 0 1 0 6 16.9A8 8 0 0 1 15.5 2.5Z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
}
