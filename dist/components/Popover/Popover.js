import { jsx as d } from "react/jsx-runtime";
import { useRef as y, useEffect as m } from "react";
import { createPortal as C } from "react-dom";
import { X as E } from "lucide-react";
import n from "./Popover.module.css.js";
const B = ({
  open: t,
  onClose: o,
  children: v,
  position: u = "bottom",
  wide: $ = !1,
  triggerRef: c,
  className: g = ""
}) => {
  const h = y(null);
  if (m(() => {
    if (!t) return;
    const p = (l) => {
      const e = l.target, r = c?.current;
      h.current && !h.current.contains(e) && r && !r.contains(e) && o();
    };
    return document.addEventListener("mousedown", p), () => document.removeEventListener("mousedown", p);
  }, [t, o, c]), m(() => {
    if (!t) return;
    const p = (l) => {
      l.key === "Escape" && (o(), c?.current && c.current.focus());
    };
    return document.addEventListener("keydown", p), () => document.removeEventListener("keydown", p);
  }, [t, o, c]), m(() => {
    if (!t || !h.current || !c?.current) return;
    const p = c.current, l = h.current, e = p.getBoundingClientRect(), r = l.getBoundingClientRect();
    let i = 0, s = 0;
    switch (u) {
      case "top":
        i = e.top - r.height - 8, s = e.left + e.width / 2 - r.width / 2;
        break;
      case "bottom":
        i = e.bottom + 8, s = e.left + e.width / 2 - r.width / 2;
        break;
      case "left":
        i = e.top + e.height / 2 - r.height / 2, s = e.left - r.width - 8;
        break;
      case "right":
        i = e.top + e.height / 2 - r.height / 2, s = e.right + 8;
        break;
    }
    const f = window.innerWidth, w = window.innerHeight, a = 8;
    s < a && (s = a), s + r.width > f - a && (s = f - r.width - a), i < a && (i = a), i + r.height > w - a && (i = w - r.height - a), l.style.top = `${i}px`, l.style.left = `${s}px`;
  }, [t, u, c]), !t) return null;
  const b = u === "top" ? n.popoverTop : u === "right" ? n.popoverRight : u === "left" ? n.popoverLeft : n.popoverBottom, k = $ ? n.popoverWide : "";
  return C(
    /* @__PURE__ */ d(
      "div",
      {
        ref: h,
        className: `${n.popover} ${b} ${k} ${g}`,
        role: "dialog",
        "aria-modal": "false",
        children: v
      }
    ),
    document.body
  );
}, T = ({ children: t, className: o = "" }) => /* @__PURE__ */ d("div", { className: `${n.popoverHeader} ${o}`, children: t }), W = ({ children: t, className: o = "" }) => /* @__PURE__ */ d("div", { className: `${n.popoverContent} ${o}`, children: t }), F = ({ children: t, className: o = "" }) => /* @__PURE__ */ d("div", { className: `${n.popoverFooter} ${o}`, children: t }), j = ({ children: t, className: o = "" }) => /* @__PURE__ */ d("span", { className: `${n.popoverTitle} ${o}`, children: t }), z = ({
  onClick: t,
  "aria-label": o = "Close popover",
  className: v = ""
}) => /* @__PURE__ */ d(
  "button",
  {
    className: `${n.popoverClose} ${v}`,
    onClick: t,
    "aria-label": o,
    type: "button",
    children: /* @__PURE__ */ d(E, { size: 16 })
  }
);
export {
  B as Popover,
  z as PopoverClose,
  W as PopoverContent,
  F as PopoverFooter,
  T as PopoverHeader,
  j as PopoverTitle
};
//# sourceMappingURL=Popover.js.map
