import 'dotenv/config'
import express from 'express'
import UserController from './app/controllers/UserController'
import { router, setQueues, BullAdapter } from 'bull-board'
import Queue from './app/lib/Queue'

const app = express()
setQueues([new BullAdapter(Queue.queues.map(queue => queue.bull)[0])])
setQueues([new BullAdapter(Queue.queues.map(queue => queue.bull)[1])])

app.use(express.json())
app.post('/sendemail', UserController.store)

app.use('/admin/queues', router)

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server running on port ${process.env.SERVER_PORT}`)
})
