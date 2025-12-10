import { jsxs as l, jsx as i } from "react/jsx-runtime";
import { ArrowUp as j, ArrowDown as C, TrendingUp as D, TrendingDown as U } from "lucide-react";
import e from "./Statistic.module.css.js";
const $ = ({
  title: n,
  value: p,
  prefix: t,
  suffix: c,
  trend: a,
  icon: s,
  description: o,
  variant: d = "default",
  compact: m = !1,
  className: u
}) => {
  const h = () => {
    if (!a) return null;
    const r = { size: 16, "aria-hidden": !0 };
    return a.icon === "arrow" ? a.direction === "up" ? /* @__PURE__ */ i(j, { ...r }) : /* @__PURE__ */ i(C, { ...r }) : a.direction === "up" ? /* @__PURE__ */ i(D, { ...r }) : /* @__PURE__ */ i(U, { ...r });
  }, v = [
    e.statistic,
    m && e.compact,
    d !== "default" && e[d],
    u
  ].filter(Boolean).join(" "), f = [
    e.trend,
    a && e[`trend${a.direction === "up" ? "Up" : "Down"}`]
  ].filter(Boolean).join(" "), N = [
    e.icon,
    s?.variant && e[`icon${s.variant.charAt(0).toUpperCase() + s.variant.slice(1)}`]
  ].filter(Boolean).join(" "), w = a ? `${a.direction === "up" ? "Increased" : "Decreased"} by ${a.value}` : "";
  return /* @__PURE__ */ l("div", { className: v, children: [
    s && /* @__PURE__ */ l("div", { className: e.header, children: [
      /* @__PURE__ */ i("div", { className: N, "aria-hidden": "true", children: s.element }),
      /* @__PURE__ */ i("div", { className: e.title, children: n })
    ] }),
    !s && /* @__PURE__ */ i("div", { className: e.title, children: n }),
    /* @__PURE__ */ l("div", { className: e.value, role: "status", "aria-live": "polite", children: [
      t && /* @__PURE__ */ i("span", { className: e.prefix, children: t }),
      p,
      c && /* @__PURE__ */ i("span", { className: e.suffix, children: c })
    ] }),
    a && /* @__PURE__ */ l("div", { className: f, "aria-label": w, children: [
      h(),
      /* @__PURE__ */ i("span", { children: a.value })
    ] }),
    o && /* @__PURE__ */ i("div", { className: e.description, children: o })
  ] });
};
$.displayName = "Statistic";
export {
  $ as Statistic
};
//# sourceMappingURL=Statistic.js.map
