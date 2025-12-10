import { jsxs as o, jsx as t } from "react/jsx-runtime";
import n from "./ConnectionIndicator.module.css.js";
const g = ({
  status: e,
  label: s,
  size: c = "md",
  showPulse: a = !1,
  className: r = ""
}) => {
  const i = e === "connecting" || a ? n.pulse : "";
  return /* @__PURE__ */ o(
    "div",
    {
      className: `${n.connectionIndicator} ${n[`status-${e}`]} ${n[`size-${c}`]} ${r}`,
      children: [
        /* @__PURE__ */ t("span", { className: `${n.connectionDot} ${i}` }),
        s && /* @__PURE__ */ t("span", { className: n.connectionLabel, children: s })
      ]
    }
  );
}, u = ({
  status: e,
  showPulse: s = !1,
  className: c = ""
}) => {
  const a = e === "connecting" || s ? n.pulse : "";
  return /* @__PURE__ */ t(
    "span",
    {
      className: `${n.connectionDotOnly} ${n[`dotOnly-${e}`]} ${a} ${c}`
    }
  );
}, d = ({
  strength: e,
  className: s = ""
}) => /* @__PURE__ */ o("div", { className: `${n.signalIndicator} ${n[`signal-${e}`]} ${s}`, children: [
  /* @__PURE__ */ t("span", { className: n.signalBar }),
  /* @__PURE__ */ t("span", { className: n.signalBar }),
  /* @__PURE__ */ t("span", { className: n.signalBar }),
  /* @__PURE__ */ t("span", { className: n.signalBar })
] }), p = (e) => e >= 4 ? "excellent" : e === 3 ? "good" : e === 2 ? "fair" : e === 1 ? "poor" : "none", m = (e, s, c) => s ? "connecting" : e ? c ? "warning" : "connected" : "disconnected";
export {
  u as ConnectionDot,
  g as ConnectionIndicator,
  d as SignalIndicator,
  m as getConnectionStatus,
  p as getSignalStrength
};
//# sourceMappingURL=ConnectionIndicator.js.map
