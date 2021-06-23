import React from "react";
import store from "../../app/store";
import {ItemCard} from "../components/ItemCard";

const apis = require("../../api");

const selectedTables = store.getState().tables.filter(table => table.select);

export class TableView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [],
            data: []
        }
    };

    componentDidMount = async () => {
        console.log(selectedTables)
        await apis.getTableData('Company').then(result => {
            this.setState({
                columns: [...result.data.column_name],
                data: [...result.data.data]
            })
        })
    };

    render() {
        return (
            <div className="container mt-5">
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