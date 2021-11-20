import React, {FC, ReactElement, useState, useEffect, useRef, KeyboardEvent, InputHTMLAttributes} from 'react';
import classnames from 'classnames';
import Input, {InputProps} from '../Input'
import Icon from '../Icon'
import Transition from '../Transition'
import {useDebounce, useClickOutside} from "../../hooks";


export type DataType = {
    value: string
}

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggestions: (value: string) => DataType[] | Promise<DataType[]>;
    onSelect?: (item: DataType) => void;
    renderOption?: (item: DataType) => ReactElement;
}


const AutoComplete: FC<AutoCompleteProps> = (props) => {
    const {fetchSuggestions, onSelect, renderOption, ...rest} = props
    const [suggestions, setSuggestions] = useState<DataType[]>([])
    const [value, setValue] = useState<string>('')
    const [loading, setLoading] = useState(false)
    const [focusIndex, setFocusIndex] = useState(-1)
    const debouncedValue = useDebounce(value)
    const isChange = useRef(true)
    const ref = useRef<HTMLDivElement>(null)
    useClickOutside(ref, (e: MouseEvent) => {
        setSuggestions([])
        setLoading(false)
    })
    useEffect(() => {
        if (debouncedValue && isChange.current) {
            const fetchResult = fetchSuggestions(debouncedValue)
            if (fetchResult instanceof Promise) {
                setLoading(true)
                fetchResult.then(res => {
                    setLoading(false)
                    setSuggestions(res)
                })
            } else {
                setSuggestions(fetchResult)
            }
        }

    }, [debouncedValue])
    const handleChange = (value: string) => {
        setValue(value)
        setSuggestions([])
        isChange.current = true
    }
    const handleClick = (suggestion: DataType) => {
        setValue(suggestion.value)
        setSuggestions([])
        onSelect && onSelect(suggestion)
        isChange.current = false
    }
    const handleDirection = (index: number) => {
        let i = index
        if (i < 0) i = 0
        else if (i > suggestions.length - 1) i = suggestions.length - 1
        setFocusIndex(i)
    }
    const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
        switch (e.key) {
            case 'ArrowUp':
                handleDirection(focusIndex - 1)
                break
            case 'ArrowDown':
                handleDirection(focusIndex + 1)
                break
            case 'Enter':
                handleClick(suggestions[focusIndex])
                setFocusIndex(-1)
                break
            case 'Escape':
                setFocusIndex(-1)
                setSuggestions([])
                break
            default:
                break
        }

    }
    const getSuggestions = () => {
        return (
            <>
                {
                    suggestions.map((suggestion, index) => {
                        const classes = classnames('ele-autoComplete-item', {
                            'active': focusIndex === index
                        })
                        return (
                            <li
                                className={classes}
                                onClick={() => {
                                    handleClick(suggestion)
                                }}
                                key={index}>
                                {
                                    renderOption ? renderOption(suggestion) : suggestion.value
                                }
                            </li>
                        )
                    })
                }
            </>
        )
    }

    return (
        <div ref={ref} className='ele-autoComplete'>
            <Input value={value}
                   onKeyUp={handleKeyUp}
                   onChange={(e) => {
                       handleChange(e.currentTarget.value)
                   }}
                   {...rest}
            />
            <Transition
                in={loading}
                animation='zoom-right'
                timeout={1000}
            >
                <ul className='ele-autoComplete-list'>
                    <li className='ele-autoComplete-item ele-autoComplete-spinner'><Icon icon='spinner' spin/></li>
                </ul>
            </Transition>
            <Transition
                in={suggestions.length > 0}
                animation='zoom-right'
                timeout={1000}
            >
                <ul className='ele-autoComplete-list'>
                    {getSuggestions()}
                </ul>
            </Transition>

        </div>
    )
}
export default AutoComplete
