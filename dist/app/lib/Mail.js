"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _ses = _interopRequireDefault(require("aws-sdk/clients/ses"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function _default(to, toemail, subject, message) {
  const ses = new _ses.default();
  await ses.sendEmail({
    Source: 'Grafiame <naoresponda@grafiame.com.br>',
    Destination: {
      ToAddresses: [`${to} <${toemail}>`]
    },
    Message: {
      Subject: {
        Charset: 'UTF-8',
        Data: subject
      },
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: message
        }
      }
    }
  }).promise();
}