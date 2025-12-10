import { jsx as u, jsxs as k, Fragment as S } from "react/jsx-runtime";
import { useRef as z, useState as F, useEffect as I } from "react";
import n from "./Watermark.module.css.js";
const b = ({
  content: e = "Watermark",
  children: f,
  fontSize: o = 16,
  rotate: x = -45,
  opacity: $ = 0.08,
  gap: p = 100,
  fullscreen: r = !1,
  className: g = "",
  style: A = {}
}) => {
  const i = z(null), [W, v] = F([]);
  I(() => {
    const t = () => {
      if (!i.current) return;
      const E = r ? document.body : i.current, { offsetWidth: c, offsetHeight: m } = E;
      if (c === 0 || m === 0) return;
      const w = Math.sqrt(c * c + m * m), s = o + p, L = Math.ceil(w / s), M = Math.ceil(w / s), y = [], R = (Array.isArray(e) ? e : [e]).join(`
`);
      for (let l = 0; l < L; l++)
        for (let d = 0; d < M; d++)
          y.push({
            text: R,
            left: l * s,
            top: d * s
          });
      v(y);
    };
    t();
    const a = () => {
      t();
    };
    return window.addEventListener("resize", a), () => window.removeEventListener("resize", a);
  }, [e, o, p, r]);
  const j = {
    opacity: $
  }, N = {
    fontSize: `${o}px`,
    transform: `rotate(${x}deg)`
  }, h = /* @__PURE__ */ u(
    "div",
    {
      className: `${n.watermark} ${r ? n.watermarkFullscreen : ""}`,
      style: j,
      "aria-hidden": "true",
      children: W.map((t, a) => /* @__PURE__ */ u(
        "span",
        {
          className: n.watermarkText,
          style: {
            ...N,
            left: `${t.left}px`,
            top: `${t.top}px`,
            whiteSpace: Array.isArray(e) ? "pre-line" : "nowrap"
          },
          children: t.text
        },
        a
      ))
    }
  );
  return r ? /* @__PURE__ */ k(S, { children: [
    h,
    f
  ] }) : /* @__PURE__ */ k("div", { ref: i, className: `${n.watermarkContainer} ${g}`, style: A, children: [
    f,
    h
  ] });
};
b.displayName = "Watermark";
export {
  b as Watermark
};
//# sourceMappingURL=Watermark.js.map
