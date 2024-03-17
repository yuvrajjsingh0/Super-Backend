import express = require("express");
export abstract class CommonRoutesConfig {
    app: express.Application;
    name: string;
    router: express.Router;

    constructor(app: express.Application, name: string) {
        this.app = app;
        this.name = name;
        this.router = express.Router();
        this.configureRoute();
        this.app.use(`/${name.toLowerCase()}`, this.router);
    }

    getName(): string {
        return this.name;
    }

    abstract configureRoute() : void;
}