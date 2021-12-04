import "./App.css";
import QrInvoiceScan from "./QrInvoiceScan";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <QrInvoiceScan selectFacingMode />
      </header>
    </div>
  );
}

export default App;
