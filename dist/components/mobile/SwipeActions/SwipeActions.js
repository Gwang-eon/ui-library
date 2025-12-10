import { jsxs as E, jsx as c } from "react/jsx-runtime";
import { useRef as v, useState as I, useEffect as q } from "react";
import a from "./SwipeActions.module.css.js";
const G = ({
  leftActions: n = [],
  rightActions: t = [],
  children: S,
  threshold: f = 80,
  disabled: M = !1,
  className: y = ""
}) => {
  const k = v(null), x = v(null), m = v(0), i = v(0), [r, s] = I(0), [D, d] = I(!1);
  q(() => {
    const e = x.current;
    if (!e || M) return;
    let l = !1;
    const u = (o) => {
      m.current = o.touches[0].clientX, i.current = r, l = !0, d(!0);
    }, $ = (o) => {
      if (!l) return;
      const p = o.touches[0].clientX - m.current, g = i.current + p, w = n.length > 0 ? n.length * 80 : 0, L = t.length > 0 ? -t.length * 80 : 0, X = Math.max(L, Math.min(w, g));
      s(X);
    }, R = () => {
      l && (l = !1, d(!1), Math.abs(r) >= f ? r > 0 && n.length > 0 ? s(n.length * 80) : r < 0 && t.length > 0 ? s(-t.length * 80) : s(0) : s(0));
    };
    let h = !1;
    const T = (o) => {
      m.current = o.clientX, i.current = r, h = !0, d(!0);
    }, b = (o) => {
      if (!h) return;
      const p = o.clientX - m.current, g = i.current + p, w = n.length > 0 ? n.length * 80 : 0, L = t.length > 0 ? -t.length * 80 : 0, X = Math.max(L, Math.min(w, g));
      s(X);
    }, C = () => {
      h && (h = !1, d(!1), Math.abs(r) >= f ? r > 0 && n.length > 0 ? s(n.length * 80) : r < 0 && t.length > 0 ? s(-t.length * 80) : s(0) : s(0));
    };
    return e.addEventListener("touchstart", u, { passive: !0 }), e.addEventListener("touchmove", $, { passive: !0 }), e.addEventListener("touchend", R), e.addEventListener("mousedown", T), document.addEventListener("mousemove", b), document.addEventListener("mouseup", C), () => {
      e.removeEventListener("touchstart", u), e.removeEventListener("touchmove", $), e.removeEventListener("touchend", R), e.removeEventListener("mousedown", T), document.removeEventListener("mousemove", b), document.removeEventListener("mouseup", C);
    };
  }, [M, n.length, t.length, f, r]);
  const N = (e) => {
    e.onAction(), s(0);
  }, j = `${a.swipeContainer} ${y}`.trim(), U = `${a.swipeItem} ${D ? a.swiping : ""}`.trim();
  return /* @__PURE__ */ E("div", { ref: k, className: j, children: [
    n.length > 0 && /* @__PURE__ */ c("div", { className: a.swipeActionsLeft, children: n.map((e, l) => {
      const u = e.icon;
      return /* @__PURE__ */ E(
        "button",
        {
          className: `${a.swipeAction} ${a[e.type]}`,
          onClick: () => N(e),
          children: [
            /* @__PURE__ */ c(u, { className: a.actionIcon }),
            /* @__PURE__ */ c("span", { children: e.label })
          ]
        },
        l
      );
    }) }),
    t.length > 0 && /* @__PURE__ */ c("div", { className: a.swipeActionsRight, children: t.map((e, l) => {
      const u = e.icon;
      return /* @__PURE__ */ E(
        "button",
        {
          className: `${a.swipeAction} ${a[e.type]}`,
          onClick: () => N(e),
          children: [
            /* @__PURE__ */ c(u, { className: a.actionIcon }),
            /* @__PURE__ */ c("span", { children: e.label })
          ]
        },
        l
      );
    }) }),
    /* @__PURE__ */ c(
      "div",
      {
        ref: x,
        className: U,
        style: {
          transform: `translateX(${r}px)`
        },
        children: S
      }
    )
  ] });
};
export {
  G as SwipeActions,
  G as default
};
//# sourceMappingURL=SwipeActions.js.map
