import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "linear-gradient(135deg, #1a234f 0%, #2e3a87 28%, #5b67c4 55%, #ffc454 100%)",
          borderRadius: 14,
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(32 32)">
            <rect x="-16" y="-16" width="32" height="32" rx="2" fill="#aebae8" opacity="0.92" />
            <rect x="-16" y="-16" width="32" height="32" rx="2" transform="rotate(45)" fill="#5b67c4" opacity="0.85" />
          </g>
          <circle cx="32" cy="32" r="9" fill="#ffc454" />
          <circle cx="32" cy="32" r="2" fill="#fefaf2" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
