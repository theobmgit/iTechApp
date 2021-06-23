import React from "react";
import {useDispatch} from "react-redux";

export const TableCard = (props) => {
    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch({
            type: 'tables/tableSelect',
            payload: {
                name: props.table.tableName
            }
        })
    }

    const cardClassName = props.table.select ? "bg-warning" : "bg-light"
    const imgPath = "https://husteduvn-my.sharepoint.com/personal/tu_bm194870_sis_hust_edu_vn/Documents/resources/img/" + props.table.tableName + ".jpg";
    return (
        <div className={"card " + cardClassName}>
            <img src={imgPath} className="card-img-top" key={Date.now()} alt={props.table.tableName}/>
            <div className="card-body">
                <h2 className="card-title">{props.table.tableName}</h2>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk
                    of the card's content.</p>
                <button type="button" className="btn btn-primary" onClick={() => handleClick()}>Select</button>
            </div>
        </div>
    );
}

export default TableCard