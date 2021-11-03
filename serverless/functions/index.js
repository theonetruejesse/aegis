const functions = require("firebase-functions");
const m = require("./sendMessage");
const path = require("path");

exports.clipUpload = functions.storage.object().onFinalize(async (object) => {
  const filePath = object.name;
  const fileName = path.basename(filePath);

  m.sendMessage(
    "Aegis Alert. Potential threat detected, please review the following link:\n http://localhost:3000/vid/" +
      fileName
  );
});
