"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Mail = _interopRequireDefault(require("../lib/Mail"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  key: 'RegistrationMail',
  options: {
    attempts: 3
  },

  async handle({
    data
  }) {
    const user = data.Email;
    (0, _Mail.default)(user.to, user.toemail, user.subject, user.message).catch(error => console.log({
      message: `${error.code}: ${error.message}`
    }));
  }

};
exports.default = _default;