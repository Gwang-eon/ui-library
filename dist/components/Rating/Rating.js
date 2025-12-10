import { jsx as m, jsxs as R } from "react/jsx-runtime";
import { useState as $, useRef as J, useCallback as u } from "react";
import { Star as Q, Circle as Y, Heart as Z } from "lucide-react";
import r from "./Rating.module.css.js";
const b = ({
  value: w,
  defaultValue: E = 0,
  count: f = 5,
  size: D = "md",
  icon: a = "star",
  allowHalf: p = !1,
  readOnly: n = !1,
  disabled: c = !1,
  onChange: M,
  showValue: F = !1,
  reviewCount: I,
  description: k,
  label: B,
  className: S,
  ariaLabel: y
}) => {
  const [X, A] = $(E), [N, C] = $(null), [o, V] = $(-1), K = J(null), d = w !== void 0, h = d ? w : X, L = u(() => {
    if (typeof a != "string") return a;
    switch (a) {
      case "heart":
        return /* @__PURE__ */ m(Z, {});
      case "circle":
        return /* @__PURE__ */ m(Y, {});
      case "star":
      default:
        return /* @__PURE__ */ m(Q, { fill: "currentColor" });
    }
  }, [a])(), T = u(
    (s) => {
      const e = s + 1, t = N !== null ? N : h;
      return e <= Math.floor(t) ? "filled" : p && e === Math.ceil(t) && t % 1 !== 0 ? "half" : "empty";
    },
    [h, N, p]
  ), W = u(
    (s, e) => {
      if (n || c) return;
      let t = s + 1;
      if (p) {
        const l = e.currentTarget.getBoundingClientRect(), i = e.clientX - l.left, v = l.width / 2;
        i < v && (t = s + 0.5);
      }
      d || A(t), M?.(t);
    },
    [n, c, p, d, M]
  ), j = u(
    (s, e) => {
      if (n || c) return;
      let t = s + 1;
      if (p) {
        const l = e.currentTarget.getBoundingClientRect(), i = e.clientX - l.left, v = l.width / 2;
        i < v && (t = s + 0.5);
      }
      C(t);
    },
    [n, c, p]
  ), P = u(() => {
    C(null);
  }, []), U = u(
    (s) => {
      if (n || c) return;
      const { key: e } = s;
      let t = o;
      if (e === "ArrowLeft" || e === "ArrowDown")
        s.preventDefault(), t = Math.max(0, o - 1);
      else if (e === "ArrowRight" || e === "ArrowUp")
        s.preventDefault(), t = Math.min(f - 1, o + 1);
      else if (e === " " || e === "Enter") {
        if (s.preventDefault(), o >= 0) {
          const l = o + 1;
          d || A(l), M?.(l);
        }
      } else e === "Home" ? (s.preventDefault(), t = 0) : e === "End" && (s.preventDefault(), t = f - 1);
      t !== o && V(t);
    },
    [n, c, o, f, d, M]
  ), _ = u(() => {
    V(-1);
  }, []), q = u(() => {
    o === -1 && V(Math.floor(h) || 0);
  }, [o, h]), z = [
    r.rating,
    D !== "md" && r[D],
    n && r.readonly,
    c && r.disabled,
    typeof a == "string" && a !== "star" && r[a],
    S
  ].filter(Boolean).join(" "), G = !n && !c ? {
    role: "radiogroup",
    "aria-label": y || `Rate from 1 to ${f} ${typeof a == "string" ? a + "s" : "stars"}`,
    tabIndex: 0,
    onKeyDown: U,
    onFocus: q,
    onBlur: _
  } : {
    role: "img",
    "aria-label": y || `Rated ${h} out of ${f}${I ? ` based on ${I} reviews` : ""}`
  };
  return /* @__PURE__ */ R("div", { className: r.container, children: [
    B && /* @__PURE__ */ m("label", { className: r.label, children: B }),
    /* @__PURE__ */ R("div", { className: r.wrapper, children: [
      /* @__PURE__ */ m(
        "div",
        {
          ref: K,
          className: z,
          onMouseLeave: P,
          ...G,
          children: Array.from({ length: f }).map((s, e) => {
            const t = T(e), l = o === e, i = !n && !c, v = [
              r.star,
              t === "filled" && r.filled,
              t === "half" && r.half,
              N !== null && r.hover,
              l && r.focused
            ].filter(Boolean).join(" ");
            return /* @__PURE__ */ m(
              "span",
              {
                className: v,
                onClick: (g) => W(e, g),
                onMouseEnter: (g) => j(e, g),
                onMouseMove: (g) => j(e, g),
                "data-value": e + 1,
                role: i ? "radio" : void 0,
                "aria-checked": i ? e + 1 <= h ? "true" : "false" : void 0,
                "aria-label": i ? `${e + 1} ${typeof a == "string" ? a : "star"}${e !== 0 ? "s" : ""}` : void 0,
                "aria-setsize": i ? f : void 0,
                "aria-posinset": i ? e + 1 : void 0,
                children: L
              },
              e
            );
          })
        }
      ),
      F && /* @__PURE__ */ R("span", { className: r.value, children: [
        h,
        " / ",
        f
      ] }),
      I !== void 0 && /* @__PURE__ */ R("span", { className: r.count, children: [
        "(",
        I,
        " reviews)"
      ] })
    ] }),
    k && /* @__PURE__ */ m("span", { className: r.description, children: k })
  ] });
};
b.displayName = "Rating";
export {
  b as Rating
};
//# sourceMappingURL=Rating.js.map
