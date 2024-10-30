import {Redirect, Switch, Route} from 'react-router-dom'
import {useState} from 'react'

import Home from './components/Home'
import Login from './components/Login'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

const App = () => {
  const [cartList, setCartList] = useState([])
  const [restaurantName, setRestaurantName] = useState('')

  const addCartItem = dish => {
    const present = cartList.find(item => item.dish === dish.dishId)
    if (!present) {
      setCartList(prev => [...prev, dish])
    } else {
      setCartList(prev =>
        prev.map(item =>
          item.dishId === dish.dishId
            ? {...item, quantity: item.quantity + dish.quantity}
            : item,
        ),
      )
    }
  }
  const removeCartItem = dishId => {
    setCartList(prevState => prevState.filter(item => item.dishId !== dishId))
  }

  const removeAllItems = () => setCartList([])

  const increaseQuantity = dishId => {
    setCartList(prevState =>
      prevState.map(item =>
        item.dishId === dishId ? {...item, quantity: item.quantity + 1} : item,
      ),
    )
  }
  const decreaseQuantity = dishId => {
    setCartList(prevState =>
      prevState
        .map(item =>
          item.dishId === dishId
            ? {...item, quantity: item.quantity - 1}
            : item,
        )
        .filter(item => item.quantity > 0),
    )
  }
  return (
    <CartContext.Provider
      value={{
        cartList,
        addCartItem,
        removeCartItem,
        removeAllItems,
        increaseQuantity,
        decreaseQuantity,
        restaurantName,
        setRestaurantName,
      }}
    >
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/cart" component={Cart} />
        <Route exact path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    </CartContext.Provider>
  )
}
export default App
