import {useState, useEffect, RefObject} from 'react'

export const useDebounce = (value: any ,time: number=300)=>{
    const [debouncedValue, setValue] = useState(value)
    useEffect(() => {
        let timer = setTimeout(() => {
            setValue(value)
        }, time)
        return ()=>{
            clearTimeout(timer)
        }
    }, [value, time])
    return debouncedValue
}

export const useClickOutside = (ref: RefObject<HTMLDivElement>, cb: Function) => {
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (!ref.current || ref.current.contains(e.target as HTMLElement)) return
            cb()
        }
        document.addEventListener('click', handler)
        return () => {
            document.removeEventListener('click', handler)
        }
    }, [ref, cb])
}
