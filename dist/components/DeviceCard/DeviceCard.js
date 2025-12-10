import { jsx as d, jsxs as v } from "react/jsx-runtime";
import { memo as s, useCallback as I } from "react";
import a from "./DeviceCard.module.css.js";
const c = ({ children: r, variant: e = "default", compact: t = !1, onClick: i, className: o = "" }) => {
  const u = [
    a.deviceCard,
    t && a.deviceCardCompact,
    e === "warning" && a.deviceCardWarning,
    e === "error" && a.deviceCardError,
    i && a.deviceCardClickable,
    o
  ].filter(Boolean).join(" "), $ = I((n) => {
    i && (n.key === "Enter" || n.key === " ") && (n.preventDefault(), i());
  }, [i]);
  return /* @__PURE__ */ d(
    "div",
    {
      className: u,
      onClick: i,
      onKeyDown: i ? $ : void 0,
      role: i ? "button" : void 0,
      tabIndex: i ? 0 : void 0,
      children: r
    }
  );
}, l = s(({ children: r, className: e = "" }) => /* @__PURE__ */ d("div", { className: `${a.deviceCardHeader} ${e}`, children: r })), m = s(({ children: r, className: e = "" }) => /* @__PURE__ */ d("div", { className: `${a.deviceCardBody} ${e}`, children: r })), C = s(({ children: r, className: e = "" }) => /* @__PURE__ */ d("div", { className: `${a.deviceCardFooter} ${e}`, children: r })), N = s(({
  children: r,
  background: e,
  size: t = "default",
  className: i = ""
}) => {
  const o = [
    a.deviceIcon,
    t === "sm" && a.deviceIconSm,
    i
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ d("div", { className: o, style: e ? { background: e } : void 0, children: r });
}), D = s(({
  title: r,
  subtitle: e,
  className: t = ""
}) => /* @__PURE__ */ v("div", { className: `${a.deviceCardTitleSection} ${t}`, children: [
  /* @__PURE__ */ d("h3", { className: a.deviceCardTitle, children: r }),
  e && /* @__PURE__ */ d("p", { className: a.deviceCardSubtitle, children: e })
] })), y = s(({ children: r, className: e = "" }) => /* @__PURE__ */ d("div", { className: `${a.deviceMetrics} ${e}`, children: r })), p = s(({ label: r, value: e, className: t = "" }) => /* @__PURE__ */ v("div", { className: `${a.deviceMetric} ${t}`, children: [
  /* @__PURE__ */ d("span", { className: a.deviceMetricLabel, children: r }),
  /* @__PURE__ */ d("span", { className: a.deviceMetricValue, children: e })
] })), f = s(({ children: r, className: e = "" }) => /* @__PURE__ */ d("div", { className: `${a.deviceInfo} ${e}`, children: r }));
c.Header = l;
c.Body = m;
c.Footer = C;
c.Icon = N;
c.TitleSection = D;
c.Metrics = y;
c.Metric = p;
c.Info = f;
c.displayName = "DeviceCard";
l.displayName = "DeviceCard.Header";
m.displayName = "DeviceCard.Body";
C.displayName = "DeviceCard.Footer";
N.displayName = "DeviceCard.Icon";
D.displayName = "DeviceCard.TitleSection";
y.displayName = "DeviceCard.Metrics";
p.displayName = "DeviceCard.Metric";
f.displayName = "DeviceCard.Info";
export {
  c as DeviceCard,
  m as DeviceCardBody,
  C as DeviceCardFooter,
  l as DeviceCardHeader,
  N as DeviceCardIcon,
  f as DeviceCardInfo,
  p as DeviceCardMetric,
  y as DeviceCardMetrics,
  D as DeviceCardTitleSection
};
//# sourceMappingURL=DeviceCard.js.map
