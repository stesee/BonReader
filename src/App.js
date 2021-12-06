import "./App.css";
import React, { Suspense, lazy } from 'react';

const QrInvoiceScan = React.lazy(() => import('./QrInvoiceScan'));
function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Suspense fallback={<div>Loading...</div>}>
        <QrInvoiceScan />
        </Suspense>
      </header>
    </div>
  );
}

export default App;
