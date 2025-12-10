import { jsxs as u, Fragment as v, jsx as a } from "react/jsx-runtime";
import l, { useState as $, useEffect as p } from "react";
import { X as h } from "lucide-react";
import n from "./Navbar.module.css.js";
const w = ({ children: t, open: r = !1, onClose: i, className: d = "" }) => {
  const [e, c] = $(r);
  p(() => {
    c(r);
  }, [r]), p(() => (e ? document.body.style.overflow = "hidden" : document.body.style.overflow = "", () => {
    document.body.style.overflow = "";
  }), [e]);
  const o = () => {
    c(!1), i && i();
  }, f = () => {
    o();
  };
  p(() => {
    const s = (b) => {
      b.key === "Escape" && e && o();
    };
    return document.addEventListener("keydown", s), () => {
      document.removeEventListener("keydown", s);
    };
  }, [e]);
  const m = l.Children.map(t, (s) => l.isValidElement(s) && s.type === y ? l.cloneElement(s, {
    onItemClick: o
  }) : s);
  return /* @__PURE__ */ u(v, { children: [
    /* @__PURE__ */ u("nav", { className: `${n.sidebar} ${e ? n.mobileOpen : ""} ${d}`, children: [
      /* @__PURE__ */ a(
        "button",
        {
          className: n.sidebarClose,
          onClick: o,
          "aria-label": "Close sidebar",
          children: /* @__PURE__ */ a(h, { size: 20 })
        }
      ),
      m
    ] }),
    e && /* @__PURE__ */ a(
      "div",
      {
        className: `${n.sidebarBackdrop} ${e ? n.show : ""}`,
        onClick: f
      }
    )
  ] });
}, I = ({ children: t, logo: r, className: i = "" }) => /* @__PURE__ */ u("div", { className: `${n.sidebarHeader} ${i}`, children: [
  r,
  t
] }), y = ({ children: t, className: r = "", onItemClick: i }) => {
  const d = l.Children.map(t, (e) => l.isValidElement(e) && e.type === k ? l.cloneElement(e, {
    onMobileClick: i
  }) : e);
  return /* @__PURE__ */ a("div", { className: `${n.sidebarNav} ${r}`, children: d });
}, k = ({
  children: t,
  icon: r,
  badge: i,
  href: d,
  active: e = !1,
  onClick: c,
  onMobileClick: o,
  className: f = ""
}) => {
  const m = () => {
    c && c(), o && o();
  }, s = `${n.sidebarItem} ${e ? n.active : ""} ${f}`, b = /* @__PURE__ */ u(v, { children: [
    r,
    /* @__PURE__ */ a("span", { children: t }),
    i
  ] });
  return d ? /* @__PURE__ */ a(
    "a",
    {
      href: d,
      className: s,
      "aria-current": e ? "page" : void 0,
      onClick: m,
      children: b
    }
  ) : /* @__PURE__ */ a(
    "button",
    {
      className: s,
      "aria-current": e ? "page" : void 0,
      onClick: m,
      children: b
    }
  );
}, g = () => /* @__PURE__ */ a("div", { className: n.sidebarDivider }), x = ({ children: t, className: r = "" }) => /* @__PURE__ */ a("div", { className: `${n.sidebarFooter} ${r}`, children: t });
export {
  w as Sidebar,
  g as SidebarDivider,
  x as SidebarFooter,
  I as SidebarHeader,
  k as SidebarItem,
  y as SidebarNav
};
//# sourceMappingURL=Sidebar.js.map
