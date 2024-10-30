import {useContext} from 'react'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'

import CartContext from '../../context/CartContext'

const Header = props => {
  const {cartList, restaurantName} = useContext(CartContext)

  const logout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  const renderCartIcons = () => (
    <div>
      <Link to="/cart">
        <button type="button" data-testid="cart">
          btn
        </button>
      </Link>
      <div>
        <p>{cartList.length}</p>
      </div>
    </div>
  )
  return (
    <div>
      <Link to="/">
        <p>{restaurantName}</p>
      </Link>
      <div>
        <p>My Orders</p>
        <button type="button" onClick={logout}>
          Logout
        </button>
        {renderCartIcons()}
      </div>
    </div>
  )
}
export default withRouter(Header)
