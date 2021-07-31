import React, { Component } from 'react'
import QrReader from 'react-qr-scanner'

class QrInvoiceScan extends Component {
    constructor(props) {
        super(props)
        this.state = {
            delay: 100,
            result: 'No result',
        }

        this.handleScan = this.handleScan.bind(this)
    }

    handleScan(data) {

        var sum = 0;
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
            const values = data.text.trim().split('_').splice(1);

            let result = {
                scanSuccess: true,
                scanSuccessMessage: "🤑",
                sum: sum,
            }

            for (let i = 0; i < values.length; i++) {
                switch (i) {
                    case 0:
                        result.algorytmAndProviderInfo = values[i];
                        break;
                    case 1:
                        result.terminalId = values[i];
                        break;
                    case 2:
                        result.invoiveId = values[i];
                        break;
                    case 3:
                        result.date = values[i];
                        break;
                    case 4:
                        result.twentyPercentTaxSum = values[i];
                        result.sum = result.sum + parseFloat(values[i].replace(",", "."))
                        break;
                    case 5:
                        result.tenPercentTaxSum = values[i];
                        result.sum = result.sum + parseFloat(values[i].replace(",", "."))
                        break;
                    case 6:
                        result.thirteenPercentTaxSum = values[i];
                        result.sum = result.sum + parseFloat(values[i].replace(",", "."))
                        break;
                    case 7:
                        result.zeroPercentTaxSum = values[i];
                        result.sum = result.sum + parseFloat(values[i].replace(",", "."))
                        break;
                    case 8:
                        result.nineteenPercentTaxSum = values[i];
                        result.sum = result.sum + parseFloat(values[i].replace(",", "."))
                        break;
                    case 9:
                        result.aes256icm = values[i];
                        break;
                    case 10:
                        result.certificateSerielNumber = values[i];
                        break;
                    case 11:
                        result.signaturePreviousInvoice = values[i];
                        break;

                    default:
                        result.uknownProperty = result.uknownProperty + i + " " + values[i] + " ";

                }
            }

            result.sum = result.sum.toLocaleString('de-DE', { minimumFractionDigits: 2 });
            this.setState({ result: result });
            return;
        }
        else
            if (data != null && data.text?.length > 0)
                this.setState({
                    result: {
                        scanSuccess: false,
                        scanSuccessMessage: "😬 QR-Code lesen fehlgeschlagen." + data
                    }
                });
            else if (this?.state?.result?.scanSuccess === false)
                this.setState({
                    result: {
                        scanSuccess: false,
                        scanSuccessMessage: "🕵️ Suche QR-Code..."
                    }
                });
    }

    isValid(rawCode128) {
        if (rawCode128 === null)
            return false;

        //todo: do some more / real validation
        return rawCode128?.text.includes("_");
    }
    handleError(err) {
        console.error(err)
    }
    render() {
        return (
            <div>
                <QrReader
                    delay={this.state.delay}
                    style={{ width: '100%' }}
                    onError={this.handleError}
                    onScan={this.handleScan}
                    legacyMode={true}
                />
                {this.state.result.scanSuccess &&
                    <p> {this.state.result.scanSuccessMessage}{this.state.result.sum}€</p>
                }
                {!this.state.result.scanSuccess &&
                    <p> {this.state.result.scanSuccessMessage}</p>
                }
            </div>
        )
    }
}

export default QrInvoiceScan;
