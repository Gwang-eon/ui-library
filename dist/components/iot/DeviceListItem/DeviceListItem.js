import { jsxs as n, Fragment as w, jsx as a } from "react/jsx-runtime";
import { ChevronRight as C } from "lucide-react";
import e from "./DeviceListItem.module.css.js";
const y = ({
  icon: i,
  name: c,
  status: m,
  statusBadge: d,
  meta: o = [],
  metrics: l = [],
  value: h,
  showCheckbox: g = !1,
  checked: u = !1,
  onCheckChange: x,
  actions: N,
  onClick: v,
  clickable: r = !1,
  compact: p = !1,
  offline: b = !1,
  className: L = ""
}) => {
  const f = `
    ${e.deviceListItem}
    ${p ? e.compact : ""}
    ${r ? e.clickable : ""}
    ${b ? e.offline : ""}
    ${l.length > 0 ? e.withMetrics : ""}
    ${L}
  `.trim(), $ = /* @__PURE__ */ n(w, { children: [
    g && /* @__PURE__ */ a(
      "input",
      {
        type: "checkbox",
        className: e.checkbox,
        checked: u,
        onChange: (s) => {
          s.stopPropagation(), x?.(s.target.checked);
        }
      }
    ),
    i && !p && /* @__PURE__ */ a("div", { className: e.icon, children: /* @__PURE__ */ a(i, { className: e.iconSvg }) }),
    /* @__PURE__ */ n("div", { className: e.content, children: [
      /* @__PURE__ */ n("div", { className: e.main, children: [
        /* @__PURE__ */ a("h4", { className: e.name, children: c }),
        d && d
      ] }),
      o.length > 0 && /* @__PURE__ */ a("div", { className: e.meta, children: o.map((s, t) => /* @__PURE__ */ a("span", { className: e.metaItem, children: s }, t)) }),
      l.length > 0 && /* @__PURE__ */ a("div", { className: e.metrics, children: l.map((s, t) => /* @__PURE__ */ n("div", { className: e.metric, children: [
        /* @__PURE__ */ a("span", { className: e.metricLabel, children: s.label }),
        /* @__PURE__ */ a(
          "span",
          {
            className: `${e.metricValue} ${s.warning ? e.metricValueWarning : ""} ${s.error ? e.metricValueError : ""}`,
            children: s.value
          }
        )
      ] }, t)) })
    ] }),
    h && /* @__PURE__ */ a("div", { className: e.value, children: h }),
    N && /* @__PURE__ */ a("div", { className: e.actions, children: N }),
    r && /* @__PURE__ */ a("div", { className: e.arrow, children: /* @__PURE__ */ a(C, { size: 16 }) })
  ] });
  return r && v ? /* @__PURE__ */ a("div", { className: f, onClick: v, role: "button", tabIndex: 0, children: $ }) : /* @__PURE__ */ a("div", { className: f, children: $ });
}, D = ({
  children: i,
  spaced: c = !1,
  className: m = ""
}) => /* @__PURE__ */ a(
  "div",
  {
    className: `${c ? e.containerSpaced : e.container} ${m}`,
    children: i
  }
);
export {
  D as DeviceListContainer,
  y as DeviceListItem
};
//# sourceMappingURL=DeviceListItem.js.map
