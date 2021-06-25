import React, {useEffect} from "react";
import {apis} from "../../api";
import {useDispatch, useSelector} from "react-redux";
import {relation} from "../resources/data/relation";
import {ItemCheckBox} from "../components/ItemCheckBox";

export const ColumnSelect = () => {
    const selectedTables = useSelector(state => state.tables).filter(table => table.select).map(table => table.name)
    const columns = useSelector(state => state.columns).map(column => column.name)
    const dispatch = useDispatch()

    console.log(useSelector(state => state.columns).filter(column => column.select))
    useEffect(() => {
        async function fetchData() {
            const result = await apis.getTableColumnName(relation[selectedTables.join("")])
            dispatch({
                type: 'columns/columnsLoad',
                payload: {
                    columns: [...result.data.filter(res => !res.endsWith("id"))]
                }
            })
        }

        fetchData()
    }, []);

    function handleClickBack() {
        window.location.href = '/'
    }

    function handleClickNext() {
        window.location.href = `/api/query/${relation[selectedTables.join("")]}/input`
    }

    return (
        <div className="container w-75">
            <h2 className="fs-1" style={{lineHeight: '70%'}}>Select data columns</h2>
            <p className="fs-4">Choose what you want to know</p>
            <div className="row mb-3">
                {columns.map(column =>
                    <div className="col-4 mb-3">
                        <ItemCheckBox column={column}/>
                    </div>)}
            < /div>
            <div className="d-flex justify-content-end">
                <button type="button" className="btn btn-outline-danger btn-lg me-5"
                        onClick={() => handleClickBack()}>Back
                </button>
                <button type="button" className="btn btn-primary btn-lg"
                        onClick={() => handleClickNext()}>Next
                </button>
            </div>
        </div>
    )
}

