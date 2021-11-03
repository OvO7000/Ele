import React from 'react'
import {render, fireEvent, RenderResult} from '@testing-library/react'
import Tabs, {Props as TabsProps} from '../components/Tab/Tabs'
import TabItem, {Props as TabItemProps} from '../components/Tab/TabItem'

const props:TabsProps = {
    defaultIndex: 0,
    className: 'cls',
    onSelect: jest.fn()
}
const getTabs = (props:TabsProps)=>{
    return (
        <Tabs {...props}>
            <TabItem label='tab1'>tabItem1</TabItem>
            <TabItem label='tab2'>tabItem2</TabItem>
            <TabItem label='tab3' disabled>tabItem3</TabItem>
        </Tabs>
    )
}

let wrapper: RenderResult,
    tab1: HTMLElement,
    tab2: HTMLElement,
    tab3: HTMLElement

describe('tabs components', () => {
    beforeEach(() => {
        wrapper = render(getTabs(props))
        const {getByText} = wrapper
        tab1 = getByText('tab1')
        tab2 = getByText('tab2')
        tab3 = getByText('tab3')
    })
    it('default props', () => {
        const {getByText} = wrapper
        const tabItem1 = getByText('tabItem1')

        expect(tabItem1).toBeInTheDocument()
        expect(tab1).toHaveClass('active')
        expect(tab3).toHaveClass('disabled')
    })
    it('click event', () => {
        const {getByText, queryByText} = wrapper
        fireEvent.click(tab3)
        expect(tab3).not.toHaveClass('active')
        const tabItem3 = queryByText('tabItem3')
        expect(tabItem3).not.toBeInTheDocument()

        fireEvent.click(tab2)
        expect(tab2).toHaveClass('active')
        expect(tab1).not.toHaveClass('active')
        const tabItem1 = queryByText('tabItem1')
        const tabItem2 = queryByText('tabItem2')
        expect(tabItem1).not.toBeInTheDocument()
        expect(tabItem2).toBeInTheDocument()

    })
})
