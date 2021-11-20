import React from 'react'
import { fireEvent, render, RenderResult } from '@testing-library/react'
import Input, {InputProps} from '../components/Input'

const defaultProp: InputProps = {
    placeholder: 'default input',
    onChange: jest.fn()
}
const lgInputProp: InputProps = {
    value: 'large input',
    placeholder: 'large input',
    onChange: jest.fn(),
    size: 'lg',
}
const smInputProp: InputProps = {
    value: 'small input',
    placeholder: 'small input',
    onChange: jest.fn(),
    size: 'sm',
}

const withAddonProp: InputProps = {
    value: 'withAddon input',
    placeholder: 'withAddon input',
    onChange: jest.fn(),
    prepend: 'prepend',
    append: 'append',
    icon: 'times',
}

const disabledProp: InputProps = {
    placeholder: 'disabled input',
    onChange: jest.fn(),
    disabled: true
}


let wrapper: RenderResult
describe('Input component', () => {
    beforeEach(() => {
        wrapper = render(
            <div>
                <Input {...defaultProp} />
                <Input {...lgInputProp} />
                <Input {...smInputProp} />
                <Input {...withAddonProp} />
                <Input {...disabledProp} />
            </div>
        )
    })
    it('change input value', function () {
        const { getByPlaceholderText} = wrapper
        const input = getByPlaceholderText('default input') as HTMLInputElement
        fireEvent.change(input, {target: {value: '23'}})
        expect(defaultProp.onChange).toBeCalled()
        expect(input.value).toEqual('23')
    });
    it('Input with prepend,append,icon', function () {
        const { getByText, getByPlaceholderText, container} = wrapper
        const prepend = getByText('prepend')
        const append = getByText('append')
        const icon = container.getElementsByClassName('ele-input-icon')[0]
        expect(prepend).toBeInTheDocument()
        expect(append).toBeInTheDocument()
        expect(icon).toBeInTheDocument()
    });
    it('Input with different size', function () {
        const { getByPlaceholderText} = wrapper
        const defaultInput = getByPlaceholderText('default input')
        const lgInput = getByPlaceholderText('large input')
        const smInput = getByPlaceholderText('small input')
        expect(defaultInput).toHaveClass('ele-input-md')
        expect(lgInput).toHaveClass('ele-input-lg')
        expect(smInput).toHaveClass('ele-input-sm')

    });
    it('disabled Input', function () {
        const { getByPlaceholderText} = wrapper
        const input = getByPlaceholderText('disabled input') as HTMLInputElement
        expect(input).toHaveClass('ele-input-disabled')
        expect(input).toHaveAttribute('disabled')
    });
})
