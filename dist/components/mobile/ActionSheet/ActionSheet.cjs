"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const e=require("react/jsx-runtime"),j=require("react"),t=require("./ActionSheet.module.css.cjs"),i=({open:l,onClose:c,actions:o,title:s,description:d,cancelLabel:r="Cancel",showBackdrop:u=!0,className:h=""})=>{j.useEffect(()=>(l?document.body.style.overflow="hidden":document.body.style.overflow="",()=>{document.body.style.overflow=""}),[l]);const m=a=>{a.disabled||(a.onAction(),c())},f=`
    ${t.default.actionSheet}
    ${l?t.default.open:""}
    ${h}
  `.trim(),b=`
    ${t.default.actionSheetBackdrop}
    ${l?t.default.show:""}
  `.trim();return l?e.jsxs(e.Fragment,{children:[u&&e.jsx("div",{className:b,onClick:c,"aria-hidden":"true"}),e.jsxs("div",{className:f,role:"dialog","aria-modal":"true","aria-labelledby":s?"action-sheet-title":void 0,children:[e.jsxs("div",{className:t.default.actionSheetContent,children:[(s||d)&&e.jsxs("div",{className:t.default.actionSheetHeader,children:[s&&e.jsx("h3",{id:"action-sheet-title",className:t.default.actionSheetTitle,children:s}),d&&e.jsx("p",{className:t.default.actionSheetDescription,children:d})]}),o.map((a,S)=>{const n=a.icon;return e.jsxs("button",{className:`
                  ${t.default.actionSheetItem}
                  ${a.danger?t.default.danger:""}
                `.trim(),onClick:()=>m(a),disabled:a.disabled,children:[n&&e.jsx(n,{className:t.default.actionIcon}),e.jsx("span",{children:a.label})]},S)})]}),e.jsx("button",{className:t.default.actionSheetCancel,onClick:c,children:r})]})]}):null};exports.ActionSheet=i;exports.default=i;
//# sourceMappingURL=ActionSheet.cjs.map
