import React from 'react';
import {fireEvent, render} from '@testing-library/react'
import Button, {ButtonProps, ButtonSizes, ButtonTypes} from '../components/Button'


describe('Button component', ()=>{
    it('default Button', ()=>{
        const props: ButtonProps = {
            onClick: jest.fn()
        }
        const wrapper = render(<Button {...props}>submit</Button>)
        const element = wrapper.getByText('submit') as HTMLButtonElement

        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual('BUTTON')
        expect(element.disabled).toBeFalsy()
        expect(element).toHaveClass('btn btn-default')
        fireEvent.click(element)
        expect(props.onClick).toHaveBeenCalled()
    })

    it('primary button', ()=>{
        const props: ButtonProps = {
            btnType: 'primary',
            size: 'lg',
            className: 'cls',
            onClick: jest.fn()
        }
        const wrapper = render(<Button {...props}>submit</Button>)
        const element = wrapper.getByText('submit') as HTMLButtonElement
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual('BUTTON')
        expect(element.disabled).toBeFalsy()
        expect(element).toHaveClass('btn btn-primary btn-lg cls')
        fireEvent.click(element)
        expect(props.onClick).toHaveBeenCalled()
    })

    it('link button', ()=>{
        const props: ButtonProps = {
            btnType: 'link',
            size: 'lg',
            href: 'www.baidu.com',
            className: 'cls',
            onClick: jest.fn()
        }
        const wrapper = render(<Button {...props}>submit</Button>)
        const element = wrapper.getByText('submit') as HTMLAnchorElement
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual('A')
        expect(element).toHaveClass('btn btn-link btn-lg cls')
        expect(element).toHaveAttribute('href', props.href)
        fireEvent.click(element)
        expect(props.onClick).toHaveBeenCalled()
    })
    it('disabled primary button', ()=>{
        const props: ButtonProps = {
            btnType: 'primary',
            size: 'lg',
            disabled: true,
            className: 'cls',
            onClick: jest.fn()
        }
        const wrapper = render(<Button {...props}>submit</Button>)
        const element = wrapper.getByText('submit') as HTMLButtonElement

        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual('BUTTON')
        expect(element).toHaveAttribute('disabled')
        expect(element).toHaveClass('btn btn-primary btn-lg cls')
        fireEvent.click(element)
        expect(props.onClick).not.toHaveBeenCalled()
    })

    it('disabled link button', ()=>{
        const props: ButtonProps = {
            btnType: 'link',
            size: 'lg',
            disabled: true,
            className: 'cls',
            href: 'www.baidu.com',
            onClick: jest.fn()
        }
        const wrapper = render(<Button {...props}>submit</Button>)
        const element = wrapper.getByText('submit') as HTMLAnchorElement

        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual('A')
        expect(element).toHaveClass('btn btn-link btn-lg cls disabled')
        expect(element).toHaveAttribute('href', props.href)
    })
})
