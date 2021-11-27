import React, {FC, useState, createContext, useRef, MouseEvent} from 'react';
import classnames from 'classnames'
import {OptionProps} from './Option'
import Input from '../Input'
import Icon from '../Icon'
import Transition from "../Transition";
import {useClickOutside} from "../../hooks";


export interface SelectProps {
    multiple?: boolean;
    disabled?: boolean;
    onVisibleChange?: (selected: IOption[], isShow: boolean) => void;
    onChange?: (selected: IOption[]) => void;
    placeholder?: string;
    className?: string[];
}

interface ContextProps {
    selectedItems?: IOption[];
    handleOptionClick?: (option: IOption) => void
}

interface IOption {
    index: number;
    value: string;
}


export const Context = createContext<ContextProps>({})

const Select: FC<SelectProps> = (props) => {
    const {multiple = false, disabled = false, onVisibleChange, onChange, placeholder = '', children, className} = props
    const [selectedItems, setSelectedItems] = useState<IOption[]>([])
    const [showOptions, setShowOptions] = useState<boolean>(false)
    const ref=useRef(null)
    const classes = classnames('ele-select', className, {
        showOptions: showOptions
    })
    useClickOutside(ref, () => {setShowOptions(false)})
    const handleInputClick = (e: MouseEvent) => {
        onVisibleChange && onVisibleChange(selectedItems, !showOptions)
        setShowOptions(!showOptions)
    }
    const handleOptionClick = (item: IOption) => {
        if (multiple) {
            const index = selectedItems.findIndex(option=>item.index === option.index)
            if (index === -1) {
                const list = [...selectedItems, item]
                setSelectedItems(list)
                onChange && onChange(list)
            } else {
                const _selectedItems = JSON.parse(JSON.stringify(selectedItems))
                _selectedItems.splice(index, 1)
                setSelectedItems(_selectedItems)
                    onChange && onChange([..._selectedItems])
            }
        } else {
            setSelectedItems([item])
            setShowOptions(false)
            onVisibleChange && onVisibleChange([item], false)
            onChange && onChange([item])
        }

    }
    const filteredChildren = React.Children.map(children, (child, index) => {
        const childElement = child as React.FunctionComponentElement<OptionProps>
        const displayName = childElement.type.displayName
        if (displayName === 'Option') {
            return React.cloneElement(childElement, {index: index})
        } else {
            console.error("Warning: select component's children exist which is not a Option component")
        }
    })
    const getInput = () => {
        if (multiple) {
            return (
                <>
                    <Input
                        placeholder={selectedItems.length>0?'':placeholder}
                        disabled={disabled}
                        readOnly
                        icon="angle-up"
                        toggle={showOptions}
                        onClick={handleInputClick}
                    />
                    <div className='ele-select-selectedItems'>
                        {
                            selectedItems.map((item, index) => (
                                <div
                                    key={index}
                                    className='ele-select-selectedItem'
                                >{item.value}<Icon icon='times' className='ele-select-selectedItemIcon' onClick={()=>{handleOptionClick(item)}}/></div>
                            ))
                        }
                    </div>
                </>
            )
        } else {
            const value = selectedItems[0]?selectedItems[0].value: ''
            return (
                <Input
                    placeholder={placeholder}
                    disabled={disabled}
                    value={value}
                    icon='angle-up'
                    toggle={showOptions}
                    readOnly
                    onClick={handleInputClick}
                />
            )
        }
    }

    const contextValue: ContextProps = {
        selectedItems,
        handleOptionClick
    }
    return (
        <div className={classes} ref={ref}>
            <Context.Provider value={contextValue}>
                {getInput()}
                <Transition
                    in={showOptions}
                    animation='zoom-top'
                    timeout={300}
                >
                    <div className='ele-select-options'>
                        {filteredChildren}
                    </div>
                </Transition>

            </Context.Provider>
        </div>
    )
}
export default Select
