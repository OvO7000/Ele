import React, {FC} from 'react';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import classnames from 'classnames'

library.add(fas)

export interface Props extends FontAwesomeIconProps {
    theme?: 'primary' | 'info' | 'success' | 'danger' | 'warning';
    className?: string;
}

const Icon:FC<Props> = (props)=>{
    const { theme, className, icon, ...rest } = props
    const classes = classnames('ele-icon', className, {
        [`${theme}`]: theme
    })
    return (<FontAwesomeIcon className={classes} icon={icon} {...rest} />)
}

export default Icon
