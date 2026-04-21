export function LogoMark({
  size = 28,
  color = 'currentColor',
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="BalaBite"
    >
      <path
        d="M4 14 L16 4 L28 14 L28 27 Q28 28 27 28 L5 28 Q4 28 4 27 Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="16" cy="19" r="2.2" fill={color} />
    </svg>
  );
}
