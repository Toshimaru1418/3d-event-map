import { jsx as _jsx } from "react/jsx-runtime";
// src/App.tsx
import React, { Suspense } from 'react';
// EventMapを動的インポートに変更
const EventMap = React.lazy(() => import('./components/EventMap'));
function App() {
    return (_jsx("div", { children: _jsx(Suspense, { fallback: _jsx("div", { children: "Loading..." }), children: _jsx(EventMap, {}) }) }));
}
export default App;
