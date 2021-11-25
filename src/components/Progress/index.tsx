import React, {FC} from 'react';
import classnames from "classnames";

export interface ProgressProps {
    percent?: number;
    height?: number;
    style?: React.CSSProperties,
    showPercent?: boolean;
    theme?: 'danger' | 'primary' | 'warning' | 'info' | 'success'
}

const Progress: FC<ProgressProps> = (props) => {
    const {percent = 0, height = 16, style, showPercent = true, theme = 'primary'} = props
    const classes = classnames('ele-progress', {
        [`ele-progress-${theme}`]: true
    })
    return (
        <div className={classes} style={{...style, height: `${height}px`}}>
            <div className='ele-progress-inner' style={{width: `${percent}%`, height: `${height}px` }}>
                {showPercent && <span>{`${percent}%`}</span>}
            </div>
        </div>
    )
}
export default Progress
