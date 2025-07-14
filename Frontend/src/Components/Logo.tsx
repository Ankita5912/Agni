export default function LogoA() {
  return (
    <div className="flex items-center justify-center">
      <svg
        width="40"
        height="60"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="techGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0052CC" />
            <stop offset="100%" stopColor="#2684FF" />
          </linearGradient>
        </defs>
        <g transform="translate(20, 10) scale(1.1)">
          <path
            d="M80 0 L10 160 H50 L80 80 L110 160 H150 L80 0 Z"
            fill="url(#techGradient)"
          />
        </g>
      </svg>
    </div>
  );
}
