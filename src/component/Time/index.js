import React, { memo, useEffect, useState } from 'react'

export default function TimeFxn (props) {
    const date = props.date
    const [time, setTime] = useState('')
    const timeFxn = () => {
        const givenTime = new Date(date).getTime() / 1000
        const diff = (Date.now() / 1000) - givenTime
        if(diff < 60){
            setTime('0m ago')
        }else{
            let min = Math.floor(diff / 60)
            if(min < 60){
                setTime(`${min}m ago`)
            }else{
                let hr = Math.floor(min / 60)
                if(hr < 24){
                    setTime(`${hr}h ago`)
                }else{
                    if(hr < 48){
                        setTime('1d ago')
                    }else{
                        setTime(date.toString())
                    }
                }
            }
        }
    }
    useEffect(() => {
        const clear = setInterval(() => {
            timeFxn()
        }, 1000);
        return () => {
            clearInterval(clear)
        }
    },)
    return <span>{time}</span>
}

export const Time = memo(TimeFxn)
