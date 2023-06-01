const helmet = require("helmet");
const express = require("express");
const routers = require("./src/routes");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.json");

// middle wares section

const { handler } = require("./src/middleware/errorHandler");
const { CustomLogger } = require("./src/middleware/customLogger");
let appLogger = new CustomLogger();

const port = process.env.PORT || 2119;
const args = process.argv.slice(2)[0];

const app = express();
app.use(helmet());
app.use(appLogger.requestDetails(appLogger));

// Body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

if (args) {
  let CONFIG = require("./src/configs/config")(args);

  if (["PREPROD", "PROD"].indexOf(args) > -1) {
    client.getSecretValue(
      { SecretId: CONFIG.SECRET_KEY },
      function (err, data) {
        if (err) {
          console.log("Error", err);
          throw err;
        } else {
          if ("SecretString" in data) {
            let connectionUrl = JSON.parse(data.SecretString);
            console.log("Secrret connectionUrl port ", connectionUrl.port);
            process.env.MONGO_URL = `mongodb://${connectionUrl.username}:${connectionUrl.password}@${connectionUrl.host}:${connectionUrl.port}/${CONFIG.DB_NAME}?replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false`;

            const options = {
              explorer: false,
              swaggerOptions: {
                validatorUrl: null,
              },
              customSiteTitle: "Kotak Backend REST Service",
              customfavIcon: "https://www.doodleblue.com/favicon/16x16.png",
            };

            app.use(
              "/docs",
              swaggerUi.serve,
              swaggerUi.setup(swaggerDocument, options)
            );
            app.get("/", (req, res) => {
              res.status(200).json({
                status: "success",
                message: "Kotak Securities App Running Successfully...",
              });
            });
            app.listen(port, () =>
              console.log(`Kotak Backend listening at http://localhost:${port}`)
            );
          }
        }
      }
    );
  } else {
    app.get("/", (req, res, next) => {
      res.status(200).json({
        status: 1,
        message: "CRUD App Running Successfully...",
      });
    });
    app.listen(port, () =>
      console.log(`Backend listening at http://localhost:${port}`)
    );
  }

  // middleware section
  app.use(appLogger.requestDetails(appLogger));
  routers(app);
  app.use(handler);

  process.on("uncaughtException", function (err) {
    console.log("whoops! There was an uncaught error", err);
  });

  process.on("unhandledRejection", function (reason, promise) {
    console.log("Unhandled rejection", { reason: reason, promise: promise });
  });
}
