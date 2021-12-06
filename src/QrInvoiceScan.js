import React, { useMemo, useState } from "react";
import {
  BarcodeFormat,
  BrowserMultiFormatReader,
  DecodeHintType,
} from "@zxing/library";
import QrCodeParser from "./QrCodeParser";


function BarcodeScanner(props) {
  const [videoInputDevices, setVideoInputDevices] = useState([]);
  const [selectedVideoDevice, selectVideoDevice] = useState("");
  const [sum, setSum] = useState("");

  useMemo(() => {
    const hints = new Map();
    const formats = [BarcodeFormat.QR_CODE];
    hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);
    const reader = new BrowserMultiFormatReader(hints);
    (async () => {
      const videoInputDeviceList = await reader.listVideoInputDevices();
      setVideoInputDevices(videoInputDeviceList);
      if (videoInputDeviceList.length > 0) {
        setTimeout(() => {
          
          selectVideoDevice(videoInputDeviceList[0].deviceId);
        }, 2000);
      }
    })();

    reader
      .decodeFromVideoDevice(selectedVideoDevice, "videoElement", (res) => {
        if (res) {
          const rawText = res.getText();
          const qrCodeParser = new QrCodeParser();
          const parseOutcome = qrCodeParser.Parse(rawText);
          if (parseOutcome.scanSuccess === true)
          setSum( `${parseOutcome.scanSuccessMessage} ${parseOutcome.sum}`);
          else alert(parseOutcome.scanSuccessMessage);
        }
      })
      .then((res) => console.log("result", res))
      .catch((err) => console.log("error", err));
  }, [selectedVideoDevice]);

  return (
    <div
      onChange={(event) => {
        const deviceId = event.target.value;
        selectVideoDevice(deviceId);
      }}
    >
      <select>
        {videoInputDevices.map((inputDevice, index) => {
          return (
            <option value={inputDevice.deviceId} key={index}>
              {inputDevice.label || inputDevice.deviceId}
            </option>
          );
        })}
      </select>
      <br />
      <video
        id="videoElement"
        width="600"
        height="400"
        style={{ border: "1px solid gray" }}
      />
      <div id="sum">{sum}</div>
    </div>
  );
}

export default BarcodeScanner;
