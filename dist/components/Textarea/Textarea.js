import { jsxs as c, jsx as o, Fragment as A } from "react/jsx-runtime";
import z, { useState as B, useEffect as D } from "react";
import e from "./Textarea.module.css.js";
const G = z.forwardRef(
  ({
    size: N = "md",
    state: r = "default",
    label: d,
    helperText: v,
    errorMessage: m,
    successMessage: u,
    warningMessage: p,
    required: w = !1,
    fullWidth: x = !1,
    rows: C = 4,
    showCounter: g = !1,
    resize: b = "vertical",
    renderCounter: h,
    className: y = "",
    value: s,
    defaultValue: a,
    maxLength: i,
    onChange: S,
    id: j,
    ...F
  }, I) => {
    const n = j || `textarea-${z.useId()}`, [f, l] = B(0);
    D(() => {
      s !== void 0 ? l(String(s).length) : a !== void 0 && l(String(a).length);
    }, [s, a]);
    const R = ($) => {
      l($.target.value.length), S?.($);
    }, T = {
      sm: e["input-sm"],
      md: "",
      lg: e["input-lg"]
    }[N], q = {
      default: "",
      error: e.error,
      success: e.success,
      warning: e.warning
    }[r], t = r === "error" && m ? m : r === "success" && u ? u : r === "warning" && p ? p : v, E = {
      error: e["input-error"],
      success: e["input-success"],
      warning: e["input-warning"],
      default: ""
    }[r], k = {
      none: e["resize-none"],
      both: e["resize-both"],
      horizontal: e["resize-horizontal"],
      vertical: e["resize-vertical"]
    }[b];
    return /* @__PURE__ */ c(
      "div",
      {
        className: `${e["input-group"]} ${x ? e["input-full-width"] : ""} ${y}`,
        children: [
          d && /* @__PURE__ */ c("label", { htmlFor: n, className: e["input-label"], children: [
            d,
            w && /* @__PURE__ */ o("span", { className: e.required, children: "*" })
          ] }),
          /* @__PURE__ */ o(
            "textarea",
            {
              ref: I,
              id: n,
              className: `${e.input} ${e.textarea} ${T} ${q} ${k}`,
              value: s,
              defaultValue: a,
              rows: C,
              maxLength: i,
              onChange: R,
              "aria-invalid": r === "error",
              "aria-describedby": t ? `${n}-message` : void 0,
              ...F
            }
          ),
          (t || g) && /* @__PURE__ */ c("div", { className: e["message-counter-wrapper"], children: [
            t && /* @__PURE__ */ o(
              "span",
              {
                id: `${n}-message`,
                className: `${e["input-message"]} ${E}`,
                children: t
              }
            ),
            g && /* @__PURE__ */ o("span", { className: e["character-count"], children: h ? h(f, i) : /* @__PURE__ */ c(A, { children: [
              f,
              i && ` / ${i}`
            ] }) })
          ] })
        ]
      }
    );
  }
);
G.displayName = "Textarea";
export {
  G as Textarea
};
//# sourceMappingURL=Textarea.js.map
