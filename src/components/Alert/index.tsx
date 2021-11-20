import React, {FC, useState, BaseHTMLAttributes} from 'react';
import classnames from 'classnames'
import Icon from '../Icon'
import Transition from '../Transition'
import {config} from "react-transition-group";

config.disabled = true

type AlertType = 'success' | 'default' | 'danger' | 'warning'


interface BasicAlertProps {
    type?: AlertType;
    title?: string;
    desc?: string;
    closable?: boolean;
    className?: string
}

export type AlertProps = BaseHTMLAttributes<HTMLElement> & BasicAlertProps

const Alert: FC<AlertProps> = (props) => {
    const [show, setShow] = useState(true)
    const {type = 'default', title, desc, closable = true, className, ...restProps} = props
    const classes = classnames('alert', className, {
        [`alert-${type}`]: type,
        // 'alert-hide': !show
    })
    const titleClasses = classnames('alert-title', {
        'alert-title-bold': !!desc
    })
    const handleCloseIconClick = () => {
        setShow(false)
    }
    return (
        <Transition
            in={show}
            timeout={300}
            classNames='zoom-right'
        >
            <div className={classes} {...restProps}>
                <div className='alert-header'>
                    <span className={titleClasses}>{title}</span>
                    {
                        closable && (
                            <Icon
                                className="alert-close-icon"
                                icon='times'
                                onClick={handleCloseIconClick}
                            />
                        )
                    }
                </div>
                {
                    !!desc && <p className='alert-desc'>{desc}</p>
                }
            </div>
        </Transition>

    )
}


export default Alert


