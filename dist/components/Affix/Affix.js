import { jsxs as C, Fragment as I, jsx as W } from "react/jsx-runtime";
import { useState as A, useRef as u, useCallback as R, useEffect as j } from "react";
import b from "./Affix.module.css.js";
const J = ({
  children: z,
  offsetTop: H,
  offsetBottom: O,
  target: e,
  onChange: f,
  className: N = "",
  zIndex: m = 100,
  style: P = {}
}) => {
  const [S, p] = A(!1), $ = u(null), k = u(null), [V, w] = A({}), [Y, h] = A({
    display: "none",
    height: 0,
    margin: 0,
    padding: 0
  }), t = u(!1), F = u({
    originalOffsetTop: 0,
    originalOffsetLeft: 0,
    elementWidth: 0,
    elementHeight: 0
  }), c = u(null), L = H !== void 0;
  L && O !== void 0 && console.warn("Affix: Both offsetTop and offsetBottom are set. Using offsetTop.");
  const x = L ? H : O, B = L ? "top" : "bottom", g = R(() => {
    const n = $.current, r = k.current;
    if (!n || !r) return;
    const i = e ? document.getElementById(e) : window;
    if (!i) return;
    const s = n.getBoundingClientRect(), v = i === window ? window.scrollY : i.scrollTop, E = i === window ? window.scrollX : i.scrollLeft;
    F.current = {
      originalOffsetTop: s.top + v,
      originalOffsetLeft: s.left + E,
      elementWidth: s.width,
      elementHeight: s.height
    };
  }, [e]), o = R(() => {
    c.current === null && (c.current = requestAnimationFrame(() => {
      if (c.current = null, !$.current) return;
      const r = e ? document.getElementById(e) : window;
      if (!r) return;
      const i = r === window ? window.scrollY : r.scrollTop, s = r === window ? window.innerHeight : r.clientHeight, { originalOffsetTop: v, originalOffsetLeft: E, elementWidth: y, elementHeight: T } = F.current;
      let l = !1;
      if (B === "top") {
        const a = x ?? 0;
        l = i > v - a, l && !t.current ? (t.current = !0, p(!0), h({
          display: "block",
          height: `${T}px`,
          width: `${y}px`,
          margin: 0,
          padding: 0,
          border: "none"
        }), w({
          position: "fixed",
          top: `${a}px`,
          left: `${E}px`,
          width: `${y}px`,
          zIndex: m
        }), f?.(!0)) : !l && t.current && (t.current = !1, p(!1), h({
          display: "none",
          height: 0,
          margin: 0,
          padding: 0
        }), w({}), f?.(!1));
      } else {
        const a = x ?? 0, q = v + T;
        l = i + s < q + a, l && !t.current ? (t.current = !0, p(!0), h({
          display: "block",
          height: `${T}px`,
          width: `${y}px`,
          margin: 0,
          padding: 0,
          border: "none"
        }), w({
          position: "fixed",
          bottom: `${a}px`,
          left: `${E}px`,
          width: `${y}px`,
          zIndex: m
        }), f?.(!0)) : !l && t.current && (t.current = !1, p(!1), h({
          display: "none",
          height: 0,
          margin: 0,
          padding: 0
        }), w({}), f?.(!1));
      }
    }));
  }, [x, B, e, m, f]), d = R(() => {
    t.current || g(), o();
  }, [g, o]);
  return j(() => {
    g();
  }, [g]), j(() => {
    const n = e ? document.getElementById(e) : window;
    if (!n) {
      e && console.warn(`Affix: Target container with id "${e}" not found.`);
      return;
    }
    return o(), n === window ? (window.addEventListener("scroll", o, { passive: !0 }), window.addEventListener("resize", d)) : (n.addEventListener("scroll", o, { passive: !0 }), window.addEventListener("resize", d)), () => {
      c.current !== null && cancelAnimationFrame(c.current), n === window ? (window.removeEventListener("scroll", o), window.removeEventListener("resize", d)) : (n.removeEventListener("scroll", o), window.removeEventListener("resize", d));
    };
  }, [x, B, e, m, o, d]), /* @__PURE__ */ C(I, { children: [
    /* @__PURE__ */ W(
      "div",
      {
        ref: $,
        className: `${b.affix} ${S ? b.affixActive : ""} ${N}`,
        style: { ...V, ...P },
        "data-affixed": S,
        children: z
      }
    ),
    /* @__PURE__ */ W(
      "div",
      {
        ref: k,
        style: Y,
        "aria-hidden": "true",
        className: b.affixPlaceholder
      }
    )
  ] });
};
export {
  J as Affix
};
//# sourceMappingURL=Affix.js.map
