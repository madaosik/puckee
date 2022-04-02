import React from "react"
import LoremIpsum from "react-lorem-ipsum"

export const MightInterestYou : React.FC = () => {
    return (
        <div className="content-inner-box">
            <div className="content-inner-row heading">
                <h4>Mohlo by Tě zajímat</h4>
            </div>
            <div className="content-inner-row data">
                <LoremIpsum p={6} />
            </div>
        </div>
    )
}

// const styles = {
//     brand: {
//         marginBottom: '5px',
//         marginLeft: '0.5rem',
//         // marginRight: '1rem'
//     }
// }