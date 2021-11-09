const functions = require("firebase-functions");
const m = require("./sendMessage");
const path = require("path");

exports.clipUpload = functions.storage.object().onFinalize(async (object) => {
  const filePath = object.name;
  const fileName = path.basename(filePath);

  m.sendClientMessage(
    "Aegis Alert. Potential threat detected, please review the following link:\n http://localhost:3000/vid/" +
      fileName
  );
});

exports.notifyAuthorities = functions.https.onRequest(async (req, res) => {
  // adjust authority numbers
  await m.sendAuthorityMessage("Aegis Alert. Threat has been detected.");
  res.send(
    "Authorities have been notified. Please seek shelter in the meantime."
  );
});
