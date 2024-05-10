import { Buffer } from 'buffer';
import QRCode from 'qrcode';

function toHex(value) {
     let hex = value.toString(16);
     if ((hex.length % 2) > 0) {
          hex = '0' + hex;
     }
     return Buffer
          .from(hex, 'hex')
          .toString('utf-8');
}

function getValueByteLength(value) {
     return Buffer.byteLength(value);
}
function toBase64(value) {
     return Buffer.from(value).toString('base64');
}
function toTlv(tags) {
     let tlv = '';
     for (const tag of tags) {
          tlv += toHex(tag.tag) + toHex(getValueByteLength(tag.value)) + tag.value;
     }
     return tlv;
}

function generateTlv(invoice) {
     const tags = [
          { tag: 1, value: invoice.sellerName },
          { tag: 2, value: invoice.vatRegistrationNumber },
          { tag: 3, value: invoice.invoiceTimestamp },
          { tag: 4, value: invoice.invoiceTotal.toString() },
          { tag: 5, value: invoice.invoiceVatTotal.toString() },
     ];
     return toTlv(tags);
}

const invoiceData = {
     sellerName: "Vikash",
     vatRegistrationNumber: "302520021521453",
     invoiceTimestamp: "2011-10-05T14:48:00.000Z",
     invoiceTotal: 100.00,
     invoiceVatTotal: 15.00,
};

const tlv = generateTlv(invoiceData);
const base64 = toBase64(tlv)
console.log(tlv, base64);

QRCode.toFile('qrcode.png', base64, function (err) {
     if (err) throw err;
     console.log('QR code saved as qrcode.png');
});