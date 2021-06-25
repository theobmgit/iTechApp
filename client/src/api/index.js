import axios from "axios";

export const getTableData = (tableName) => axios.get(`/api/query/${tableName}`);
export const getTableColumnName = (tableName) => axios.get(`/api/query/${tableName}/column`)
export const getSpecificTableData = (tableName, payload) => axios.post(`api/query/${tableName}`, payload)

export const apis = {
    getTableData,
    getTableColumnName,
    getSpecificTableData
}