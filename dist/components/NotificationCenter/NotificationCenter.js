import { jsx as a, jsxs as s } from "react/jsx-runtime";
import { X as l, ChevronRight as m, Bell as $ } from "lucide-react";
import o from "./NotificationCenter.module.css.js";
const u = ({
  children: i,
  compact: t = !1,
  className: n = ""
}) => /* @__PURE__ */ a("div", { className: `${o.notificationCenter} ${t ? o.notificationCenterCompact : ""} ${n}`, children: i }), T = ({
  children: i,
  count: t,
  className: n = ""
}) => /* @__PURE__ */ s("div", { className: `${o.notificationCenterHeader} ${n}`, children: [
  i,
  t !== void 0 && /* @__PURE__ */ a("span", { className: o.notificationCount, children: t })
] }), p = ({ children: i }) => /* @__PURE__ */ a("h3", { className: o.notificationCenterTitle, children: i }), I = ({
  children: i,
  className: t = ""
}) => /* @__PURE__ */ a("div", { className: `${o.notificationCenterBody} ${t}`, children: i }), g = ({
  children: i,
  className: t = ""
}) => /* @__PURE__ */ a("div", { className: `${o.notificationCenterFooter} ${t}`, children: i }), v = ({
  children: i,
  className: t = ""
}) => /* @__PURE__ */ a("div", { className: `${o.notificationTabs} ${t}`, children: i }), b = ({
  children: i,
  active: t = !1,
  onClick: n,
  className: c = ""
}) => /* @__PURE__ */ a(
  "button",
  {
    className: `${o.notificationTab} ${t ? o.notificationTabActive : ""} ${c}`,
    onClick: n,
    children: i
  }
), h = ({
  children: i,
  unread: t = !1,
  clickable: n = !1,
  onClick: c,
  compact: r = !1,
  className: e = ""
}) => {
  const f = r ? `${o.notificationItemCompact} ${t ? o.notificationItemUnread : ""} ${e}` : `${o.notificationItem} ${t ? o.notificationItemUnread : ""} ${n ? o.notificationItemClickable : ""} ${e}`;
  return /* @__PURE__ */ a("div", { className: f, onClick: c, children: i });
}, A = ({
  children: i,
  variant: t = "info",
  className: n = ""
}) => {
  const c = t === "error" ? o.notificationIconError : t === "warning" ? o.notificationIconWarning : t === "success" ? o.notificationIconSuccess : o.notificationIconInfo;
  return /* @__PURE__ */ a("div", { className: `${o.notificationIcon} ${c} ${n}`, children: i });
}, D = ({
  children: i,
  className: t = ""
}) => /* @__PURE__ */ a("div", { className: `${o.notificationContent} ${t}`, children: i }), w = ({
  children: i,
  className: t = ""
}) => /* @__PURE__ */ a("div", { className: `${o.notificationContentCompact} ${t}`, children: i }), B = ({
  children: i,
  compact: t = !1,
  className: n = ""
}) => /* @__PURE__ */ a("h4", { className: `${t ? o.notificationTitleCompact : o.notificationTitle} ${n}`, children: i }), x = ({
  children: i,
  className: t = ""
}) => /* @__PURE__ */ a("p", { className: `${o.notificationMessage} ${t}`, children: i }), y = ({
  children: i,
  compact: t = !1,
  className: n = ""
}) => /* @__PURE__ */ a("span", { className: `${t ? o.notificationTimeCompact : o.notificationTime} ${n}`, children: i }), z = ({
  onClick: i,
  "aria-label": t = "Dismiss notification",
  className: n = ""
}) => /* @__PURE__ */ a(
  "button",
  {
    className: `${o.notificationAction} ${n}`,
    onClick: i,
    "aria-label": t,
    children: /* @__PURE__ */ a(l, { size: 16 })
  }
), j = () => /* @__PURE__ */ a(m, { className: o.notificationArrow, size: 16 }), E = ({
  count: i,
  onClick: t,
  className: n = ""
}) => /* @__PURE__ */ s("button", { className: `${o.notificationTrigger} ${n}`, onClick: t, children: [
  /* @__PURE__ */ a($, { size: 20 }),
  i !== void 0 && i > 0 && /* @__PURE__ */ a("span", { className: o.notificationBadge, children: i })
] }), F = ({
  variant: i = "info",
  className: t = ""
}) => {
  const n = i === "error" ? o.notificationDotError : i === "warning" ? o.notificationDotWarning : i === "success" ? o.notificationDotSuccess : o.notificationDotInfo;
  return /* @__PURE__ */ a("div", { className: `${o.notificationDot} ${n} ${t}` });
}, H = ({
  children: i,
  href: t,
  onClick: n
}) => /* @__PURE__ */ a(
  "a",
  {
    href: t || "#",
    className: o.notificationViewAll,
    onClick: n,
    children: i
  }
);
export {
  z as NotificationAction,
  j as NotificationArrow,
  u as NotificationCenter,
  I as NotificationCenterBody,
  g as NotificationCenterFooter,
  T as NotificationCenterHeader,
  p as NotificationCenterTitle,
  D as NotificationContent,
  w as NotificationContentCompact,
  F as NotificationDot,
  A as NotificationIcon,
  h as NotificationItem,
  x as NotificationMessage,
  b as NotificationTab,
  v as NotificationTabs,
  y as NotificationTime,
  B as NotificationTitle,
  E as NotificationTrigger,
  H as NotificationViewAll
};
//# sourceMappingURL=NotificationCenter.js.map
