export const config = {
  port: process.env.PORT || 9000,
  ip: process.env.IP || '0.0.0.0',
  env: process.env.NODE_ENV || 'development',
  spaceapi: process.env.SPACEAPI || 'https://api.spacexdata.com/v5',
  mongo: {
    uri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/spaces-api-dev',
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
};
