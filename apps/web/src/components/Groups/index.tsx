import React from "react"
import Button from "../Button"
import { GroupsList } from "./GroupsList"

const Groups : React.FC = () => {
    return (
        <div className="content-container">
            <div className="content-row groupsHeading">
                <div className="groups-title-row">
                    <h5>Skupiny</h5>
                </div>
                <div className="addBtnSection">
                    <Button className="btn btn-primary btn-lg" type="submit" caption="Nová skupina" iconClass="bi bi-plus"/>
                </div>
            </div>
            <div className="content-row groupsContent">
            </div>
        </div>
    )
}

export default Groups