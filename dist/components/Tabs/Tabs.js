import { jsx as c, jsxs as N } from "react/jsx-runtime";
import { createContext as x, useState as g, useContext as j } from "react";
import t from "./Tabs.module.css.js";
const f = x(void 0), u = () => {
  const a = j(f);
  if (!a)
    throw new Error("Tabs components must be used within a Tabs component");
  return a;
}, y = ({
  value: a,
  defaultValue: s,
  onChange: e,
  variant: n = "line",
  size: o = "md",
  orientation: l = "horizontal",
  children: i,
  className: r = ""
}) => {
  const [d, v] = g(s || ""), b = a !== void 0, p = {
    value: b ? a : d,
    onChange: (h) => {
      b || v(h), e?.(h);
    },
    variant: n,
    size: o,
    orientation: l
  }, T = [
    l === "vertical" && t["tabs-vertical-container"],
    r
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ c(f.Provider, { value: p, children: /* @__PURE__ */ c("div", { className: T, children: i }) });
}, B = ({ children: a, className: s = "", ...e }) => {
  const { variant: n, size: o, orientation: l } = u(), i = [
    t.tabs,
    n === "contained" && t["tabs-contained"],
    n === "pills" && t["tabs-pills"],
    n === "icon-bar" && t["tabs-icon-bar"],
    o === "sm" && t["tabs-sm"],
    o === "lg" && t["tabs-lg"],
    l === "vertical" && t["tabs-vertical"],
    s
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ c("div", { className: i, role: "tablist", ...e, children: a });
}, P = ({
  value: a,
  children: s,
  icon: e,
  badge: n,
  counter: o,
  disabled: l = !1,
  className: i = "",
  ...r
}) => {
  const { value: d, onChange: v, variant: b } = u(), m = d === a, C = () => {
    l || v(a);
  }, p = [t.tab, m && t.active, i].filter(Boolean).join(" ");
  return /* @__PURE__ */ N(
    "button",
    {
      className: p,
      role: "tab",
      "aria-selected": m,
      "aria-controls": `tabpanel-${a}`,
      disabled: l,
      onClick: C,
      ...r,
      children: [
        e && /* @__PURE__ */ c("span", { className: t["tab-icon"], children: e }),
        /* @__PURE__ */ c("span", { children: s }),
        n && /* @__PURE__ */ c("span", { className: t["tab-badge"], children: n }),
        o !== void 0 && /* @__PURE__ */ c("span", { className: b === "icon-bar" ? t["tab-counter"] : t["tab-badge"], children: o })
      ]
    }
  );
}, $ = ({
  value: a,
  children: s,
  className: e = "",
  keepMounted: n = !1,
  ...o
}) => {
  const { value: l } = u(), i = l === a, r = [t["tab-panel"], i && t.active, e].filter(Boolean).join(" ");
  return !i && !n ? null : /* @__PURE__ */ c(
    "div",
    {
      className: r,
      role: "tabpanel",
      id: `tabpanel-${a}`,
      "aria-labelledby": `tab-${a}`,
      hidden: !i,
      ...o,
      children: s
    }
  );
}, k = ({ children: a, className: s = "", ...e }) => {
  const n = [t["tab-content"], s].filter(Boolean).join(" ");
  return /* @__PURE__ */ c("div", { className: n, ...e, children: a });
};
y.displayName = "Tabs";
B.displayName = "TabsList";
P.displayName = "Tab";
$.displayName = "TabPanel";
k.displayName = "TabContent";
export {
  P as Tab,
  k as TabContent,
  $ as TabPanel,
  y as Tabs,
  B as TabsList
};
//# sourceMappingURL=Tabs.js.map
