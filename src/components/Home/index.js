import {Link, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <>
      <Header />
      <div className="home-bg-color">
        <div>
          <h1 className="h1">Find The Job That Fits Your Life</h1>
          <p className="p1">Millions of people are searching for jobs</p>
          <div>
            <Link to="/jobs">
              <button className="find-jobs-btn logout-btn" type="button">
                Find Jobs
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
export default Home
