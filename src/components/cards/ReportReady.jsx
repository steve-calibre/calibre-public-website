import Card from "./Card";
import { C } from "./theme";
import { ScrollReveal } from "../ScrollContext";

export default function ReportReady() {
  return (
    <Card title="Stage 1 Audit Report" tag="Draft · awaiting signature" tagColor={{ bg: C.successBg, fg: "#15803d", border: C.successBorder }}>
      <ScrollReveal order={0}>
        <div style={{ fontSize: 22, fontWeight: 600, marginBottom: 8, color: C.textBody, letterSpacing: "-0.01em" }}>
          Aldgate Associates Ltd
        </div>
        <div style={{ fontSize: 14, marginBottom: 24, color: C.textLabel }}>
          ISO 45001 · Stage 1 &nbsp;·&nbsp; Audited 14–15 April 2026 · Lead: S. Taylor
        </div>
      </ScrollReveal>
      <ScrollReveal order={1} from="scale">
        <div
          style={{
            borderRadius: 12, padding: 20, marginBottom: 24, display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr", gap: 16, textAlign: "center",
            background: C.neutral50, border: `1px solid ${C.neutral200}`,
          }}
        >
          {[
            ["70", "Clauses reviewed"],
            ["12", "3 major · 8 minor · 1 obs."],
            ["8", "Pages"],
          ].map(([v, l], i) => (
            <div key={i}>
              <div style={{ fontSize: 28, fontWeight: 700, color: C.primary, letterSpacing: "-0.02em" }}>{v}</div>
              <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase", marginTop: 4, color: C.textLabel }}>{l}</div>
            </div>
          ))}
        </div>
      </ScrollReveal>
      <ScrollReveal order={2} from="bottom">
        <div style={{ display: "flex", gap: 12 }}>
          <button style={{ fontSize: 14, fontWeight: 800, padding: "10px 16px", borderRadius: 12, flex: 1, background: C.primary, color: C.white, border: "none", cursor: "pointer", transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)" }}>
            View report
          </button>
          <button style={{ fontSize: 14, fontWeight: 800, padding: "10px 16px", borderRadius: 12, flex: 1, border: `1px solid ${C.neutral200}`, color: C.textBody, background: "transparent", cursor: "pointer", transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)" }}>
            PDF
          </button>
          <button style={{ fontSize: 14, fontWeight: 800, padding: "10px 16px", borderRadius: 12, flex: 1, border: `1px solid ${C.neutral200}`, color: C.textBody, background: "transparent", cursor: "pointer", transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)" }}>
            DOCX
          </button>
        </div>
      </ScrollReveal>
    </Card>
  );
}
