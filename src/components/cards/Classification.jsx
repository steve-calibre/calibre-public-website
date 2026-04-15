import Card from "./Card";
import Chip from "./Chip";
import { C } from "./theme";
import { ScrollReveal } from "../ScrollContext";

export default function Classification() {
  return (
    <Card title="Classification">
      <ScrollReveal order={0} from="left">
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <Chip muted>NACE 81.22</Chip>
          <span style={{ color: C.neutral400 }}>→</span>
          <Chip active>EA 28</Chip>
        </div>
      </ScrollReveal>
      <div style={{ marginBottom: 24 }}>
        <ScrollReveal order={1}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12, color: C.textLabel }}>
            QMS Risk
          </div>
        </ScrollReveal>
        <ScrollReveal order={2} from="left">
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <span style={{ fontSize: 13, fontWeight: 600, padding: "6px 16px", borderRadius: 9999, background: C.warningBg, color: C.warning, border: `1px solid ${C.warningBorder}` }}>
              Medium
            </span>
            <span style={{ fontSize: 14, color: C.neutral400 }}>→</span>
            <span style={{ fontSize: 13, fontWeight: 600, padding: "6px 16px", borderRadius: 9999, background: C.dangerBg, color: C.dangerDark, border: `1px solid ${C.dangerBorder}` }}>
              AI · High
            </span>
          </div>
        </ScrollReveal>
        <ScrollReveal order={3}>
          <div style={{ borderRadius: 12, padding: 20, fontSize: 14, lineHeight: 1.7, background: C.infoBg, color: C.neutral600, border: `1px solid ${C.infoBorder}` }}>
            <span style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700, display: "block", marginBottom: 8, color: C.info }}>
              AI reasoning
            </span>
            Healthcare cleaning scope detected. Cross-contamination and
            infection-control risk in NHS settings requires enhanced sampling
            per IAF MD 5 Annex B. Default Medium does not apply.
          </div>
        </ScrollReveal>
      </div>
      <ScrollReveal order={4} from="scale">
        <div style={{ display: "flex", gap: 12 }}>
          <button style={{ fontSize: 14, fontWeight: 800, padding: "10px 20px", borderRadius: 12, background: C.primary, color: C.white, border: "none", cursor: "pointer", transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)" }}>
            Accept AI
          </button>
          <button style={{ fontSize: 14, fontWeight: 800, padding: "10px 20px", borderRadius: 12, border: `1px solid ${C.neutral200}`, color: C.neutral700, background: "transparent", cursor: "pointer", transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)" }}>
            Override
          </button>
        </div>
      </ScrollReveal>
    </Card>
  );
}
