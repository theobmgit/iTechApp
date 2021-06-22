"use strict";

const utils = require("../utils");

const register = async ({sql, getConnection}) => {
    // read in all the .sql files for this folder
    const sqlQueries = await utils.loadSqlQueries();

    const getTablesName = async () => {
        // get a connection to SQL Server
        const cnx = await getConnection();

        // create a new request
        const request = await cnx.request();

        // return the executed query
        return request.query(sqlQueries.getTablesName);
    };

    const getTableData = async (tableName) => {
        const cnx = await getConnection();
        const request = await cnx.request();
        const query = sqlQueries.getTableData + tableName;
        return request.query(query);
    }

    return {
        getTablesName,
        getTableData
    };
};

module.exports = {register};