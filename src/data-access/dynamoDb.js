const AWS = require("aws-sdk");
const {IS_OFFLINE, USERS_TABLE} = require("../config/enviroment");

let dynamoDB;

if (IS_OFFLINE === "true") {
  dynamoDB = new AWS.DynamoDB.DocumentClient({
    region: "localhost",
    endpoint: "http://localhost:8000",
  });
} else {
  dynamoDB = new AWS.DynamoDB.DocumentClient();
}

module.exports.GetUsers = (req, res) => {
  const params = {
    TableName: USERS_TABLE,
  };

  dynamoDB.scan(params, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({
        error: "No se ha podido acceder a los usuarios",
      });
    } else {
      const { Items } = result;
      res.json({
        success: true,
        message: "Usuarios cargados correctamente",
        users: Items,
      });
    }
  });
};

module.exports.AddUsers = (req, res) => {
    const {userId, name} = req.body;
    
    const params = {
      TableName: USERS_TABLE,
      Item: {
        userId, name
      }
    };
    dynamoDB.put(params, (error) => {
        if (error) {
          console.log(error);
          res.status(400).json({
            error: 'No se ha podido crear el usuario'
          })
        } else {
          res.json({userId, name});
        }
    });
}


module.exports.GetUser = (req, res) => {
    const params = {
        TableName: USERS_TABLE,
        Key: {
          userId: req.params.userId,
        }
      };
      
      dynamoDB.get(params, (error, result) => {
        if (error) {
          console.log(error);
          return res.status(400).json({
            error: 'No se ha podido acceder al usuario'
          })
        }
        if (result.Item) {
          const {userId, name} = result.Item;
          return res.json({userId, name});
        } else {
          res.status(404).json({error: 'Usuario no encontrado'})
        }
      })
}