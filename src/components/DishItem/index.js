import {useState, useContext} from 'react'

import CartContext from '../../context/CartContext'

const DishItem = ({dishdetails}) => {
  const {
    dishName,
    dishPrice,
    dishCurrency,
    dishDescription,
    dishImage,
    dishCalories,
    addonCat,
    dishAvailability,
  } = dishdetails

  const [quantity, setQuantity] = useState(0)
  const {addCartItem} = useContext(CartContext)

  const onIncreaseQuantity = () => setQuantity(prevState => prevState + 1)

  const onDecreaseQuantity = () =>
    setQuantity(prevState => (prevState > 0 ? prevState - 1 : 0))

  const onAddItemCart = () => addCartItem({...dishdetails, quantity})

  const renderControllerBtn = () => (
    <div>
      <button onClick={onDecreaseQuantity} type="button">
        -
      </button>
      <p>{quantity}</p>
      <button type="button" onClick={onIncreaseQuantity}>
        +
      </button>
    </div>
  )
  return (
    <li>
      <div>
        <h1>{dishName}</h1>
        <p>
          {dishCurrency} {dishPrice}
        </p>
        <p>{dishDescription}</p>
        {dishAvailability && renderControllerBtn()}
        {!dishAvailability && <p>Not available</p>}
        {addonCat.length !== 0 && <p>Customizations available</p>}
        {quantity > 0 && (
          <button type="button" onClick={onAddItemCart}>
            ADD TO CART
          </button>
        )}
      </div>
      <p>{dishCalories} calories</p>
      <img src={dishImage} alt={dishName} />
    </li>
  )
}
export default DishItem
