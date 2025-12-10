import { jsxs as r, jsx as c } from "react/jsx-runtime";
import { useState as k, useRef as W, useEffect as B } from "react";
import { Plus as X, Palette as J } from "lucide-react";
import { Button as S } from "../Button/Button.js";
import e from "./ColorPicker.module.css.js";
const b = (m) => {
  const d = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(m);
  return d ? {
    r: parseInt(d[1], 16),
    g: parseInt(d[2], 16),
    b: parseInt(d[3], 16)
  } : null;
}, K = (m, d, $) => "#" + [m, d, $].map((g) => {
  const h = g.toString(16);
  return h.length === 1 ? "0" + h : h;
}).join("").toUpperCase(), L = (m) => /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(m), Y = [
  "#EF4444",
  // red
  "#F59E0B",
  // orange
  "#10B981",
  // green
  "#3B82F6",
  // blue
  "#6366F1",
  // indigo
  "#8B5CF6",
  // purple
  "#EC4899",
  // pink
  "#14B8A6",
  // teal
  "#F97316",
  // orange-2
  "#06B6D4",
  // cyan
  "#84CC16",
  // lime
  "#64748B"
  // slate
], A = "color-picker-recent", q = 5, Q = ({
  value: m,
  defaultValue: d = "#3B82F6",
  onChange: $,
  label: g,
  presets: h = Y,
  showRecent: y = !0,
  compact: z = !1,
  size: D = "md",
  allowCustom: E = !0,
  disabled: u = !1,
  className: V = "",
  children: w
}) => {
  const F = m !== void 0, [_, j] = k(d), s = F ? m : _, [f, p] = k(!1), [i, N] = k(s), [t, v] = k(b(s) || { r: 59, g: 130, b: 246 }), [R, G] = k([]), P = W(null), [O, x] = k(!1);
  B(() => {
    if (y)
      try {
        const l = localStorage.getItem(A);
        l && G(JSON.parse(l));
      } catch (l) {
        console.error("Failed to load recent colors:", l);
      }
  }, [y]), B(() => {
    N(s);
    const l = b(s);
    l && v(l);
  }, [s]);
  const I = (l) => {
    if (!L(l)) return;
    const a = l.startsWith("#") ? l : `#${l}`;
    if (F || j(a), $?.(a), y) {
      const n = [a, ...R.filter((o) => o !== a)].slice(
        0,
        q
      );
      G(n);
      try {
        localStorage.setItem(A, JSON.stringify(n));
      } catch (o) {
        console.error("Failed to save recent colors:", o);
      }
    }
  }, T = (l) => {
    const a = l.target.value;
    if (N(a), L(a)) {
      const n = a.startsWith("#") ? a : `#${a}`, o = b(n);
      o && v(o);
    }
  }, C = (l, a) => {
    const n = Math.max(0, Math.min(255, parseInt(a) || 0)), o = { ...t, [l]: n };
    v(o);
    const U = K(o.r, o.g, o.b);
    N(U);
  }, H = () => {
    if (L(i)) {
      const l = i.startsWith("#") ? i : `#${i}`;
      I(l), p(!1);
    }
  }, M = () => {
    N(s);
    const l = b(s);
    l && v(l), p(!1);
  };
  return B(() => {
    const l = (a) => {
      P.current && !P.current.contains(a.target) && (p(!1), x(!1));
    };
    return document.addEventListener("mousedown", l), () => document.removeEventListener("mousedown", l);
  }, []), z ? /* @__PURE__ */ r("div", { className: `${e.colorPickerCompact} ${V}`, ref: P, children: [
    g && /* @__PURE__ */ c("label", { className: e.colorPickerLabel, children: g }),
    /* @__PURE__ */ r("div", { className: `${e.colorSwatches} ${D === "sm" ? e.colorSwatchesSm : ""}`, children: [
      h.map((l) => /* @__PURE__ */ c(
        "button",
        {
          type: "button",
          className: `${e.colorSwatchBtn} ${s === l ? e.colorSwatchBtnActive : ""}`,
          style: { backgroundColor: l },
          onClick: () => I(l),
          title: l,
          "aria-label": `Select color ${l}`,
          disabled: u
        },
        l
      )),
      E && /* @__PURE__ */ c(
        "button",
        {
          type: "button",
          className: `${e.colorSwatchBtn} ${e.colorSwatchBtnCustom}`,
          onClick: () => x(!O),
          "aria-label": "Custom color",
          disabled: u,
          children: /* @__PURE__ */ c(X, { size: 14 })
        }
      )
    ] }),
    O && E && /* @__PURE__ */ c("div", { className: e.colorPickerDropdown, children: /* @__PURE__ */ r("div", { className: e.colorPickerPanel, children: [
      /* @__PURE__ */ r("div", { className: e.colorPickerHeader, children: [
        /* @__PURE__ */ c("h3", { className: e.colorPickerTitle, children: "Choose Color" }),
        /* @__PURE__ */ r("div", { className: e.colorPickerPreview, children: [
          /* @__PURE__ */ c(
            "div",
            {
              className: `${e.colorSwatch} ${e.colorSwatchLg}`,
              style: { backgroundColor: i }
            }
          ),
          /* @__PURE__ */ r("div", { className: e.colorValue, children: [
            /* @__PURE__ */ c("span", { className: e.colorValueHex, children: i }),
            /* @__PURE__ */ r("span", { className: e.colorValueRgb, children: [
              "RGB(",
              t.r,
              ", ",
              t.g,
              ", ",
              t.b,
              ")"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ r("div", { className: e.colorPickerBody, children: [
        /* @__PURE__ */ r("div", { className: e.colorInputGroup, children: [
          /* @__PURE__ */ c("label", { className: e.colorInputLabel, children: "HEX" }),
          /* @__PURE__ */ c(
            "input",
            {
              type: "text",
              className: e.colorInputText,
              value: i,
              onChange: T
            }
          )
        ] }),
        /* @__PURE__ */ r("div", { className: e.colorInputRow, children: [
          /* @__PURE__ */ r("div", { className: e.colorInputGroup, children: [
            /* @__PURE__ */ c("label", { className: e.colorInputLabel, children: "R" }),
            /* @__PURE__ */ c(
              "input",
              {
                type: "number",
                className: e.colorInputNumber,
                value: t.r,
                onChange: (l) => C("r", l.target.value),
                min: "0",
                max: "255"
              }
            )
          ] }),
          /* @__PURE__ */ r("div", { className: e.colorInputGroup, children: [
            /* @__PURE__ */ c("label", { className: e.colorInputLabel, children: "G" }),
            /* @__PURE__ */ c(
              "input",
              {
                type: "number",
                className: e.colorInputNumber,
                value: t.g,
                onChange: (l) => C("g", l.target.value),
                min: "0",
                max: "255"
              }
            )
          ] }),
          /* @__PURE__ */ r("div", { className: e.colorInputGroup, children: [
            /* @__PURE__ */ c("label", { className: e.colorInputLabel, children: "B" }),
            /* @__PURE__ */ c(
              "input",
              {
                type: "number",
                className: e.colorInputNumber,
                value: t.b,
                onChange: (l) => C("b", l.target.value),
                min: "0",
                max: "255"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ r("div", { className: e.colorPickerFooter, children: [
        /* @__PURE__ */ c(
          S,
          {
            variant: "secondary",
            size: "sm",
            onClick: () => x(!1),
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ c(
          S,
          {
            variant: "primary",
            size: "sm",
            onClick: () => {
              H(), x(!1);
            },
            children: "Apply"
          }
        )
      ] })
    ] }) })
  ] }) : /* @__PURE__ */ r("div", { className: `${e.colorPicker} ${V}`, ref: P, children: [
    g && /* @__PURE__ */ c("label", { className: e.colorPickerLabel, children: g }),
    w ? /* @__PURE__ */ c("div", { onClick: () => !u && p(!f), children: w }) : /* @__PURE__ */ r("div", { className: e.colorPickerTrigger, children: [
      /* @__PURE__ */ c(
        "div",
        {
          className: e.colorSwatch,
          style: { backgroundColor: s },
          onClick: () => !u && p(!f)
        }
      ),
      /* @__PURE__ */ c(
        "input",
        {
          type: "text",
          className: e.colorInput,
          value: s,
          readOnly: !0,
          onClick: () => !u && p(!f),
          disabled: u
        }
      ),
      /* @__PURE__ */ c(
        "button",
        {
          type: "button",
          className: e.colorPickerBtn,
          onClick: () => !u && p(!f),
          "aria-label": "Open color picker",
          disabled: u,
          children: /* @__PURE__ */ c(J, { size: 16 })
        }
      )
    ] }),
    f && !u && /* @__PURE__ */ c("div", { className: e.colorPickerDropdown, children: /* @__PURE__ */ r("div", { className: e.colorPickerPanel, children: [
      /* @__PURE__ */ r("div", { className: e.colorPickerHeader, children: [
        /* @__PURE__ */ c("h3", { className: e.colorPickerTitle, children: "Choose Color" }),
        /* @__PURE__ */ r("div", { className: e.colorPickerPreview, children: [
          /* @__PURE__ */ c(
            "div",
            {
              className: `${e.colorSwatch} ${e.colorSwatchLg}`,
              style: { backgroundColor: i }
            }
          ),
          /* @__PURE__ */ r("div", { className: e.colorValue, children: [
            /* @__PURE__ */ c("span", { className: e.colorValueHex, children: i }),
            /* @__PURE__ */ r("span", { className: e.colorValueRgb, children: [
              "RGB(",
              t.r,
              ", ",
              t.g,
              ", ",
              t.b,
              ")"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ r("div", { className: e.colorPickerBody, children: [
        /* @__PURE__ */ r("div", { className: e.colorInputGroup, children: [
          /* @__PURE__ */ c("label", { className: e.colorInputLabel, children: "HEX" }),
          /* @__PURE__ */ c(
            "input",
            {
              type: "text",
              className: e.colorInputText,
              value: i,
              onChange: T
            }
          )
        ] }),
        /* @__PURE__ */ r("div", { className: e.colorInputRow, children: [
          /* @__PURE__ */ r("div", { className: e.colorInputGroup, children: [
            /* @__PURE__ */ c("label", { className: e.colorInputLabel, children: "R" }),
            /* @__PURE__ */ c(
              "input",
              {
                type: "number",
                className: e.colorInputNumber,
                value: t.r,
                onChange: (l) => C("r", l.target.value),
                min: "0",
                max: "255"
              }
            )
          ] }),
          /* @__PURE__ */ r("div", { className: e.colorInputGroup, children: [
            /* @__PURE__ */ c("label", { className: e.colorInputLabel, children: "G" }),
            /* @__PURE__ */ c(
              "input",
              {
                type: "number",
                className: e.colorInputNumber,
                value: t.g,
                onChange: (l) => C("g", l.target.value),
                min: "0",
                max: "255"
              }
            )
          ] }),
          /* @__PURE__ */ r("div", { className: e.colorInputGroup, children: [
            /* @__PURE__ */ c("label", { className: e.colorInputLabel, children: "B" }),
            /* @__PURE__ */ c(
              "input",
              {
                type: "number",
                className: e.colorInputNumber,
                value: t.b,
                onChange: (l) => C("b", l.target.value),
                min: "0",
                max: "255"
              }
            )
          ] })
        ] }),
        h.length > 0 && /* @__PURE__ */ r("div", { className: e.colorPresets, children: [
          /* @__PURE__ */ c("h4", { className: e.colorPresetsTitle, children: "Preset Colors" }),
          /* @__PURE__ */ c("div", { className: e.colorPresetsGrid, children: h.map((l) => /* @__PURE__ */ c(
            "button",
            {
              type: "button",
              className: e.colorPresetItem,
              style: { backgroundColor: l },
              onClick: () => {
                I(l), N(l);
                const a = b(l);
                a && v(a);
              },
              title: l,
              "aria-label": `Select preset color ${l}`
            },
            l
          )) })
        ] }),
        y && R.length > 0 && /* @__PURE__ */ r("div", { className: e.colorRecent, children: [
          /* @__PURE__ */ c("h4", { className: e.colorRecentTitle, children: "Recent Colors" }),
          /* @__PURE__ */ c("div", { className: e.colorRecentList, children: R.map((l, a) => /* @__PURE__ */ c(
            "div",
            {
              className: e.colorRecentItem,
              style: { backgroundColor: l },
              onClick: () => {
                I(l), N(l);
                const n = b(l);
                n && v(n);
              },
              title: l,
              role: "button",
              tabIndex: 0,
              onKeyDown: (n) => {
                if (n.key === "Enter" || n.key === " ") {
                  I(l), N(l);
                  const o = b(l);
                  o && v(o);
                }
              }
            },
            `${l}-${a}`
          )) })
        ] })
      ] }),
      /* @__PURE__ */ r("div", { className: e.colorPickerFooter, children: [
        /* @__PURE__ */ c(S, { variant: "secondary", size: "sm", onClick: M, children: "Cancel" }),
        /* @__PURE__ */ c(S, { variant: "primary", size: "sm", onClick: H, children: "Apply" })
      ] })
    ] }) })
  ] });
};
Q.displayName = "ColorPicker";
export {
  Q as ColorPicker
};
//# sourceMappingURL=ColorPicker.js.map
