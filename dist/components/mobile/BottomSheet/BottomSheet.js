import { jsxs as d, Fragment as D, jsx as o } from "react/jsx-runtime";
import { useRef as u, useEffect as k } from "react";
import { X as x } from "lucide-react";
import t from "./BottomSheet.module.css.js";
const I = ({
  open: r,
  onClose: s,
  height: Y = "half",
  title: m,
  showHandle: p = !0,
  showBackdrop: y = !0,
  closeButton: b = !0,
  footer: i,
  children: E,
  className: M = ""
}) => {
  const c = u(null), a = u(0), T = u(0);
  k(() => (r ? document.body.style.overflow = "hidden" : document.body.style.overflow = "", () => {
    document.body.style.overflow = "";
  }), [r]);
  const h = (e) => {
    a.current = e, T.current = e;
  }, v = (e) => {
    const n = e - a.current;
    n > 0 && c.current && (c.current.style.transform = `translateY(${n}px)`);
  }, f = (e) => {
    const n = e - a.current;
    c.current && (c.current.style.transform = "", n > 100 && s());
  }, $ = (e) => {
    h(e.touches[0].clientY);
  }, g = (e) => {
    v(e.touches[0].clientY);
  }, w = (e) => {
    f(e.changedTouches[0].clientY);
  }, S = (e) => {
    h(e.clientY);
    const n = (l) => {
      v(l.clientY);
    }, N = (l) => {
      f(l.clientY), document.removeEventListener("mousemove", n), document.removeEventListener("mouseup", N);
    };
    document.addEventListener("mousemove", n), document.addEventListener("mouseup", N);
  };
  return /* @__PURE__ */ d(D, { children: [
    y && /* @__PURE__ */ o(
      "div",
      {
        className: `${t.backdrop} ${r ? t.backdropShow : ""}`,
        onClick: s
      }
    ),
    /* @__PURE__ */ d(
      "div",
      {
        ref: c,
        className: `${t.bottomSheet} ${t[Y]} ${r ? t.open : ""} ${M}`,
        children: [
          p && /* @__PURE__ */ o(
            "div",
            {
              className: t.handle,
              onTouchStart: $,
              onTouchMove: g,
              onTouchEnd: w,
              onMouseDown: S,
              children: /* @__PURE__ */ o("div", { className: t.dragIndicator })
            }
          ),
          m && /* @__PURE__ */ d("div", { className: t.header, children: [
            /* @__PURE__ */ o("h3", { className: t.title, children: m }),
            b && /* @__PURE__ */ o("button", { className: t.closeButton, onClick: s, "aria-label": "Close", children: /* @__PURE__ */ o(x, { className: t.closeIcon }) })
          ] }),
          /* @__PURE__ */ o("div", { className: t.content, children: E }),
          i && /* @__PURE__ */ o("div", { className: t.footer, children: i })
        ]
      }
    )
  ] });
};
export {
  I as BottomSheet
};
//# sourceMappingURL=BottomSheet.js.map
