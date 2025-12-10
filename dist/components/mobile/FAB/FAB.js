import { jsxs as t, jsx as s, Fragment as D } from "react/jsx-runtime";
import { useState as N, useEffect as g } from "react";
import e from "./FAB.module.css.js";
const S = ({
  icon: f,
  label: r,
  size: i = "standard",
  position: c = "bottom-right",
  color: o = "primary",
  badge: n,
  hideOnScroll: l = !1,
  onClick: d,
  disabled: m = !1,
  className: a = ""
}) => {
  const [h, p] = N(!1), [u, w] = N(0);
  g(() => {
    if (!l) return;
    const A = () => {
      const $ = window.scrollY;
      $ > u && $ > 100 ? p(!0) : p(!1), w($);
    };
    return window.addEventListener("scroll", A, { passive: !0 }), () => window.removeEventListener("scroll", A);
  }, [l, u]);
  const b = `
    ${e.fab}
    ${e[i]}
    ${e[c]}
    ${o !== "primary" ? e[o] : ""}
    ${h ? e.hidden : ""}
    ${a}
  `.trim(), v = /* @__PURE__ */ t(D, { children: [
    /* @__PURE__ */ s(f, { className: e.icon }),
    r && i === "extended" && /* @__PURE__ */ s("span", { className: e.label, children: r })
  ] });
  return n ? /* @__PURE__ */ t("div", { className: `${e.fabWrapper} ${e[c]}`, children: [
    /* @__PURE__ */ s("button", { className: b, onClick: d, disabled: m, children: v }),
    /* @__PURE__ */ s("span", { className: e.badge, children: n })
  ] }) : /* @__PURE__ */ s("button", { className: b, onClick: d, disabled: m, children: v });
}, x = ({
  icon: f,
  actions: r,
  position: i = "bottom-right",
  color: c = "primary",
  className: o = ""
}) => {
  const [n, l] = N(!1), d = () => {
    l(!n);
  }, m = (a) => {
    a.onClick(), l(!1);
  };
  return /* @__PURE__ */ t(D, { children: [
    /* @__PURE__ */ t("div", { className: `${e.speedDial} ${e[i]} ${n ? e.speedDialOpen : ""} ${o}`, children: [
      /* @__PURE__ */ s("div", { className: e.speedDialActions, children: r.map((a, h) => {
        const p = a.icon;
        return /* @__PURE__ */ t("div", { className: e.speedDialAction, children: [
          /* @__PURE__ */ s("span", { className: e.speedDialActionLabel, children: a.label }),
          /* @__PURE__ */ s(
            "button",
            {
              className: `${e.fab} ${e.mini}`,
              onClick: () => m(a),
              children: /* @__PURE__ */ s(p, { className: e.icon })
            }
          )
        ] }, h);
      }) }),
      /* @__PURE__ */ s(
        "button",
        {
          className: `${e.fab} ${e.standard} ${c !== "primary" ? e[c] : ""}`,
          onClick: d,
          children: /* @__PURE__ */ s(f, { className: e.icon })
        }
      )
    ] }),
    n && /* @__PURE__ */ s(
      "div",
      {
        className: e.speedDialBackdrop,
        onClick: () => l(!1)
      }
    )
  ] });
};
export {
  S as FAB,
  x as SpeedDialFAB
};
//# sourceMappingURL=FAB.js.map
