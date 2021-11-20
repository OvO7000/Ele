import React from 'react'
import {render, fireEvent, cleanup, RenderResult, act} from '@testing-library/react'
import Menu, {Props as MenuProps} from '../components/Menu/Menu';
import MenuItem, {Props as MenuItemProps} from '../components/Menu/MenuItem';
import SubMenu, {Props as SubMenuProps} from '../components/Menu/SubMenu';

const props: MenuProps = {
    className: 'cls',
    onSelect: jest.fn()
}

const getMenu = (props: MenuProps)=>{
    return (
        <Menu {...props}>
            <MenuItem>active</MenuItem>
            <MenuItem disabled>disabled</MenuItem>
            <MenuItem>third menu item</MenuItem>
            <SubMenu title='submenu'>
                <MenuItem>subMenuItem</MenuItem>
            </SubMenu>
            <SubMenu title='opened'>
                <MenuItem>opened submenu</MenuItem>
            </SubMenu>
        </Menu>
    )
}
const getCSS = ()=>{
    const css = `
            .menu-subMenu-content {
                display: none
            }
            .menu-subMenu-content.show {
                display: block
            }
        `
    const style = document.createElement('style')
    style.innerHTML = css
    return style
}

let wrapper: RenderResult,
    menu: HTMLElement,
    menuItem_disabled: HTMLElement,
    menuItem_active: HTMLElement,
    menuItem_third: HTMLElement

describe('Menu component in Horizontal mode', ()=>{
    beforeEach(()=>{
        wrapper = render(getMenu(props))
        wrapper.container.appendChild(getCSS())
        jest.useFakeTimers()
        menu = wrapper.container.querySelector('.menu') as HTMLElement
        menuItem_disabled = wrapper.getByText('disabled')
        menuItem_active = wrapper.getByText('active')
        menuItem_third = wrapper.getByText('third menu item')
    })
    it('default props', () => {
        expect(menu).toBeInTheDocument()
        expect(menu).toHaveClass('menu cls menu-horizontal')
        expect(menuItem_active).toHaveClass('menu-item active')
        expect(menuItem_disabled).toHaveClass('menu-item disabled')
    })
    it('click event', () => {
        fireEvent.click(menuItem_disabled)
        expect(props.onSelect).not.toBeCalledWith('1')
        expect(menuItem_disabled).toHaveClass('menu-item disabled')
        expect(menuItem_active).toHaveClass('menu-item active')

        fireEvent.click(menuItem_third)
        expect(props.onSelect).toBeCalledWith('2')
        expect(menuItem_third).toHaveClass('menu-item active')
    })
    it('submenu', () => {
        const submenu = wrapper.getByText('submenu')

        expect(wrapper.queryByText('subMenuItem')).not.toBeInTheDocument()
        // hover 后，submenu 显示
        fireEvent.mouseEnter(submenu)
        act(()=>{
            jest.runAllTimers()
        })

        expect(wrapper.queryByText('subMenuItem')).toBeInTheDocument()
        // 点击 submenu 的 menuitem
        const menuItem = wrapper.queryByText('subMenuItem')
        menuItem && fireEvent.click(menuItem)
        expect(props.onSelect).toBeCalledWith('3-0')
        // 移开鼠标
        fireEvent.mouseLeave(submenu)
        act(()=>{
            jest.runAllTimers()
        })
        expect(menuItem).not.toBeVisible()
    });
})

describe('Menu component in vertical mode', () => {
    const verticalProps: MenuProps = {
        mode: 'vertical',
        className: 'cls',
        openSubmenu: ['4'],
        onSelect: jest.fn()
    }
    beforeEach(()=>{
        wrapper = render(getMenu(verticalProps))
        wrapper.container.appendChild(getCSS())
        jest.useFakeTimers()
        menu = wrapper.container.querySelector('.menu') as HTMLElement
    })
    it('should render vertical with vertical prop', () => {
        expect(menu).toBeInTheDocument()
        expect(menu).toHaveClass('menu menu-vertical')
    })
    it('should show dropdown with submenu be clicked', () => {
        const submenu = wrapper.getByText('submenu')

        expect(wrapper.queryByText('subMenuItem')).not.toBeInTheDocument()
        // 点击后，submenu 显示
        fireEvent.click(submenu)
        act(()=>{
            jest.runAllTimers()
        })
        expect(wrapper.queryByText('subMenuItem')).toBeInTheDocument()
        // 点击 submenu 的 menuitem
        const menuItem = wrapper.queryByText('subMenuItem')
        menuItem && fireEvent.click(menuItem)
        expect(verticalProps.onSelect).toBeCalledWith('3-0')
        // 移开鼠标
        fireEvent.click(submenu)
        act(()=>{
            jest.runAllTimers()
        })
        expect(menuItem).not.toBeVisible()
    })
    it('should auto open submenu, with openSubmenu prop', () => {

        const menuItem = wrapper.getByText('opened')
        expect(menuItem).toBeInTheDocument()
        expect(menuItem).toBeVisible()
    })
})
