# ZATCA E-Invoicing Phase 1 QR Code Generator

This code generates a QR code compliant with the ZATCA (Saudi Arabian Tax Authority) E-Invoicing Phase 1 specifications. It encodes invoice data into a TLV (Tag-Length-Value) format and then converts it into a Base64 string to be used in generating a QR code image.

## Dependencies

- `buffer`: A built-in Node.js module providing a way to handle binary data
- `qrcode`: A popular Node.js library for generating QR codes

## Installation

1. Make sure you have Node.js installed on your system.
2. Install the necessary dependencies by running:

    ```
    npm install buffer qrcode
    ```

## Usage

1. Import the necessary modules:

    ```javascript
    import { Buffer } from 'buffer';
    import QRCode from 'qrcode';
    ```

2. Define helper functions for encoding data:

    - `toHex(value)`: Converts a value to a hexadecimal string.
    - `getValueByteLength(value)`: Calculates the byte length of a value.
    - `toBase64(value)`: Converts a value to a Base64 string.
    - `toTlv(tags)`: Encodes an array of tag-value pairs into a TLV string.

3. Implement the `generateTlv()` function to generate the TLV string from invoice data.

4. Define your invoice data object with the required fields: `sellerName`, `vatRegistrationNumber`, `invoiceTimestamp`, `invoiceTotal`, and `invoiceVatTotal`.

5. Generate the TLV string using `generateTlv()`.

6. Convert the TLV string to Base64.

7. Generate the QR code image using `QRCode.toFile()` function.

   ```javascript
   QRCode.toFile('qrcode.png', base64, function (err) {
        if (err) throw err;
        console.log('QR code saved as qrcode.png');
   });
