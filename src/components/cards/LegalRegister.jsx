import Card from "./Card";
import { C } from "./theme";
import { ScrollReveal } from "../ScrollContext";

const regulations = [
  { k: "Environmental Protection Act 1990", cite: "§34 — duty of care", v: "Waste handling across three clinical sites." },
  { k: "COSHH 2002", cite: "Reg. 7 — control of exposure", v: "Disinfectants, sporicides, hospital-grade chemistries." },
  { k: "Hazardous Waste Regs 2005", cite: "Reg. 23 — consignee returns", v: "Clinical waste segregation from cleaning ops." },
];

export default function LegalRegister() {
  return (
    <Card title="Legal register · ISO 14001" tag="Reviewed against HSE">
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {regulations.map((r, i) => (
          <ScrollReveal key={i} order={i} from={i % 2 === 0 ? "left" : "right"}>
            <div
              style={{ display: "flex", gap: 16, paddingBottom: 20, borderBottom: i < 2 ? `1px solid ${C.neutral200}` : "none" }}
            >
              <span
                style={{
                  fontSize: 12, fontWeight: 600, width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center",
                  justifyContent: "center", background: C.surfaceInput, color: C.textLabel, flexShrink: 0, border: `1px solid ${C.borderInput}`,
                }}
              >
                {i + 1}
              </span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: C.textBody }}>
                  {r.k}{" "}
                  <span style={{ fontSize: 13, fontWeight: 500, color: C.info }}>{r.cite}</span>
                </div>
                <div style={{ fontSize: 14, marginTop: 6, color: C.neutral600 }}>{r.v}</div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
      <ScrollReveal order={3}>
        <div style={{ fontSize: 13, marginTop: 24, color: C.textLabel }}>
          + 6 more obligations &nbsp;·&nbsp; sector checks cleared (no asbestos, no DSEAR triggers)
        </div>
      </ScrollReveal>
    </Card>
  );
}
