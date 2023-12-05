import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Redirect} from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'
import JobItems from '../JobItems'
import Header from '../Header'
import ProfileSection from '../ProfileSection'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobData: [],
    isCheckedValue: '',
    currSearchValue: '',
    currSalaryRange: '',
  }

  componentDidMount() {
    this.getJobsData()
  }

  getJobsData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {isCheckedValue, currSearchValue, currSalaryRange} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${isCheckedValue}&search=${currSearchValue}&minimum_package=${currSalaryRange}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const fetchData = fetchedData.jobs.map(items => ({
        companyLogoUrl: items.company_logo_url,
        employmentType: items.employment_type,
        id: items.id,
        jobDescription: items.job_description,
        location: items.location,
        packagePerAnnum: items.package_per_annum,
        rating: items.rating,
        title: items.title,
      }))
      this.setState({jobData: fetchData, apiStatus: apiStatusConstants.success})
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="all-jobs-loader-container">
      <Loader type="ThreeDots" color="#ffffff" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="job-section-failure-view">
      <img
        className="job-section-failure-image"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="job-section-failure-error">Oops! Something Went Wrong</h1>
      <p className="job-section-failure-message">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="job-section-failure-retry-btn"
        onClick={this.onRetryButton}
      >
        Retry
      </button>
    </div>
  )

  checkboxEle = event => {
    const {value} = event.target
    this.setState({isCheckedValue: value}, this.getJobsData)
  }

  filterEmploymentTypesData = () => {
    const {isCheckedValue} = this.state
    return (
      <div>
        <ul>
          {employmentTypesList.map(items => (
            <li key={items.id} className="filter-list-item">
              <input
                value={items.employmentTypeId}
                type="checkbox"
                checked={items.employmentTypeId === isCheckedValue}
                id={items.employmentTypeId}
                onChange={this.checkboxEle}
              />
              <label
                className="filter-input-label"
                htmlFor={items.employmentTypeId}
              >
                {items.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  selectSalaryRange = event => {
    const {value} = event.target
    this.setState({currSalaryRange: value}, this.getJobsData)
  }

  renderSalaryRange = () => {
    const {jobData} = this.state
    return (
      <div>
        <h1 className="filters-heading">Salary Range</h1>
        <ul className="filters-lists-container">
          {salaryRangesList.map(eachItem => (
            <li key={eachItem.id} className="filter-list-item">
              <input
                id={eachItem.salaryRangeId}
                type="radio"
                checked={jobData.salaryRangeId === eachItem.salaryRangeId}
                value={eachItem.salaryRangeId}
                onChange={this.selectSalaryRange}
              />
              <label
                className="filter-input-label"
                htmlFor={eachItem.salaryRangeId}
              >
                {eachItem.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderSuccessView = () => {
    const {jobData, currSearchValue} = this.state
    return (
      <div className="jobs-bg-color">
        <div>
          <div className="search-container">
            <button
              className="searchBtn"
              type="button"
              data-testid="searchButton"
            >
              <input
                onChange={this.searchValue}
                value={currSearchValue}
                placeholder="Search"
                className="search-input"
                type="search"
              />
            </button>
            <BsSearch className="searchIcon" />
          </div>
          <ul className="ul">
            {jobData.map(items => (
              <JobItems eachItems={items} keys={items.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  searchValue = event => {
    this.setState({currSearchValue: event.target.value}, this.getJobsData)
  }

  renderAllData = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (!jwtToken) {
      return <Redirect to="/login" />
    }
    return (
      <>
        <Header />
        <div className="jobs-bg-color">
          <div className="profile-filter-container">
            <ProfileSection />
            <hr className="horizontal-line" />
            <h1 className="filter-heading1">Type of Employment</h1>
            {this.filterEmploymentTypesData()}
            <hr className="horizontal-line" />
            <h1 className="filter-heading1">Salary Range</h1>
            {this.renderSalaryRange()}
          </div>
          {this.renderAllData()}
        </div>
      </>
    )
  }
}
export default Jobs
