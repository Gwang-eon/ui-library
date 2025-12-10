import { jsx as d, jsxs as $, Fragment as ce } from "react/jsx-runtime";
import { useState as C, useRef as E, useCallback as p, useEffect as ae } from "react";
import t from "./Knob.module.css.js";
const de = ({
  value: k,
  defaultValue: T = 0,
  min: r = 0,
  max: s = 100,
  step: i = 1,
  label: m,
  showLabels: j = !1,
  showIndicator: K = !0,
  size: R = "md",
  variant: U = "primary",
  disabled: h = !1,
  readOnly: f = !1,
  onChange: N,
  className: F = ""
}) => {
  const [W, H] = C(T), [D, x] = C(!1), w = E(null), A = E(0), M = E(0), c = k !== void 0 ? k : W, S = p((e) => Math.max(r, Math.min(s, e)), [r, s]), X = p((e) => Math.round(e / i) * i, [i]), q = p((e) => {
    const o = i.toString().includes(".") ? i.toString().split(".")[1].length : 0;
    return e.toFixed(o);
  }, [i]), L = p((e) => {
    const o = S(X(e));
    k === void 0 && H(o), N?.(o);
  }, [S, X, k, N]), y = (e, o) => {
    if (!w.current) return 0;
    const a = w.current.getBoundingClientRect(), n = a.left + a.width / 2, l = a.top + a.height / 2, g = e - n, V = o - l;
    let u = Math.atan2(V, g) * (180 / Math.PI);
    return u = (u + 360) % 360, u;
  }, G = (e) => {
    h || f || (e.preventDefault(), x(!0), A.current = y(e.clientX, e.clientY), M.current = c);
  }, J = (e) => {
    if (h || f) return;
    e.preventDefault();
    const o = e.touches[0];
    x(!0), A.current = y(o.clientX, o.clientY), M.current = c;
  }, Q = (e) => {
    if (h || f) return;
    const a = (s - r) * 0.1;
    let n = c;
    switch (e.key) {
      case "ArrowUp":
      case "ArrowRight":
        e.preventDefault(), n = c + i;
        break;
      case "ArrowDown":
      case "ArrowLeft":
        e.preventDefault(), n = c - i;
        break;
      case "PageUp":
        e.preventDefault(), n = c + a;
        break;
      case "PageDown":
        e.preventDefault(), n = c - a;
        break;
      case "Home":
        e.preventDefault(), n = r;
        break;
      case "End":
        e.preventDefault(), n = s;
        break;
      default:
        return;
    }
    L(n);
  };
  ae(() => {
    if (!D) return;
    const e = (l, g) => {
      let u = y(l, g) - A.current;
      u > 180 && (u -= 360), u < -180 && (u += 360);
      const ne = s - r, oe = u / 360 * ne, re = M.current + oe;
      L(re);
    }, o = (l) => {
      e(l.clientX, l.clientY);
    }, a = (l) => {
      l.preventDefault();
      const g = l.touches[0];
      e(g.clientX, g.clientY);
    }, n = () => {
      x(!1);
    };
    return document.addEventListener("mousemove", o), document.addEventListener("mouseup", n), document.addEventListener("touchmove", a, { passive: !1 }), document.addEventListener("touchend", n), () => {
      document.removeEventListener("mousemove", o), document.removeEventListener("mouseup", n), document.removeEventListener("touchmove", a), document.removeEventListener("touchend", n);
    };
  }, [D, s, r, L]);
  const v = 85, b = 2 * Math.PI * v, Y = (c - r) / (s - r), B = 135, I = 270, Z = B + Y * I, _ = I / 360 * b * Y, z = b - _, P = Z * Math.PI / 180, O = 100 + v * Math.cos(P), ee = 100 + v * Math.sin(P), te = [
    t.knob,
    R === "sm" && t["knob--sm"],
    R === "lg" && t["knob--lg"],
    t[`knob--${U}`],
    h && t["knob--disabled"],
    f && t["knob--readonly"],
    D && t["knob-dragging"],
    F
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ d(
    "div",
    {
      ref: w,
      className: te,
      onMouseDown: G,
      onTouchStart: J,
      onKeyDown: Q,
      role: "slider",
      "aria-valuenow": c,
      "aria-valuemin": r,
      "aria-valuemax": s,
      "aria-disabled": h,
      "aria-readonly": f,
      "aria-label": m ? `${m} control` : "Value control",
      tabIndex: h || f ? -1 : 0,
      children: /* @__PURE__ */ $("svg", { className: t["knob-svg"], viewBox: "0 0 200 200", children: [
        /* @__PURE__ */ d(
          "circle",
          {
            className: t["knob-track"],
            cx: "100",
            cy: "100",
            r: v,
            fill: "none",
            strokeWidth: "12"
          }
        ),
        /* @__PURE__ */ d(
          "circle",
          {
            className: t["knob-progress"],
            cx: "100",
            cy: "100",
            r: v,
            fill: "none",
            strokeWidth: "12",
            strokeLinecap: "round",
            strokeDasharray: `${b} ${b}`,
            strokeDashoffset: z,
            style: {
              transformOrigin: "center",
              transform: `rotate(${B}deg)`
            }
          }
        ),
        K && /* @__PURE__ */ d(
          "circle",
          {
            className: t["knob-handle"],
            cx: O,
            cy: ee,
            r: "8"
          }
        ),
        /* @__PURE__ */ d(
          "text",
          {
            className: t["knob-value"],
            x: "100",
            y: m ? "95" : "100",
            textAnchor: "middle",
            dominantBaseline: "middle",
            children: q(c)
          }
        ),
        m && /* @__PURE__ */ d(
          "text",
          {
            className: t["knob-label"],
            x: "100",
            y: "120",
            textAnchor: "middle",
            dominantBaseline: "middle",
            children: m
          }
        ),
        j && /* @__PURE__ */ $(ce, { children: [
          /* @__PURE__ */ d(
            "text",
            {
              className: t["knob-min-label"],
              x: "30",
              y: "175",
              textAnchor: "middle",
              children: r
            }
          ),
          /* @__PURE__ */ d(
            "text",
            {
              className: t["knob-max-label"],
              x: "170",
              y: "175",
              textAnchor: "middle",
              children: s
            }
          )
        ] })
      ] })
    }
  );
};
export {
  de as Knob
};
//# sourceMappingURL=Knob.js.map
