import React from 'react'
import {render, RenderResult, fireEvent, waitFor, cleanup, act} from '@testing-library/react'
import AutoComplete, {AutoCompleteProps, DataType} from "../components/AutoComplete";
import {config} from "react-transition-group";

config.disabled = true

const list:T[] = [
    {value: 'aa', desc: '0'},
    {value: 'aaa', desc: '1'},
    {value: 'b', desc: '2'},
]
type T = {
    value: string,
    desc?: string
}
const basicProps:AutoCompleteProps = {
    fetchSuggestions: (value)=>{
        return list.filter((item) => item.value.includes(value))
    },
    onSelect: jest.fn(),
    placeholder: 'inputNode'
}
const asyncProps:AutoCompleteProps = {
    fetchSuggestions: (value)=>{
        return new Promise((resolve)=>{
            setTimeout(()=>{
                resolve(list.filter((item) => item.value.includes(value)))
            }, 1000)
        })
    },
    onSelect: jest.fn(),
    placeholder: 'inputNode'
}
const renderOptionProps:AutoCompleteProps = {
    fetchSuggestions: (value)=>{
        return list.filter((item) => item.value.includes(value))
    },
    onSelect: jest.fn(),
    placeholder: 'inputNode',
    renderOption: (item:T)=>{
        return (<div>{item.value + item.desc}</div>)
    }
}

let wrapper:RenderResult
let inputNode: HTMLInputElement
describe('autoComplete component', () => {

    beforeEach(() => {
        wrapper = render(<AutoComplete {...basicProps} />)
        inputNode = wrapper.getByPlaceholderText('inputNode') as HTMLInputElement
    })
    test('default props',async () => {
        fireEvent.change(inputNode, {target: {value: 'a'}})
        await waitFor(() => {
            expect(wrapper.getByText('aa')).toBeInTheDocument()
        })

        const nodes = wrapper.container.querySelectorAll('.ele-autoComplete-item')
        expect(nodes.length).toEqual(2)

        const node2 = wrapper.getByText('aaa')
        fireEvent.click(node2)
        expect(node2).not.toBeInTheDocument()
        expect(inputNode.value).toEqual('aaa')
    })

    test('keyboard events',async () => {
        fireEvent.change(inputNode, {target: {value: 'a'}})
        await waitFor(() => {
            expect(wrapper.getByText('aa')).toBeInTheDocument()
        })
        const node1 = wrapper.queryByText('aa')
        const node2 = wrapper.queryByText('aaa')
        // 方向键 下
        fireEvent.keyUp(inputNode, {keyCode: 40})
        expect(node1).toHaveClass('active')
        fireEvent.keyUp(inputNode, {keyCode: 40})
        expect(node2).toHaveClass('active')
        // 方向键 上
        fireEvent.keyUp(inputNode, {keyCode: 38})
        expect(node1).toHaveClass('active')
        // enter
        fireEvent.keyUp(inputNode, {keyCode: 13})
        expect(inputNode.value).toEqual('aa')
        expect(basicProps.onSelect).toBeCalledWith({value: 'aa', desc: '0'})
        await waitFor(() => {

            expect(wrapper.queryByText('aa')).not.toBeInTheDocument()
        })
    })
    test('click outside',async () => {
        fireEvent.change(inputNode, {target: {value: 'a'}})
        await waitFor(() => {
            expect(wrapper.getByText('aa')).toBeInTheDocument()
        })

        fireEvent.click(document)
        await waitFor(() => {
            expect(wrapper.queryByText('aa')).not.toBeInTheDocument()
        })
    })
    test('render option',async () => {
        cleanup()
        wrapper = render(<AutoComplete {...renderOptionProps} />)
        inputNode = wrapper.getByPlaceholderText('inputNode') as HTMLInputElement
        fireEvent.change(inputNode, {target: {value: 'a'}})
        await waitFor(() => {
            expect(wrapper.queryByText('aa0')).toBeInTheDocument()
        })
    })
    test('async fetch suggestion',async () => {
        cleanup()
        wrapper = render(<AutoComplete {...asyncProps} />)
        jest.useFakeTimers()
        inputNode = wrapper.getByPlaceholderText('inputNode') as HTMLInputElement

        fireEvent.change(inputNode, {target: {value: 'a'}})
        act(()=>{
            jest.runAllTimers()
        })
        await waitFor(() => {
            expect(wrapper.getByText('aa')).toBeInTheDocument()
        })
    })

})
