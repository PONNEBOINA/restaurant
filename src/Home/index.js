import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'

import DishItems from '../DishItems'
import Header from '../Header'

const Home = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [response, setResponse] = useState([])
  const [activeCategoryId, setactiveCategoryId] = useState('')
  const [cartItems, setCartItems] = useState([])

  const addItemTOCart = dish => {
    const isAlreadythere = cartItems.find(item => item.dishId === dish.dishId)
    if (!isAlreadythere) {
      const newDish = {...dish, quantity: 1}
      setCartItems(prev => [...prev, newDish])
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.dishId === dish.dishId
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        ),
      )
    }
  }

  const removeItemFromCart = dish => {
    const isAlreadythere = cartItems.find(item => item.dishId === dish.dishId)
    if (isAlreadythere) {
      setCartItems(prev =>
        prev
          .map(item =>
            item.dish === dish.dishId
              ? {
                  ...item,
                  quantity: item.quantity - 1,
                }
              : item,
          )
          .filter(item => item.quantity > 0),
      )
    }
  }

  const getupdatedData = tableMenuList =>
    tableMenuList.map(eachMenu => ({
      menuCategory: eachMenu.menu_category,
      menuCategoryId: eachMenu.menu_category_id,
      menuCategoryImage: eachMenu.menu_category_image,
      categoryDishes: eachMenu.category_dishes.map(eachDish => ({
        dishId: eachDish.dish_id,
        dishName: eachDish.dish_name,
        dishPrice: eachDish.dish_price,
        dishImage: eachDish.dish_image,
        dishCurrency: eachDish.dish_currency,
        dishCalories: eachDish.dish_calories,
        dishDescription: eachDish.dish_description,
        dishAvailability: eachDish.dish_Availability,
        addonCat: eachDish.addonCat,
      })),
    }))

  const fetchRestaurantApi = async () => {
    const api =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const responses = await fetch(api)
    const data = await responses.json()
    const updated = getupdatedData(data[0].table_menu_list)
    setResponse(updated)
    setactiveCategoryId(updated[0].menuCategoryId)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchRestaurantApi()
  }, [])

  const updateCategoryId = menuCategoryId => setactiveCategoryId(menuCategoryId)

  const renderTabMenuList = () =>
    response.map(eachCategory => {
      const clickHandler = () => {
        updateCategoryId(eachCategory.menuCategoryId)
      }
      return (
        <li
          key={eachCategory.menuCategoryId === activeCategoryId}
          onClick={clickHandler}
        >
          <button type='button'> {eachCategory.menuCategory} </button>
        </li>
      )
    })

  const renderDishes = () => {
    const {categoryDishes} = response.find(
      eachCategory => eachCategory.menuCategoryId === activeCategoryId,
    )
    return (
      <ul>
        {categoryDishes.map(eachdish => (
          <DishItems
            key={eachdish.dishId}
            dishdetails={eachdish}
            cartItems={cartItems}
            addItemTOCart={addItemTOCart}
            removeItemFromCart={removeItemFromCart}
          />
        ))}
      </ul>
    )
  }

  const renderSpinner = () => (
    <div>
      <Loader />
    </div>
  )

  return isLoading ? (
    renderSpinner()
  ) : (
    <>
      <Header cartItems={cartItems} />
      <ul>{renderTabMenuList()}</ul>
      {renderDishes()}
    </>
  )
}

export default Home
