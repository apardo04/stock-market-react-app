require("dotenv").config();
const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const uuid = require('uuid');
const bodyParser = require('body-parser');
const { parse } = require('url');
const next = require('next');
const AppRouter = require('./routes/AppRouter');

const dev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 3001;

const app = next({ dir: "./app", dev });
const handle = app.getRequestHandler();
const getRoutes = require('./routes');
const routes = getRoutes();

//const models=require("./db/model");

app.prepare().then(() => {
    const server = express();
    var fileStoreOptions = {};
    
    server.use(
        session({
            secret: uuid.v1(),
            store: new FileStore(fileStoreOptions),
	    name: "sessionId",
            resave: true,
            saveUninitialized: true
        })
    )

    server.use(bodyParser.urlencoded({ extended: true }))
    server.use(bodyParser.json());

    server.use(AppRouter);

    server.get("/.well-known/brave-rewards-verification.txt", (req, res) => {
        console.log("requested brave")
        res.send(`<pre style="word-wrap: break-word; white-space: pre-wrap;">This is a Brave Rewards publisher verification file.
        		Domain: stockify.app
			Token: 722eff08b2c439fd25db963da71c73e23aa5b564c0eb717de8de40fc6e82c1c2
		</pre>`);
    });

    server.get("*", (req ,res) => {
        const parsedUrl = parse(req.url, true);
        const { pathname, query = {} } = parsedUrl;

        /**
         *  Pull in front end routes, and check request against those routes
         */
        const route = routes[pathname];
        if(route) {
            return app.render(req, res, route.page, query);
        }
        handle(req, res);
    });

    //models.sequelize.sync().then(function() {
        server.listen(PORT, err => {
            if (err) throw err;
            console.log("> Starting server on port ", PORT);
        });
    //});
})
.catch(err => {
    console.log(err);
    process.exit(1);
})
