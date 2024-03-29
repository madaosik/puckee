import React from 'react'; 

interface ErrorMsgProps {
    msg?: string
    className?: string
}

export const ErrorReport = ({msg, className} : ErrorMsgProps) => {
    return (
        <div className={`formInputError ${className}`}>{msg}</div>
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

export const InputLabel = ( { content, ...props } : any) => <label {...props} className="form-input-label flex-none">{content}</label>

interface ButtonProps {
    ref?: (node?: Element | null | undefined) => void,
    onSubmit?: any,
    caption: string,
    type?: any,
    className: string,
    iconClass?: string,
    disabled?: boolean,
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>
}

export const Button: React.FC<ButtonProps>= ({ ref, caption, type, disabled, className, onClick, onMouseEnter, iconClass }): JSX.Element => {
    return ( 
        <button className={className} type={type} onClick={onClick} onMouseEnter={onMouseEnter} disabled={disabled} ref={ref}>
                {/* <i className="bi bi-plus-lg"></i> */}
                {/* <i className={iconClass}></i> */}
            {/* <svg className={iconClass}></svg> */}
            {caption}
        </button>

        // <button type="button" onClick={onClick} className="btn btn-elegant"><i className="far fa-user pr-2" aria-hidden="true"></i>User</button>
        )
}