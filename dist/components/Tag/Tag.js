import { jsxs as f, jsx as t } from "react/jsx-runtime";
import g from "react";
import { X as h } from "lucide-react";
import o from "./Tag.module.css.js";
const C = ({
  children: a,
  variant: r = "default",
  size: s = "md",
  removable: n = !1,
  onRemove: i,
  clickable: e = !1,
  onClick: m,
  icon: l,
  className: d
}) => {
  const p = [
    o.tag,
    r !== "default" && o[r],
    s !== "md" && o[s],
    n && o.removable,
    e && o.clickable,
    d
  ].filter(Boolean).join(" "), u = (c) => {
    c.stopPropagation(), i?.();
  };
  return /* @__PURE__ */ f(
    e ? "button" : "span",
    {
      className: p,
      onClick: e ? m : void 0,
      type: e ? "button" : void 0,
      role: e ? "button" : void 0,
      children: [
        l && /* @__PURE__ */ t("span", { className: o.icon, "aria-hidden": "true", children: l }),
        a,
        n && /* @__PURE__ */ t(
          "button",
          {
            className: o.remove,
            onClick: u,
            "aria-label": `Remove ${a} tag`,
            type: "button",
            children: /* @__PURE__ */ t(h, { size: 12, "aria-hidden": "true" })
          }
        )
      ]
    }
  );
};
C.displayName = "Tag";
const v = ({
  children: a,
  className: r,
  ariaLabel: s
}) => {
  const n = [o.group, r].filter(Boolean).join(" ");
  return /* @__PURE__ */ t(
    "div",
    {
      className: n,
      role: "list",
      "aria-label": s,
      children: g.Children.map(a, (i) => /* @__PURE__ */ t("div", { role: "listitem", children: i }))
    }
  );
};
v.displayName = "TagGroup";
export {
  C as Tag,
  v as TagGroup
};
//# sourceMappingURL=Tag.js.map
