import { jsxs as b, jsx as l } from "react/jsx-runtime";
import { ChevronLeft as j, ChevronRight as B } from "lucide-react";
import f from "./Pagination.module.css.js";
const y = (i, o, n = 1) => {
  const a = [];
  a.push(1);
  const s = Math.max(2, i - n), e = Math.min(o - 1, i + n);
  s > 2 && a.push("ellipsis");
  for (let t = s; t <= e; t++)
    a.push(t);
  e < o - 1 && a.push("ellipsis"), o > 1 && a.push(o);
  const r = [];
  let c = null;
  for (const t of a)
    t !== c && (r.push(t), c = t);
  return r;
}, M = ({
  currentPage: i,
  totalPages: o,
  onPageChange: n,
  siblings: a = 1,
  showPrevNext: s = !0,
  showFirstLast: e = !1,
  prevLabel: r,
  nextLabel: c,
  firstLabel: t,
  lastLabel: h,
  className: m = "",
  "aria-label": G = "Pagination"
}) => {
  const x = y(i, o, a), u = i > 1, N = i < o, C = [f.pagination, m].filter(Boolean).join(" ");
  return /* @__PURE__ */ b("nav", { className: C, "aria-label": G, children: [
    e && /* @__PURE__ */ l(
      p,
      {
        onClick: () => n(1),
        disabled: !u,
        "aria-label": "Go to first page",
        children: t || "««"
      }
    ),
    s && /* @__PURE__ */ l(
      p,
      {
        onClick: () => n(i - 1),
        disabled: !u,
        "aria-label": "Go to previous page",
        children: r || /* @__PURE__ */ l(j, { size: 16 })
      }
    ),
    x.map((d, k) => d === "ellipsis" ? /* @__PURE__ */ l("span", { className: f["pagination-ellipsis"], children: "..." }, `ellipsis-${k}`) : /* @__PURE__ */ l(
      p,
      {
        onClick: () => n(d),
        active: d === i,
        "aria-label": `Go to page ${d}`,
        "aria-current": d === i ? "page" : void 0,
        children: d
      },
      d
    )),
    s && /* @__PURE__ */ l(
      p,
      {
        onClick: () => n(i + 1),
        disabled: !N,
        "aria-label": "Go to next page",
        children: c || /* @__PURE__ */ l(B, { size: 16 })
      }
    ),
    e && /* @__PURE__ */ l(
      p,
      {
        onClick: () => n(o),
        disabled: !N,
        "aria-label": "Go to last page",
        children: h || "»»"
      }
    )
  ] });
}, p = ({
  active: i = !1,
  children: o,
  className: n = "",
  ...a
}) => {
  const s = [f["pagination-btn"], i && f.active, n].filter(Boolean).join(" ");
  return /* @__PURE__ */ l("button", { className: s, ...a, children: o });
}, v = ({
  currentPage: i,
  totalPages: o,
  totalItems: n,
  pageSize: a,
  className: s = ""
}) => {
  const e = [f["pagination-info"], s].filter(Boolean).join(" ");
  if (n && a) {
    const r = (i - 1) * a + 1, c = Math.min(i * a, n);
    return /* @__PURE__ */ b("span", { className: e, children: [
      "Showing ",
      /* @__PURE__ */ b("strong", { children: [
        r,
        "-",
        c
      ] }),
      " of ",
      /* @__PURE__ */ l("strong", { children: n })
    ] });
  }
  return /* @__PURE__ */ b("span", { className: e, children: [
    "Page ",
    i,
    " of ",
    o
  ] });
}, S = ({
  currentPage: i,
  totalPages: o,
  onPageChange: n,
  prevLabel: a = "← Previous",
  nextLabel: s = "Next →",
  showInfo: e = !0,
  className: r = "",
  "aria-label": c = "Pagination"
}) => {
  const t = i > 1, h = i < o, m = [f.pagination, r].filter(Boolean).join(" ");
  return /* @__PURE__ */ b("nav", { className: m, "aria-label": c, children: [
    /* @__PURE__ */ l(
      p,
      {
        onClick: () => n(i - 1),
        disabled: !t,
        "aria-label": "Go to previous page",
        children: a
      }
    ),
    e && /* @__PURE__ */ l(v, { currentPage: i, totalPages: o }),
    /* @__PURE__ */ l(
      p,
      {
        onClick: () => n(i + 1),
        disabled: !h,
        "aria-label": "Go to next page",
        children: s
      }
    )
  ] });
};
M.displayName = "Pagination";
p.displayName = "PaginationButton";
v.displayName = "PaginationInfo";
S.displayName = "SimplePagination";
export {
  M as Pagination,
  p as PaginationButton,
  v as PaginationInfo,
  S as SimplePagination
};
//# sourceMappingURL=Pagination.js.map
