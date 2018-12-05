
# Markie Markerson

A voice-controlled label printing application intended for use by teachers to aid in marking papers.

## Requirements

**Hardware**: this tool only works with **DYMO label printers** (the _450_, _450 Turbo_, _4XL_ or _Wireless_). This is because DYMO provides a JavaScript SDK necessary to enable web-based printing.

**Software**: if you're a Mac user, install the the [DYMO Label™ v8.7.2](http://www.dymo.com/en-GB/dymo-user-guides) driver.
For Windows, install the the [DYMO Label™ v8.7.3](http://www.dymo.com/en-GB/dymo-user-guides) driver.

> **Note**: this tool only works in **Google Chrome**, since it is the only browser to support the voice-recognition API (at the time of writing).

**Labels**: this tool has been configured to work with **99014 Shipping** labels. These labels are **101mm x 54mm** and work with any of the supported DYMO label printers. You can get them relatively cheaply on [Amazon](https://www.amazon.co.uk/Compatible-Shipping-Labels-LabelWriter-Printers/dp/B074S2K718/ref=sr_1_3?ie=UTF8&qid=1544005451&sr=8-3&keywords=99014+Shipping+Labels).

## Getting up and running: teachers

Installing the DYMO driver should have made an icon appear somewhere on your computer's toolbar. Click on this icon to ensure the DYMO service is running. If it is, you should see "started on port 41951", if it's not click on "Start service".

Assuming everything is fine so far, you can now follow these steps to get up and running:

1. Connect your DYMO label printer (or wirelessly connect if you're using the Wireless model)
1. Visit [url_here](/) in Chrome.

You can type into the comment box just like a regular text editor, or you can press "record" and speak to add your comment. When recording a comment, saying the word **"stop"** will stop the recording, saying **"print"** will print the comment on the connected label printer.

> **Note**: pressing record for the first time will bring up a popup notification asking for permission to access your microphone. Once you've agreed to this, you will not see the popup again for subsequent recordings.

You can format text in the following ways:

- bold: `cmd/ctrl + b`
- italic: `cmd/ctrl + i`
- underline: `cmd/ctrl + u`

## Getting up and running: developers

Once you've cloned the repo, install all the things:

```sh
npm install
```

To start the hot-reloading development server, run:

```sh
npm start
```

To build files for production in the `dist` directory, run:

```sh
npm run build
```