import { jsxs as s, jsx as a, Fragment as P } from "react/jsx-runtime";
import { useState as v, useRef as Z, useEffect as C, useCallback as c } from "react";
import { createPortal as Y } from "react-dom";
import { X as S, ZoomOut as ee, ZoomIn as te, RotateCcw as ae, RotateCw as re, Maximize2 as ie, ChevronLeft as le, ChevronRight as ne } from "lucide-react";
import t from "./ImageViewer.module.css.js";
const se = ({
  open: o,
  onClose: V,
  src: A,
  alt: O = "",
  images: i,
  initialIndex: j = 0,
  toolbar: F = !0,
  closable: G = !0,
  maskClosable: K = !0,
  keyboard: R = !0,
  navigation: h = !0,
  thumbnails: X = !1,
  loop: m = !0,
  minZoom: k = 0.1,
  maxZoom: y = 5,
  zoomStep: w = 0.2,
  onNavigate: n
}) => {
  const [l, u] = v(j), [b, f] = v(1), [I, g] = v(0), [T, $] = v(!0), _ = Z(null), N = Z(null), r = !!i && i.length > 0, p = r ? i[l] : { src: A || "", alt: O || "" };
  C(() => {
    o && (f(1), g(0), $(!0));
  }, [l, o]), C(() => (o ? (N.current = document.activeElement, document.body.style.overflow = "hidden") : (document.body.style.overflow = "", N.current && N.current.focus()), () => {
    document.body.style.overflow = "";
  }), [o]), C(() => {
    if (!R || !o) return;
    const e = (d) => {
      switch (d.key) {
        case "Escape":
          V();
          break;
        case "ArrowLeft":
          r && h && E();
          break;
        case "ArrowRight":
          r && h && D();
          break;
        case "+":
        case "=":
          L();
          break;
        case "-":
        case "_":
          M();
          break;
        case "r":
        case "R":
          x();
          break;
      }
    };
    return document.addEventListener("keydown", e), () => {
      document.removeEventListener("keydown", e);
    };
  }, [R, o, r, h, l, b, I]);
  const L = c(() => {
    f((e) => Math.min(e + w, y));
  }, [w, y]), M = c(() => {
    f((e) => Math.max(e - w, k));
  }, [w, k]), q = c(() => {
    g((e) => e - 90);
  }, []), x = c(() => {
    g((e) => e + 90);
  }, []), z = c(() => {
    f(1), g(0);
  }, []), D = c(() => {
    if (!r) return;
    const e = l + 1;
    e < i.length ? (u(e), n?.(e)) : m && (u(0), n?.(0));
  }, [r, l, i, m, n]), E = c(() => {
    if (!r) return;
    const e = l - 1;
    e >= 0 ? (u(e), n?.(e)) : m && (u(i.length - 1), n?.(i.length - 1));
  }, [r, l, i, m, n]), B = c(
    (e) => {
      !r || e < 0 || e >= i.length || (u(e), n?.(e));
    },
    [r, i, n]
  ), H = () => {
    K && V();
  }, J = () => {
    $(!1);
  }, Q = !m && l === 0, U = !m && r && l === i.length - 1;
  if (!o) return null;
  const W = /* @__PURE__ */ s("div", { className: `${t.imageViewer} ${t.imageViewerOpen}`, children: [
    /* @__PURE__ */ a("div", { className: t.imageViewerMask, onClick: H }),
    /* @__PURE__ */ s("div", { className: t.imageViewerContent, children: [
      G && /* @__PURE__ */ a(
        "button",
        {
          className: t.imageViewerClose,
          onClick: V,
          "aria-label": "Close image viewer",
          type: "button",
          children: /* @__PURE__ */ a(S, {})
        }
      ),
      F && /* @__PURE__ */ s("div", { className: t.imageViewerToolbar, children: [
        r && /* @__PURE__ */ s(P, { children: [
          /* @__PURE__ */ s("span", { className: t.imageViewerCounter, children: [
            l + 1,
            " / ",
            i.length
          ] }),
          /* @__PURE__ */ a("div", { className: t.imageViewerDivider })
        ] }),
        /* @__PURE__ */ a(
          "button",
          {
            className: t.imageViewerTool,
            onClick: M,
            "aria-label": "Zoom out",
            type: "button",
            disabled: b <= k,
            children: /* @__PURE__ */ a(ee, {})
          }
        ),
        /* @__PURE__ */ s("span", { className: t.imageViewerZoomLevel, "aria-live": "polite", children: [
          Math.round(b * 100),
          "%"
        ] }),
        /* @__PURE__ */ a(
          "button",
          {
            className: t.imageViewerTool,
            onClick: L,
            "aria-label": "Zoom in",
            type: "button",
            disabled: b >= y,
            children: /* @__PURE__ */ a(te, {})
          }
        ),
        /* @__PURE__ */ a("div", { className: t.imageViewerDivider }),
        /* @__PURE__ */ a(
          "button",
          {
            className: t.imageViewerTool,
            onClick: q,
            "aria-label": "Rotate counterclockwise",
            type: "button",
            children: /* @__PURE__ */ a(ae, {})
          }
        ),
        /* @__PURE__ */ a(
          "button",
          {
            className: t.imageViewerTool,
            onClick: x,
            "aria-label": "Rotate clockwise",
            type: "button",
            children: /* @__PURE__ */ a(re, {})
          }
        ),
        /* @__PURE__ */ a("div", { className: t.imageViewerDivider }),
        /* @__PURE__ */ a(
          "button",
          {
            className: t.imageViewerTool,
            onClick: z,
            "aria-label": "Reset zoom and rotation",
            type: "button",
            children: /* @__PURE__ */ a(ie, {})
          }
        )
      ] }),
      r && h && /* @__PURE__ */ s(P, { children: [
        /* @__PURE__ */ a(
          "button",
          {
            className: `${t.imageViewerNav} ${t.imageViewerPrev}`,
            onClick: E,
            disabled: Q,
            "aria-label": "Previous image",
            type: "button",
            children: /* @__PURE__ */ a(le, {})
          }
        ),
        /* @__PURE__ */ a(
          "button",
          {
            className: `${t.imageViewerNav} ${t.imageViewerNext}`,
            onClick: D,
            disabled: U,
            "aria-label": "Next image",
            type: "button",
            children: /* @__PURE__ */ a(ne, {})
          }
        )
      ] }),
      /* @__PURE__ */ s("div", { className: t.imageViewerMain, children: [
        T && /* @__PURE__ */ a("div", { className: t.imageViewerLoading }),
        /* @__PURE__ */ a(
          "img",
          {
            ref: _,
            src: p.src,
            alt: p.alt,
            draggable: !1,
            onLoad: J,
            style: {
              transform: `scale(${b}) rotate(${I}deg)`,
              display: T ? "none" : "block"
            }
          }
        )
      ] }),
      r && X && /* @__PURE__ */ a("div", { className: t.imageViewerThumbnails, children: i.map((e, d) => /* @__PURE__ */ a(
        "img",
        {
          src: e.thumbnail || e.src,
          alt: `Thumbnail ${d + 1}`,
          className: `${t.imageViewerThumbnail} ${d === l ? t.imageViewerThumbnailActive : ""}`,
          onClick: () => B(d)
        },
        d
      )) })
    ] })
  ] });
  return Y(W, document.body);
};
se.displayName = "ImageViewer";
export {
  se as ImageViewer
};
//# sourceMappingURL=ImageViewer.js.map
