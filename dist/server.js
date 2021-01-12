"use strict";

require("dotenv/config");

var _express = _interopRequireDefault(require("express"));

var _UserController = _interopRequireDefault(require("./app/controllers/UserController"));

var _bullBoard = require("bull-board");

var _Queue = _interopRequireDefault(require("./app/lib/Queue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
(0, _bullBoard.setQueues)([new _bullBoard.BullAdapter(_Queue.default.queues.map(queue => queue.bull)[0])]);
(0, _bullBoard.setQueues)([new _bullBoard.BullAdapter(_Queue.default.queues.map(queue => queue.bull)[1])]);
app.use(_express.default.json());
app.post('/sendemail', _UserController.default.store);
app.use('/admin/queues', _bullBoard.router);
app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server running on port ${process.env.SERVER_PORT}`);
});