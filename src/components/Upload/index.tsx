import React, {ChangeEvent, FC, useRef, useState} from 'react';
import axios from 'axios';
import classnames from 'classnames'
import Button from "../Button";
import UploadList from "./UploadList";
import Dragger from "./Dragger";

export interface UploadProps {
    action: string;
    defaultFiles?: UploadFile[];
    onChange?: (file: UploadFile) => void;
    beforeUpload?: (file: UploadFile) => boolean | Promise<File>;
    onProgress?: (progress: number, file: UploadFile) => void;
    onSuccess?: (file: UploadFile) => void;
    onError?: (err: Error, file: UploadFile) => void;
    onRemove?: (file: UploadFile) => void;
    data?: { [propName: string]: any };
    headers?: { [propName: string]: any };
    withCredentials?: boolean;
    name?: string;
    multiple?: boolean;
    accept?: string;
    drag?: boolean;
}

export interface UploadFile {
    uid: string;
    name: string;
    size: number;
    status: 'ready' | 'uploading' | 'error' | 'success'
    percent: number;
    error?: any;
    response?: any;
    raw?: File;
}

const Upload: FC<UploadProps> = (props) => {
    const {
        action,
        headers,
        name = 'file',
        data = {},
        withCredentials = false,
        multiple = false,
        accept,
        defaultFiles,
        onChange,
        onSuccess,
        onError,
        onProgress,
        beforeUpload,
        onRemove,
        drag = false,
        children
    } = props
    const inputRef = useRef<HTMLInputElement>(null)
    const [fileList, setFileList] = useState<UploadFile[]>(defaultFiles || [])
    const classes = classnames('ele-upload')

    const updateFile = (file: UploadFile, payload: Partial<UploadFile>) => {
        setFileList(prevList => {
            return prevList.map(prevFile => {
                if (prevFile.uid === file.uid) {
                    return {...prevFile, ...payload}
                } else {
                    return prevFile
                }
            })
        })
    }
    const handleButtonClick = () => {
        inputRef.current && inputRef.current.click()
    }
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files) return
        upload(files)
        inputRef.current && (inputRef.current.value = '')
    }
    const upload = (files: FileList) => {

        const _files = Array.from(files)
        _files.forEach((file, index) => {
            const _file: UploadFile = {
                uid: new Date() + 'uploadFile' + index,
                size: file.size,
                name: file.name,
                status: 'ready',
                percent: 0,
                raw: file
            }

            if (beforeUpload) {
                const res = beforeUpload(_file)
                if (res && res instanceof Promise) {
                    res.then(file => {
                        uploadFile(_file)
                    })
                } else if (res) {
                    uploadFile(_file)
                }
            } else {
                uploadFile(_file)
            }
        })
    }
    const uploadFile = (file: UploadFile) => {
        setFileList(prevFileList => {
            return [file, ...prevFileList]
        })

        const formData = new FormData()
        file.raw && formData.append(name, file.raw)
        for (let key in data) {
            formData.append(key, data[key])
        }
        axios.post(action, formData, {
            headers: {
                ...headers,
                'Content-Type': 'multipart/form-data'
            },
            withCredentials,
            onUploadProgress: (progress) => {
                const _progress = Math.round(progress.loaded / progress.total * 100)
                updateFile(file, {percent: _progress, status: 'uploading'})
                onProgress && onProgress(_progress, file)
            }
        }).then(function (response) {
            console.log('success')
            onSuccess && onSuccess(file)
            updateFile(file, {status: 'success', response})
            onChange && onChange(file)
        }).catch(function (error) {
            console.log('error')
            onError && onError(error, file)
            updateFile(file, {status: 'error', error})
            onChange && onChange(file)
        });
    }
    const handleItemRemove = (file: UploadFile) => {
        setFileList(prevList => {
            return prevList.filter(_file => {
                return _file.uid !== file.uid
            })
        })
        onRemove && onRemove(file)
    }
    return (
        <div className={classes}>
            <div onClick={handleButtonClick}>
                {
                    drag ? (<Dragger onFile={files => {
                        upload(files)
                    }}>{children}</Dragger>) : children
                }
            </div>
            <input
                type='file'
                ref={inputRef}
                onChange={handleFileChange}
                multiple={multiple}
                accept={accept}
                hidden
            />
            <UploadList fileList={fileList} onRemove={handleItemRemove}/>
        </div>
    )
}
export default Upload
