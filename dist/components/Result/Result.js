import { jsxs as o, jsx as e } from "react/jsx-runtime";
import { Info as C, AlertTriangle as I, XCircle as y, CheckCircle as A } from "lucide-react";
import r from "./Result.module.css.js";
const L = {
  success: /* @__PURE__ */ e(A, {}),
  error: /* @__PURE__ */ e(y, {}),
  warning: /* @__PURE__ */ e(I, {}),
  info: /* @__PURE__ */ e(C, {})
}, g = {
  success: "Success status",
  error: "Error indicator",
  warning: "Warning indicator",
  info: "Information"
}, E = ({
  status: i,
  title: d,
  description: l,
  icon: m,
  extra: a,
  actions: n,
  compact: t = !1,
  className: f
}) => {
  const c = m || (i ? L[i] : null), h = i === "error" ? "alert" : "status", N = i === "error" ? "assertive" : "polite", p = [
    r.result,
    i && r[i],
    t && r.compact,
    f
  ].filter(Boolean).join(" "), v = () => a ? Array.isArray(a) ? /* @__PURE__ */ e("div", { className: r.extra, children: a.map((s, u) => /* @__PURE__ */ o("div", { className: r.infoItem, children: [
    /* @__PURE__ */ e("span", { className: r.infoLabel, children: s.label }),
    /* @__PURE__ */ e("span", { className: r.infoValue, children: s.value })
  ] }, u)) }) : /* @__PURE__ */ e("div", { className: r.extra, children: a }) : null;
  return /* @__PURE__ */ o(
    "div",
    {
      className: p,
      role: h,
      "aria-live": N,
      children: [
        c && /* @__PURE__ */ e(
          "div",
          {
            className: r.icon,
            "aria-label": i ? g[i] : void 0,
            "aria-hidden": !i,
            children: c
          }
        ),
        /* @__PURE__ */ e("h3", { className: r.title, children: d }),
        l && /* @__PURE__ */ e("p", { className: r.description, children: l }),
        v(),
        n && /* @__PURE__ */ e("div", { className: r.actions, children: n })
      ]
    }
  );
};
E.displayName = "Result";
export {
  E as Result
};
//# sourceMappingURL=Result.js.map
