import React, {useState} from 'react';
import Upload from './components/Upload';
import {UploadFile} from "./components/Upload";

function App() {
    const defaultFiles:UploadFile[] = [
        {
            uid: 'aaa',
            name: 'aaa',
            size: 20,
            status: 'uploading',
            percent: 20
        },
        {
            uid: 'bbb',
            name: 'bbb',
            size: 20,
            status: 'success',
            percent: 20
        },
        {
            uid: 'ccc',
            name: 'cccccccccccccccccccccccccccccc',
            size: 20,
            status: 'error',
            percent: 20
        }
    ]
    return (
        <div className="App">
            <Upload
                action='https://jsonplaceholder.typicode.com/posts'
                defaultFiles={defaultFiles}
                drag
            >
                <div style={{width: '300px', height: '300px', border: '1px solid #000'}}>aaa</div>
            </Upload>
        </div>
    );
}

export default App;

