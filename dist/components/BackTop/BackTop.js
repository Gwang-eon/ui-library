import { jsxs as B, jsx as p } from "react/jsx-runtime";
import { useState as R, useRef as j, useCallback as s, useEffect as x } from "react";
import { ArrowUp as y } from "lucide-react";
import n from "./BackTop.module.css.js";
const F = ({
  threshold: c = 400,
  duration: M = 450,
  size: i = "md",
  variant: a = "default",
  position: w = "right",
  showText: d = !1,
  text: T = "Top",
  target: t,
  onClick: u,
  className: b,
  style: h,
  children: E
}) => {
  const [m, v] = R(!1), r = j(null), f = s(() => {
    const e = t?.();
    return !e || e === window ? window.pageYOffset || document.documentElement.scrollTop : e.scrollTop;
  }, [t]), l = s(() => {
    r.current !== null && cancelAnimationFrame(r.current), r.current = requestAnimationFrame(() => {
      const e = f();
      v(e > c);
    });
  }, [c, f]), k = s(() => {
    u?.();
    const e = t?.(), o = !e || e === window ? window : e;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      o === window ? window.scrollTo(0, 0) : o.scrollTop = 0;
      return;
    }
    o === window ? window.scrollTo({ top: 0, behavior: "smooth" }) : o.scrollTo({ top: 0, behavior: "smooth" });
  }, [t, u]);
  x(() => {
    const e = t?.() || window, o = e === window ? window : e;
    return l(), o.addEventListener("scroll", l, { passive: !0 }), () => {
      o.removeEventListener("scroll", l), r.current !== null && cancelAnimationFrame(r.current);
    };
  }, [t, l]);
  const A = [
    n.backtop,
    m && n.visible,
    i !== "md" && n[i],
    a !== "default" && n[a],
    w === "left" && n.left,
    d && n.withText,
    b
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ B(
    "button",
    {
      className: A,
      style: h,
      onClick: k,
      "aria-label": "Back to top",
      "aria-hidden": !m,
      type: "button",
      children: [
        E || /* @__PURE__ */ p(y, { "aria-hidden": "true" }),
        d && /* @__PURE__ */ p("span", { children: T })
      ]
    }
  );
};
F.displayName = "BackTop";
export {
  F as BackTop
};
//# sourceMappingURL=BackTop.js.map
