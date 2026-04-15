import Card from "./Card";
import { C } from "./theme";
import { ScrollReveal } from "../ScrollContext";

export default function Copilot() {
  return (
    <Card title="Clause review">
      <ScrollReveal order={0}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <span style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.02em", color: C.primary }}>4.1</span>
            <span style={{ fontSize: 14, color: C.textLabel }}>Context of the organisation</span>
          </div>
          <span style={{ fontSize: 11, fontWeight: 600, padding: "6px 14px", borderRadius: 9999, background: C.dangerBg, color: C.dangerDark, border: `1px solid ${C.dangerBorder}` }}>
            AI · Fail
          </span>
        </div>
      </ScrollReveal>
      <ScrollReveal order={1} from="right">
        <div style={{ borderRadius: 12, padding: 20, marginBottom: 24, background: C.neutral50, border: `1px solid ${C.neutral200}` }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 12, color: C.textLabel }}>
            Summary
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: C.textBody, margin: 0 }}>
            No documented evidence of internal and external issues relevant to
            the organisation's purpose{" "}
            <span style={{ fontSize: 12, fontWeight: 600, padding: "3px 8px", borderRadius: 4, background: C.primary50, color: C.primary700 }}>
              QMS Manual §2.1
            </span>
            .
          </p>
        </div>
      </ScrollReveal>
      <ScrollReveal order={2} from="scale">
        <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
          <button
            style={{
              flex: 1, fontSize: 14, fontWeight: 800, padding: "12px 0", borderRadius: 12,
              background: "transparent", border: `2px solid ${C.success}`, color: C.success, cursor: "pointer",
              transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            ✓ Pass
          </button>
          <button
            style={{
              flex: 1, fontSize: 14, fontWeight: 800, padding: "12px 0", borderRadius: 12,
              background: C.dangerBg, border: `2px solid ${C.danger}`, color: C.danger, cursor: "pointer",
              transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            ✗ Fail
          </button>
        </div>
      </ScrollReveal>
      <ScrollReveal order={3}>
        <div style={{ fontSize: 13, textAlign: "center", fontStyle: "italic", color: C.textLabel }}>
          Your judgement, on the record.
        </div>
      </ScrollReveal>
    </Card>
  );
}
