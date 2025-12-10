import { jsxs as t, jsx as r } from "react/jsx-runtime";
import { XCircle as n, AlertTriangle as m, CheckCircle as d, Info as f, X as N } from "lucide-react";
import e from "./Alert.module.css.js";
const h = {
  info: f,
  success: d,
  warning: m,
  error: n
}, p = ({
  variant: l = "info",
  title: a,
  children: c,
  onClose: s,
  className: i = ""
}) => {
  const o = h[l];
  return /* @__PURE__ */ t(
    "div",
    {
      className: `${e.alert} ${e[`alert-${l}`]} ${i}`,
      role: "alert",
      children: [
        /* @__PURE__ */ r(o, { className: e["alert-icon"] }),
        /* @__PURE__ */ t("div", { className: e["alert-content"], children: [
          a && /* @__PURE__ */ r("div", { className: e["alert-title"], children: a }),
          /* @__PURE__ */ r("div", { children: c })
        ] }),
        s && /* @__PURE__ */ r(
          "button",
          {
            className: e["alert-close"],
            onClick: s,
            "aria-label": "Close alert",
            children: /* @__PURE__ */ r(N, { size: 20 })
          }
        )
      ]
    }
  );
};
p.displayName = "Alert";
export {
  p as Alert
};
//# sourceMappingURL=Alert.js.map
