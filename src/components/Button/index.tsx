import React, {FC, ReactNode, AnchorHTMLAttributes, ButtonHTMLAttributes} from 'react';
import classnames from 'classnames'

export type ButtonTypes = 'primary' | 'default' | 'danger' | 'link'
export type ButtonSizes = 'lg' | 'sm' | 'md'

interface BaseButtonProps {
    size?: ButtonSizes;
    btnType?: ButtonTypes;
    disabled?: boolean;
    className?: string;
    children?: ReactNode;
    href?: string;
}

type NativeButtonProps = ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<BaseButtonProps & NativeButtonProps & AnchorButtonProps>

const Button: FC<ButtonProps> = (props)=>{
    const { size='md', btnType='default', disabled=false, children, href, className, ...restProps } = props
    const classes = classnames('btn', className, {
        [`btn-${size}`]: size,
        [`btn-${btnType}`]: btnType,
        [`disabled`]: (props.btnType === 'link') && disabled,
    })

    if (btnType === 'link' && href) {
        return (<a className={classes} href={href} {...restProps}>{children}</a>)
    } else {
        return (
            <button className={classes} disabled={disabled} {...restProps}>
                {children}
            </button>
        )
    }
}

export default Button
