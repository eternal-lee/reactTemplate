import { Component } from 'react'
import notFoundIcon from './../../assets/notFoundIcon/notFoundIcon.png'

class ErrorPage extends Component {
  render() {
    return (
      <div>
        <img
          alt=""
          src={notFoundIcon}
          style={{ maxWidth: '100%', display: 'block', margin: '50% auto 0' }}
        />
      </div>
    )
  }
}

export default ErrorPage
