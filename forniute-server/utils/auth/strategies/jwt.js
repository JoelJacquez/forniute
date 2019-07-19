const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const boom = require('boom');
const { config } = require('../../../config');
const MysqlLib = require('../../../lib/mysql');

passport.use(
  new Strategy(
    {
      secretOrKey: config.authJwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    async function(tokenPayload, cb) {
      const mysqlDB = new MysqlLib();

      try {
        const [user] = await mysqlDB.query(
          'select * from users where email = ?',
          [tokenPayload.email]
        );

        if (!user) {
          return cb(boom.unauthorized(), false);
        }

        return cb(null, user);
      } catch (error) {
        return cb(error);
      }
    }
  )
);
