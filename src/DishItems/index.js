const DishItems = ({
  dishdetails,
  cartItems,
  addItemTOCart,
  removeItemFromCart,
}) => {
  const {
    dishId,
    dishName,
    dishPrice,
    dishCurrency,
    dishDescription,
    dishImage,
    dishCalories,
    addonCat,
    dishAvailability,
  } = dishdetails

  const onIncreaseQuantity = () => addItemTOCart(dishdetails)
  const onDecreaseQuantity = () => removeItemFromCart(dishdetails)

  const getQuantity = () => {
    const cartItem = cartItems.find(item => item.dishId === dishId)
    return cartItem ? cartItems.quantity : 0
  }

  const renderControllerBtn = () => (
    <div>
      <button onClick={onDecreaseQuantity} type="button">
        -
      </button>
      <p>{getQuantity()}</p>
      <button type="button" onClick={onIncreaseQuantity}>
        +
      </button>
    </div>
  )
  return (
    <li>
      <h1>{dishName}</h1>
      <p>
        {dishCurrency} {dishPrice}
      </p>
      <p>{dishDescription}</p>
      {dishAvailability && renderControllerBtn()}
      {!dishAvailability && <p>Not available</p>}
      {addonCat.length !== 0 && <p>Customizations available</p>}
      <p>{dishCalories} calories</p>
      <img src={dishImage} alt={dishName} />
    </li>
  )
}
export default DishItems
