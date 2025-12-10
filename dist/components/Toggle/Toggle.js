import { jsxs as N, jsx as a } from "react/jsx-runtime";
import r from "react";
import s from "./Toggle.module.css.js";
const u = r.forwardRef(
  ({
    label: e,
    size: o = "md",
    checked: m,
    defaultChecked: h,
    disabled: l = !1,
    name: d,
    id: g,
    onChange: t,
    className: n = "",
    "aria-label": p,
    "aria-labelledby": b
  }, f) => {
    const c = g || `toggle-${r.useId()}`, w = (i) => {
      !l && t && t(i.target.checked, i);
    }, y = {
      sm: s["switch-sm"],
      md: "",
      lg: s["switch-lg"]
    }[o];
    return /* @__PURE__ */ N(
      "label",
      {
        className: `${s.switch} ${y} ${n}`,
        htmlFor: c,
        children: [
          /* @__PURE__ */ a(
            "input",
            {
              ref: f,
              id: c,
              type: "checkbox",
              name: d,
              className: s["switch-input"],
              checked: m,
              defaultChecked: h,
              disabled: l,
              onChange: w,
              "aria-label": p,
              "aria-labelledby": b
            }
          ),
          /* @__PURE__ */ a("span", { className: s["switch-slider"] }),
          e && /* @__PURE__ */ a("span", { className: s["switch-label"], children: e })
        ]
      }
    );
  }
);
u.displayName = "Toggle";
export {
  u as Toggle
};
//# sourceMappingURL=Toggle.js.map
