import { jsxs as o, jsx as s, Fragment as A } from "react/jsx-runtime";
import { useState as E, useRef as W, useCallback as j } from "react";
import { UploadCloud as Y, FileText as _, X as ee } from "lucide-react";
import t from "./FileUpload.module.css.js";
const ne = ({
  label: k,
  helperText: g,
  accept: u,
  maxSize: f = 10 * 1024 * 1024,
  // 10MB default
  maxFiles: N = 10,
  multiple: c = !1,
  disabled: i = !1,
  showPreview: y = !1,
  useNativeInput: I = !1,
  icon: D,
  uploadText: O = "Click to upload or drag and drop",
  hintText: C,
  onFilesChange: $,
  onFileRemove: P,
  validator: F,
  className: U = ""
}) => {
  const [d, m] = E([]), [K, M] = E(!1), h = W(null), z = W(null), G = () => `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, b = j(
    (e) => {
      if (F) {
        const r = F(e);
        if (r) return r;
      }
      if (f && e.size > f)
        return `File size exceeds ${(f / 1024 / 1024).toFixed(0)}MB limit`;
      if (u) {
        const r = u.split(",").map((n) => n.trim()), a = `.${e.name.split(".").pop()?.toLowerCase()}`, p = e.type;
        if (!r.some((n) => {
          if (n.startsWith("."))
            return a === n.toLowerCase();
          if (n.includes("*")) {
            const [v] = n.split("/");
            return p.startsWith(v);
          }
          return p === n;
        }))
          return "File type not supported";
      }
      return null;
    },
    [u, f, F]
  ), B = j(
    (e) => {
      const r = [], a = Array.from(e);
      if (!c && a.length > 1 && a.splice(1), (c ? d.length + a.length : a.length) > N) {
        alert(`Maximum ${N} files allowed`);
        return;
      }
      a.forEach((l) => {
        const n = b(l), v = Object.assign(l, {
          id: G(),
          status: n ? "error" : "idle",
          error: n ?? void 0
        });
        if (y && l.type.startsWith("image/") && !n) {
          const x = new FileReader();
          x.onload = (Q) => {
            const T = Q.target?.result;
            m(
              (V) => V.map((w) => w.id === v.id ? { ...w, preview: T } : w)
            );
          }, x.readAsDataURL(l);
        }
        r.push(v);
      }), c ? (m((l) => [...l, ...r]), $?.([...d, ...r])) : (m(r), $?.(r));
    },
    [d, c, N, b, y, $]
  ), L = (e) => {
    const r = e.target.files;
    r && r.length > 0 && B(r);
  }, S = (e) => {
    e.preventDefault(), e.stopPropagation(), i || M(!0);
  }, X = (e) => {
    e.preventDefault(), e.stopPropagation(), e.currentTarget === z.current && M(!1);
  }, Z = (e) => {
    e.preventDefault(), e.stopPropagation();
  }, q = (e) => {
    if (e.preventDefault(), e.stopPropagation(), M(!1), i) return;
    const r = e.dataTransfer.files;
    r.length > 0 && B(r);
  }, R = () => {
    i || h.current?.click();
  }, H = (e) => {
    m((r) => r.filter((a) => a.id !== e.id)), P?.(e), d.length === 1 && h.current && (h.current.value = "");
  }, J = (e) => {
    if (e === 0) return "0 Bytes";
    const r = 1024, a = ["Bytes", "KB", "MB", "GB"], p = Math.floor(Math.log(e) / Math.log(r));
    return Math.round(e / Math.pow(r, p) * 100) / 100 + " " + a[p];
  };
  return /* @__PURE__ */ o("div", { className: `${t["upload-container"]} ${U}`, children: [
    k && /* @__PURE__ */ s("label", { className: t.label, children: k }),
    I ? /* @__PURE__ */ o(A, { children: [
      /* @__PURE__ */ s(
        "input",
        {
          ref: h,
          type: "file",
          accept: u,
          multiple: c,
          onChange: L,
          disabled: i,
          className: t["input-file"]
        }
      ),
      g && /* @__PURE__ */ s("p", { className: t["helper-text"], children: g })
    ] }) : /* @__PURE__ */ o(A, { children: [
      /* @__PURE__ */ o(
        "div",
        {
          ref: z,
          className: `${t["upload-area"]} ${K ? t.dragging : ""} ${i ? t.disabled : ""}`,
          onClick: R,
          onDragEnter: S,
          onDragLeave: X,
          onDragOver: Z,
          onDrop: q,
          role: "button",
          tabIndex: i ? -1 : 0,
          "aria-label": "File upload area",
          onKeyDown: (e) => {
            (e.key === "Enter" || e.key === " ") && (e.preventDefault(), R());
          },
          children: [
            /* @__PURE__ */ s(
              "input",
              {
                ref: h,
                type: "file",
                accept: u,
                multiple: c,
                onChange: L,
                disabled: i,
                style: { display: "none" },
                "aria-hidden": "true"
              }
            ),
            D && /* @__PURE__ */ s("div", { className: t["upload-icon"], children: D }),
            !D && /* @__PURE__ */ s("div", { className: t["upload-icon"], children: /* @__PURE__ */ s(Y, { size: 48 }) }),
            /* @__PURE__ */ s("div", { className: t["upload-text"], children: O }),
            C && /* @__PURE__ */ s("div", { className: t["upload-hint"], children: C })
          ]
        }
      ),
      g && /* @__PURE__ */ s("p", { className: t["helper-text"], children: g })
    ] }),
    d.length > 0 && /* @__PURE__ */ s("div", { className: t["file-list"], children: d.map((e) => /* @__PURE__ */ o(
      "div",
      {
        className: `${t["file-item"]} ${e.status === "error" ? t["file-error"] : ""} ${e.status === "success" ? t["file-success"] : ""}`,
        children: [
          y && e.preview && /* @__PURE__ */ s("div", { className: t["file-preview"], children: /* @__PURE__ */ s("img", { src: e.preview, alt: e.name }) }),
          !e.preview && /* @__PURE__ */ s("div", { className: t["file-icon"], children: /* @__PURE__ */ s(_, { size: 24 }) }),
          /* @__PURE__ */ o("div", { className: t["file-info"], children: [
            /* @__PURE__ */ s("div", { className: t["file-name"], children: e.name }),
            /* @__PURE__ */ s("div", { className: t["file-size"], children: J(e.size) }),
            e.error && /* @__PURE__ */ s("div", { className: t["file-error-msg"], children: e.error })
          ] }),
          e.status === "uploading" && e.progress !== void 0 && /* @__PURE__ */ o("div", { className: t["upload-file-progress"], children: [
            /* @__PURE__ */ s("div", { style: {
              flex: 1,
              height: "4px",
              backgroundColor: "var(--color-gray-200)",
              borderRadius: "var(--radius-full)",
              overflow: "hidden"
            }, children: /* @__PURE__ */ s("div", { style: {
              width: `${e.progress}%`,
              height: "100%",
              backgroundColor: "var(--color-primary-500)",
              transition: "width var(--duration-normal) var(--ease-out)"
            } }) }),
            /* @__PURE__ */ o("span", { style: {
              marginLeft: "var(--spacing-2)",
              fontSize: "var(--font-size-body-small)",
              color: "var(--text-secondary)"
            }, children: [
              e.progress,
              "%"
            ] })
          ] }),
          e.status !== "uploading" && /* @__PURE__ */ s(
            "button",
            {
              type: "button",
              className: t["remove-btn"],
              onClick: (r) => {
                r.stopPropagation(), H(e);
              },
              "aria-label": `Remove ${e.name}`,
              children: /* @__PURE__ */ s(ee, { size: 18 })
            }
          )
        ]
      },
      e.id
    )) })
  ] });
};
export {
  ne as FileUpload
};
//# sourceMappingURL=FileUpload.js.map
