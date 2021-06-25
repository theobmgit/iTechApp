import React from "react";
import TableCard from "../components/TableCard";
import {useSelector} from "react-redux";
import {relation} from "../resources/data/relation";

export const TableSelect = () => {
    const tables = useSelector(state => state.tables)
    const selectedTables = tables.filter(table => table.select).map(table => table.name)

    console.log(selectedTables)
    const handleClickNext = (e) => {
        e.preventDefault();
        window.location.href = `/api/query/${relation[selectedTables.join("")]}/select`
    }

    const handleClickViewAll = (e) => {
        e.preventDefault();
        window.location.href = `/api/query/${relation[selectedTables.join("")]}`
    }

    const disableViewALll = !(selectedTables.length > 0 && selectedTables.length < 3)
    const disableNext = selectedTables.length === 0

    return (
        <div className="container">
            <h2 className="fs-1" style={{lineHeight: '70%'}}>Select tables</h2>
            <p className="fs-4">Choose what you are interested in</p>
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
                <button type="button" className="btn btn-outline-primary btn-lg me-5" disabled={disableViewALll}
                        onClick={(e) => handleClickViewAll(e)}>View All
                </button>
                <button type="button" className="btn btn-primary btn-lg" disabled={disableNext}
                        onClick={(e) => handleClickNext(e)}>Next
                </button>
            </div>
        </div>
    )
};