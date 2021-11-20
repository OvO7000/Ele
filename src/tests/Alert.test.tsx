import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import Alert, { AlertProps } from '../components/Alert'

describe('Alert component', ()=>{
    it('Alert without desc', async ()=>{
        const  props: AlertProps = {
            type: 'default',
            title: 'title',
            closable: true,
            className: 'cls'
        }
        const { getByText, queryByText, container} = render(<Alert {...props}/>)
        const title = getByText('title')
        const icon = container.querySelector('.alert-close-icon') as HTMLElement
        const desc = queryByText('desc')
        const con = container.querySelector('.alert')

        expect(title).toBeInTheDocument()
        expect(desc).not.toBeInTheDocument()
        expect(icon).toBeInTheDocument()

        expect(con).toHaveClass('alert alert-default cls')
        fireEvent.click(icon)
        await waitFor(() => {
            expect(con).not.toBeInTheDocument()

        })
    })
    it('Alert with desc', async ()=>{
        const  props: AlertProps = {
            type: 'default',
            title: 'title',
            desc: 'desc',
            closable: true,
            className: 'cls'
        }
        const { getByText, queryByText, container} = render(<Alert {...props}/>)
        const title = getByText('title')
        const icon = container.querySelector('.alert-close-icon') as HTMLElement
        const desc = getByText('desc')
        const con = container.querySelector('.alert')

        expect(title).toBeInTheDocument()
        expect(title).toHaveClass('alert-title-bold')
        expect(desc).toBeInTheDocument()
        expect(icon).toBeInTheDocument()

        expect(con).toHaveClass('alert alert-default cls')
        fireEvent.click(icon)
        await waitFor(() => {
            expect(con).not.toBeInTheDocument()
        })
    })
})
