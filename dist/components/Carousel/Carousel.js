import { jsxs as f, jsx as l, Fragment as J } from "react/jsx-runtime";
import { useState as h, useRef as Q, Children as T, useCallback as $, useEffect as U } from "react";
import { ChevronLeft as V, ChevronRight as W } from "lucide-react";
import t from "./Carousel.module.css.js";
const A = ({
  children: c,
  autoPlay: o = 0,
  effect: m = "slide",
  showArrows: v = !0,
  showIndicators: P = !0,
  showThumbnails: I = !1,
  defaultIndex: R = 0,
  activeIndex: g,
  onChange: p,
  className: L,
  pauseOnHover: S = !0,
  loop: d = !0
}) => {
  const [B, D] = h(R), [y, k] = h(!1), [E, F] = h(0), [j, G] = h(0), C = Q(null), b = g !== void 0, s = b ? g : B, w = T.toArray(c), a = w.length, i = $(
    (r) => {
      let e = r;
      d ? (r < 0 && (e = a - 1), r >= a && (e = 0)) : (r < 0 && (e = 0), r >= a && (e = a - 1)), b || D(e), p?.(e);
    },
    [a, d, b, p]
  ), N = $(() => {
    i(s - 1);
  }, [s, i]), u = $(() => {
    i(s + 1);
  }, [s, i]);
  U(() => {
    if (o > 0 && !y)
      return C.current = setInterval(() => {
        u();
      }, o), () => {
        C.current && clearInterval(C.current);
      };
  }, [o, y, u]);
  const K = (r) => {
    F(r.targetTouches[0].clientX);
  }, X = (r) => {
    G(r.targetTouches[0].clientX);
  }, _ = () => {
    E - j > 50 && u(), E - j < -50 && N();
  }, q = (r) => {
    r.key === "ArrowLeft" ? N() : r.key === "ArrowRight" && u();
  }, z = [
    t.carousel,
    m === "fade" && t.carouselFade,
    L
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ f(
    "div",
    {
      className: z,
      onMouseEnter: () => S && k(!0),
      onMouseLeave: () => S && k(!1),
      onTouchStart: K,
      onTouchMove: X,
      onTouchEnd: _,
      onKeyDown: q,
      tabIndex: 0,
      role: "region",
      "aria-label": "Carousel",
      "aria-live": "polite",
      children: [
        /* @__PURE__ */ l("div", { className: t.carouselInner, children: T.map(c, (r, e) => {
          const n = e === s;
          return /* @__PURE__ */ l(
            "div",
            {
              className: `${t.carouselItem} ${n ? t.active : ""}`,
              role: "group",
              "aria-roledescription": "slide",
              "aria-label": `Slide ${e + 1} of ${a}`,
              "aria-hidden": !n,
              children: r
            }
          );
        }) }),
        v && a > 1 && /* @__PURE__ */ f(J, { children: [
          /* @__PURE__ */ l(
            "button",
            {
              className: `${t.carouselControl} ${t.carouselControlPrev}`,
              onClick: N,
              "aria-label": "Previous slide",
              disabled: !d && s === 0,
              children: /* @__PURE__ */ l(V, {})
            }
          ),
          /* @__PURE__ */ l(
            "button",
            {
              className: `${t.carouselControl} ${t.carouselControlNext}`,
              onClick: u,
              "aria-label": "Next slide",
              disabled: !d && s === a - 1,
              children: /* @__PURE__ */ l(W, {})
            }
          )
        ] }),
        P && a > 1 && !I && /* @__PURE__ */ l("div", { className: t.carouselIndicators, children: w.map((r, e) => /* @__PURE__ */ l(
          "button",
          {
            className: `${t.carouselIndicator} ${e === s ? t.active : ""}`,
            onClick: () => i(e),
            "aria-label": `Go to slide ${e + 1}`,
            "aria-current": e === s
          },
          e
        )) }),
        I && a > 1 && /* @__PURE__ */ l("div", { className: t.carouselThumbnailsContainer, children: T.map(c, (r, e) => {
          const n = r?.props?.thumbnail;
          return n ? /* @__PURE__ */ l(
            "button",
            {
              className: `${t.carouselThumbnail} ${e === s ? t.active : ""}`,
              onClick: () => i(e),
              "aria-label": `Go to slide ${e + 1}`,
              "aria-current": e === s,
              children: typeof n == "string" ? /* @__PURE__ */ l("img", { src: n, alt: `Thumbnail ${e + 1}` }) : n
            },
            e
          ) : null;
        }) })
      ]
    }
  );
}, M = ({ children: c, caption: o, className: m }) => {
  const v = [t.carouselSlide, m].filter(Boolean).join(" ");
  return /* @__PURE__ */ f("div", { className: v, children: [
    c,
    o && /* @__PURE__ */ f("div", { className: t.carouselCaption, children: [
      o.title && /* @__PURE__ */ l("h3", { children: o.title }),
      o.description && /* @__PURE__ */ l("p", { children: o.description })
    ] })
  ] });
};
A.Slide = M;
A.displayName = "Carousel";
M.displayName = "Carousel.Slide";
export {
  A as Carousel
};
//# sourceMappingURL=Carousel.js.map
