import { jsxs as m, Fragment as f, jsx as t } from "react/jsx-runtime";
import d, { useState as u, useEffect as b, useRef as N } from "react";
import { X as $, Menu as w } from "lucide-react";
import n from "./Navbar.module.css.js";
const C = ({ children: a, className: r = "" }) => {
  const [e, o] = u(!1);
  b(() => (e ? document.body.style.overflow = "hidden" : document.body.style.overflow = "", () => {
    document.body.style.overflow = "";
  }), [e]);
  const i = () => {
    o(!e);
  }, c = () => {
    o(!1);
  }, s = d.Children.map(a, (l) => d.isValidElement(l) && l.type === g ? d.cloneElement(l, {
    isMobileMenuOpen: e,
    onClose: c
  }) : l);
  return /* @__PURE__ */ m(f, { children: [
    /* @__PURE__ */ m("nav", { className: `${n.navbar} ${r}`, children: [
      s,
      /* @__PURE__ */ t(
        "button",
        {
          className: n.navbarHamburger,
          onClick: i,
          "aria-label": "Toggle navigation menu",
          children: e ? /* @__PURE__ */ t($, { size: 24 }) : /* @__PURE__ */ t(w, { size: 24 })
        }
      )
    ] }),
    e && /* @__PURE__ */ t(
      "div",
      {
        className: `${n.navbarBackdrop} ${e ? n.show : ""}`,
        onClick: c
      }
    )
  ] });
}, I = ({ children: a, logo: r, className: e = "" }) => /* @__PURE__ */ m("div", { className: `${n.navbarBrand} ${e}`, children: [
  r,
  a && /* @__PURE__ */ t("span", { className: n.navbarBrandText, children: a })
] }), g = ({
  children: a,
  className: r = "",
  isMobileMenuOpen: e = !1,
  onClose: o
}) => {
  const i = () => {
    o && o();
  }, c = d.Children.map(a, (s) => d.isValidElement(s) && s.type === h ? d.cloneElement(s, {
    onMobileClick: i
  }) : s);
  return /* @__PURE__ */ t(
    "div",
    {
      className: `${n.navbarNav} ${e ? n.mobileMenuOpen : ""} ${r}`,
      children: c
    }
  );
}, h = ({
  children: a,
  href: r,
  active: e = !1,
  onClick: o,
  onMobileClick: i,
  className: c = ""
}) => {
  const s = () => {
    o && o(), i && i();
  }, l = `${n.navbarItem} ${e ? n.active : ""} ${c}`;
  return r ? /* @__PURE__ */ t(
    "a",
    {
      href: r,
      className: l,
      "aria-current": e ? "page" : void 0,
      onClick: s,
      children: a
    }
  ) : /* @__PURE__ */ t(
    "button",
    {
      className: l,
      "aria-current": e ? "page" : void 0,
      onClick: s,
      children: a
    }
  );
}, E = ({ children: a, className: r = "" }) => /* @__PURE__ */ t("div", { className: `${n.navbarSearch} ${r}`, children: a }), O = ({ children: a, className: r = "" }) => /* @__PURE__ */ t("div", { className: `${n.navbarActions} ${r}`, children: a }), x = ({
  trigger: a,
  children: r,
  align: e = "left",
  className: o = ""
}) => {
  const [i, c] = u(!1), s = N(null);
  b(() => {
    const v = (p) => {
      s.current && !s.current.contains(p.target) && c(!1);
    };
    return i && document.addEventListener("click", v), () => {
      document.removeEventListener("click", v);
    };
  }, [i]);
  const l = (v) => {
    v.stopPropagation(), c(!i);
  };
  return /* @__PURE__ */ m("div", { className: `${n.navbarDropdown} ${o}`, ref: s, children: [
    /* @__PURE__ */ t("div", { onClick: l, children: a }),
    /* @__PURE__ */ t(
      "div",
      {
        className: `${n.navbarDropdownMenu} ${e === "right" ? n.navbarDropdownMenuRight : ""} ${i ? n.show : ""}`,
        children: r
      }
    )
  ] });
}, B = ({
  children: a,
  href: r,
  onClick: e,
  className: o = ""
}) => r ? /* @__PURE__ */ t(
  "a",
  {
    href: r,
    className: `${n.navbarDropdownItem} ${o}`,
    onClick: e,
    children: a
  }
) : /* @__PURE__ */ t(
  "button",
  {
    className: `${n.navbarDropdownItem} ${o}`,
    onClick: e,
    children: a
  }
), R = () => /* @__PURE__ */ t("div", { className: n.navbarDropdownDivider });
export {
  C as Navbar,
  O as NavbarActions,
  I as NavbarBrand,
  x as NavbarDropdown,
  R as NavbarDropdownDivider,
  B as NavbarDropdownItem,
  h as NavbarItem,
  g as NavbarNav,
  E as NavbarSearch
};
//# sourceMappingURL=Navbar.js.map
