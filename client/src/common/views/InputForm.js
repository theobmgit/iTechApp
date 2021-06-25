// TODO: add input form features
import React, {useState} from "react";
import {useSelector} from "react-redux";
import {relation} from "../resources/data/relation";
import {apis} from "../../api";
import {ItemCard} from "../components/ItemCard";

export const InputForm = () => {
    const selectedTables = useSelector(state => state.tables).filter(table => table.select).map(table => table.name)
    const columns = useSelector(state => state.columns).map(column => column.name)
    const selectedColumns = useSelector(state => state.columns).filter(column => column.select).map(column => column.name)

    const [state, setState] = useState({
        columnInput: {},
        data: {
            columns: [],
            data: []
        }
    })

    let handleChange = (e) => {
        setState({
            ...state,
            columnInput: {
                ...state.columnInput,
                [e.target.id]: e.target.value
            }
        })
    }

    function clean(obj) {
        let propNames = Object.getOwnPropertyNames(obj);
        for (let i = 0; i < propNames.length; i++) {
            let propName = propNames[i];
            if (obj[propName] === null || obj[propName] === undefined || obj[propName] === "") {
                delete obj[propName];
            }
        }
    }

    const handleClickBack = () => {
        window.location.href = `/api/query/${relation[selectedTables.join("")]}/select`
    }

    const handleClickNext = async () => {
        clean(state.columnInput)
        await apis.getSpecificTableData(relation[selectedTables.join("")], state.columnInput).then(result => {
                setState({
                    ...state,
                    data: {
                        columns: [...result.data.column_name],
                        data: [...result.data.data]
                    }
                });
            }
        );
    };

    return (
        <div className="container">
            <h2 className="fs-1" style={{lineHeight: '70%'}}>Fill in</h2>
            <p className="fs-4">Fill in what you have already known, leave them blank if you have no idea at all</p>
            <form className="row g-3 mb-5">
                {columns.filter(column => column !== 'reference_image' && column !== 'link').map(column =>
                    <input type="text" id={column} className="form-control" placeholder={column} aria-label={column}
                           value={state.columnInput[column]}
                           onChange={handleChange}
                    />
                )}
            </form>
            <div className="d-flex justify-content-end mb-5">
                <button type="button" className="btn btn-outline-danger btn-lg me-5"
                        onClick={() => handleClickBack()}>Back
                </button>
                <button type="button" className="btn btn-primary btn-lg"
                        onClick={() => handleClickNext()}>Next
                </button>
            </div>
            <div className="container">
                <div className="row">
                    <h2 className="fs-1">Results:</h2>
                </div>
                <div className="row">
                    {state.data.data.map(value => <ItemCard name={value.name} column={selectedColumns} data={value}/>)}
                </div>
            </div>
        </div>
    )
}