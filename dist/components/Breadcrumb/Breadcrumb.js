import { jsx as r, jsxs as o } from "react/jsx-runtime";
import i from "react";
import a from "./Breadcrumb.module.css.js";
const u = ({
  items: e,
  separator: c = "/",
  children: l,
  className: n = "",
  "aria-label": m = "Breadcrumb"
}) => {
  const b = [a.breadcrumb, n].filter(Boolean).join(" ");
  return e && e.length > 0 ? /* @__PURE__ */ r("nav", { className: b, "aria-label": m, children: e.map((s, t) => {
    const d = t === e.length - 1;
    return /* @__PURE__ */ o(i.Fragment, { children: [
      /* @__PURE__ */ o("div", { className: a["breadcrumb-item"], children: [
        s.icon && /* @__PURE__ */ r("span", { className: a["breadcrumb-icon"], children: s.icon }),
        d || !s.href ? /* @__PURE__ */ r("span", { className: a["breadcrumb-current"], "aria-current": d ? "page" : void 0, children: s.label }) : /* @__PURE__ */ r("a", { href: s.href, className: a["breadcrumb-link"], children: s.label })
      ] }),
      !d && /* @__PURE__ */ r("span", { className: a["breadcrumb-separator"], children: c })
    ] }, t);
  }) }) : /* @__PURE__ */ r("nav", { className: b, "aria-label": m, children: l });
}, p = ({
  href: e,
  icon: c,
  children: l,
  current: n = !1,
  className: m = "",
  ...b
}) => {
  const s = [a["breadcrumb-item"], m].filter(Boolean).join(" ");
  return /* @__PURE__ */ o("div", { className: s, children: [
    c && /* @__PURE__ */ r("span", { className: a["breadcrumb-icon"], children: c }),
    n || !e ? /* @__PURE__ */ r("span", { className: a["breadcrumb-current"], "aria-current": n ? "page" : void 0, children: l }) : /* @__PURE__ */ r("a", { href: e, className: a["breadcrumb-link"], ...b, children: l })
  ] });
}, N = ({
  children: e = "/",
  className: c = ""
}) => {
  const l = [a["breadcrumb-separator"], c].filter(Boolean).join(" ");
  return /* @__PURE__ */ r("span", { className: l, children: e });
};
u.displayName = "Breadcrumb";
p.displayName = "BreadcrumbItem";
N.displayName = "BreadcrumbSeparator";
export {
  u as Breadcrumb,
  p as BreadcrumbItem,
  N as BreadcrumbSeparator
};
//# sourceMappingURL=Breadcrumb.js.map
