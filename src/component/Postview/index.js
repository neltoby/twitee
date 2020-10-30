import React from 'react'
import { useGlobalStore } from '../Provider'
import EachPost from '../Eachpost'

export default function index() {
    const {state, dispatch} = useGlobalStore()

    return (
        <div>
            {
                state.Post.map((item, i) => <EachPost item={item} key={i} />)
            }
        </div>
    )
}
