import { jsxs as E, jsx as o, Fragment as y } from "react/jsx-runtime";
import { useRef as p, useState as C, useEffect as k } from "react";
import { ArrowDown as P, RefreshCw as q } from "lucide-react";
import e from "./PullToRefresh.module.css.js";
const J = ({
  onRefresh: g,
  children: S,
  pullDistance: s = 80,
  style: d = "default",
  disabled: N = !1,
  className: A = ""
}) => {
  const $ = p(null), I = p(null), f = p(0), m = p(0), [t, l] = C("idle"), [c, a] = C(0);
  k(() => {
    const n = $.current;
    if (!n || N) return;
    let h = !1;
    const T = (r) => {
      n.scrollTop === 0 && t === "idle" && (f.current = r.touches[0].clientY, h = !0);
    }, R = (r) => {
      if (!h) return;
      m.current = r.touches[0].clientY;
      const i = m.current - f.current;
      if (i > 0) {
        r.preventDefault();
        const u = Math.min(i * 0.5, s * 1.5);
        a(u), u >= s ? l("release") : l("pulling");
      }
    }, Y = async () => {
      if (h)
        if (h = !1, c >= s) {
          l("refreshing"), a(s);
          try {
            await g();
          } catch (r) {
            console.error("Refresh error:", r);
          } finally {
            l("idle"), a(0);
          }
        } else
          l("idle"), a(0);
    };
    let v = !1;
    const w = (r) => {
      n.scrollTop === 0 && t === "idle" && (f.current = r.clientY, v = !0);
    }, x = (r) => {
      if (!v) return;
      m.current = r.clientY;
      const i = m.current - f.current;
      if (i > 0) {
        r.preventDefault();
        const u = Math.min(i * 0.5, s * 1.5);
        a(u), u >= s ? l("release") : l("pulling");
      }
    }, M = async () => {
      if (v)
        if (v = !1, c >= s) {
          l("refreshing"), a(s);
          try {
            await g();
          } catch (r) {
            console.error("Refresh error:", r);
          } finally {
            l("idle"), a(0);
          }
        } else
          l("idle"), a(0);
    };
    return n.addEventListener("touchstart", T, { passive: !0 }), n.addEventListener("touchmove", R, { passive: !1 }), n.addEventListener("touchend", Y), n.addEventListener("mousedown", w), document.addEventListener("mousemove", x), document.addEventListener("mouseup", M), () => {
      n.removeEventListener("touchstart", T), n.removeEventListener("touchmove", R), n.removeEventListener("touchend", Y), n.removeEventListener("mousedown", w), document.removeEventListener("mousemove", x), document.removeEventListener("mouseup", M);
    };
  }, [N, g, s, t, c]);
  const U = `${e.pullToRefresh} ${A}`.trim(), j = `
    ${e.pullToRefreshContent}
    ${t === "pulling" ? e.pulling : ""}
    ${t === "refreshing" ? e.refreshing : ""}
  `.trim(), b = `
    ${e.pullIndicator}
    ${c > 0 ? e.visible : ""}
    ${t !== "idle" ? e[`state${t.charAt(0).toUpperCase() + t.slice(1)}`] : ""}
    ${d !== "default" ? e[`style${d.charAt(0).toUpperCase() + d.slice(1)}`] : ""}
  `.trim(), L = () => {
    switch (t) {
      case "pulling":
        return "Pull to refresh";
      case "release":
        return "Release to refresh";
      case "refreshing":
        return "Refreshing...";
      default:
        return "Pull to refresh";
    }
  };
  return /* @__PURE__ */ E(
    "div",
    {
      ref: $,
      className: U,
      style: {
        "--mobile-pull-distance": `${s}px`
      },
      children: [
        /* @__PURE__ */ o("div", { className: b, children: d === "spinner" ? /* @__PURE__ */ E(y, { children: [
          t === "refreshing" ? /* @__PURE__ */ o("div", { className: e.pullSpinner }) : /* @__PURE__ */ o("div", { className: e.pullIcon, children: /* @__PURE__ */ o(P, { className: e.icon }) }),
          /* @__PURE__ */ o("span", { className: e.pullText, children: L() })
        ] }) : /* @__PURE__ */ E(y, { children: [
          /* @__PURE__ */ o("div", { className: e.pullIcon, children: t === "refreshing" ? /* @__PURE__ */ o(q, { className: e.icon }) : /* @__PURE__ */ o(P, { className: e.icon }) }),
          /* @__PURE__ */ o("span", { className: e.pullText, children: L() })
        ] }) }),
        /* @__PURE__ */ o(
          "div",
          {
            ref: I,
            className: j,
            style: {
              transform: `translateY(${c}px)`
            },
            children: S
          }
        )
      ]
    }
  );
};
export {
  J as PullToRefresh,
  J as default
};
//# sourceMappingURL=PullToRefresh.js.map
