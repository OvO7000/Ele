import React, {FC, ReactElement} from 'react';
import classnames from 'classnames'

export interface Props {
    label: string | ReactElement;
    disabled?: boolean;
    className?: string;
    children?: string | ReactElement
}

const TabItem:FC<Props> = (props)=>{
    const classes = classnames('ele-tabItem', props.className)
    return (<div className={classes}>
        {props.children}
    </div>)
}
TabItem.displayName = 'TabItem'
export default TabItem
