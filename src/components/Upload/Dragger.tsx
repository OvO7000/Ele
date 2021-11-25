import React, {FC, useState, DragEvent} from 'react';

export interface DraggerProps {
    onFile: (files: FileList) => void;
    dragOverClass?: string;
}


const Dragger: FC<DraggerProps> = (props) => {
    const {onFile, dragOverClass='dragOver', children} = props
    const [isOver, setIsOver] = useState(false)
    const handleDrag = (e:DragEvent<HTMLElement>, over: boolean) => {
        e.preventDefault()
        setIsOver(over)
    }
    const handleDrop = (e: DragEvent<HTMLElement>) => {
        e.preventDefault()
        setIsOver(false)
        onFile && onFile(e.dataTransfer.files)
    }
    return (
        <div
            className={isOver ? dragOverClass : ''}
            onDragOver={(e)=>{handleDrag(e, true)}}
            onDragLeave={(e)=>{handleDrag(e, false)}}
            onDrop={handleDrop}
        >
            {children}
        </div>
    )
}
export default Dragger
