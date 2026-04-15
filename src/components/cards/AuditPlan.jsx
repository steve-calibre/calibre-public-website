import Card from "./Card";
import { C } from "./theme";
import { ScrollReveal } from "../ScrollContext";
import useMediaQuery from "../../hooks/useMediaQuery";

const rows = [
  {
    t: "10:00", a: "Context of the Organisation", c: "4.1–4.4",
    qs: ["How do you sync cleaning protocols across the three NHS sites?"],
  },
  {
    t: "11:15", a: "Policy, Roles & Responsibilities", c: "5.2–5.3",
    qs: ["Who owns the chemical inventory register?"],
  },
  {
    t: "13:00", a: "Risk & Opportunities", c: "6.1",
    qs: ["Walk me through the risk assessment for clinical waste disposal routes."],
  },
];

export default function AuditPlan() {
  const isMobile = useMediaQuery('(max-width: 767px)');

  const gridCols = isMobile ? "50px 1fr" : "80px 1fr 100px";

  return (
    <Card title="Stage 1 plan · Day 1" tag="Tailored to this client">
      <ScrollReveal order={0}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: gridCols,
            fontSize: isMobile ? 10 : 11,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            paddingBottom: 12,
            marginBottom: 8,
            color: C.textLabel,
            borderBottom: `1px solid ${C.neutral200}`,
          }}
        >
          <span>Time</span>
          <span>Activity</span>
          {!isMobile && <span>Clauses</span>}
        </div>
      </ScrollReveal>
      {rows.map((row, i) => (
        <ScrollReveal key={i} order={i + 1}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: gridCols,
              fontSize: isMobile ? 13 : 14,
              padding: isMobile ? "14px 0" : "16px 0",
              borderBottom: i < 2 ? `1px solid ${C.neutral200}` : "none",
              color: C.textBody,
              alignItems: "start",
            }}
          >
            <span style={{ color: C.textLabel, fontWeight: 500, fontSize: isMobile ? 12 : 14 }}>{row.t}</span>
            <div>
              <div style={{ fontWeight: 600, marginBottom: 6, fontSize: isMobile ? 13 : 14 }}>{row.a}</div>
              {!isMobile && (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {row.qs.map((q, j) => (
                    <div key={j} style={{ fontSize: 14, display: "flex", gap: 8, color: C.neutral600 }}>
                      <span style={{ color: C.info, fontWeight: 600 }}>•</span>
                      <span>{q}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {!isMobile && <span style={{ color: C.textLabel, fontSize: 13, fontWeight: 500 }}>{row.c}</span>}
          </div>
        </ScrollReveal>
      ))}
    </Card>
  );
}
