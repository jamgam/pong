const db = require('../db/index');

module.exports = (req, res, next) => {
  const session = req.cookies.pongSession;
  if (session) {
    db.sessionExists(session)
      .then((result) => {
        if (result) {
          req.session = session;
          res.cookie('pongSession', session);
          console.log('sess exists');
          next();
        } else {
          db.createSession()
            .then((result) => {
              req.session = result;
              res.cookie('pongSession', result);
              next();
            });
        }
      });
  } else {
    db.createSession()
      .then((result) => {
        req.session = result;
        res.cookie('pongSession', result);
        next();
      });
  }
};
