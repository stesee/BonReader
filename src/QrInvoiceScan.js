import React, { useEffect, useMemo, useState } from "react";
import {
  BarcodeFormat,
  BrowserMultiFormatReader,
  DecodeHintType,
} from "@zxing/library";

function BarcodeScanner(props) {
  const [videoInputDevices, setVideoInputDevices] = useState([]);
  const [selectedVideoDevice, selectVideoDevice] = useState("");

  const reader = useMemo(() => {
    const hints = new Map();
    const formats = [
      BarcodeFormat.CODE_128,
      BarcodeFormat.CODE_39,
      BarcodeFormat.EAN_8,
      BarcodeFormat.EAN_13,
    ];
    hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);
    const reader = new BrowserMultiFormatReader(hints);
    (async () => {
      const videoInputDeviceList = await reader.listVideoInputDevices();
      setVideoInputDevices(videoInputDeviceList);
      if (videoInputDeviceList.length > 0) {
        selectVideoDevice(videoInputDeviceList[0].deviceId);
      }
    })();

    return reader;
  }, []);

  useEffect(() => {
    if (selectedVideoDevice) {
      reader.reset();
      reader
        .decodeFromVideoDevice(selectedVideoDevice, "videoElement", (res) => {
          if (res) {
            console.log("result is", res);
            alert(res.getText());
          }
        })
        .then((res) => console.log("result", res))
        .catch((err) => console.log("error", err));
    }
  }, [reader, selectedVideoDevice]);

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
    </div>
  );
}

export default BarcodeScanner;
