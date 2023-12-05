import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import './index.css'

const JobItems = props => {
  const {eachItems} = props
  const {
    companyLogoUrl,
    packagePerAnnum,
    rating,
    location,
    employmentType,
    title,
    id,
    jobDescription,
  } = eachItems
  return (
    <>
      <li className="jobItems-bgColor">
        <Link to={`/jobs/${id}`} className="link-item">
          <div className="container-part1">
            <img
              className="job-logo-img"
              alt="company logo"
              src={companyLogoUrl}
            />
            <div className="container-1">
              <h1 className="job-heading1">{title}</h1>
              <div className="ratings-container">
                <AiFillStar className="starIcon" />
                <p className="job-para1">{rating}</p>
              </div>
            </div>
          </div>
          <div className="container-main-part2">
            <div className="container-part2">
              <div className="location-container">
                <MdLocationOn className="location-icon" />
                <p>{location}</p>
              </div>
              <div className="work-container">
                <BsBriefcaseFill className="work-icon" />
                <p>{employmentType}</p>
              </div>
            </div>
            <p className="p2">{packagePerAnnum}</p>
          </div>
          <hr width="100%" />
          <h1 className="job-item-description-heading">Description</h1>
          <p className="p3">{jobDescription}</p>
        </Link>
      </li>
    </>
  )
}
export default JobItems
