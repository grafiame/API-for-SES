"use strict";

require("dotenv/config");

var _Queue = _interopRequireDefault(require("./app/lib/Queue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Queue.default.process();

console.log('Started Processing Queue server!');