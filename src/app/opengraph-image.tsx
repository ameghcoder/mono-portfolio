import { ImageResponse } from "next/og";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export const alt = `${PORTFOLIO_DATA.profile.name} — ${PORTFOLIO_DATA.profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#2B2B2B";
const FG = "#F5F5F5";
const MUTED = "#8C8C8C";
const HIGHLIGHT = "#E68A47";
const BORDER = "#4F4F4F";

export default async function OGImage() {
  const { name, role, headline } = PORTFOLIO_DATA.profile;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: BG,
          padding: "72px 80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Top row — handle */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            color: MUTED,
            fontSize: 22,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            fontFamily: "monospace",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: HIGHLIGHT,
            }}
          />
          <span style={{ color: HIGHLIGHT }}>@yrjdev</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>portfolio</span>
        </div>

        {/* Spacer */}
        <div style={{ flex: 1, display: "flex" }} />

        {/* Name */}
        <div
          style={{
            display: "flex",
            color: FG,
            fontSize: 96,
            fontWeight: 600,
            letterSpacing: "-0.03em",
            lineHeight: 1,
          }}
        >
          {name}
        </div>

        {/* Role */}
        <div
          style={{
            display: "flex",
            color: MUTED,
            fontSize: 32,
            marginTop: 18,
            letterSpacing: "-0.01em",
          }}
        >
          {role}
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            color: FG,
            opacity: 0.85,
            fontSize: 26,
            marginTop: 26,
            lineHeight: 1.4,
            maxWidth: 900,
          }}
        >
          {headline}
        </div>

        {/* Spacer */}
        <div style={{ flex: 1, display: "flex" }} />

        {/* Bottom row — divider + status */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            paddingTop: 28,
            borderTop: `1px solid ${BORDER}`,
            color: MUTED,
            fontSize: 18,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontFamily: "monospace",
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#5BC272",
            }}
          />
          <span>Available for retainer &amp; projects</span>
          <div style={{ flex: 1, display: "flex" }} />
          <span style={{ color: HIGHLIGHT }}>yrjdev.dev</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
