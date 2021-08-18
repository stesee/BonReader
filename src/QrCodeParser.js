class QrCodeParser {
  Parse(rawCode128) {
    if (this.IsValid(rawCode128) === true) {
      const values = rawCode128.trim().split("_").splice(1);

      let result = {
        scanSuccess: true,
        scanSuccessMessage: "🤑",
        sum: 0,
        uknownProperties: null,
      };

      for (let i = 0; i < values.length; i++) {
        switch (i) {
          case 0:
            //     "Algorithmus & Signaturprovider"
            result.algorytmAndProviderInfo = values[i];
            break;
          case 1:
            //     "Kassen-ID"
            result.terminalId = values[i];
            break;
          case 2:
            //     "Belegnummer"
            result.invoiveId = values[i];
            break;
          case 3:
            //     "Beleg-Datum"
            result.date = values[i];
            break;
          case 4:
            //     "inkl. 20% Steuer"
            result.twentyPercentTaxSum = values[i];
            result.sum = result.sum + parseFloat(values[i].replace(",", "."));
            break;
          case 5:
            //     "inkl. 10% Steuer"
            result.tenPercentTaxSum = values[i];
            result.sum = result.sum + parseFloat(values[i].replace(",", "."));
            break;
          case 6:
            //     "inkl. 13% Steuer"
            result.thirteenPercentTaxSum = values[i];
            result.sum = result.sum + parseFloat(values[i].replace(",", "."));
            break;
          case 7:
            //     "(0% versteuert)"
            result.zeroPercentTaxSum = values[i];
            result.sum = result.sum + parseFloat(values[i].replace(",", "."));
            break;
          case 8:
            //     "inkl. 19% Steuer"
            result.nineteenPercentTaxSum = values[i];
            result.sum = result.sum + parseFloat(values[i].replace(",", "."));
            break;
          case 9:
            //     "Stand-Umsatz-Zaehler-AES256-ICM"
            result.aes256icm = values[i];
            break;
          case 10:
            //     "Zertifikat-Seriennummer"
            result.certificateSerielNumber = values[i];
            break;
          case 11:
            //     "Sig-Voriger-Beleg"
            result.signaturePreviousInvoice = values[i];
            break;

          default:
            result.uknownProperties =
              result.uknownProperties + i + " " + values[i] + " ";
        }
      }

      result.sum = result.sum.toLocaleString("de-DE", {
        minimumFractionDigits: 2,
      });
      return result;
    } else if (rawCode128 != null && rawCode128?.length > 0)
      return {
        scanSuccess: false,
        scanSuccessMessage: "😬 QR-Code lesen fehlgeschlagen." + rawCode128,
        sum: "0,00",
      };
    else
      return {
        scanSuccess: false,
        scanSuccessMessage: "🕵️ Suche QR-Code...",
        sum: "0,00",
      };
  }
  IsValid(rawCode128) {
    if (rawCode128 === null) return false;

    //todo: do some more / real validation
    return rawCode128?.includes("_");
  }
}

export default QrCodeParser;
