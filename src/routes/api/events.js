"use strict";

module.exports.register = async server => {
    const relation = {
        Company: ["Company"],
        Expert: ["Expert"],
        Technology: ["Technology"],
        Invention: ["Invention"],
        University: ["University"],
        Develop: ["Company", "Expert", "Technology"],
        Educate: ["Expert", "University"],
        Use_In: ["Invention", "Technology"],
        Research: ["Expert", "Invention"],
        Made_By: ["Invention", "Company"]
    }
    server.route({
        method: "GET",
        path: "/api/query/{tableName}/column",
        config: {
            handler: async (request, h) => {
                try {
                    const tableName = request.params.tableName;
                    const selectedTables = relation[tableName]
                    // get the sql client registered as a plugin
                    const db = request.server.plugins.sql.client;

                    // execute the query
                    let res = []
                    for (let i = 0; i < selectedTables.length; i++) {
                        const data = await db.events.getTableColumnName(selectedTables[i])
                        res = [...res, ...data.recordset]
                    }

                    // return the recordset object
                    return Object.values(res.map(record => record.COLUMN_NAME))
                } catch (err) {
                    console.log(err);
                    return h.response("This table does not exist!").code(500);
                }
            }
        }
    });

    // Return an object which includes array column_name and array data (array of item objects)
    server.route({
        method: "GET",
        path: "/api/query/{tableName}",
        config: {
            handler: async (request, h) => {
                try {
                    const tableName = request.params.tableName;
                    const selectedTables = relation[tableName]
                    const db = request.server.plugins.sql.client;

                    let res = []
                    for (let i = 0; i < selectedTables.length; i++) {
                        const data = await db.events.getTableColumnName(selectedTables[i])
                        res = [...res, ...data.recordset]
                    }

                    let res2
                    if (selectedTables.length === 1)
                        res2 = await db.events.getTableData(selectedTables[0])
                    else res2 = await db.events.getJoinedTableData(selectedTables[0], selectedTables[1], tableName)

                    // return the recordset object
                    return {
                        "column_name": Object.values(res.map(record => record.COLUMN_NAME)),
                        "data": res2.recordset
                    }
                } catch (err) {
                    console.log(err);
                    return h.response("This table does not exist!").code(500);
                }
            }
        }
    });
};