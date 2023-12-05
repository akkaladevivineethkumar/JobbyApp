import './index.css'

const NotFound = () => (
  <div className="bg-color">
    <img
      alt="not found"
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
    />
    <h1 className="notFound-heading">Page Not Found</h1>
    <p className="notFound-para">
      We are sorry, the page you requested could not be found
    </p>
  </div>
)
export default NotFound
