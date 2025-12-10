import { jsx as n, jsxs as d } from "react/jsx-runtime";
import s from "./Progress.module.css.js";
const f = ({
  children: a,
  size: r = "md",
  className: e = ""
}) => {
  const o = r === "sm" ? s.progressSm : r === "lg" ? s.progressLg : s.progressMd;
  return /* @__PURE__ */ n("div", { className: `${s.progress} ${o} ${e}`, children: a });
}, h = ({
  value: a = 0,
  variant: r = "primary",
  indeterminate: e = !1,
  striped: o = !1,
  animated: c = !1,
  className: l = "",
  "aria-label": g
}) => {
  const i = r === "success" ? s.progressBarSuccess : r === "warning" ? s.progressBarWarning : r === "error" ? s.progressBarError : "", t = o ? s.progressBarStriped : "", p = c ? s.progressBarAnimated : "", m = e ? s.progressBarIndeterminate : "", u = e ? {} : { width: `${Math.min(100, Math.max(0, a))}%` };
  return /* @__PURE__ */ n(
    "div",
    {
      className: `${s.progressBar} ${i} ${t} ${p} ${m} ${l}`,
      style: u,
      role: "progressbar",
      "aria-valuenow": e ? void 0 : a,
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      "aria-label": g
    }
  );
}, x = ({
  value: a,
  size: r = 120,
  strokeWidth: e = 8,
  variant: o = "primary",
  showLabel: c = !0,
  className: l = "",
  "aria-label": g
}) => {
  const i = (r - e) / 2, t = 2 * Math.PI * i, p = t - a / 100 * t, m = o === "success" ? "var(--color-success-500)" : o === "warning" ? "var(--color-warning-500)" : o === "error" ? "var(--color-error-500)" : "var(--color-primary-500)";
  return /* @__PURE__ */ n(
    "div",
    {
      className: `${s.progressCircular} ${l}`,
      role: "progressbar",
      "aria-valuenow": a,
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      "aria-label": g,
      children: /* @__PURE__ */ d("svg", { width: r, height: r, viewBox: `0 0 ${r} ${r}`, children: [
        /* @__PURE__ */ n(
          "circle",
          {
            className: s.progressCircularTrack,
            cx: r / 2,
            cy: r / 2,
            r: i,
            strokeWidth: e
          }
        ),
        /* @__PURE__ */ n(
          "circle",
          {
            className: s.progressCircularBar,
            cx: r / 2,
            cy: r / 2,
            r: i,
            strokeWidth: e,
            stroke: m,
            strokeDasharray: t,
            strokeDashoffset: p,
            transform: `rotate(-90 ${r / 2} ${r / 2})`
          }
        ),
        c && /* @__PURE__ */ d(
          "text",
          {
            x: "50%",
            y: "50%",
            dominantBaseline: "middle",
            textAnchor: "middle",
            fontSize: r > 80 ? 24 : 16,
            fontWeight: "600",
            fill: "var(--text-primary)",
            children: [
              Math.round(a),
              "%"
            ]
          }
        )
      ] })
    }
  );
}, C = ({
  size: a = "md",
  variant: r = "primary",
  className: e = "",
  "aria-label": o = "Loading"
}) => {
  const c = a === "sm" ? s.progressSpinnerSm : a === "lg" ? s.progressSpinnerLg : s.progressSpinnerMd, l = r === "success" ? s.progressSpinnerSuccess : r === "warning" ? s.progressSpinnerWarning : r === "danger" || r === "error" ? s.progressSpinnerDanger : s.progressSpinnerPrimary;
  return /* @__PURE__ */ n(
    "div",
    {
      className: `${s.progressSpinner} ${c} ${l} ${e}`,
      role: "status",
      "aria-label": o,
      children: /* @__PURE__ */ n("div", { className: s.progressSpinnerCircle })
    }
  );
};
export {
  f as Progress,
  h as ProgressBar,
  x as ProgressCircular,
  C as ProgressSpinner
};
//# sourceMappingURL=Progress.js.map
