import Queue from 'bull'
import AWS from 'aws-sdk'

import * as jobs from '../jobs'

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_SES_REGION
})

const queues = Object.values(jobs).map(job => ({
  bull: new Queue(job.key, {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    limiter: {
      max: 14,
      duration: 1000
    }
  }),
  name: job.key,
  handle: job.handle,
  options: job.options
}))

export default {
  queues,
  add(name, data) {
    const queue = this.queues.find(queue => queue.name === name)

    return queue.bull.add(data, queue.options)
  },
  process() {
    return this.queues.forEach(queue => {
      queue.bull.process(queue.handle)

      queue.bull.on('failed', (job, err) => {
        console.log('Job failed', queue.key, job.data)
        console.log(err)
      })
    })
  }
}
