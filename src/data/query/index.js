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

    const getTableColumnName = async (tableName) => {
        const cnx = await getConnection();
        const request = await cnx.request();
        const query = sqlQueries.getTableColumnName + "\'" + tableName + "\'";
        return request.query(query);
    }

    const getJoinedTableData = async (table1, table2, relationTable) => {
        const cnx = await getConnection();
        const request = await cnx.request();
        const query = "SELECT * FROM " + table1 + " JOIN " + relationTable + " ON " + table1.toLowerCase() + "_id = " + [relationTable.toLowerCase(), table1.toLowerCase(), "id"].join("_") + " JOIN " + table2 + " ON " + [relationTable.toLowerCase(), table2.toLowerCase(), "id"].join("_") + " = " + table2.toLowerCase() + "_id"
        return request.query(query)
    }

    const getSpecificJoinedTableData = async (table1, table2, relationTable, payload) => {
        const cnx = await getConnection();
        const request = await cnx.request();
        const subQuery = "SELECT * FROM " + "( " + table1 + " JOIN " + relationTable + " ON " + table1.toLowerCase() + "_id = " + [relationTable.toLowerCase(), table1.toLowerCase(), "id"].join("_") + " JOIN " + table2 + " ON " + [relationTable.toLowerCase(), table2.toLowerCase(), "id"].join("_") + " = " + table2.toLowerCase() + "_id" + " )"
        let payloadNumber = {}
        const numberProp = ['release_year', 'publications', 'rank', 'market_cap', 'reads', 'citations']
        numberProp.forEach(prop => {
            if ([prop] in payload) {
                if (payload[prop].toLowerCase().includes("between"))
                    payloadNumber[prop] = payload[prop]
                else payloadNumber[prop] = parseInt(payload[prop])
                delete payload[prop]
            }
        })

        const condition = JSON.stringify(payload).split(',').map(str =>
            str.split(":").map((tmp, index) => {
                if (index === 0)
                    return tmp.replace(/"/g, "")
                else return " LIKE \'%" + tmp.replace(/"/g, "") + "%\'"
            }).join(" "))
            .join(" AND ").replace("{", "").replace("}", "")

        const conditionNumber = JSON.stringify(payloadNumber).split(',').map(str => {
            console.log(str)
            if (str.toLowerCase().includes("between"))
                return str.replace(":", " ").replace(/"/g, "")
            else return str.replace(":", " = ").replace(/"/g, "")
        }).join(" AND ").replace("{", "").replace("}", "")

        const query = subQuery + " WHERE " + [condition, conditionNumber].filter(str => str.length > 2).join(" AND ")
        console.log(query)
        return request.query(query)
    }

    const getSpecificTableData = async (tableName, payload) => {
        const cnx = await getConnection();
        const request = await cnx.request();
        let payloadNumber = {}
        const numberProp = ['release_year', 'publications', 'rank', 'market_cap', 'reads', 'citations']
        numberProp.forEach(prop => {
            if ([prop] in payload) {
                if (payload[prop].toLowerCase().includes("between"))
                    payloadNumber[prop] = payload[prop]
                else payloadNumber[prop] = parseInt(payload[prop])
                delete payload[prop]
            }
        })

        const condition = JSON.stringify(payload).split(',').map(str =>
            str.split(":").map((tmp, index) => {
                if (index === 0)
                    return tmp.replace(/"/g, "")
                else return " LIKE \'%" + tmp.replace(/"/g, "") + "%\'"
            }).join(" "))
            .join(" AND ").replace("{", "").replace("}", "")

        const conditionNumber = JSON.stringify(payloadNumber).split(',').map(str => {
            console.log(str)
            if (str.toLowerCase().includes("between"))
                return str.replace(":", " ").replace(/"/g, "")
            else return str.replace(":", " = ").replace(/"/g, "")
        }).join(" AND ").replace("{", "").replace("}", "")

        const query = "SELECT * FROM " + tableName + " WHERE " + [condition, conditionNumber].filter(str => str.length > 2).join(" AND ")
        console.log(query)
        return request.query(query)
    }

    return {
        getTablesName,
        getTableData,
        getTableColumnName,
        getJoinedTableData,
        getSpecificJoinedTableData,
        getSpecificTableData
    };
};

module.exports = {register};