import { jsxs as d, Fragment as U, jsx as n } from "react/jsx-runtime";
import { useState as g, useRef as S, useEffect as h } from "react";
import { createPortal as Y } from "react-dom";
import { X as G } from "lucide-react";
import { Button as b } from "../Button/Button.js";
import e from "./Tour.module.css.js";
const I = ({
  open: o,
  steps: u,
  current: y,
  onChange: x,
  onClose: m,
  onFinish: C,
  onSkip: T,
  mask: $ = !0,
  closable: H = !0,
  showSkip: z = !0,
  showProgress: M = !0,
  placement: p = "bottom",
  "aria-label": F = "Product tour"
}) => {
  const [A, W] = g(0), [k, q] = g({ top: 0, left: 0 }), [B, D] = g(p), f = S(null), v = S(null), [w, j] = g(null), N = y !== void 0, i = N ? y : A, E = (r) => {
    N || W(r), x?.(r);
  }, a = u[i];
  h(() => {
    o ? v.current = document.activeElement : v.current && v.current.focus();
  }, [o]), h(() => {
    if (!o || !a) return;
    document.querySelectorAll(`.${e.tourTargetHighlight}`).forEach((t) => {
      t.classList.remove(e.tourTargetHighlight);
    });
    const r = document.querySelector(a.target);
    return r && (r.classList.add(e.tourTargetHighlight), j(r)), () => {
      document.querySelectorAll(`.${e.tourTargetHighlight}`).forEach((t) => {
        t.classList.remove(e.tourTargetHighlight);
      });
    };
  }, [o, a, i]), h(() => {
    if (!o || !w || !f.current) return;
    const r = () => {
      const t = w.getBoundingClientRect(), s = f.current.getBoundingClientRect(), R = a?.placement || p;
      let l = 0, c = 0;
      switch (R) {
        case "top":
          l = t.top - s.height - 12, c = t.left + t.width / 2 - s.width / 2;
          break;
        case "right":
          l = t.top + t.height / 2 - s.height / 2, c = t.right + 12;
          break;
        case "left":
          l = t.top + t.height / 2 - s.height / 2, c = t.left - s.width - 12;
          break;
        case "bottom":
        default:
          l = t.bottom + 12, c = t.left + t.width / 2 - s.width / 2;
          break;
      }
      l = Math.max(12, Math.min(l, window.innerHeight - s.height - 12)), c = Math.max(12, Math.min(c, window.innerWidth - s.width - 12)), q({
        top: l + window.pageYOffset,
        left: c + window.pageXOffset
      }), D(R);
    };
    return r(), window.addEventListener("scroll", r), window.addEventListener("resize", r), () => {
      window.removeEventListener("scroll", r), window.removeEventListener("resize", r);
    };
  }, [o, w, a, p]), h(() => {
    if (!o) return;
    const r = (t) => {
      switch (t.key) {
        case "Escape":
          m();
          break;
        case "ArrowRight":
        case "Enter":
        case " ":
          t.key === " " && t.preventDefault(), P();
          break;
        case "ArrowLeft":
          L();
          break;
      }
    };
    return document.addEventListener("keydown", r), () => document.removeEventListener("keydown", r);
  }, [o, i, u.length]), h(() => {
    if (o) {
      const r = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden", document.body.style.paddingRight = `${r}px`;
    } else
      document.body.style.overflow = "", document.body.style.paddingRight = "";
    return () => {
      document.body.style.overflow = "", document.body.style.paddingRight = "";
    };
  }, [o]);
  const P = () => {
    i < u.length - 1 ? E(i + 1) : (C?.(), m());
  }, L = () => {
    i > 0 && E(i - 1);
  }, O = () => {
    T?.(), m();
  }, V = () => {
    m();
  };
  if (!o || u.length === 0) return null;
  const X = i === 0, K = i === u.length - 1;
  return Y(
    /* @__PURE__ */ d(U, { children: [
      $ && /* @__PURE__ */ n(
        "div",
        {
          className: `${e.tourMask} ${e.tourMaskVisible}`,
          "aria-hidden": "true"
        }
      ),
      /* @__PURE__ */ d(
        "div",
        {
          ref: f,
          className: `${e.tourPopup} ${e.tourPopupVisible}`,
          style: {
            top: `${k.top}px`,
            left: `${k.left}px`
          },
          "data-placement": B,
          role: "dialog",
          "aria-modal": "false",
          "aria-label": F,
          "aria-describedby": "tour-content",
          children: [
            /* @__PURE__ */ d("div", { className: e.tourHeader, children: [
              M && /* @__PURE__ */ d("div", { className: e.tourProgress, "aria-live": "polite", children: [
                i + 1,
                " / ",
                u.length
              ] }),
              H && /* @__PURE__ */ n(
                "button",
                {
                  className: e.tourClose,
                  onClick: V,
                  "aria-label": "Close tour",
                  children: /* @__PURE__ */ n(G, { size: 20 })
                }
              )
            ] }),
            /* @__PURE__ */ d("div", { className: e.tourContent, id: "tour-content", children: [
              /* @__PURE__ */ n("h4", { className: e.tourTitle, children: a.title }),
              /* @__PURE__ */ n("div", { className: e.tourDescription, children: a.content })
            ] }),
            /* @__PURE__ */ d("div", { className: e.tourFooter, children: [
              z ? /* @__PURE__ */ n(
                b,
                {
                  variant: "ghost",
                  size: "sm",
                  onClick: O,
                  className: e.tourSkip,
                  children: "Skip"
                }
              ) : /* @__PURE__ */ n("span", {}),
              /* @__PURE__ */ d("div", { className: e.tourNav, children: [
                /* @__PURE__ */ n(
                  b,
                  {
                    variant: "secondary",
                    size: "sm",
                    onClick: L,
                    disabled: X,
                    className: e.tourPrev,
                    children: "Previous"
                  }
                ),
                /* @__PURE__ */ n(
                  b,
                  {
                    variant: "primary",
                    size: "sm",
                    onClick: P,
                    className: e.tourNext,
                    children: K ? "Finish" : "Next"
                  }
                )
              ] })
            ] })
          ]
        }
      )
    ] }),
    document.body
  );
};
I.displayName = "Tour";
export {
  I as Tour
};
//# sourceMappingURL=Tour.js.map
