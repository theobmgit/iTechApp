import React from "react";
import {ReadMoreAndLessText} from "./ReadMoreAndLessText";

// TODO: Expert table handle title as card-subtitle
// TODO: Technology table group by parent_id; handle names_vn,names_vi as card-subtitle; handle source_url
// TODO: Handle Vietnamese

export const ItemCard = (props) => {
    const imgPath = props.data.reference_image;

    const titleCase = (str) => {
        if (str.length <= 4)
            return str.toUpperCase();
        let splitStr = str.toLowerCase().split(' ');
        for (let i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }

    const handleURlString = (str) => {
        if (str.includes("http"))
            return str.slice(str.indexOf('.') + 1)
        return str
    }

    const items = props.column.map((value, i) => {
        if (i <= props.column.indexOf('name') || value === 'reference_image' || value.includes("id") || props.data[value] == null)
            return (<div/>)
        if (value === 'title')
            return (
                <h5 className="card-subtitle mb-2 text-muted"><small>{props.data[value]}</small></h5>
            )
        if (value === 'description')
            return (
                <li className="list-group-item">
                    <b>{titleCase(value)}: </b>
                    <ReadMoreAndLessText data={props.data[value]}/>
                </li>
            )
        if (value === 'link')
            return (
                <li className="list-group-item">
                    <b>{value}: </b>
                    <a href={props.data[value]} target="_blank"
                       rel="noreferrer">{handleURlString(props.data[value])}</a>
                </li>
            )
        return (
            <li className="list-group-item">
                <b>{titleCase(value)}: </b>
                {typeof props.data[value] === 'string' ? titleCase(props.data[value]) : props.data[value]}
            </li>
        )
    })

    return (
        <div className="card mb-3 bg-light" style={{maxWidth: 540}}>
            <div className="row align-items-center g-0">
                <div className="col-md-4">
                    <img src={imgPath} className="img-fluid rounded" alt={props.data.name + " image"}/>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h4 className="card-title">{titleCase(props.data.name)}</h4>
                        <ul className="list-group list-group-flush">
                            {items}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}