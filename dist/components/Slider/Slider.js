import { jsx as e, jsxs as d } from "react/jsx-runtime";
import { useState as R, useCallback as x } from "react";
import a from "./Slider.module.css.js";
const W = (l) => "range" in l && l.range === !0, B = (l) => W(l) ? /* @__PURE__ */ e(T, { ...l }) : /* @__PURE__ */ e(F, { ...l }), F = ({
  value: l,
  defaultValue: V = 0,
  min: n = 0,
  max: s = 100,
  step: y = 1,
  disabled: b = !1,
  label: r,
  showValue: o = !1,
  formatValue: M = (g) => String(g),
  showMinMax: j = !1,
  minLabel: w,
  maxLabel: $,
  iconBefore: v,
  iconAfter: m,
  helperText: S,
  onChange: h,
  className: N,
  ariaLabel: p
}) => {
  const [g, c] = R(V), i = l !== void 0, t = i ? l : g, k = x(
    (L) => {
      const I = Number(L.target.value);
      i || c(I), h?.(I);
    },
    [i, h]
  ), D = [a.container, N].filter(Boolean).join(" "), f = v || m;
  return /* @__PURE__ */ d("div", { className: D, children: [
    r && o && /* @__PURE__ */ d("div", { className: a.header, children: [
      /* @__PURE__ */ e("label", { className: a.label, children: r }),
      /* @__PURE__ */ e("span", { className: a.valueDisplay, children: M(t) })
    ] }),
    r && !o && /* @__PURE__ */ e("label", { className: a.label, children: r }),
    /* @__PURE__ */ d("div", { className: f ? a.sliderWithIcons : void 0, children: [
      v && /* @__PURE__ */ e("span", { className: a.iconBefore, children: v }),
      /* @__PURE__ */ e(
        "input",
        {
          type: "range",
          className: a.slider,
          min: n,
          max: s,
          step: y,
          value: t,
          disabled: b,
          onChange: k,
          "aria-label": p || (typeof r == "string" ? r : void 0),
          "aria-valuemin": n,
          "aria-valuemax": s,
          "aria-valuenow": t
        }
      ),
      m && /* @__PURE__ */ e("span", { className: a.iconAfter, children: m }),
      o && f && /* @__PURE__ */ e("span", { className: a.valueInline, children: M(t) })
    ] }),
    j && /* @__PURE__ */ d("div", { className: a.minMaxLabels, children: [
      /* @__PURE__ */ e("span", { children: w || n }),
      /* @__PURE__ */ e("span", { children: $ || s })
    ] }),
    S && /* @__PURE__ */ e("p", { className: a.helperText, children: S })
  ] });
}, T = ({
  value: l,
  defaultValue: V = [0, 100],
  min: n = 0,
  max: s = 100,
  step: y = 1,
  disabled: b = !1,
  label: r,
  showValue: o = !1,
  formatValue: M = (h, N) => `${h} - ${N}`,
  showMinMax: j = !1,
  minLabel: w,
  maxLabel: $,
  helperText: v,
  onChange: m,
  className: S
}) => {
  const [h, N] = R(V), p = l !== void 0, g = p ? l : h, [c, i] = g, t = x(
    (C, u) => {
      const P = [C, u];
      p || N(P), m?.(P);
    },
    [p, m]
  ), k = x(
    (C) => {
      const u = Number(C.target.value);
      u <= i && t(u, i);
    },
    [i, t]
  ), D = x(
    (C) => {
      const u = Number(C.target.value);
      u >= c && t(c, u);
    },
    [c, t]
  ), f = (c - n) / (s - n) * 100, L = (i - n) / (s - n) * 100, I = [a.container, S].filter(Boolean).join(" ");
  return /* @__PURE__ */ d("div", { className: I, children: [
    r && o && /* @__PURE__ */ d("div", { className: a.header, children: [
      /* @__PURE__ */ e("label", { className: a.label, children: r }),
      /* @__PURE__ */ e("span", { className: a.valueDisplay, children: M(c, i) })
    ] }),
    r && !o && /* @__PURE__ */ e("label", { className: a.label, children: r }),
    /* @__PURE__ */ d("div", { className: a.rangeWrapper, children: [
      /* @__PURE__ */ e("div", { className: a.rangeTrack }),
      /* @__PURE__ */ e(
        "div",
        {
          className: a.rangeFill,
          style: {
            left: `${f}%`,
            width: `${L - f}%`
          }
        }
      ),
      /* @__PURE__ */ e(
        "input",
        {
          type: "range",
          className: a.rangeInput,
          min: n,
          max: s,
          step: y,
          value: c,
          disabled: b,
          onChange: k,
          "aria-label": "Minimum value",
          "aria-valuemin": n,
          "aria-valuemax": s,
          "aria-valuenow": c
        }
      ),
      /* @__PURE__ */ e(
        "input",
        {
          type: "range",
          className: a.rangeInput,
          min: n,
          max: s,
          step: y,
          value: i,
          disabled: b,
          onChange: D,
          "aria-label": "Maximum value",
          "aria-valuemin": n,
          "aria-valuemax": s,
          "aria-valuenow": i
        }
      )
    ] }),
    j && /* @__PURE__ */ d("div", { className: a.minMaxLabels, children: [
      /* @__PURE__ */ e("span", { children: w || n }),
      /* @__PURE__ */ e("span", { children: $ || s })
    ] }),
    v && /* @__PURE__ */ e("p", { className: a.helperText, children: v })
  ] });
};
B.displayName = "Slider";
export {
  B as Slider
};
//# sourceMappingURL=Slider.js.map
