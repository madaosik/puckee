import React from 'react'; 

interface ErrorMsgProps {
    msg?: string
}

export const ErrorReport = ({msg} : ErrorMsgProps) => {
    return (
        <div className="formInputError">{msg}</div>
    )
}

export const FormInputLg = (props: any) => <input {...props} className="form-control form-control-lg shadow p-3 mb-5 bg-white rounded" />;

export const FormInput  = ({ className, ...props } : any ) => {
    const classStr = "form-control shadow " + className

    return (
        <div className="form-input-input"><input {...props} className={classStr}/></div>
    )
}

export const FormTextArea  = ({ className, ...props } : any )  => {
    const classStr = "form-control shadow rounded " + className

    return (
        <textarea {...props} className={classStr} />
    )
}

export const InputLabel = ( { content, ...props } : any) => <label {...props} className="form-input-label">{content}</label>

interface ButtonProps {
    onSubmit?: any,
    caption: string,
    type?: any,
    className: string,
    iconClass?: string
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export const Button: React.FC<ButtonProps>= ({ caption, type, className, onClick, iconClass }): JSX.Element => {
    return ( 
        <button className={className} type={type} onClick={onClick}>
                {/* <i className="bi bi-plus-lg"></i> */}
                {/* <i className={iconClass}></i> */}
            {/* <svg className={iconClass}></svg> */}
            {caption}
        </button>

        // <button type="button" onClick={onClick} className="btn btn-elegant"><i className="far fa-user pr-2" aria-hidden="true"></i>User</button>
        )
}