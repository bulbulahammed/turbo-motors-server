import mongoose from 'mongoose'
import app from './app'
import config from './config'

DBconnect().catch(err => console.log(err))

async function DBconnect() {
  try {
    await mongoose.connect(config.database_url as string)
    console.log('🛢 Database Connected Successfully ✌')
    app.listen(config.port, () => {
      console.log(`Turbo Motors Server Listening on Port ${config.port}`)
    })
  } catch (err) {
    console.log('Failed To connect Database ❌', err)
  }
}
