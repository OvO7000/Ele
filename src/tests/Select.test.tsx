import React from "react";
import {render, fireEvent, waitFor} from '@testing-library/react'
import {config} from 'react-transition-group'

import Select, {SelectProps} from "../components/Select";
import Option from "../components/Select/Option";

config.disabled = true

const props: SelectProps = {
    onChange: jest.fn(),
    onVisibleChange: jest.fn(),
    placeholder: 'placeholder'
}
const props2: SelectProps = {
    onChange: jest.fn(),
    onVisibleChange: jest.fn(),
    placeholder: 'placeholder',
    multiple: true
}

const getWrapper = (isMultiple: boolean = false) => {
    const _props = isMultiple?props2:props
    return render(
        <Select {..._props}>
            <Option value='option1'/>
            <Option value='option2' disabled/>
            <Option value='option3'/>
        </Select>
    )
}

describe('select componet', () => {

    test('default select', async () => {
        const {queryByText, getByPlaceholderText, getByText} = getWrapper()
        const input = getByPlaceholderText('placeholder') as HTMLInputElement

        fireEvent.click(input)
        await waitFor(() => {
            expect(getByText('option1')).toBeInTheDocument()
        })
        const option1 = getByText('option1')
        const option2 = getByText('option2')
        expect(props.onVisibleChange).toBeCalledWith([], true)

        fireEvent.click(option2)
        expect(props.onChange).not.toBeCalled()

        fireEvent.click(option1)
        await waitFor(() => {
            expect(queryByText('option1')).not.toBeInTheDocument()
        })
        expect(input.value).toEqual('option1')
        expect(props.onVisibleChange).toBeCalledWith([{value: 'option1', index: 0}], false)
        expect(props.onChange).toBeCalledWith([{value: 'option1', index: 0}])
    })

    test('multiple select', () => {
        const {container, queryByText, getByPlaceholderText, getByText} = getWrapper(true)
        const input = getByPlaceholderText('placeholder') as HTMLInputElement
        // 点击 input 显示下拉框
        fireEvent.click(input)
        expect(getByText('option1')).toBeInTheDocument()
        // 点击 option1
        fireEvent.click(getByText('option1'))
        expect(props2.onChange).lastCalledWith([{value: 'option1', index: 0}])

        let tags = container.querySelectorAll('.ele-select-selectedItem')
        expect(tags.length).toEqual(1)
        // 点击 option3
        const option3 = getByText('option3')
        fireEvent.click(option3)
        expect(props2.onChange).lastCalledWith([{value: 'option1', index: 0}, {value: 'option3', index: 2}])

        tags = container.querySelectorAll('.ele-select-selectedItem')
        expect(tags.length).toEqual(2)

        // 再次点击 option3
        fireEvent.click(option3)
        expect(props2.onChange).lastCalledWith([{value: 'option1', index: 0}])

        tags = container.querySelectorAll('.ele-select-selectedItem')
        expect(tags.length).toEqual(1)

        // 点击tag的icon
        const icon = container.querySelectorAll('.ele-select-selectedItemIcon')
        expect(icon.length).toEqual(1)
        fireEvent.click(icon[0])
        expect(props2.onChange).lastCalledWith([])
        tags = container.querySelectorAll('.ele-select-selectedItem')
        expect(tags.length).toEqual(0)

    })
})





