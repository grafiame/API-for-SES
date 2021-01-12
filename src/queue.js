import 'dotenv/config'

import Queue from './app/lib/Queue'

Queue.process()
console.log('Started Processing Queue server!')
