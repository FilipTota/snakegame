import React, {Component} from 'react'

class Food extends Component {
    render() {
        const style = {
            left: `${this.props.block[0]}%`,
            top: `${this.props.block[1]}%`
        }
        return(
            <div className="food" style={style}></div>
        )
    }
}

export default Food