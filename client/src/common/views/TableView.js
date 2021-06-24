import React from "react";
import {store} from "../../app/store";
import {ItemCard} from "../components/ItemCard";
import {relation} from "../resources/data/relation";

const apis = require("../../api");

// TODO: Handle relation tables

export class TableView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [],
            data: [],
            selectedTables: []
        }
    };

    componentDidMount = async () => {
        const selectedTablesArr = store.getState().tables.filter(table => table.select)
        const selectedTables = selectedTablesArr.join("")
        await apis.getTableData(relation[selectedTables]).then(result => {
            this.setState({
                columns: [...result.data.column_name],
                data: [...result.data.data],
                selectedTables: [...selectedTablesArr]
            })
        })
    };

    render() {
        const header = this.state.selectedTables.map(name => <h3 className="col">{name}</h3>)

        switch (this.state.selectedTables.length) {
            case 1:
                return (
                    <div className="container mt-5">
                        <div className="row justify-content-evenly">
                            {header}
                        </div>
                        <div className="row justify-content-around">
                            {this.state.data.map(value =>
                                <div className="col-5">
                                    <ItemCard name={'Company'} column={this.state.columns} data={value}/>
                                </div>)}
                        </div>
                    </div>
                )
            case 2:
                return (
                    <div className="container mt-5">
                        <div className="row justify-content-evenly">
                            {header}
                        </div>
                        <div className="row justify-content-around">
                            {this.state.data.map(value =>
                                <div className="col-5">
                                    <ItemCard name={'Company'} column={this.state.columns} data={value}/>
                                </div>)}
                        </div>
                    </div>
                )
        }
    }
}