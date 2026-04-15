import { C } from "./theme";

export default function Card({ title, tag, children, tagColor }) {
  return (
    <div
      style={{
        width: "100%",
        borderRadius: 16,
        background: C.white,
        border: `1px solid ${C.neutral200}`,
        boxShadow: C.shadowMd,
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <div style={{ padding: "20px 24px", background: "linear-gradient(180deg, #ffffff 0%, #fafafa 100%)", borderBottom: `1px solid ${C.neutral200}` }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700, color: C.textLabel }}>
            {title}
          </div>
          {tag && (
            <span
              style={{
                fontSize: 11,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                fontWeight: 600,
                padding: "4px 12px",
                borderRadius: 9999,
                background: tagColor?.bg ?? C.primary50,
                color: tagColor?.fg ?? C.primary700,
                border: `1px solid ${tagColor?.border ?? C.neutral200}`,
              }}
            >
              {tag}
            </span>
          )}
        </div>
      </div>
      <div style={{ padding: 24 }}>
        {children}
      </div>
    </div>
  );
}
