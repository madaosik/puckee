import React from "react"
import { MdArrowRightAlt } from "react-icons/md"
import { Link } from "react-router-dom"

const HeaderRow = () => {
    return (
        <div className="item one">
            <Link to={"/profile"}>Adam Lanicek</Link>
        </div>
    )
}

// const styles = {
//     heading: {
//         textAlign: 'right',
//     }
// }


export default HeaderRow

