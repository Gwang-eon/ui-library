import { jsx as h, jsxs as D } from "react/jsx-runtime";
import { useState as O, useRef as p, useCallback as v, useEffect as B } from "react";
import o from "./Anchor.module.css.js";
const M = ({
  items: k,
  activeKey: a,
  offsetTop: g = 60,
  sticky: E = !1,
  onChange: l,
  className: S = "",
  rootMargin: b = "-20% 0px -80% 0px",
  smooth: y = !0
}) => {
  const [x, w] = O(""), N = p(null), d = p(/* @__PURE__ */ new Map()), i = p(null), R = a !== void 0 ? a : x, I = v((e) => e.reduce((r, t) => (r.push(t), t.children && r.push(...I(t.children)), r), []), []), f = I(k);
  B(() => {
    if (f.length === 0) return;
    const e = [];
    if (f.forEach((n) => {
      const s = n.href.substring(1), c = document.getElementById(s);
      c && e.push(c);
    }), e.length === 0) return;
    const r = {
      rootMargin: b,
      threshold: [0, 0.25, 0.5, 0.75, 1]
    }, t = /* @__PURE__ */ new Set();
    return i.current = new IntersectionObserver((n) => {
      if (n.forEach((s) => {
        s.isIntersecting ? t.add(s.target.id) : t.delete(s.target.id);
      }), t.size > 0) {
        const s = e.find(
          (c) => t.has(c.id)
        );
        if (s) {
          const c = f.find(
            (u) => u.href === "#" + s.id
          );
          if (c) {
            const u = c.key;
            a === void 0 && w(u), l?.(u);
          }
        }
      }
    }, r), e.forEach((n) => {
      i.current?.observe(n);
    }), () => {
      i.current && (e.forEach((n) => {
        i.current?.unobserve(n);
      }), i.current.disconnect());
    };
  }, [f, b, l, a]);
  const $ = v(
    (e, r) => {
      e.preventDefault();
      const t = r.href.substring(1), n = document.getElementById(t);
      if (n) {
        const s = -g, c = n.getBoundingClientRect().top + window.pageYOffset + s;
        window.scrollTo({
          top: c,
          behavior: y ? "smooth" : "auto"
        }), history.pushState && history.pushState(null, "", r.href), a === void 0 && w(r.key), l?.(r.key);
      }
    },
    [g, y, a, l]
  ), A = v(
    (e, r) => {
      const t = Array.from(d.current.values());
      let n;
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault(), n = Math.min(r + 1, t.length - 1), t[n]?.focus();
          break;
        case "ArrowUp":
          e.preventDefault(), n = Math.max(r - 1, 0), t[n]?.focus();
          break;
        case "Home":
          e.preventDefault(), t[0]?.focus();
          break;
        case "End":
          e.preventDefault(), t[t.length - 1]?.focus();
          break;
      }
    },
    []
  ), m = (e, r) => {
    const t = R === e.key;
    return /* @__PURE__ */ D("div", { className: o.anchorItem, children: [
      /* @__PURE__ */ D(
        "a",
        {
          href: e.href,
          ref: (n) => {
            n ? d.current.set(e.key, n) : d.current.delete(e.key);
          },
          className: `${o.anchorLink} ${t ? o.active : ""}`,
          onClick: (n) => $(n, e),
          onKeyDown: (n) => A(n, r),
          "aria-current": t ? "location" : void 0,
          children: [
            e.icon && /* @__PURE__ */ h("span", { className: o.anchorIcon, children: e.icon }),
            /* @__PURE__ */ h("span", { children: e.title })
          ]
        }
      ),
      e.children && e.children.length > 0 && /* @__PURE__ */ h("div", { className: o.anchorSubmenu, children: e.children.map(
        (n, s) => m(n, r + s + 1)
      ) })
    ] }, e.key);
  };
  return /* @__PURE__ */ h(
    "nav",
    {
      ref: N,
      className: `${o.anchor} ${E ? o.sticky : ""} ${S}`,
      role: "navigation",
      "aria-label": "Page navigation",
      children: k.map((e, r) => m(e, r))
    }
  );
};
export {
  M as Anchor
};
//# sourceMappingURL=Anchor.js.map
