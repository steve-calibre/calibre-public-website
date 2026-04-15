import { C } from "./theme";

export default function Chip({ children, active, muted }) {
  return (
    <span
      style={{
        fontSize: 13,
        fontWeight: 600,
        padding: "6px 14px",
        borderRadius: 9999,
        display: "inline-block",
        background: active ? C.primary : muted ? C.surfaceInput : "transparent",
        color: active ? C.white : C.textLabel,
        border: active ? "none" : `1px solid ${C.borderInput}`,
      }}
    >
      {children}
    </span>
  );
}
