import { jsxs as p, jsx as n, Fragment as y } from "react/jsx-runtime";
import { useState as k, useRef as B, useEffect as w } from "react";
import e from "./Menu.module.css.js";
const x = ({
  trigger: s,
  children: t,
  open: i,
  onOpenChange: r,
  align: a = "left",
  wide: f = !1,
  className: h = "",
  ...v
}) => {
  const [u, m] = k(!1), l = B(null), c = i !== void 0, o = c ? i : u, N = () => {
    const d = !o;
    c || m(d), r?.(d);
  }, C = () => {
    c || m(!1), r?.(!1);
  };
  w(() => {
    if (!o) return;
    const d = (g) => {
      l.current && !l.current.contains(g.target) && C();
    };
    return document.addEventListener("mousedown", d), () => {
      document.removeEventListener("mousedown", d);
    };
  }, [o]);
  const M = [e["menu-container"], h].filter(Boolean).join(" "), j = [
    e.menu,
    f && e["menu-wide"],
    a === "right" && e["menu-right"]
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ p("div", { className: M, ref: l, ...v, children: [
    /* @__PURE__ */ n("div", { onClick: N, children: s }),
    o && /* @__PURE__ */ n("div", { className: j, children: t })
  ] });
}, D = ({
  children: s,
  icon: t,
  shortcut: i,
  danger: r = !1,
  disabled: a = !1,
  onClick: f,
  className: h = "",
  as: v = "a",
  ...u
}) => {
  const m = [
    e["menu-item"],
    r && e["menu-item-danger"],
    a && e["menu-item-disabled"],
    h
  ].filter(Boolean).join(" "), l = (o) => {
    if (a) {
      o.preventDefault();
      return;
    }
    f?.(o);
  }, c = /* @__PURE__ */ p(y, { children: [
    t && /* @__PURE__ */ n("span", { className: e["menu-item-icon"], children: t }),
    /* @__PURE__ */ n("span", { children: s }),
    i && /* @__PURE__ */ n("span", { className: e["menu-shortcut"], children: i })
  ] });
  return v === "button" ? /* @__PURE__ */ n(
    "button",
    {
      className: m,
      onClick: l,
      disabled: a,
      type: "button",
      ...u,
      children: c
    }
  ) : /* @__PURE__ */ n(
    "a",
    {
      className: m,
      onClick: l,
      href: a ? void 0 : u.href || "#",
      ...u,
      children: c
    }
  );
}, E = ({ className: s = "" }) => {
  const t = [e["menu-divider"], s].filter(Boolean).join(" ");
  return /* @__PURE__ */ n("div", { className: t });
}, O = ({ children: s, className: t = "", ...i }) => {
  const r = [e["menu-header"], t].filter(Boolean).join(" ");
  return /* @__PURE__ */ n("div", { className: r, ...i, children: s });
};
x.displayName = "Menu";
D.displayName = "MenuItem";
E.displayName = "MenuDivider";
O.displayName = "MenuHeader";
export {
  x as Menu,
  E as MenuDivider,
  O as MenuHeader,
  D as MenuItem
};
//# sourceMappingURL=Menu.js.map
