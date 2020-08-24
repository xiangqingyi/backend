const path = require('path');
const rootUrl = path.join(process.cwd(), 'dist');

export default {
    production: false,
    rootUrl: path.join(process.cwd(), 'dist'),
    staticPath: path.join(rootUrl, '../build'),
    logger: {
      debug: 'app*',
      console: {
        level: 'error',
      },
    },
    client_secret: 'backend',
    jwt_secret: 'backend',
    dbConnection: {
        host: '127.0.0.1',
        port: 3306,
        database: 'ghchat',
        user: 'root',
        password: '123456'
    }


}

