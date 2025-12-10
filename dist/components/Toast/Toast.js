import { jsxs as r, jsx as e } from "react/jsx-runtime";
import { memo as f, useEffect as d, useCallback as h } from "react";
import { XCircle as N, AlertTriangle as p, CheckCircle as u, Info as T, X as v } from "lucide-react";
import s from "./Toast.module.css.js";
const b = {
  info: T,
  success: u,
  warning: p,
  error: N
}, g = f(({
  variant: c = "info",
  title: o,
  message: i,
  duration: a = 0,
  onClose: t
}) => {
  const l = b[c];
  d(() => {
    if (a > 0 && t) {
      const n = setTimeout(() => {
        t();
      }, a);
      return () => clearTimeout(n);
    }
  }, [a, t]);
  const m = h(() => {
    t?.();
  }, [t]);
  return /* @__PURE__ */ r("div", { className: `${s.toast} ${s[`toast-${c}`]}`, role: "alert", children: [
    /* @__PURE__ */ e(l, { className: s["toast-icon"], size: 20 }),
    /* @__PURE__ */ r("div", { className: s["toast-content"], children: [
      o && /* @__PURE__ */ e("div", { className: s["toast-title"], children: o }),
      /* @__PURE__ */ e("div", { className: s["toast-message"], children: i })
    ] }),
    t && /* @__PURE__ */ e(
      "button",
      {
        className: s["toast-close"],
        onClick: m,
        "aria-label": "Close toast",
        children: /* @__PURE__ */ e(v, { size: 20 })
      }
    )
  ] });
});
g.displayName = "Toast";
export {
  g as Toast
};
//# sourceMappingURL=Toast.js.map
