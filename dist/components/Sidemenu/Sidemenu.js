import { jsxs as t, jsx as n } from "react/jsx-runtime";
import { useState as N } from "react";
import a from "./Sidemenu.module.css.js";
const Q = (o) => "items" in o && Array.isArray(o.items), z = ({
  items: o,
  activeKey: y,
  collapsed: m,
  defaultCollapsed: f = !1,
  onCollapse: b,
  onSelect: g,
  brandIcon: C,
  brandText: k = "App",
  userInfo: i,
  showSearch: w = !1,
  searchPlaceholder: U = "Search menu...",
  className: A = "",
  storageKey: h = "sidemenu-collapsed"
}) => {
  const [B, j] = N(() => {
    if (h && typeof window < "u") {
      const e = localStorage.getItem(h);
      return e ? e === "true" : f;
    }
    return f;
  }), [S, E] = N(""), [G, M] = N(/* @__PURE__ */ new Set()), r = m !== void 0 ? m : B, L = () => {
    const e = !r;
    m === void 0 && (j(e), h && typeof window < "u" && localStorage.setItem(h, String(e))), b?.(e);
  }, T = (e, s) => {
    if (e.disabled) {
      s.preventDefault();
      return;
    }
    e.children && e.children.length > 0 ? (s.preventDefault(), M((l) => {
      const d = new Set(l);
      return d.has(e.key) ? d.delete(e.key) : d.add(e.key), d;
    })) : g?.(e.key);
  }, x = (e, s) => {
    if (!s) return !0;
    const l = s.toLowerCase(), d = e.title.toLowerCase().includes(l), c = e.children?.some((p) => x(p, s)) || !1;
    return d || c;
  }, u = (e, s = 0) => {
    if (!x(e, S)) return null;
    const l = G.has(e.key), d = y === e.key, c = e.children && e.children.length > 0, p = [
      a.sidemenuItem,
      d && a.active,
      c && a.sidemenuItemParent,
      l && a.expanded,
      s > 0 && a.sidemenuItemChild,
      e.disabled && a.disabled
    ].filter(Boolean).join(" "), H = e.href ? "a" : "div";
    return /* @__PURE__ */ t("div", { children: [
      /* @__PURE__ */ t(
        H,
        {
          href: e.href,
          className: p,
          onClick: (v) => T(e, v),
          "data-tooltip": r ? e.tooltip || e.title : void 0,
          "aria-current": d ? "page" : void 0,
          "aria-expanded": c ? l : void 0,
          children: [
            e.icon && /* @__PURE__ */ n("span", { className: a.sidemenuIcon, children: e.icon }),
            /* @__PURE__ */ n("span", { className: a.sidemenuLabel, children: e.title }),
            e.badge && /* @__PURE__ */ n("span", { className: a.sidemenuBadge, children: e.badge }),
            c && !r && /* @__PURE__ */ n("span", { className: a.sidemenuChevron, children: l ? "▼" : "▶" })
          ]
        }
      ),
      c && !r && l && /* @__PURE__ */ n("div", { className: a.sidemenuSubmenu, "data-level": s + 1, children: e.children.map((v) => u(v, s + 1)) })
    ] }, e.key);
  }, $ = (e) => /* @__PURE__ */ t("div", { className: a.sidemenuGroupWrapper, children: [
    /* @__PURE__ */ t("div", { className: a.sidemenuGroupHeader, children: [
      e.icon && /* @__PURE__ */ n("span", { children: e.icon }),
      /* @__PURE__ */ n("span", { children: e.title })
    ] }),
    e.items.map((s) => u(s))
  ] }, e.title), D = () => {
    if (!i) return null;
    if (typeof i.avatar == "string")
      return i.avatar.startsWith("http") ? /* @__PURE__ */ n("img", { src: i.avatar, alt: i.name }) : /* @__PURE__ */ n("div", { className: a.sidemenuUserAvatar, children: i.avatar });
    if (i.avatar)
      return i.avatar;
    const e = i.name.split(" ").map((s) => s[0]).join("").toUpperCase().slice(0, 2);
    return /* @__PURE__ */ n("div", { className: a.sidemenuUserAvatar, children: e });
  };
  return /* @__PURE__ */ t(
    "nav",
    {
      className: `${a.sidemenu} ${r ? a.collapsed : ""} ${A}`,
      role: "navigation",
      "aria-label": "Main navigation",
      children: [
        /* @__PURE__ */ t("div", { className: a.sidemenuHeader, children: [
          C && /* @__PURE__ */ n("span", { className: a.sidemenuBrandIcon, children: C }),
          /* @__PURE__ */ n("span", { className: a.sidemenuBrandText, children: k }),
          /* @__PURE__ */ n(
            "button",
            {
              className: a.sidemenuCollapseBtn,
              onClick: L,
              "aria-label": r ? "Expand sidebar" : "Collapse sidebar",
              "aria-expanded": !r,
              children: /* @__PURE__ */ n("span", { children: r ? "→" : "←" })
            }
          )
        ] }),
        w && !r && /* @__PURE__ */ n("div", { className: a.sidemenuSearch, children: /* @__PURE__ */ n(
          "input",
          {
            type: "text",
            className: a.sidemenuSearchInput,
            placeholder: U,
            value: S,
            onChange: (e) => E(e.target.value),
            "aria-label": "Search menu"
          }
        ) }),
        /* @__PURE__ */ n("div", { className: a.sidemenuNav, children: o.map((e) => Q(e) ? $(e) : u(e)) }),
        i && /* @__PURE__ */ n("div", { className: a.sidemenuFooter, children: /* @__PURE__ */ t("div", { className: a.sidemenuUser, children: [
          D(),
          /* @__PURE__ */ t("div", { className: a.sidemenuUserInfo, children: [
            /* @__PURE__ */ n("div", { className: a.sidemenuUserName, children: i.name }),
            i.email && /* @__PURE__ */ n("div", { className: a.sidemenuUserEmail, children: i.email })
          ] })
        ] }) })
      ]
    }
  );
};
export {
  z as Sidemenu
};
//# sourceMappingURL=Sidemenu.js.map
