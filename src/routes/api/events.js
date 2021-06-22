"use strict";

module.exports.register = async server => {
    server.route({
        method: "GET",
        path: "/api/query",
        config: {
            handler: async (request, response) => {
                try {
                    // get the sql client registered as a plugin
                    const db = request.server.plugins.sql.client;

                    // execute the query
                    const res = await db.events.getTablesName();

                    // return the recordset object
                    return res.recordset;
                } catch (err) {
                    console.log(err);
                }
            }
        }
    });
    server.route({
        method: "GET",
        path: "/api/query/{tableName}",
        config: {
            handler: async (request, h) => {
                try {
                    const tableName = request.params.tableName;
                    const db = request.server.plugins.sql.client;
                    const res = await db.events.getTableData(tableName);
                    // return the recordset object
                    return res.recordset;
                } catch (err) {
                    console.log(err);
                    return h.response("This table does not exist!").code(500);
                }
            }
        }
    });
};