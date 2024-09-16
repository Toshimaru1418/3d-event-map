// src/App.tsx
import React, { Suspense } from 'react';

// EventMapを動的インポートに変更
const EventMap = React.lazy(() => import('./components/EventMap'));

function App() {
  return (
    <div>
      {/* Suspenseコンポーネントでフォールバックを設定 */}
      <Suspense fallback={<div>Loading...</div>}>
        <EventMap />
      </Suspense>
    </div>
  );
}

export default App;