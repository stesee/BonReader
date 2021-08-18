class QrCodeParser
{
    Parse(text) {
        const values = text.trim().split('_').splice(1)
    
        let result = {
            scanSuccess: true,
            scanSuccessMessage: "🤑",
            sum: 0,
        }
    
        for (let i = 0; i < values.length; i++) {
            switch (i) {
                case 0:
                    result.algorytmAndProviderInfo = values[i]
                    break
                case 1:
                    result.terminalId = values[i]
                    break
                case 2:
                    result.invoiveId = values[i]
                    break
                case 3:
                    result.date = values[i]
                    break
                case 4:
                    result.twentyPercentTaxSum = values[i]
                    result.sum = result.sum + parseFloat(values[i].replace(",", "."))
                    break
                case 5:
                    result.tenPercentTaxSum = values[i]
                    result.sum = result.sum + parseFloat(values[i].replace(",", "."))
                    break
                case 6:
                    result.thirteenPercentTaxSum = values[i]
                    result.sum = result.sum + parseFloat(values[i].replace(",", "."))
                    break
                case 7:
                    result.zeroPercentTaxSum = values[i]
                    result.sum = result.sum + parseFloat(values[i].replace(",", "."))
                    break
                case 8:
                    result.nineteenPercentTaxSum = values[i]
                    result.sum = result.sum + parseFloat(values[i].replace(",", "."))
                    break
                case 9:
                    result.aes256icm = values[i]
                    break
                case 10:
                    result.certificateSerielNumber = values[i]
                    break
                case 11:
                    result.signaturePreviousInvoice = values[i]
                    break
    
                default:
                    result.uknownProperty = result.uknownProperty + i + " " + values[i] + " "
    
            }
        }
    
        result.sum = result.sum.toLocaleString('de-DE', { minimumFractionDigits: 2 })
        return result
    }


}

export default QrCodeParser;