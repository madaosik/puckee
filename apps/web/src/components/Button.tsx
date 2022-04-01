import React from 'react'; 

interface ButtonProps {
    onSubmit?: any,
    caption: string,
    type?: any,
    className: string,
    iconClass?: string
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const Button: React.FC<ButtonProps>= ({ caption, type, className, onClick, iconClass }): JSX.Element => {
    return ( 
        <button className={className} type={type}>
                {/* <i className="bi bi-plus-lg"></i> */}
                {/* <i className={iconClass}></i> */}
            {/* <svg className={iconClass}></svg> */}
            {caption}
        </button>

        // <button type="button" onClick={onClick} className="btn btn-elegant"><i className="far fa-user pr-2" aria-hidden="true"></i>User</button>
        )
}

export default Button;