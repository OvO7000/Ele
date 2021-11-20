import React, {FC, useContext, MouseEvent} from 'react'
import classnames from 'classnames'
import Icon from "../Icon";
import {Context} from './index'

export interface OptionProps {
    index?: number;
    disabled?: boolean;
    value?: string;
    className?: string;
}

const Option: FC<OptionProps> = (props) => {
    const {disabled, value = '', className, index = 0} = props
    const {selectedItems, handleOptionClick} = useContext(Context)
    const classes = classnames('ele-option', className, {
        selected: value && selectedItems && selectedItems.findIndex(item => item.index === index) !== -1,
        disabled: disabled
    })
    const handleClick = (e: MouseEvent<HTMLElement>) => {
        const item = {
            index,
            value
        }
        !disabled && handleOptionClick && handleOptionClick(item)
    }
    return (
        <div className={classes} onClick={handleClick}>
            <span>{value}</span>
            <Icon icon='check' className='ele-option-icon'/>
        </div>
    )
}
Option.displayName = 'Option'
export default Option
