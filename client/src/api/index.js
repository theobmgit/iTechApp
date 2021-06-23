import axios from "axios";

export const getTableData = (tableName) => axios.get(`/api/query/${tableName}`);

export const apis = {
    getTableData
}