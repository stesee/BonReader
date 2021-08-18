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
    // var description = [
    //     "Algorithmus & Signaturprovider",
    //     "Kassen-ID",
    //     "Belegnummer",
    //     "Beleg-Datum",
    //     "inkl. 20% Steuer",
    //     "inkl. 10% Steuer",
    //     "inkl. 13% Steuer",
    //     "(0% versteuert)",
    //     "inkl. 19% Steuer",
    //     "Stand-Umsatz-Zaehler-AES256-ICM",
    //     "Zertifikat-Seriennummer",
    //     "Sig-Voriger-Beleg"];

    if (this.isValid(data) === true) {
      const qrCodeParser = new QrCodeParser();
      let result = qrCodeParser.Parse(data.text);
      this.setState({ result: result });
      return;
    } else if (data != null && data.text?.length > 0)
      this.setState({
        result: {
          scanSuccess: false,
          scanSuccessMessage: "😬 QR-Code lesen fehlgeschlagen." + data,
        },
      });
    else if (this?.state?.result?.scanSuccess === false)
      this.setState({
        result: {
          scanSuccess: false,
          scanSuccessMessage: "🕵️ Suche QR-Code...",
        },
      });
  }

  isValid(rawCode128) {
    if (rawCode128 === null) return false;

    //todo: do some more / real validation
    return rawCode128?.text.includes("_");
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
