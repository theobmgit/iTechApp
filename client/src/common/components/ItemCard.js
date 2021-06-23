import React from "react";

export const ItemCard = (props) => {
    const imgPath = "https://husteduvn-my.sharepoint.com/personal/tu_bm194870_sis_hust_edu_vn/Documents/resources/img/" + props.name + ".png";
    const titleCase = (str) => {
        if (str.length <= 4)
            return str.toUpperCase();
        let splitStr = str.toLowerCase().split(' ');
        for (let i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }

    return (
        <div className="card mb-3 bg-light" style={{maxWidth: 540}}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={imgPath} className="img-fluid rounded-start" alt={props.data.name + " logo"}/>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h4 className="card-title">{titleCase(props.data.name)}</h4>
                        <p className="card-text">{titleCase(props.data.address)}</p>
                        <p className="card-text"><small className="text-muted">{"$" + props.data.market_cap + " billions"}</small></p>
                        <a href={"https://www." + props.data.link} target="_blank" className="card-text">{props.data.link}</a>
                    </div>
                </div>
            </div>
        </div>
    )
}