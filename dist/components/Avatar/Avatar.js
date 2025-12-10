import { jsxs as $, jsx as t } from "react/jsx-runtime";
import a from "./Avatar.module.css.js";
const A = ({
  src: r,
  alt: s,
  initials: o,
  icon: l,
  size: c = "md",
  shape: n = "circle",
  color: p = "primary",
  status: e,
  className: i = ""
}) => {
  const v = [
    a.avatar,
    a[`avatar${n.charAt(0).toUpperCase()}${n.slice(1)}`],
    a[`avatar${c.charAt(0).toUpperCase()}${c.slice(1)}`],
    !r && a[`avatar${p.charAt(0).toUpperCase()}${p.slice(1)}`],
    i
  ].filter(Boolean).join(" "), m = e ? [
    a.avatarBadge,
    e !== "online" && a[`avatarBadge${e.charAt(0).toUpperCase()}${e.slice(1)}`]
  ].filter(Boolean).join(" ") : "";
  return /* @__PURE__ */ $("div", { className: v, children: [
    r ? /* @__PURE__ */ t("img", { src: r, alt: s || "Avatar" }) : l || (o ? /* @__PURE__ */ t("span", { children: o }) : null),
    e && /* @__PURE__ */ t("span", { className: m })
  ] });
}, d = ({ children: r, className: s = "" }) => /* @__PURE__ */ t("div", { className: `${a.avatarGroup} ${s}`, children: r }), j = Object.assign(A, { Group: d });
export {
  j as Avatar,
  d as AvatarGroup
};
//# sourceMappingURL=Avatar.js.map
