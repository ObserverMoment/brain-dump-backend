// Import the correct credentials for dev (local) or prod (heroku) use.
const env = process.env.NODE_ENV || 'local';
// Setup a simple object with the necessary info
const envConfig = env === 'heroku' ? require('./herokuConfig') : require('./localConfig');

module.exports = envConfig;
