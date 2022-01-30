import React from 'react'; 

interface ButtonProps {
    onSubmit?: any,
    caption: string,
    type?: any, 
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const Button: React.FC<ButtonProps>= ({ caption, type, onClick }): JSX.Element => {
    return <button className="btn" 
                onClick={onClick}
                type={type}
                // onSubmit={onSubmit}>
                >{caption}</button>
}

export default Button;