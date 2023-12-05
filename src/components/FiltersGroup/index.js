import './index.css'

const FiltersGroup = props => {
  const {
    selectSalaryRange,
    salaryRange,
    employmentTypes,
    employmentTypesList,
    salaryRangesList,
    selectemploymentType,
    locationList,
    isActive,
  } = props

  const renderTypeOfEmployment = () => (
    <div className="filter-groups-container">
      <h1 className="filters-heading">Type of Employment</h1>
      <ul className="filters-lists-container">
        {employmentTypesList.map(eachItem => (
          <li key={eachItem.employmentTypeId} className="filter-list-item">
            <input
              id={eachItem.employmentTypeId}
              type="checkbox"
              value={eachItem.employmentTypeId}
              checked={employmentTypes.includes(eachItem.employmentTypeId)}
              onChange={selectemploymentType}
            />
            <label
              className="filter-input-label"
              htmlFor={eachItem.employmentTypeId}
            >
              {eachItem.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  const renderSalaryRange = () => (
    <div className="filter-groups-container">
      <h1 className="filters-heading">Salary Range</h1>
      <ul className="filters-lists-container">
        {salaryRangesList.map(eachItem => (
          <li key={eachItem.salaryRangeId} className="filter-list-item">
            <input
              id={eachItem.salaryRangeId}
              type="radio"
              checked={salaryRange === eachItem.salaryRangeId}
              value={eachItem.salaryRangeId}
              onChange={selectSalaryRange}
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

  const renderSalaryLocation = () => (
    <div className="filter-groups-container">
      <h1 className="filters-heading">Location</h1>
      <ul className="filters-lists-container">
        {locationList.map(items => (
          <li key={items.locationId}>
            <input
              id={items.locationId}
              type="checkbox"
              onChange={isActive}
              value={items.label}
            />
            <label className="filter-input-label" htmlFor={items.locationId}>
              {items.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <div className="filters-group">
      {renderTypeOfEmployment()}
      <hr className="horizontal-line" />
      {renderSalaryRange()}
      <hr className="horizontal-line" />
      {renderSalaryLocation()}
    </div>
  )
}

export default FiltersGroup
