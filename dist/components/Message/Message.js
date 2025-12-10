import { jsxs as l, jsx as s } from "react/jsx-runtime";
import { Loader2 as d, Info as h, AlertTriangle as v, XCircle as N, CheckCircle as f, X as p } from "lucide-react";
import e from "./Message.module.css.js";
const u = {
  success: f,
  error: N,
  warning: v,
  info: h,
  loading: d
}, C = ({
  type: a,
  title: r,
  description: i,
  closable: o = !0,
  onClose: c,
  className: n = "",
  visible: m = !0
}) => {
  const t = u[a], g = [
    e.message,
    e[`message-${a}`],
    m && e["message-visible"],
    n
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ l(
    "div",
    {
      className: g,
      role: "alert",
      "aria-live": "polite",
      "aria-atomic": "true",
      children: [
        /* @__PURE__ */ s("div", { className: e["message-icon"], children: /* @__PURE__ */ s(t, {}) }),
        /* @__PURE__ */ l("div", { className: e["message-content"], children: [
          /* @__PURE__ */ s("div", { className: e["message-title"], children: r }),
          i && /* @__PURE__ */ s("div", { className: e["message-description"], children: i })
        ] }),
        o && /* @__PURE__ */ s(
          "button",
          {
            className: e["message-close"],
            onClick: c,
            "aria-label": "Close message",
            children: /* @__PURE__ */ s(p, {})
          }
        )
      ]
    }
  );
};
C.displayName = "Message";
export {
  C as Message
};
//# sourceMappingURL=Message.js.map
