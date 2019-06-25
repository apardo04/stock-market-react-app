const Router = require('express').Router;
const AuthController = require('../controllers/AuthController');
const passport = require('passport');
const strats = require('../services/passport');

passport.use(strats.localLogin);
passport.use(strats.jwtLogin);
const requireSignIn = passport.authenticate("local", { session: false });

class AppRouter {
    constructor() {
        this.router = Router();
        this.buildRoutes();
    }

    buildRoutes() {
        this.router.post("/signup", AuthController.signup);
        this.router.post("/signin", requireSignIn, AuthController.signin);
        this.router.get("/api/stocks", AuthController.getStocks)
        this.router.post("/api/stocks", AuthController.addStock)
        this.router.delete("/api/stocks", AuthController.deleteStock)
    }
}



const appRouter = new AppRouter();
module.exports = appRouter.router;