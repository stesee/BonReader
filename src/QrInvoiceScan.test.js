import QrCodeParser from "./QrCodeParser";

const validRaw128String =
  "_R1-AT0_1010_10100110881756_2021-08-11T18:39:50_0,00_0,00_0,00_9,85_0,00_vDw7aDE=_U:ATU46674503-01_AXH/r5DZr3U=_uzFmTg7vUwsTPbuvNz9tnaUCZ2AChSV3RpcTa8lD7fpPWKdjLVJnuWgh6wtdCpFkTvLr621x2+KJBRyvIf/gWw== ";

test("should detect invalid raw128 string", () => {
  const qrCodeParser = new QrCodeParser();
  const actual = qrCodeParser.IsValid("invalid");
  expect(actual).toEqual(false);
});

test("should detect null raw128 string", () => {
  const qrCodeParser = new QrCodeParser();
  const actual = qrCodeParser.IsValid(null);
  expect(actual).toEqual(false);
});

test("should detect valid raw128 string", () => {
  const qrCodeParser = new QrCodeParser();
  const actual = qrCodeParser.IsValid(validRaw128String);
  expect(actual).toEqual(true);
});

test("empty should fail graceful", () => {
  const raw128 = " ";
  const qrCodeParser = new QrCodeParser();

  const actual = qrCodeParser.Parse(raw128);

  expect(actual.scanSuccess).toEqual(false);
  expect(actual.sum).toEqual("0,00");
  expect(actual.scanSuccessMessage).toEqual(
    "😬 QR-Code lesen fehlgeschlagen." + raw128
  );
});

test("validRaw128String should decode successful", () => {
  const qrCodeParser = new QrCodeParser();

  const actual = qrCodeParser.Parse(validRaw128String);

  expect(actual.scanSuccess).toEqual(true);
  expect(actual.sum).toEqual("9.85");
  expect(actual.scanSuccessMessage).toEqual("🤑");
  expect(actual.algorithmAndProviderInfo).toEqual("R1-AT0");
  expect(actual.terminalId).toEqual("1010");
  expect(actual.invoiceId).toEqual("10100110881756");
  expect(actual.date).toEqual("2021-08-11T18:39:50");
  expect(actual.twentyPercentTaxSum).toEqual("0,00");
  expect(actual.thirteenPercentTaxSum).toEqual("0,00");
  expect(actual.twentyPercentTaxSum).toEqual("0,00");
  expect(actual.zeroPercentTaxSum).toEqual("9,85");
  expect(actual.nineteenPercentTaxSum).toEqual("0,00");
  expect(actual.aes256icm).toEqual("vDw7aDE=");
  expect(actual.certificateSerialNumber).toEqual("U:ATU46674503-01");
  expect(actual.signaturePreviousInvoice).toEqual("AXH/r5DZr3U=");
  expect(actual.unknownProperties).toEqual(
    "12 uzFmTg7vUwsTPbuvNz9tnaUCZ2AChSV3RpcTa8lD7fpPWKdjLVJnuWgh6wtdCpFkTvLr621x2+KJBRyvIf/gWw== "
  );
});
