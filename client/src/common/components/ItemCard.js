import React from "react";
import {ReadMoreAndLessText} from "./ReadMoreAndLessText";

// TODO: Technology table group by parent_id

export const ItemCard = (props) => {
    const imgPath = props.data.reference_image instanceof Array ? props.data.reference_image[0] : props.data.reference_image

    const reformatString = (str) => {
        if (str.length <= 4)
            return str.toUpperCase().replaceAll("_", "");
        let splitStr = str.toLowerCase().split(' ');
        for (let i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ').replaceAll("_", " ");
    }

    const handleURlString = (str) => {
        if (str.includes("http"))
            return str.slice(str.indexOf('.') + 1)
        return str
    }

    const nameColumn = props.column.filter(columnName => columnName.includes("name"))[0]

    const items = props.column.map((value, i) => {
        if (i <= 1 || props.data[value] == null ||
            value.includes("id") ||
            value === 'reference_image' || value === 'source_url' || value === 'name_vi')
            return (<div/>)
        if (value === 'title')
            return (
                <h5 className="card-subtitle mb-2 text-muted"><small>{props.data[value]}</small></h5>
            )
        if (value === 'description')
            return (
                <li className="list-group-item">
                    <b>{reformatString(value)}: </b>
                    <ReadMoreAndLessText data={props.data[value]}/>
                </li>
            )
        if (value === 'source')
            return (
                <li className="list-group-item">
                    <b>Source: </b>
                    <a href={props.data['source_url']} target="_blank"
                       rel="noreferrer">
                        {reformatString(props.data['source'])}
                    </a>
                </li>
            )
        if (value === 'link')
            return (
                <li className="list-group-item">
                    <b>Link: </b>
                    <a href={props.data[value]} target="_blank"
                       rel="noreferrer">{handleURlString(props.data[value])}</a>
                </li>
            )
        return (
            <li className="list-group-item">
                <b>{value.includes("name")? reformatString(value.replace("name", "")).replace(" ", "") : reformatString(value)}: </b>
                {value === 'company_name' || value === 'address' ? reformatString(props.data[value]) : props.data[value]}
            </li>
        )
    })

    return (
        <div className="card mb-3 bg-light" style={{maxWidth: 540}}>
            <div className="row align-items-center g-0">
                <div className="col-md-4">
                    <img src={imgPath} className="img-fluid rounded" alt={props.data[nameColumn] + " image"}/>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h4 className="card-title">
                            {props.column.indexOf('company_name') !== -1 ?
                                reformatString(props.data[nameColumn]) : props.data[nameColumn]}
                        </h4>
                        <ul className="list-group list-group-flush">
                            {items}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}