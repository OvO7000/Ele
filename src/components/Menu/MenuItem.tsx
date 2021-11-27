import React, {FC, useContext} from 'react';
import classnames from 'classnames'
import { MenuContext } from "./Menu";

export interface MenuItemProps {
    disabled?: boolean;
    index?: string;
    style?: React.CSSProperties;
    className?: string;
}

const MenuItem:FC<MenuItemProps> = (props)=>{
    const { disabled=false, index, style, className, children } = props
    const menuContext = useContext(MenuContext)
    const classes = classnames('menu-item', className, {
        disabled: disabled,
        active: (menuContext.active === index)
    })
    const handleClick = ()=>{
        if (!disabled && menuContext.onSelect && typeof index === 'string') {
            menuContext.onSelect(index)
        }
    }
    return (
        <li className={classes} style={style} onClick={handleClick}>
            {children}
        </li>
    )
}
MenuItem.displayName = 'MenuItem'

export default MenuItem
