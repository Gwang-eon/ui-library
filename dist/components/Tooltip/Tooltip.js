import { jsxs as H, Fragment as N, jsx as V } from "react/jsx-runtime";
import W, { useId as S, useState as $, useRef as a, useEffect as x } from "react";
import { createPortal as q } from "react-dom";
import c from "./Tooltip.module.css.js";
const z = ({
  content: y,
  children: d,
  position: l = "top",
  delay: B = 300,
  rich: k = !1,
  className: C = "",
  id: E
}) => {
  const I = S(), g = E || `tooltip-${I}`, [p, m] = $(!1), [w, M] = $({ top: 0, left: 0 }), s = a(void 0), h = a(null), f = a(null), b = () => {
    s.current && clearTimeout(s.current), s.current = setTimeout(() => {
      m(!0);
    }, B);
  }, R = () => {
    s.current && clearTimeout(s.current), m(!1);
  };
  x(() => {
    if (!p || !h.current || !f.current) return;
    const o = h.current, j = f.current, t = o.getBoundingClientRect(), e = j.getBoundingClientRect();
    let i = 0, r = 0;
    switch (l) {
      case "top":
        i = t.top - e.height - 8, r = t.left + t.width / 2 - e.width / 2;
        break;
      case "bottom":
        i = t.bottom + 8, r = t.left + t.width / 2 - e.width / 2;
        break;
      case "left":
        i = t.top + t.height / 2 - e.height / 2, r = t.left - e.width - 8;
        break;
      case "right":
        i = t.top + t.height / 2 - e.height / 2, r = t.right + 8;
        break;
    }
    const T = window.innerWidth, v = window.innerHeight, n = 8;
    r < n && (r = n), r + e.width > T - n && (r = T - e.width - n), i < n && (i = n), i + e.height > v - n && (i = v - e.height - n), M({ top: i, left: r });
  }, [p, l]), x(() => () => {
    s.current && clearTimeout(s.current);
  }, []);
  const u = d.props, P = W.cloneElement(d, {
    ref: h,
    onMouseEnter: (o) => {
      b(), u.onMouseEnter?.(o);
    },
    onMouseLeave: (o) => {
      R(), u.onMouseLeave?.(o);
    },
    onFocus: (o) => {
      b(), u.onFocus?.(o);
    },
    onBlur: (o) => {
      R(), u.onBlur?.(o);
    },
    "aria-describedby": p ? g : void 0
  }), F = l === "top" ? c.tooltipTop : l === "right" ? c.tooltipRight : l === "left" ? c.tooltipLeft : c.tooltipBottom, L = k ? c.tooltipRich : "";
  return /* @__PURE__ */ H(N, { children: [
    P,
    p && q(
      /* @__PURE__ */ V(
        "div",
        {
          ref: f,
          className: `${c.tooltip} ${F} ${L} ${C}`,
          role: "tooltip",
          id: g,
          style: {
            top: `${w.top}px`,
            left: `${w.left}px`
          },
          children: y
        }
      ),
      document.body
    )
  ] });
};
z.displayName = "Tooltip";
export {
  z as Tooltip
};
//# sourceMappingURL=Tooltip.js.map
