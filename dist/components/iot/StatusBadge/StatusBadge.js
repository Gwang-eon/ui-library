import { jsxs as u, jsx as t } from "react/jsx-runtime";
import a from "./StatusBadge.module.css.js";
const d = ({
  status: e,
  label: l,
  showIndicator: i = !0,
  pulse: r = !1,
  icon: c,
  className: n = ""
}) => {
  const p = e.split("-").map(
    (s, m) => m === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1)
  ).join(""), o = l ?? e.split("-").map(
    (s) => s.charAt(0).toUpperCase() + s.slice(1)
  ).join(" ");
  return /* @__PURE__ */ u("span", { className: `${a.statusBadge} ${a[`status${p.charAt(0).toUpperCase() + p.slice(1)}`]} ${n}`, children: [
    c && /* @__PURE__ */ t(c, { className: a.statusIcon }),
    i && /* @__PURE__ */ t(
      "span",
      {
        className: `${a.statusIndicator} ${r ? a.statusIndicatorPulse : ""}`
      }
    ),
    /* @__PURE__ */ t("span", { children: o })
  ] });
};
export {
  d as StatusBadge
};
//# sourceMappingURL=StatusBadge.js.map
