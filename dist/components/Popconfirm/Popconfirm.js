import { jsxs as c, jsx as i } from "react/jsx-runtime";
import { useState as y, useRef as E, useEffect as N, isValidElement as U, cloneElement as B } from "react";
import { Button as w } from "../Button/Button.js";
import n from "./Popconfirm.module.css.js";
const K = ({
  title: l,
  description: u,
  icon: f,
  iconType: v = "warning",
  okText: $ = "OK",
  cancelText: b = "Cancel",
  okType: L = "primary",
  placement: O = "bottom",
  children: a,
  onConfirm: h,
  onCancel: p,
  open: g,
  onOpenChange: P,
  disabled: R = !1,
  "aria-label": x
}) => {
  const [I, T] = y(!1), [m, C] = y(!1), d = E(null), r = E(null), k = g !== void 0, t = k ? g : I, s = (e) => {
    k || T(e), P?.(e);
  };
  N(() => {
    if (!t) return;
    const e = (o) => {
      d.current && !d.current.contains(o.target) && s(!1);
    };
    return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
  }, [t]), N(() => {
    if (!t) return;
    const e = (o) => {
      o.key === "Escape" && (s(!1), p?.(), r.current && r.current.focus());
    };
    return document.addEventListener("keydown", e), () => document.removeEventListener("keydown", e);
  }, [t, p]);
  const j = (e) => {
    R || (e.preventDefault(), r.current = e.currentTarget, s(!t));
  }, z = (e) => {
    e.stopPropagation(), s(!1), p?.(), r.current && r.current.focus();
  }, A = async (e) => {
    if (e.stopPropagation(), h) {
      C(!0);
      try {
        await h(), s(!1), r.current && r.current.focus();
      } catch (o) {
        console.error("Popconfirm onConfirm error:", o);
      } finally {
        C(!1);
      }
    } else
      s(!1);
  }, D = U(a) ? B(a, {
    onClick: (e) => {
      j(e);
      const o = a.props?.onClick;
      o && o(e);
    }
  }) : a, F = {
    top: n.popconfirmTop,
    bottom: "",
    // default
    left: n.popconfirmLeft,
    right: n.popconfirmRight
  }[O], S = f ? "" : n[`popconfirmIcon${v.charAt(0).toUpperCase()}${v.slice(1)}`];
  return /* @__PURE__ */ c("div", { className: n.popconfirmContainer, ref: d, children: [
    D,
    /* @__PURE__ */ i(
      "div",
      {
        className: `${n.popconfirm} ${F} ${t ? n.popconfirmShow : ""}`,
        role: "alertdialog",
        "aria-modal": "true",
        "aria-label": x || (typeof l == "string" ? l : "Confirm action"),
        children: /* @__PURE__ */ c("div", { className: n.popconfirmContent, children: [
          /* @__PURE__ */ c("div", { className: n.popconfirmMessage, children: [
            f && /* @__PURE__ */ i("span", { className: `${n.popconfirmIcon} ${S}`, children: f }),
            /* @__PURE__ */ c("div", { children: [
              /* @__PURE__ */ i("div", { className: n.popconfirmTitle, children: l }),
              u && /* @__PURE__ */ i("div", { className: n.popconfirmDescription, children: u })
            ] })
          ] }),
          /* @__PURE__ */ c("div", { className: n.popconfirmActions, children: [
            /* @__PURE__ */ i(
              w,
              {
                variant: "secondary",
                size: "sm",
                onClick: z,
                disabled: m,
                children: b
              }
            ),
            /* @__PURE__ */ i(
              w,
              {
                variant: L,
                size: "sm",
                onClick: A,
                disabled: m,
                loading: m,
                autoFocus: !0,
                children: $
              }
            )
          ] })
        ] })
      }
    )
  ] });
};
K.displayName = "Popconfirm";
export {
  K as Popconfirm
};
//# sourceMappingURL=Popconfirm.js.map
