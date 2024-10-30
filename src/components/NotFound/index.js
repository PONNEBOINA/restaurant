import {Link} from 'react-router-dom'

const NotFound = () => (
  <div>
    <img
      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
      alt="not found"
    />
    <Link to="/">
      <p>Go Back Home</p>
    </Link>
  </div>
)
export default NotFound
