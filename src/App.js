import React, {Component} from 'react'
import Snake from './components/Snake'
import Food from './components/Food'

const getRandomCoordinates = () => {
  let min = 1
  let max = 98
  let x = Math.floor((Math.random() * (max - min + 1) + min) /2) * 2
  let y = Math.floor((Math.random() * (max - min + 1) + min) /2) * 2
  return [x, y]
}

const initialState = {
  food: getRandomCoordinates(),
  speed: 200,    
  direction: 'RIGHT',
  snakeBlocks: [
    [0, 0],
    [2, 0]
  ]
}

class App extends Component {

  state = initialState

  componentDidMount() {
    setInterval(this.moveSnake, this.state.speed)
    document.onkeydown = this.onKeyDown
  }

  componentDidUpdate() {
    this.checkIfOutOfBorders()
    this.checkIfCollapsed()
    this.checkIfEat()
  }

  onKeyDown = (e) => {
    e = e || window.event
    switch(e.keyCode) {
      case 38:
        this.setState({direction: 'UP'})
        break
      case 40:
        this.setState({direction: 'DOWN'})
        break
      case 37:
        this.setState({direction: 'LEFT'})
        break
      case 39:
        this.setState({direction: 'RIGHT'})
        break
    }
  }

  moveSnake = () => {
    let blocks = [...this.state.snakeBlocks]
    let head = blocks[blocks.length - 1]

    switch(this.state.direction) {
      case 'RIGHT':
        head = [head[0] + 2, head[1]]
        break
      case 'LEFT':
        head = [head[0] - 2, head[1]]
        break
      case 'DOWN':
        head = [head[0], head[1] + 2]
        break
      case 'UP':
        head = [head[0], head[1] - 2]
        break
    }
    blocks.push(head)
    blocks.shift()
    this.setState({
      snakeBlocks: blocks
    })
  }

  checkIfOutOfBorders() {
    let head = this.state.snakeBlocks[this.state.snakeBlocks.length - 1]
    if(head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.onGameOver()
    }
  }

  checkIfCollapsed() {
    let snake = [...this.state.snakeBlocks]
    let head =  snake[snake.length - 1]
    snake.pop()
    snake.forEach(block => {
      if(head[0] === block[0] && head[1] === block[1]) {
        this.onGameOver()
      }
    })
  }

  checkIfEat() {
    let head = this.state.snakeBlocks[this.state.snakeBlocks.length - 1]
    let food = this.state.food
    if(head[0] === food[0] && head[1] === food[1]) {
      this.setState({
        food: getRandomCoordinates()
      })
      this.enlargeSnake()
      this.increaseSpeed()
    }
  }

  enlargeSnake() {
    let newSnake = [...this.state.snakeBlocks]
    newSnake.unshift([])
    this.setState({
      snakeBlocks: newSnake
    })
  }

  increaseSpeed() {
    if(this.state.speed > 10) {
      this.setState({
        speed: this.state.speed + 10
      })
    }
  }

  onGameOver() {
    alert(`Game is over. Snake lenght is ${this.state.snakeBlocks.length}`)
    this.setState(initialState)
  }

  render() {
    return(
      <div className="field" style={{top: 0, left: 0}}>
        <Snake snakeBlocks={this.state.snakeBlocks} />
        <Food block={this.state.food} />
      </div>
    )
  }
}

export default App;