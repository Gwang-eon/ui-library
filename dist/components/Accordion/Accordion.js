import { jsx as n, jsxs as s } from "react/jsx-runtime";
import { useState as v, useRef as i } from "react";
import { ChevronDown as x } from "lucide-react";
import e from "./Accordion.module.css.js";
const N = ({
  title: r,
  children: t,
  defaultOpen: u = !1,
  icon: d,
  className: h = ""
}) => {
  const [o, f] = v(u), c = i(null), l = i(`accordion-header-${Math.random().toString(36).substr(2, 9)}`), m = i(`accordion-content-${Math.random().toString(36).substr(2, 9)}`), p = () => {
    f(!o);
  }, g = (a) => {
    (a.key === "Enter" || a.key === " ") && (a.preventDefault(), p());
  }, y = o && c.current ? `${c.current.scrollHeight}px` : "0px", I = [
    e.accordionItem,
    o && e.accordionItemOpen,
    h
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ s("div", { className: I, children: [
    /* @__PURE__ */ s(
      "button",
      {
        id: l.current,
        className: e.accordionHeader,
        onClick: p,
        onKeyDown: g,
        "aria-expanded": o,
        "aria-controls": m.current,
        children: [
          /* @__PURE__ */ s("div", { style: { display: "flex", alignItems: "center", gap: "var(--spacing-2)" }, children: [
            d && /* @__PURE__ */ n("span", { children: d }),
            /* @__PURE__ */ n("span", { children: r })
          ] }),
          /* @__PURE__ */ n(x, { size: 20, className: e.accordionIcon })
        ]
      }
    ),
    /* @__PURE__ */ n(
      "div",
      {
        id: m.current,
        ref: c,
        className: e.accordionContent,
        style: { maxHeight: y },
        role: "region",
        "aria-labelledby": l.current,
        children: /* @__PURE__ */ n("div", { className: e.accordionBody, children: t })
      }
    )
  ] });
}, b = ({ children: r, className: t = "" }) => /* @__PURE__ */ n("div", { className: `${e.accordion} ${t}`, children: r });
b.Item = N;
export {
  b as Accordion
};
//# sourceMappingURL=Accordion.js.map
