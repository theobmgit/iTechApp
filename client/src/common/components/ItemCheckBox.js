import React from "react";
import {useDispatch} from "react-redux";

export const ItemCheckBox = (props) => {
    const dispatch = useDispatch()

    const reformatString = (str) => {
        let splitStr = str.toLowerCase().split(' ');
        for (let i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ').replaceAll("_", " ");
    }

    const handleClick = () => {
        dispatch({
            type: 'columns/columnSelect',
            payload: {
                column: props.column
            }
        })
    }

    return (
        <div className="form-check">
            <input className="form-check-input me-2" type="checkbox" value="" id="flexCheckDefault"
                   onChange={handleClick} style={{width: 30, height: 30}}/>
            <label className="form-check-label fs-4" htmlFor="flexCheckDefault">
                <span className="lead">{reformatString(props.column)}</span>
            </label>
        </div>
    )
}