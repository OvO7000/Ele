import React, {FC, useContext, useState, useRef} from 'react';
import classnames from 'classnames'

import Icon from '../Icon'
import Transition from '../Transition'

import {MenuItemProps} from "./MenuItem";
import {MenuContext} from "./Menu";

export interface SubMenuProps {
    index?: string;
    className?: string;
    title: string;
    disabled?: boolean
}

const SubMenu: FC<SubMenuProps> = (props) => {
    const {index, className, title, children} = props
    const context = useContext(MenuContext)
    let panelRef = useRef(null)
    const openSubmenu = (index && context.mode === 'vertical' && context.openSubmenu) ? context.openSubmenu.includes(index) : false
    const [show, setShow] = useState<boolean>(openSubmenu)

    const classes = classnames('menu-item menu-subMenu', className, {
        active: context.active.startsWith(index as string),
        show
    })
    const subMenuContentClasses = classnames('menu-subMenu-content', {
        active: context.active === index,
        show
    })
    let timer: any
    const handleMouseEvents = (e: React.MouseEvent, show: boolean) => {
        e.preventDefault()
        clearTimeout(timer)
        timer = setTimeout(() => {
            setShow(show)
        }, 250)

    }
    const clickEvents = (context.mode === 'vertical') ? {
        onClick: (e: React.MouseEvent) => {
            e.preventDefault()
            setShow(!show)
        }
    } : {}
    const hoverEvents = (context.mode === 'horizontal') ? {
        onMouseEnter: (e: React.MouseEvent) => {
            handleMouseEvents(e, true)
        },
        onMouseLeave: (e: React.MouseEvent) => {
            handleMouseEvents(e, false)
        },
    } : {}

    const renderChildren = React.Children.map(children, (child, idx) => {
        const childElement = child as React.FunctionComponentElement<MenuItemProps>
        const displayName = childElement.type.displayName
        if (displayName === 'MenuItem' && typeof index === 'string') {
            return React.cloneElement(childElement, {index: `${index}-${idx}`})
        } else {
            console.error("Warning: menu component's children exist which is not a menuItem component")
        }
    })
    return (
        <div className={classes} {...hoverEvents}>
            <div className='menu-subMenu-title' {...clickEvents}>
                {title}
                <Icon icon='angle-down' className='ele-subMenu-icon'/>
            </div>
            <Transition
                in={show}
                timeout={300}
                animation='zoom-left'
                nodeRef={panelRef}
            >
                <div className={subMenuContentClasses} ref={panelRef} >
                    {renderChildren}
                </div>
            </Transition>
        </div>
    )
}
SubMenu.displayName = 'SubMenu'
export default SubMenu
