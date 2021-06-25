import React from "react";
import {store} from "../../app/store";
import {ItemCard} from "../components/ItemCard";
import {relation} from "../resources/data/relation";
import {description} from "../resources/data/description";

const apis = require("../../api");

export class TableView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [],
            data: []
        }
    };

    componentDidMount = async () => {
        const selectedTablesArr = store.getState().tables.filter(table => table.select).map(table => table.name)
        const selectedTables = selectedTablesArr.join("")
        await apis.getTableData(relation[selectedTables]).then(result => {
            this.setState({
                columns: [...result.data.column_name],
                data: [...result.data.data]
            })
        })
    };

    render() {
        const selectedTables = store.getState().tables.filter(table => table.select).map(table => table.name)

        return (
            <div className="container mt-5">
                <div className="row mb-3">
                    <h3 className="fs-1" style={{lineHeight: '70%'}}>{relation[selectedTables.join("")]}</h3>
                    <p className="fs-5">{description[relation[selectedTables.join("")]]}</p>
                </div>
                <div className="row justify-content-around">
                    {this.state.data.map(value =>
                        <div className="col-5">
                            <ItemCard name={value.name} column={this.state.columns} data={value}/>
                        </div>)}
                </div>
            </div>
        )
    }
}