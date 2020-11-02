import React, { Component } from 'react'

export default class ErrorBoundary extends Component {
    constructor(props){
        super(props)
        this.state = {hasError: false, err: ''}
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        this.setState({err: error.message})
        console.log(error, errorInfo, JSON.stringify(errorInfo));
    }

    render() {
        if (this.state.hasError){
        return <><h1>Something went wrong!</h1><p>{this.state.err}</p></>
        }
        return this.props.children
    }
}
