import { jsx as o, jsxs as a, Fragment as g } from "react/jsx-runtime";
import { useState as N, useEffect as q } from "react";
import { createPortal as z } from "react-dom";
import { X as K, ImageOff as O, Image as $, Maximize2 as M } from "lucide-react";
import e from "./Image.module.css.js";
const W = ({
  src: h,
  alt: l,
  fit: s = "none",
  radius: f = "default",
  placeholder: t = !0,
  fallback: u,
  preview: i = !1,
  caption: y,
  loading: x = "lazy",
  className: k,
  width: E,
  height: w,
  ...I
}) => {
  const [n, v] = N("loading"), [d, b] = N(!1), P = () => {
    v("loaded");
  }, S = () => {
    v("error");
  }, C = () => {
    i && n === "loaded" && b(!0);
  }, m = () => {
    b(!1);
  }, c = (r) => {
    r.key === "Escape" && m();
  };
  q(() => (d ? (document.addEventListener("keydown", c), document.body.style.overflow = "hidden") : (document.removeEventListener("keydown", c), document.body.style.overflow = ""), () => {
    document.removeEventListener("keydown", c), document.body.style.overflow = "";
  }), [d]);
  const j = [
    e.imageWrapper,
    f === "circle" && e.imageCircle,
    f === "square" && e.imageSquare,
    i && e.imagePreview,
    n === "loading" && t && e.imageLoading,
    n === "error" && e.imageError,
    k
  ].filter(Boolean).join(" "), F = [
    e.image,
    s === "cover" && e.imageCover,
    s === "contain" && e.imageContain,
    s === "fill" && e.imageFill
  ].filter(Boolean).join(" "), B = {
    width: E,
    height: w
  }, D = () => n === "error" ? u ? /* @__PURE__ */ o("div", { className: e.imageErrorContent, children: u }) : /* @__PURE__ */ a("div", { className: e.imageErrorContent, children: [
    /* @__PURE__ */ o(O, {}),
    /* @__PURE__ */ o("span", { children: "Failed to load image" })
  ] }) : n === "loading" && t ? typeof t == "boolean" ? /* @__PURE__ */ a("div", { className: e.imagePlaceholder, children: [
    /* @__PURE__ */ o($, {}),
    /* @__PURE__ */ o("span", { children: "Loading..." })
  ] }) : /* @__PURE__ */ o("div", { className: e.imagePlaceholder, children: t }) : /* @__PURE__ */ a(g, { children: [
    /* @__PURE__ */ o(
      "img",
      {
        className: F,
        src: h,
        alt: l,
        loading: x,
        onLoad: P,
        onError: S,
        style: {
          display: n === "loaded" ? "block" : "none"
        },
        ...I
      }
    ),
    i && n === "loaded" && /* @__PURE__ */ a("div", { className: e.imagePreviewOverlay, children: [
      /* @__PURE__ */ o(M, {}),
      /* @__PURE__ */ o("span", { children: "Click to preview" })
    ] })
  ] }), p = /* @__PURE__ */ o(
    "div",
    {
      className: j,
      style: B,
      onClick: C,
      role: i ? "button" : void 0,
      tabIndex: i ? 0 : void 0,
      onKeyDown: i ? (r) => {
        (r.key === "Enter" || r.key === " ") && (r.preventDefault(), C());
      } : void 0,
      "aria-label": i ? `Preview ${l}` : void 0,
      children: D()
    }
  ), L = d && z(
    /* @__PURE__ */ a("div", { className: e.imageLightbox, children: [
      /* @__PURE__ */ o(
        "div",
        {
          className: e.imageLightboxBackdrop,
          onClick: m
        }
      ),
      /* @__PURE__ */ a("div", { className: e.imageLightboxContent, children: [
        /* @__PURE__ */ o(
          "button",
          {
            className: e.imageLightboxClose,
            onClick: m,
            "aria-label": "Close preview",
            type: "button",
            children: /* @__PURE__ */ o(K, {})
          }
        ),
        /* @__PURE__ */ o("img", { src: h, alt: l })
      ] })
    ] }),
    document.body
  );
  return y ? /* @__PURE__ */ a(g, { children: [
    /* @__PURE__ */ a("figure", { className: e.imageFigure, children: [
      p,
      /* @__PURE__ */ o("figcaption", { className: e.imageCaption, children: y })
    ] }),
    L
  ] }) : /* @__PURE__ */ a(g, { children: [
    p,
    L
  ] });
};
W.displayName = "Image";
export {
  W as Image
};
//# sourceMappingURL=Image.js.map
