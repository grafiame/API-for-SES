"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Queue = _interopRequireDefault(require("../lib/Queue"));

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  async store(req, res) {
    const {
      toemail,
      to,
      subject,
      message
    } = req.body;

    const schema = _joi.default.object({
      to: _joi.default.string().min(3).required(),
      toemail: _joi.default.string().email().min(3).required(),
      subject: _joi.default.string().min(3).required(),
      message: _joi.default.string().min(3).required()
    });

    const validation = schema.validate(req.body);

    if (validation.error) {
      return res.status(400).send(validation.error.details[0].message);
    }

    const Email = {
      toemail,
      to,
      subject,
      message
    }; // Adicionar job RegistrationMail na fila

    await _Queue.default.add('RegistrationMail', {
      Email
    });
    await _Queue.default.add('UserReport', {
      Email
    });
    return res.json(Email);
  }

};
exports.default = _default;