import {FaShoppingCart} from 'react-icons/fa'

const Header = ({cartItems}) => {
  const getcartItems = () =>
    cartItems.reduce((acc, item) => acc + item.quantity, 0)

  // const getcartItems = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  const renderCartIcon = () => (
    <div>
      <FaShoppingCart />
      <p>{getcartItems()}</p>
    </div>
  )
  return (
    <div>
      <h1>UNI Resto Cafe</h1>
      <p>My Orders</p>
      {renderCartIcon()}
    </div>
  )
}
export default Header
