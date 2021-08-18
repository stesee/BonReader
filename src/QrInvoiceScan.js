import React, { Component } from "react";
import QrReader from "react-qr-scanner";
import QrCodeParser from "./QrCodeParser";

class QrInvoiceScan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delay: 100,
      result: "No result",
    };

    this.handleScan = this.handleScan.bind(this);
  }

  handleScan(data) {
    const qrCodeParser = new QrCodeParser();

    let result = qrCodeParser.Parse(data?.text);
    this.setState({ result: result });
  }

  handleError(err) {
    console.error(err);
  }
  render() {
    return (
      <div>
        <QrReader
          delay={this.state.delay}
          style={{ width: "100%" }}
          onError={this.handleError}
          onScan={this.handleScan}
          legacyMode={true}
          facingMode={"environment"}
        />
        {this.state.result.scanSuccess && (
          <p>
            {" "}
            {this.state.result.scanSuccessMessage}
            {this.state.result.sum}€
          </p>
        )}
        {!this.state.result.scanSuccess && (
          <p> {this.state.result.scanSuccessMessage}</p>
        )}
      </div>
    );
  }
}

export default QrInvoiceScan;
