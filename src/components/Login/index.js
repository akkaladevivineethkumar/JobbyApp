import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = msg => {
    this.setState({showSubmitError: msg})
  }

  formClick = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {username, password, showSubmitError} = this.state
    return (
      <div className="bg-color">
        <form onSubmit={this.formClick} className="login-card input-containers">
          <img
            className="logo-img"
            alt="website logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
          />
          <label className="input-label" htmlFor="username">
            USERNAME
          </label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            className="username-input-field"
            value={username}
            onChange={this.onChangeUsername}
          />
          <label className="input-label" htmlFor="password">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            className="username-input-field"
            value={password}
            placeholder="Password"
            onChange={this.onChangePassword}
          />
          <button className="login-btn" type="submit">
            Login
          </button>
          <p className="error-msg">{showSubmitError}</p>
        </form>
      </div>
    )
  }
}
export default Login
