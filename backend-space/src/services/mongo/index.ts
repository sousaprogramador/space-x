import Promise from 'bluebird'
import mongoose from 'mongoose'

mongoose.Promise = Promise
/* istanbul ignore next */

mongoose.connection.on('connecting', () => console.log('MongoDB: Connecting'))
mongoose.connection.on('connected', () => console.log('MongoDB: Connected'))

mongoose.connection.on('open', () => console.log('MongoDB: Connection is open'))

mongoose.connection.on('disconnecting', () => console.log('MongoDB: Disconnecting'))
mongoose.connection.on('disconnected', () => console.log('MongoDB: Disconnected'))

mongoose.connection.on('reconnected', () => console.log('MongoDB: Reconnected'))

mongoose.connection.on('close', () => console.log('MongoDB: Connection was closed'))

mongoose.connection.on('fullsetup', () => console.log('MongoDB: Connecting to replica set'))

mongoose.connection.on('all', () => console.log('MongoDB: Replica set connected'))

/* istanbul ignore next */
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error: ' + err)
    process.exit(-1)
})

export default mongoose
