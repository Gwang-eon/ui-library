import { jsxs as n, jsx as i } from "react/jsx-runtime";
import t from "react";
import a from "./Radio.module.css.js";
const u = t.forwardRef(
  ({
    label: r,
    helperText: d,
    error: s = !1,
    errorMessage: o,
    size: m = "md",
    className: p = "",
    disabled: c = !1,
    id: $,
    ...f
  }, N) => {
    const e = $ || `radio-${t.useId()}`, l = `${e}-message`, g = s && o || d, h = m === "sm" ? a["radio-sm"] : m === "lg" ? a["radio-lg"] : "";
    return /* @__PURE__ */ n("div", { className: `${a["radio-wrapper"]} ${p}`, children: [
      /* @__PURE__ */ n(
        "label",
        {
          className: `${a.radio} ${h} ${s ? a.error : ""} ${c ? a.disabled : ""}`,
          htmlFor: e,
          children: [
            /* @__PURE__ */ i(
              "input",
              {
                ref: N,
                type: "radio",
                id: e,
                disabled: c,
                className: a["radio-input"],
                "aria-invalid": s || void 0,
                "aria-describedby": g ? l : void 0,
                ...f
              }
            ),
            r && /* @__PURE__ */ i("span", { className: a["radio-label"], children: r })
          ]
        }
      ),
      s && o && /* @__PURE__ */ i(
        "span",
        {
          id: l,
          className: `${a["radio-message"]} ${a["radio-error"]}`,
          role: "alert",
          children: o
        }
      ),
      !s && d && /* @__PURE__ */ i("span", { id: l, className: a["radio-message"], children: d })
    ] });
  }
);
u.displayName = "Radio";
export {
  u as Radio
};
//# sourceMappingURL=Radio.js.map
