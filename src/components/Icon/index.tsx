import React, {FC} from 'react';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import classnames from 'classnames'

library.add(fas)

export interface IconProps extends FontAwesomeIconProps {
    theme?: 'primary' | 'info' | 'success' | 'danger' | 'warning';
    className?: string;
    toggle?: boolean;
    // spin?: boolean;
}

const Icon:FC<IconProps> = (props)=>{
    const { theme, className, icon, toggle, ...rest } = props
    const classes = classnames('ele-icon', className, {
        [`${theme}`]: theme,
        'fa-rotate-180': toggle
    })
    return (<FontAwesomeIcon className={classes} icon={icon} {...rest} />)
}

export default Icon
