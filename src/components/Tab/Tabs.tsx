import React, {FC, useState, ReactElement} from 'react';
import classnames from 'classnames'
import { TabItemProps} from "./TabItem";

export interface TabsProps {
    defaultIndex?: number;
    onSelect?: (index: number)=>void;
    className?: string;
}

const Tabs:FC<TabsProps> = (props)=>{
    const { children, defaultIndex =0, onSelect, className } = props
    const classes = classnames('ele-tabs', className)
    const [active, setActive] = useState(defaultIndex)
    const handleClick = (index:number, disabled: boolean)=>{
        if (!disabled) {
            setActive(index)
            onSelect && onSelect(index)
        }
    }
    const tabs = React.Children.map(children, (child, index)=>{
        const childElement = child as React.FunctionComponentElement<TabItemProps>
        const displayName = childElement.type.displayName

        if (displayName === 'TabItem') {
            const {label, disabled=false} = childElement.props
            const classes = classnames('ele-tabs-label', {
                active: index === active,
                disabled: disabled
            })

            return (
                <li
                    className={classes}
                    onClick={()=>{handleClick(index, disabled)}}
                    key={index}
                >
                    {label}
                </li>
            )
        }

    })
    const tabs_content = React.Children.map(children, (child, index)=>{
        if (index === active) {
            return child
        }
    })

    return (
        <div className={classes}>
                <ul className='ele-tabs-header'>
                    {tabs}
                </ul>
                {tabs_content}
        </div>
    )
}

export default Tabs
