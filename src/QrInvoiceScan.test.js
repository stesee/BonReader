import QrCodeParser from "./QrCodeParser";

test("empty should fail gracefull", () => {
  const qrCodeParser = new QrCodeParser();
  const actual = qrCodeParser.Parse("");
  expect(actual.sum).toEqual("0,00");
});
