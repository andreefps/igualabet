import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "IgualaBet - Hedge Betting Calculator";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #09090b 0%, #18181b 50%, #09090b 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Green accent line at top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "linear-gradient(90deg, #16a34a, #22c55e, #16a34a)",
          }}
        />
        {/* Logo / Icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "96px",
            height: "96px",
            borderRadius: "24px",
            background: "linear-gradient(135deg, #16a34a, #22c55e)",
            marginBottom: "32px",
            fontSize: "48px",
          }}
        >
          <span style={{ color: "white", fontWeight: 800 }}>⚖</span>
        </div>
        {/* Title */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: 800,
            color: "#fafafa",
            letterSpacing: "-2px",
            marginBottom: "16px",
          }}
        >
          IgualaBet
        </div>
        {/* Subtitle */}
        <div
          style={{
            fontSize: "28px",
            fontWeight: 400,
            color: "#a1a1aa",
            marginBottom: "40px",
          }}
        >
          Hedge Betting Calculator & Optimizer
        </div>
        {/* Feature pills */}
        <div style={{ display: "flex", gap: "16px" }}>
          {["Guaranteed Profit", "Break Even", "Minimize Loss"].map((text) => (
            <div
              key={text}
              style={{
                padding: "12px 24px",
                borderRadius: "9999px",
                border: "1px solid #27272a",
                background: "#18181b",
                color: "#22c55e",
                fontSize: "18px",
                fontWeight: 600,
              }}
            >
              {text}
            </div>
          ))}
        </div>
        {/* Footer */}
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            fontSize: "18px",
            color: "#52525b",
          }}
        >
          Free • No signup • Decimal & American odds
        </div>
      </div>
    ),
    { ...size }
  );
}
