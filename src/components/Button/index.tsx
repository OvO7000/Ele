import React, {FC, ReactNode, AnchorHTMLAttributes, ButtonHTMLAttributes} from 'react';
import classnames from 'classnames'

export enum ButtonTypes {
    Primary = 'primary',
    Default = 'default',
    Danger = 'danger',
    Link = 'link',
}

export enum ButtonSizes {
    Large = 'lg',
    Small = 'sm',
    Middle = 'md',
}

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
    const { size, btnType, disabled, children, href, className, ...restProps } = props
    const classes = classnames('btn', className, {
        [`btn-${size}`]: size,
        [`btn-${btnType}`]: btnType,
        [`disabled`]: (props.btnType === ButtonTypes.Link) && disabled,
    })

    if (btnType === ButtonTypes.Link && href) {
        return (<a className={classes} href={href} {...restProps}>{children}</a>)
    } else {
        return (
            <button className={classes} disabled={disabled} {...restProps}>
                {children}
            </button>
        )
    }
}

Button.defaultProps = {
    btnType: ButtonTypes.Default,
    size: ButtonSizes.Middle,
    disabled: false,
}

export default Button
