import React, {FC, ReactElement, InputHTMLAttributes, ChangeEvent, useEffect, useState, useRef} from 'react'
import {IconProp} from '@fortawesome/fontawesome-svg-core'
import classnames from 'classnames'
import Icon from '../Icon'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    icon?: IconProp;
    toggle?: boolean;
    prepend?: string | ReactElement;
    append?: string | ReactElement;
    onChange?: (e:ChangeEvent<HTMLInputElement>)=>void;
}


const Input: FC<InputProps> = (props) => {
    const {
        size = 'md',
        disabled = false,
        icon,
        toggle,
        prepend,
        append,
        className,
        ...rest
    } = props
    const [appendWidth, setWidth] = useState(0)
    const [show, setShow] = useState(false)
    const appendRef = useRef(null)
    useEffect(()=>{
        if (append && icon && appendRef.current) {
            const width = (appendRef.current as HTMLElement).offsetWidth
            setWidth(width)
        }
        setShow(true)
    },[])

    if ('value' in props) {
        delete rest.defaultValue
        if (typeof rest.value === 'undefined') {
            rest.value = ''
        }
    }

    if (rest.value) {

    }

    const wrapper: boolean = !!(icon || prepend || append)
    const classes = classnames('ele-input', className, {
        'ele-input-wrapper': wrapper,
        [`ele-input-${size}`]: size,
        'ele-input-disabled': disabled,
        'withPrepend': !!prepend,
        'withAppend': !!append,
        'withIcon': !!icon,
    })

    if (wrapper) {
        return (
            <span className={classes}>
                {prepend && <span className='ele-input-prepend'>{prepend}</span>}
                <input type='text' {...rest} disabled={disabled}/>
                {
                    show && icon && (<span className='ele-input-icon' style={{right: appendWidth}}>
                        <Icon icon={icon} toggle={toggle}/>
                    </span>)
                }
                {append && <span className='ele-input-append' ref={appendRef}>{append}</span>}
            </span>)
    } else {
        return <input
            type='text'
            disabled={disabled}
            className={classes}
            {...rest}
        />
    }
}

export default Input
