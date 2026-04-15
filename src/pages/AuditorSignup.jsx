import CompanyProfile from "../components/cards/CompanyProfile";
import Classification from "../components/cards/Classification";
import LegalRegister from "../components/cards/LegalRegister";
import AuditPlan from "../components/cards/AuditPlan";
import Copilot from "../components/cards/Copilot";
import ReportReady from "../components/cards/ReportReady";
import { C, font } from "../components/cards/theme";

const items = [
  { n: "01", label: "Company deep research", el: <CompanyProfile /> },
  { n: "02", label: "EA code + risk classification", el: <Classification /> },
  { n: "03", label: "Legal register", el: <LegalRegister /> },
  { n: "04", label: "Stage 1 audit plan", el: <AuditPlan /> },
  { n: "05", label: "Document review co-pilot", el: <Copilot /> },
  { n: "06", label: "Report generated", el: <ReportReady /> },
];

export default function AuditorSignup() {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        padding: "64px 64px",
        background: C.neutral50,
        fontFamily: font,
        boxSizing: "border-box",
        color: C.textBody,
      }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto 64px" }}>
        <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16, color: C.primary }}>
          Auditor OS · Private Beta
        </div>
        <h1 style={{ fontSize: 48, fontWeight: 600, letterSpacing: "-0.02em", marginBottom: 16, color: C.textBody, lineHeight: 1.1 }}>
          Stage 1 in hours, not days.
        </h1>
        <p style={{ fontSize: 18, color: C.neutral600, margin: 0, lineHeight: 1.6 }}>
          Built by auditors, for auditors. Six moments from new audit to
          signed report — stripped to what matters.
        </p>
      </div>

      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          display: "grid",
          gap: 48,
          gridTemplateColumns: "repeat(2, 1fr)",
        }}
      >
        {items.map((it, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: C.textLabel }}>
              {it.n} &nbsp;·&nbsp; {it.label}
            </div>
            {it.el}
          </div>
        ))}
      </div>

      <div
        style={{
          maxWidth: 1400,
          margin: "80px auto 0",
          paddingTop: 40,
          fontSize: 14,
          color: C.textLabel,
          borderTop: `1px solid ${C.neutral200}`,
        }}
      >
        On our ISO 9001 benchmarks: Claude 35% · Auditor OS 70%+.
      </div>
    </div>
  );
}
