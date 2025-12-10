import { jsxs as k, jsx as l } from "react/jsx-runtime";
import { useState as $, useRef as y, useEffect as B } from "react";
import { ChevronUp as b, ChevronDown as L } from "lucide-react";
import { Button as g } from "../Button/Button.js";
import n from "./SplitButton.module.css.js";
const O = ({
  label: w,
  icon: I,
  onClick: v,
  items: C,
  variant: d = "primary",
  size: s = "md",
  disabled: p = !1,
  loading: m = !1,
  "aria-label": D,
  className: M
}) => {
  const [r, i] = $(!1), u = y(null), f = y(null);
  B(() => {
    const e = (t) => {
      u.current && !u.current.contains(t.target) && i(!1);
    };
    if (r)
      return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
  }, [r]), B(() => {
    const e = (t) => {
      if (r) {
        if (t.key === "Escape") {
          i(!1);
          return;
        }
        if (t.key === "ArrowDown" || t.key === "ArrowUp") {
          t.preventDefault();
          const o = f.current?.querySelectorAll(`.${n.splitButtonMenuItem}`);
          if (!o || o.length === 0) return;
          const a = Array.from(o).findIndex(
            (A) => A === document.activeElement
          );
          let c;
          t.key === "ArrowDown" ? c = a + 1 >= o.length ? 0 : a + 1 : c = a - 1 < 0 ? o.length - 1 : a - 1, o[c].focus();
        }
      }
    };
    if (r)
      return document.addEventListener("keydown", e), () => document.removeEventListener("keydown", e);
  }, [r]);
  const x = (e) => {
    e.stopPropagation(), i(!r);
  }, E = (e) => {
    e.stopPropagation(), v?.();
  }, h = (e) => {
    e.divider || (e.onClick?.(), i(!1));
  }, N = [
    n.splitButton,
    s === "sm" && n.splitButtonSm,
    s === "lg" && n.splitButtonLg,
    M
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ k("div", { className: N, ref: u, children: [
    /* @__PURE__ */ l(
      g,
      {
        className: n.splitButtonAction,
        variant: d,
        size: s,
        onClick: E,
        disabled: p,
        loading: m,
        icon: I,
        "aria-label": D,
        children: w
      }
    ),
    /* @__PURE__ */ l(
      g,
      {
        className: n.splitButtonToggle,
        variant: d,
        size: s,
        onClick: x,
        disabled: p || m,
        "aria-label": "More options",
        "aria-haspopup": "menu",
        "aria-expanded": r,
        iconOnly: !0,
        children: r ? /* @__PURE__ */ l(b, { size: 16 }) : /* @__PURE__ */ l(L, { size: 16 })
      }
    ),
    /* @__PURE__ */ l(
      "ul",
      {
        ref: f,
        className: `${n.splitButtonMenu} ${r ? n.splitButtonMenuOpen : ""}`,
        role: "menu",
        children: C.map((e, t) => e.divider ? /* @__PURE__ */ l(
          "li",
          {
            className: n.splitButtonMenuDivider,
            role: "separator",
            "aria-hidden": "true"
          },
          `divider-${t}`
        ) : /* @__PURE__ */ k(
          "li",
          {
            className: `${n.splitButtonMenuItem} ${e.danger ? n.splitButtonMenuItemDanger : ""}`,
            role: "menuitem",
            tabIndex: 0,
            onClick: () => h(e),
            onKeyDown: (o) => {
              (o.key === "Enter" || o.key === " ") && (o.preventDefault(), h(e));
            },
            children: [
              e.icon && /* @__PURE__ */ l("span", { className: n.splitButtonMenuItemIcon, children: e.icon }),
              /* @__PURE__ */ l("span", { children: e.label })
            ]
          },
          t
        ))
      }
    )
  ] });
};
O.displayName = "SplitButton";
export {
  O as SplitButton
};
//# sourceMappingURL=SplitButton.js.map
