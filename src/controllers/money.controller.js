const qr = require('qrcode');

const sendQrCode = async function (req, res) {
  try {
    const uniqueCode = Date.now();
    let transactionData = req.body;
    transactionData.uniqueCode = uniqueCode * 123;
    console.log(transactionData);
    const encryptedData = JSON.stringify(transactionData);
    console.log(encryptedData);
    qr.toDataURL(encryptedData, (err, qrCodeData) => {
      if (err) {
        res.status(400).json({
          error: "QR Code generation failed"
        })
      } else {
        // console.log(qrCodeData);
        const filename = `public/transaction_${uniqueCode}.png`;
        qr.toFile(filename, encryptedData, (err) => {
          if (err) {
            res.status(500).json({
              error: `qr-code saving failed`
            })
          } else {
            res.status(200).json({
              qrcodeURL: filename
            })
          }
        })
      }
    })
  } catch (error) {
    throw new Error(`Error Sending QR Code: ${error.message}`);
  }
};

const scanQrCode = async function (req, res) {
  try {

  } catch (error) {
    throw new Error(`Error Scanning QR Code: ${error.message}`);
  }
};

module.exports = {
  sendQrCode,
  scanQrCode,
}