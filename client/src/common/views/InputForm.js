// TODO: add input form features
import React from "react";
import {store} from "../../app/store";
import {apis} from "../../api";
import {relation} from "../resources/data/relation";

export class InputForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [],
            data: []
        }
    }

    componentDidMount = async () => {
        const selectedTablesArr = store.getState().tables.filter(table => table.select).map(table => table.name)
        const selectedTables = selectedTablesArr.join("")
        await apis.getTableColumnName(relation[selectedTables]).then(result => {
            this.setState({
                columns: [...result.data.column_name]
            })
        })
    }

    render() {
        return (
            <div/>
        )
    }
}