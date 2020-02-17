import React, {Component} from 'react'

class Snake extends Component {
    render() {
        return(
            <div>
                {this.props.snakeBlocks.map((block, i) => {
                    const style = {
                        left: `${block[0]}%`,
                        top: `${block[1]}%`
                    }
                    return(
                        <div className="snake-block" key={i} style={style}></div>
                    )
                })}
            </div>
        )
    }
}

export default Snake