import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {username: '', password: '', showError: false, errorMsg: ''}

  onSuccessLogin = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onFailureView = error => {
    this.setState({errorMsg: error, showError: true})
  }

  onSubmitLogin = async e => {
    e.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const api = 'https://apis.ccbp.in/login'
    const option = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(api, option)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccessLogin(data.jwt_token)
    } else {
      this.onFailureView(data.error_msg)
    }
  }

  onChangePass = e => {
    this.setState({password: e.target.value})
  }

  onChangeUser = e => {
    this.setState({username: e.target.value})
  }

  render() {
    const {username, password, showError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div>
        <form onSubmit={this.onSubmitLogin}>
          <h1>Login</h1>
          <label htmlFor="username">USERNAME</label>
          <input
            type="text"
            onChange={this.onChangeUser}
            id="username"
            value={username}
          />
          <label htmlFor="password">PASSWORD</label>
          <input
            type="password"
            onChange={this.onChangePass}
            id="password"
            value={password}
          />
          <button type="submit">Login</button>

          {showError && <p>{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
