type Direction = "up-right" | "right" | "left";

export default function ActionArrow({ direction = "up-right" }: { direction?: Direction }) {
  const path = direction === "up-right"
    ? "M7 17 17 7M8 7h9v9"
    : direction === "right"
      ? "M5 12h14m-6-6 6 6-6 6"
      : "M19 12H5m6-6-6 6 6 6";

  return (
    <svg className="action-arrow-icon" viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" focusable="false" aria-hidden="true">
      <path d={path} />
    </svg>
  );
}
