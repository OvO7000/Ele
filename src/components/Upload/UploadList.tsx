import React, {FC} from 'react';
import {UploadFile} from './index'
import Icon from '../Icon'
import Progress from "../Progress";

export interface UploadListProps {
    fileList: UploadFile[],
    onRemove: (file: UploadFile) => void
}

const UploadList: FC<UploadListProps> = (props) => {
    const {fileList, onRemove} = props
    return (
        <ul className='ele-uploadList'>
            {
                fileList.map(file => {
                    return (
                        <li className='ele-uploadList-item' key={file.uid}>
                            <div>
                                <Icon icon='file-alt'/>
                                <span className='ele-uploadList-item-name'>{file.name}</span>
                                {file.status === 'success' && <Icon icon='check-circle' theme='success'/>}
                                {file.status === 'error' && <Icon icon='times-circle' theme='danger'/>}
                                {file.status === 'uploading' && <Icon icon='spinner' spin/>}
                                <Icon icon='trash-alt' className='ele-uploadList-item-trashIcon' onClick={() => {
                                    onRemove(file)
                                }}/>
                            </div>
                            { file.status === 'uploading' && <Progress percent={file.percent} /> }
                        </li>
                    )
                })
            }
        </ul>
    )
}
export default UploadList
