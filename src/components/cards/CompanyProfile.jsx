import Card from "./Card";
import Chip from "./Chip";
import { C } from "./theme";
import { ScrollReveal } from "../ScrollContext";

export default function CompanyProfile() {
  return (
    <Card title="Deep research" tag="612 sources">
      <ScrollReveal order={0}>
        <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 12, color: C.textBody, letterSpacing: "-0.01em" }}>
          Aldgate Associates Ltd
        </div>
      </ScrollReveal>
      <ScrollReveal order={1}>
        <p style={{ fontSize: 14, marginBottom: 24, lineHeight: 1.7, color: C.neutral600 }}>
          Commercial cleaning provider with expanding healthcare contracts across
          three NHS trust sites. COSHH-regulated, enhanced sampling scope.
        </p>
      </ScrollReveal>
      <ScrollReveal order={2} from="left">
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <Chip muted>NACE 81.22</Chip>
          <Chip muted>NACE 86.10</Chip>
          <span style={{ color: C.neutral400, fontSize: 14 }}>→</span>
          <Chip active>EA 28</Chip>
        </div>
      </ScrollReveal>
      <ScrollReveal order={3} from="scale">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            textAlign: "center",
            marginBottom: 24,
            paddingTop: 24,
            borderTop: `1px solid ${C.neutral200}`,
          }}
        >
          {[
            ["612", "Sources cross-checked"],
            ["27", "Legal obligations"],
          ].map(([v, l], i) => (
            <div key={i}>
              <div style={{ fontSize: 28, fontWeight: 700, color: C.primary, letterSpacing: "-0.02em" }}>{v}</div>
              <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase", marginTop: 4, color: C.textLabel }}>{l}</div>
            </div>
          ))}
        </div>
      </ScrollReveal>
      <ScrollReveal order={4} from="left">
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 500, color: C.success }}>
          <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: C.success }} />
          Companies House · HSE guidance · Sector bulletins · IAF MD 5
        </div>
      </ScrollReveal>
    </Card>
  );
}
