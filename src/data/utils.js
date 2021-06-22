"use strict";

const fs = require("fs-extra");

const loadSqlQueries = () => {
    const rawData = fs.readFileSync('./src/data/query/queries.json');
    return JSON.parse(rawData);
};

module.exports = {
    loadSqlQueries
};