import { jsx as o, jsxs as M } from "react/jsx-runtime";
import { useRef as b, useEffect as c, useCallback as p } from "react";
import { createPortal as k } from "react-dom";
import { X as x } from "lucide-react";
import l from "./Modal.module.css.js";
const $ = ({
  open: e,
  onClose: t,
  children: d,
  size: s = "md",
  closeOnOverlayClick: m = !0,
  closeOnEscape: f = !0,
  className: E = ""
}) => {
  const a = b(null), i = b(null);
  c(() => {
    e && (i.current = document.activeElement);
  }, [e]), c(() => {
    if (!e || !f) return;
    const r = (n) => {
      n.key === "Escape" && t();
    };
    return document.addEventListener("keydown", r), () => document.removeEventListener("keydown", r);
  }, [e, f, t]), c(() => {
    if (e) {
      if (document.body.style.overflow = "hidden", a.current) {
        const r = a.current.querySelector(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        r && setTimeout(() => r.focus(), 100);
      }
    } else
      document.body.style.overflow = "", i.current && i.current.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, [e]), c(() => {
    if (!e || !a.current) return;
    const r = (n) => {
      if (n.key !== "Tab" || !a.current) return;
      const u = a.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ), y = u[0], v = u[u.length - 1];
      n.shiftKey ? document.activeElement === y && (n.preventDefault(), v?.focus()) : document.activeElement === v && (n.preventDefault(), y?.focus());
    };
    return document.addEventListener("keydown", r), () => document.removeEventListener("keydown", r);
  }, [e]);
  const h = p(
    (r) => {
      m && r.target === r.currentTarget && t();
    },
    [m, t]
  );
  if (!e) return null;
  const N = s === "sm" ? l.modalSm : s === "lg" ? l.modalLg : s === "full" ? l.modalFull : l.modalMd;
  return k(
    /* @__PURE__ */ o(
      "div",
      {
        className: l.modalOverlay,
        onClick: h,
        role: "presentation",
        children: /* @__PURE__ */ o(
          "div",
          {
            ref: a,
            className: `${l.modal} ${N} ${E}`,
            role: "dialog",
            "aria-modal": "true",
            children: d
          }
        )
      }
    ),
    document.body
  );
}, w = ({
  children: e,
  onClose: t,
  showCloseButton: d = !0,
  className: s = ""
}) => /* @__PURE__ */ M("div", { className: `${l.modalHeader} ${s}`, children: [
  e,
  d && t && /* @__PURE__ */ o(
    "button",
    {
      className: l.modalClose,
      onClick: t,
      "aria-label": "Close",
      children: /* @__PURE__ */ o(x, { size: 20 })
    }
  )
] }), T = ({ children: e }) => /* @__PURE__ */ o("h3", { className: l.modalTitle, children: e }), g = ({ children: e, className: t = "", style: d }) => /* @__PURE__ */ o("div", { className: `${l.modalBody} ${t}`, style: d, children: e }), F = ({ children: e, className: t = "" }) => /* @__PURE__ */ o("div", { className: `${l.modalFooter} ${t}`, children: e });
$.displayName = "Modal";
w.displayName = "ModalHeader";
T.displayName = "ModalTitle";
g.displayName = "ModalBody";
F.displayName = "ModalFooter";
export {
  $ as Modal,
  g as ModalBody,
  F as ModalFooter,
  w as ModalHeader,
  T as ModalTitle
};
//# sourceMappingURL=Modal.js.map
