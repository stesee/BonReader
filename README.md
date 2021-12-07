# Decodes austrian signed invoices

[![Deploy to surge](https://github.com/stesee/BonReader/actions/workflows/deployToSurge.yml/badge.svg?branch=master)](https://github.com/stesee/BonReader/actions/workflows/deployToSurge.yml)

## Demo

Visit <https://bonreader.surge.sh/> to decode your invoice qr code.

### Test stage

Visit <https://bonreadertest.surge.sh/> for the bleeding latest test build.

## History of app

Some time ago, when there was no pwa technology available I wrote a hybrid app, that did the same thing, ... load the apk <https://github.com/Codeuctivity/BonReaderIonic/releases/tag/untagged-27a26f16f1740450369a>.

## What helped me to get started

- <https://www.w3schools.com/react/react_getstarted.asp>
- <https://www.npmjs.com/package/react-qr-scanner>
- <https://www.youtube.com/watch?v=J27NtRInqB8>
- <https://www.zeolearn.com/magazine/debugging-react-apps-in-visual-studio-code>
- <https://medium.com/@qasimpkkhi/automate-your-react-app-deploy-with-github-actions-9ed7c8858d4c>

## ZXing

I failed to get multi camera support working using react-qr-reader and gave ZXing a try.

<https://www.npmjs.com/package/@zxing/browser>
<https://stackoverflow.com/questions/60989962/video-output-not-changed-when-changing-source-in-zxing-js-library>

- Working demo <https://zxing-js.github.io/library/examples/multi-camera/>
- Source code of working demo <https://github.com/zxing-js/library/blob/master/docs/examples/multi-camera/index.html>

## Build dev time

```bash
npm start
```

## Explorative testing

<https://github.com/Fenrirthviti/obs-virtual-cam/releases> is great help to get virtual video inputs. Don't forget to restart your browser after installing.
