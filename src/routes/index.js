"use strict";

const api = require("./api");

module.exports.register = async server => {
    // register api routes
    await api.register(server);

    server.route({
        method: "GET",
        path: "/",
        handler: async () => {
            return "A Database Laboratory course's mini-project!";
        }
    });
};