// Write your code here
import {Component} from 'react'

import './index.css'

const initial = {running: false, hours: 25, seconds: 0}

class DigitalTimer extends Component {
  state = initial

  componentWillUnmount() {
    this.clearIntervalId()
  }

  clearIntervalId = () => {
    clearInterval(this.IntervalId)
  }

  convertingIntoSeconds = () => {
    const {hours, seconds} = this.state
    const checking = hours * 60 === seconds
    if (checking) {
      this.clearIntervalId()
      this.setState({running: false})
    } else {
      this.setState(prevState => ({seconds: prevState.seconds + 1}))
    }
  }

  changePlayOrPause = () => {
    const {running, hours, seconds} = this.state
    const checking = hours * 60 === seconds
    if (checking) {
      this.setState({seconds: 0})
    }
    if (running) {
      this.clearIntervalId()
    } else {
      this.IntervalId = setInterval(this.convertingIntoSeconds, 1000)
    }
    this.setState(prevState => ({running: !prevState.running}))
  }

  getTiming = () => {
    const {hours, seconds} = this.state
    const checking = hours * 60 - seconds
    const minutes = Math.floor(checking / 60)
    const second = Math.floor(checking % 60)
    const passMin = minutes > 9 ? minutes : `0${minutes}`
    const passSec = seconds > 9 ? second : `0${seconds}`
    return `${passMin}:${passSec}`
  }

  increment = () => {
    this.setState(prevState => ({hours: prevState.hours + 1}))
  }

  decrement = () => {
    const {hours} = this.state
    if (hours > 1) {
      this.setState(prevState => ({hours: prevState.hours - 1}))
    }
  }

  resetting = () => {
    this.setState(initial)
  }

  render() {
    const {running, hours, seconds} = this.state
    const confirming = seconds > 0

    return (
      <div>
        <div className="text-align">
          <h1>Digital Timer</h1>
        </div>
        <div className="main-container">
          <div className="first-main">
            <div className="first">
              <h1 className="coloring">{this.getTiming()}</h1>
              <h1 className="bolding">{running ? 'paused' : 'running'}</h1>
            </div>
          </div>
          <div className="second">
            <div className="rowing">
              <div className="rowing">
                <img
                  alt={running ? 'pause icon' : 'play icon'}
                  src={
                    running
                      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
                  }
                  className="image"
                />
                <button
                  type="button"
                  onClick={this.changePlayOrPause}
                  className="remove"
                >
                  {running ? 'Pause' : 'Start'}
                </button>
              </div>
              <div className="rowing">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png "
                  alt="reset icon"
                  className="image"
                />
                <button
                  className="remove"
                  type="button"
                  onClick={this.resetting}
                >
                  Restart
                </button>
              </div>
            </div>
            <h1 className="centering">Set Timer Limit</h1>
            <div className="rowing">
              <button
                type="button"
                onClick={this.decrement}
                className="but"
                disabled={confirming}
              >
                -
              </button>
              <h1 type="button" className="handling">
                {hours}
              </h1>
              <button
                type="button"
                onClick={this.increment}
                className="but"
                disabled={confirming}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
