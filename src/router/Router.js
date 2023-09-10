const dataAcces = require('../data-access/dynamoDb')

  
 module.exports = function(app) {

    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post('/users', (req, res) => {
        dataAcces.AddUsers(req, res);
    });
      
    app.get('/users', (req, res) => {
        dataAcces.GetUsers(req, res);
    });
      
    app.get('/users/:userId', (req, res) => {
        dataAcces.GetUser(req, res); 
    });
  
}