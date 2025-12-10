import { jsxs as h, jsx as l } from "react/jsx-runtime";
import { useRef as v, useCallback as j, useEffect as u } from "react";
import { createPortal as R } from "react-dom";
import { X as A } from "lucide-react";
import t from "./Drawer.module.css.js";
const m = ({
  open: e,
  onClose: a,
  placement: o = "right",
  size: s = "md",
  closeOnOverlayClick: c = !0,
  closeOnEsc: y = !0,
  children: g,
  className: x,
  "aria-label": D,
  "aria-labelledby": k
}) => {
  const d = v(null), i = v(null), B = j(
    (r) => {
      c && r.target === r.currentTarget && a();
    },
    [c, a]
  );
  if (u(() => {
    if (!e || !y) return;
    const r = (n) => {
      n.key === "Escape" && a();
    };
    return document.addEventListener("keydown", r), () => document.removeEventListener("keydown", r);
  }, [e, y, a]), u(() => {
    if (e) {
      const r = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden", document.body.style.paddingRight = `${r}px`;
    } else
      document.body.style.overflow = "", document.body.style.paddingRight = "";
    return () => {
      document.body.style.overflow = "", document.body.style.paddingRight = "";
    };
  }, [e]), u(() => {
    if (e && d.current) {
      i.current = document.activeElement;
      const n = d.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )[0];
      n && n.focus();
    } else !e && i.current && (i.current.focus(), i.current = null);
  }, [e]), u(() => {
    if (!e || !d.current) return;
    const r = (n) => {
      if (n.key !== "Tab" || !d.current) return;
      const f = Array.from(
        d.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ), b = f[0], w = f[f.length - 1];
      n.shiftKey ? document.activeElement === b && (n.preventDefault(), w?.focus()) : document.activeElement === w && (n.preventDefault(), b?.focus());
    };
    return document.addEventListener("keydown", r), () => document.removeEventListener("keydown", r);
  }, [e]), !e) return null;
  const C = [
    t.drawer,
    t[`drawer-${o}`],
    s !== "md" && t[`drawer-${s}`],
    e && t.drawerOpen,
    x
  ].filter(Boolean).join(" "), F = /* @__PURE__ */ h("div", { className: C, children: [
    /* @__PURE__ */ l("div", { className: t.drawerOverlay, onClick: B }),
    /* @__PURE__ */ l(
      "div",
      {
        ref: d,
        className: t.drawerContent,
        role: "dialog",
        "aria-modal": "true",
        "aria-label": D,
        "aria-labelledby": k,
        children: g
      }
    )
  ] });
  return R(F, document.body);
}, E = ({
  children: e,
  showClose: a = !0,
  onClose: o,
  className: s
}) => {
  const c = [t.drawerHeader, s].filter(Boolean).join(" ");
  return /* @__PURE__ */ h("div", { className: c, children: [
    /* @__PURE__ */ l("div", { className: t.drawerTitle, children: e }),
    a && o && /* @__PURE__ */ l(
      "button",
      {
        className: t.drawerClose,
        onClick: o,
        "aria-label": "Close drawer",
        type: "button",
        children: /* @__PURE__ */ l(A, {})
      }
    )
  ] });
}, p = ({ children: e, className: a }) => {
  const o = [t.drawerBody, a].filter(Boolean).join(" ");
  return /* @__PURE__ */ l("div", { className: o, children: e });
}, N = ({ children: e, className: a }) => {
  const o = [t.drawerFooter, a].filter(Boolean).join(" ");
  return /* @__PURE__ */ l("div", { className: o, children: e });
};
m.Header = E;
m.Body = p;
m.Footer = N;
m.displayName = "Drawer";
E.displayName = "Drawer.Header";
p.displayName = "Drawer.Body";
N.displayName = "Drawer.Footer";
export {
  m as Drawer
};
//# sourceMappingURL=Drawer.js.map
