import React, {MouseEvent} from 'react'
import {render, fireEvent, waitFor} from '@testing-library/react'
import axios from 'axios'

import Upload, {UploadFile, UploadProps} from "../components/Upload";
import UploadList from "../components/Upload/UploadList";
import {IconProp} from '@fortawesome/fontawesome-svg-core'

jest.mock('../components/Icon', ()=>{
    return (props:any) => {
        const _icon = props.icon as IconProp
        // const _onClick = props.onClick as (e: MouseEvent<HTMLSpanElement>)=>void
        return <span>{_icon}</span>
    }
})
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const prop: UploadProps = {
    action: 'https://jsonplaceholder.typicode.com/posts',
    defaultFiles: [{
        uid: 'bbb',
        name: 'bbb',
        size: 20,
        status: 'success',
        percent: 20
    }],
    beforeUpload: jest.fn(),
    onChange: jest.fn(),
    onSuccess: jest.fn(),
    onRemove: jest.fn()
}

const file = new File(['content'], 'img.png', {type: 'image/png'})

describe('Upload component', () => {
    test('default props', async () => {
        const {container, getByText} = render(
            <Upload {...prop}>
                <button type='button'>submit</button>
            </Upload>
        )
        mockedAxios.post.mockResolvedValue({'data': 'cool'})
        const uploadFile = expect.objectContaining({
            raw: file,
            status: 'success',
            name: 'img.png'
        })

        const btn = getByText('submit')
        expect(btn).toBeInTheDocument()
        const input = container.querySelector('input') as HTMLInputElement
        expect(input).not.toBeVisible()
        fireEvent.change(input, {target: {files: [file]}})
        await waitFor(()=>{
            expect(getByText('img.png')).toBeInTheDocument()
        })
        expect(getByText('spinner')).toBeInTheDocument()
        expect(getByText('check-circle')).toBeInTheDocument()
        expect(prop.beforeUpload).toBeCalledWith(uploadFile)
        expect(prop.onChange).toBeCalledWith(uploadFile)
        expect(prop.onSuccess).toBeCalledWith(uploadFile)

        fireEvent.click(getByText('trash-alt'))
        expect(getByText('img.png')).not.toBeInTheDocument()
        expect(prop.onRemove).toBeCalledWith(uploadFile)

    })
})
