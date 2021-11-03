import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import Alert, { AlertProps } from '../components/Alert'

describe('Alert component', ()=>{
    it('Alert without desc', ()=>{
        const  props: AlertProps = {
            type: 'default',
            title: 'title',
            closable: true,
            className: 'cls'
        }
        const { getByText, queryByText, container} = render(<Alert {...props}/>)
        const title = getByText('title')
        const icon = getByText('×')
        const desc = queryByText('desc')
        const con = container.querySelector('.alert')

        expect(title).toBeInTheDocument()
        expect(desc).not.toBeInTheDocument()
        expect(icon).toBeInTheDocument()

        expect(con).toHaveClass('alert alert-default cls')
        fireEvent.click(icon)
        expect(con).toHaveClass('alert alert-default cls alert-hide')
    })
    it('Alert with desc', ()=>{
        const  props: AlertProps = {
            type: 'default',
            title: 'title',
            desc: 'desc',
            closable: true,
            className: 'cls'
        }
        const { getByText, queryByText, container} = render(<Alert {...props}/>)
        const title = getByText('title')
        const icon = getByText('×')
        const desc = getByText('desc')
        const con = container.querySelector('.alert')

        expect(title).toBeInTheDocument()
        expect(title).toHaveClass('alert-title-bold')
        expect(desc).toBeInTheDocument()
        expect(icon).toBeInTheDocument()

        expect(con).toHaveClass('alert alert-default cls')
        fireEvent.click(icon)
        expect(con).toHaveClass('alert alert-default cls alert-hide')
    })
})
