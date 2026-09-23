import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

export function OgImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#07111F",
        color: "#F8FBFF",
        padding: "72px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            color: "#67E8F9",
            fontSize: 22,
            letterSpacing: 4,
          }}
        >
          SOFTWARE ENGINEER
        </div>
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: 99,
            background: "#EC4899",
          }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 86, fontWeight: 700, letterSpacing: -2 }}>
          Eunice Jacob
        </div>
        <div style={{ fontSize: 34, color: "#BFDBFE", marginTop: 18 }}>
          Backend · Full-Stack · Payments · Integrations
        </div>
      </div>
      <div style={{ display: "flex", gap: 16 }}>
        {["TypeScript", "Node.js", "React", "Webhooks"].map((label) => (
          <div
            key={label}
            style={{
              border: "1px solid rgba(147, 197, 253, 0.45)",
              borderRadius: 999,
              padding: "10px 18px",
              color: "#DBEAFE",
              fontSize: 22,
            }}
          >
            {label}
          </div>
        ))}
      </div>
    </div>,
    ogSize,
  );
}
