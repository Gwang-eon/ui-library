import { jsxs as b, jsx as a } from "react/jsx-runtime";
import r, { useRef as g, useEffect as R } from "react";
import c from "./Checkbox.module.css.js";
const v = r.forwardRef(
  ({
    label: m,
    helperText: o,
    error: e = !1,
    errorMessage: l,
    indeterminate: t = !1,
    size: d = "md",
    className: x = "",
    disabled: h = !1,
    id: f,
    ...k
  }, p) => {
    const i = f || `checkbox-${r.useId()}`, n = `${i}-message`, $ = e && l || o, u = g(null), s = p || u;
    R(() => {
      s.current && (s.current.indeterminate = t);
    }, [t, s]);
    const N = d === "sm" ? c["checkbox-sm"] : d === "lg" ? c["checkbox-lg"] : "";
    return /* @__PURE__ */ b("div", { className: `${c["checkbox-wrapper"]} ${x}`, children: [
      /* @__PURE__ */ b(
        "label",
        {
          className: `${c.checkbox} ${N} ${e ? c.error : ""} ${h ? c.disabled : ""}`,
          htmlFor: i,
          children: [
            /* @__PURE__ */ a(
              "input",
              {
                ref: s,
                type: "checkbox",
                id: i,
                disabled: h,
                className: c["checkbox-input"],
                "aria-invalid": e || void 0,
                "aria-describedby": $ ? n : void 0,
                ...k
              }
            ),
            m && /* @__PURE__ */ a("span", { className: c["checkbox-label"], children: m })
          ]
        }
      ),
      e && l && /* @__PURE__ */ a(
        "span",
        {
          id: n,
          className: `${c["checkbox-message"]} ${c["checkbox-error"]}`,
          role: "alert",
          children: l
        }
      ),
      !e && o && /* @__PURE__ */ a("span", { id: n, className: c["checkbox-message"], children: o })
    ] });
  }
);
v.displayName = "Checkbox";
export {
  v as Checkbox
};
//# sourceMappingURL=Checkbox.js.map
