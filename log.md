client:733 [vite] connecting...
client:827 [vite] connected.
installHook.js:1 Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously tries to update the component. Move this work to useEffect instead.
overrideMethod @ installHook.js:1
(anonymous) @ react-dom-client.development.js:18735
runWithFiberInDEV @ react-dom-client.development.js:871
warnAboutUpdateOnNotYetMountedFiberInDEV @ react-dom-client.development.js:18734
getRootForUpdatedFiber @ react-dom-client.development.js:4640
enqueueConcurrentHookUpdate @ react-dom-client.development.js:4584
dispatchSetStateInternal @ react-dom-client.development.js:9167
dispatchSetState @ react-dom-client.development.js:9127
table.setPagination @ RowPagination.ts:246
table.setPageIndex @ RowPagination.ts:256
table.resetPageIndex @ RowPagination.ts:274
(anonymous) @ RowPagination.ts:234
(anonymous) @ table.ts:345
