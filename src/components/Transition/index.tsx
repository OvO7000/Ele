import React, {FC} from 'react';
import {CSSTransition} from "react-transition-group";
import {CSSTransitionProps} from 'react-transition-group/CSSTransition'

interface Props {
    animation?: string,
    wrapper?: boolean
}
type TransitionProps = Props & CSSTransitionProps

const Transition: FC<TransitionProps> = (props) => {
    const {
        children,
        classNames,
        timeout=300,
        animation,
        wrapper,
        ...rest
    } = props
    return (
        <CSSTransition
            in={props.in}
            timeout={timeout}
            classNames={classNames?classNames:animation}
            appear
            unmountOnExit
            {...rest}
        >
            {wrapper?(<div>{children}</div>):children}
        </CSSTransition>
    )
}

export default Transition
