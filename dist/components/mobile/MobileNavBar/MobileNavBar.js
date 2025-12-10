import { jsx as o, jsxs as c } from "react/jsx-runtime";
import l from "./MobileNavBar.module.css.js";
const f = ({
  items: d,
  activeIndex: v = 0,
  onItemClick: n,
  style: s = "top-bar",
  withSafeArea: N = !0,
  className: t = ""
}) => {
  const b = (a, e) => {
    e.onClick && e.onClick(), n && n(a);
  }, p = `
    ${l.mobileNavBar}
    ${s !== "top-bar" ? l[`style${s.charAt(0).toUpperCase() + s.slice(1).replace("-", "")}`] : ""}
    ${N ? l.withSafeArea : ""}
    ${t}
  `.trim();
  return /* @__PURE__ */ o("nav", { className: p, role: "navigation", "aria-label": "Mobile navigation", children: d.map((a, e) => {
    const i = a.icon, r = e === v;
    return a.href ? /* @__PURE__ */ c(
      "a",
      {
        href: a.href,
        className: `${l.mobileNavItem} ${r ? l.active : ""}`,
        "aria-label": a["aria-label"] || a.label,
        "aria-current": r ? "page" : void 0,
        onClick: (g) => {
          a.onClick && (g.preventDefault(), b(e, a));
        },
        children: [
          /* @__PURE__ */ c("div", { className: l.mobileNavIcon, children: [
            /* @__PURE__ */ o(i, { className: l.icon }),
            a.badge !== void 0 && a.badge !== 0 && /* @__PURE__ */ o("span", { className: `${l.mobileNavBadge} ${a.badge === "dot" ? l.dot : ""}`, children: a.badge !== "dot" ? a.badge : "" })
          ] }),
          /* @__PURE__ */ o("span", { className: l.mobileNavLabel, children: a.label })
        ]
      },
      e
    ) : /* @__PURE__ */ c(
      "button",
      {
        type: "button",
        className: `${l.mobileNavItem} ${r ? l.active : ""}`,
        "aria-label": a["aria-label"] || a.label,
        "aria-current": r ? "page" : void 0,
        onClick: () => b(e, a),
        children: [
          /* @__PURE__ */ c("div", { className: l.mobileNavIcon, children: [
            /* @__PURE__ */ o(i, { className: l.icon }),
            a.badge !== void 0 && a.badge !== 0 && /* @__PURE__ */ o("span", { className: `${l.mobileNavBadge} ${a.badge === "dot" ? l.dot : ""}`, children: a.badge !== "dot" ? a.badge : "" })
          ] }),
          /* @__PURE__ */ o("span", { className: l.mobileNavLabel, children: a.label })
        ]
      },
      e
    );
  }) });
};
export {
  f as MobileNavBar,
  f as default
};
//# sourceMappingURL=MobileNavBar.js.map
