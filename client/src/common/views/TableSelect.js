import React from "react";
import TableCard from "../components/TableCard";
import {useSelector} from "react-redux";

export const TableSelect = () => {
    const tables = useSelector(state => state.tables)
    const selectedTables = tables.filter(table => table.select).map(table => table.name)
    const handleClick = (e) => {
        e.preventDefault();
        window.location.href = `/api/query/${selectedTables[0]}`
    }
    return (
        <div className="container">
            <div className="row mb-5">
                {tables.map(value =>
                    <div key={value.name} className="col">
                        <TableCard key={value.name} table={{
                            tableName: value.name,
                            select: value.select,
                            visibility: value.visibility
                        }}/>
                    </div>
                )}
            </div>
            <div className="d-flex justify-content-end">
                <button type="button" className="btn btn-primary btn-lg"
                        onClick={(e) => handleClick(e)}>Next
                </button>
            </div>
        </div>
    )
};