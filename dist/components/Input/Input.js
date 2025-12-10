import { jsxs as r, jsx as n, Fragment as R } from "react/jsx-runtime";
import g from "react";
import i from "./Input.module.css.js";
const q = g.forwardRef(
  ({
    size: w = "md",
    state: s = "default",
    variant: o = "outlined",
    labelPosition: c = "top",
    label: u,
    helperText: v,
    errorMessage: $,
    successMessage: j,
    warningMessage: z,
    required: x = !1,
    fullWidth: y = !1,
    leftIcon: l,
    rightIcon: p,
    wrapperClassName: B = "",
    className: C = "",
    disabled: d = !1,
    readOnly: t = !1,
    id: b,
    ...m
  }, h) => {
    const e = b || `input-${g.useId()}`, a = s === "error" ? $ : s === "success" ? j : s === "warning" ? z : v, F = [
      i["input-group"],
      c === "horizontal" && i["input-group-horizontal"],
      y && i["input-full-width"],
      B
    ].filter(Boolean).join(" "), N = [
      i.input,
      i[`input-${w}`],
      o !== "outlined" && i[`input-${o}`],
      s !== "default" && i[s],
      l && i["input-with-left-icon"],
      p && i["input-with-right-icon"],
      C
    ].filter(Boolean).join(" "), f = [
      i["input-message"],
      s === "error" && i["input-error"],
      s === "success" && i["input-success"],
      s === "warning" && i["input-warning"]
    ].filter(Boolean).join(" ");
    return /* @__PURE__ */ r("div", { className: F, children: [
      u && /* @__PURE__ */ r("label", { htmlFor: e, className: i["input-label"], children: [
        u,
        x && /* @__PURE__ */ n("span", { className: i.required, children: "*" })
      ] }),
      c === "horizontal" && a ? /* @__PURE__ */ r("div", { className: i["input-horizontal-content"], children: [
        /* @__PURE__ */ r("div", { className: i["input-wrapper"], children: [
          l && /* @__PURE__ */ n("span", { className: i["input-icon-left"], children: l }),
          /* @__PURE__ */ n(
            "input",
            {
              ref: h,
              id: e,
              className: N,
              disabled: d,
              readOnly: t,
              "aria-invalid": s === "error",
              "aria-describedby": a ? `${e}-message` : void 0,
              ...m
            }
          ),
          p && /* @__PURE__ */ n("span", { className: i["input-icon-right"], children: p })
        ] }),
        a && /* @__PURE__ */ n("span", { id: `${e}-message`, className: f, children: a })
      ] }) : /* @__PURE__ */ r(R, { children: [
        /* @__PURE__ */ r("div", { className: i["input-wrapper"], children: [
          l && /* @__PURE__ */ n("span", { className: i["input-icon-left"], children: l }),
          /* @__PURE__ */ n(
            "input",
            {
              ref: h,
              id: e,
              className: N,
              disabled: d,
              readOnly: t,
              "aria-invalid": s === "error",
              "aria-describedby": a ? `${e}-message` : void 0,
              ...m
            }
          ),
          p && /* @__PURE__ */ n("span", { className: i["input-icon-right"], children: p })
        ] }),
        a && c !== "horizontal" && /* @__PURE__ */ n("span", { id: `${e}-message`, className: f, children: a })
      ] })
    ] });
  }
);
q.displayName = "Input";
export {
  q as Input,
  q as default
};
//# sourceMappingURL=Input.js.map
