import Card from "./Card";
import { C } from "./theme";
import { ScrollReveal } from "../ScrollContext";

export default function NewAudit() {
  return (
    <Card title="New audit" tag="Stage 1">
      <ScrollReveal order={0}>
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.textLabel, display: "block", marginBottom: 8 }}>
            Client
          </label>
          <div
            style={{
              fontSize: 16, fontWeight: 600, padding: "12px 16px", borderRadius: 12,
              background: C.surfaceInput, border: `1px solid ${C.borderInput}`, color: C.textBody,
            }}
          >
            Aldgate Associates Ltd
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal order={1} from="left">
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.textLabel, display: "block", marginBottom: 8 }}>
            Standard
          </label>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["ISO 9001", "ISO 14001", "ISO 45001"].map((std, i) => (
              <span
                key={std}
                style={{
                  fontSize: 13, fontWeight: 600, padding: "8px 16px", borderRadius: 9999,
                  background: i === 2 ? C.primary : "transparent",
                  color: i === 2 ? C.white : C.textLabel,
                  border: i === 2 ? "none" : `1px solid ${C.borderInput}`,
                  cursor: "pointer",
                }}
              >
                {std}
              </span>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal order={2}>
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.textLabel, display: "block", marginBottom: 8 }}>
            Scope
          </label>
          <div
            style={{
              fontSize: 14, lineHeight: 1.7, padding: "12px 16px", borderRadius: 12,
              background: C.surfaceInput, border: `1px solid ${C.borderInput}`, color: C.neutral600,
            }}
          >
            Commercial cleaning services including healthcare facilities across three NHS trust sites.
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal order={3} from="scale">
        <button
          style={{
            width: "100%", fontSize: 14, fontWeight: 800, padding: "14px 0", borderRadius: 12,
            background: C.primary, color: C.white, border: "none", cursor: "pointer",
            transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          Start Audit →
        </button>
      </ScrollReveal>
    </Card>
  );
}
