import React, {FC, createContext, useState} from 'react';
import classnames from 'classnames';
import { MenuItemProps } from './MenuItem';

type MenuMode = 'horizontal' | 'vertical'
type SelectFunction = (index: string)=>void

export interface MenuProps {
    mode?: MenuMode;
    className?: string;
    defaultIndex?: string;
    onSelect?: (index: string) => void;
    style?: React.CSSProperties;
    openSubmenu?: string[]
}
interface IMenuContext {
    active: string,
    onSelect?: SelectFunction,
    mode?: MenuMode,
    openSubmenu?: string[]
}
export const MenuContext = createContext<IMenuContext>({ active: '0' })

const Menu: FC<MenuProps> = (props) => {
    const {className, mode='horizontal', defaultIndex = '0', onSelect, style, children, openSubmenu} = props
    const classes = classnames('menu', className, {
        [`menu-${mode}`]: true,
    })
    const [active, setActive] = useState(defaultIndex)

    const value:IMenuContext = {
        active,
        mode,
        openSubmenu,
        onSelect: (index: string)=>{
            setActive(index)
            onSelect && onSelect(index)
        }
    }
    const renderChildren = React.Children.map(children, (child, index)=>{
        const childElement = child as React.FunctionComponentElement<MenuItemProps>
        const displayName = childElement.type.displayName
        if (displayName === 'MenuItem' || displayName === 'SubMenu') {
            return React.cloneElement(childElement, {index: index.toString()})
        } else {
            console.error("Warning: menu component's children exist which is not a menuItem component or a subMenu component")
        }
    })

    return (
        <ul className={classes} style={style}>
            <MenuContext.Provider value={value}>
                {renderChildren}
            </MenuContext.Provider>
        </ul>
    )
}


export default Menu
