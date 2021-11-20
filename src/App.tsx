import React, {useState} from 'react';
import Select, {SelectProps} from './components/Select';
import Option from './components/Select/Option';


function App() {
    return (
        <div className="App">
            <Select
                multiple
                placeholder='place'
                onChange={(a)=>{console.log(a)}}
            >
                <Option value='222' />
                <Option value='222333'/>
                <Option value='222333444' />
            </Select>
        </div>
    );
}

export default App;

