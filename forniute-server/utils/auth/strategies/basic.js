const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const boom = require('boom');
const bcrypt = require('bcrypt');
const MysqlLib = require('../../../lib/mysql');

passport.use(
  new BasicStrategy(async function(username, password, cb) {
    const mysqlDB = new MysqlLib();
    // mysqlDB.open();
    console.log('====================================');
    console.log('username ', username);
    console.log('password ', password);
    console.log('====================================');

    try {
      const [user] = await mysqlDB.query('select * from users where email = ?', [username]);
      console.log('user ', user)
      if (!user) {
        console.log('error ', user)
        return cb(boom.unauthorized(), false);
      }

      if (!(await bcrypt.compare(password, user.password))) {
        return cb(boom.unauthorized(), false);
      }

      return cb(null, user);
    } catch (error) {
      return cb(error);
    }
  })
);
