import { useDispatch } from "react-redux";
import { setRegionFilter, setSortBy } from "../features/countrySlice";

function Filters() {
  const dispatch = useDispatch();
  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  return (
    <div className="filters">
      <select
        onChange={(e) => dispatch(setRegionFilter(e.target.value || null))}
        className="filter-select"
      >
        <option value="">All Regions</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>

      <select
        onChange={(e) => dispatch(setSortBy(e.target.value || null))}
        className="filter-select"
      >
        <option value="">No Sorting</option>
        <option value="population">Sort by Population</option>
        <option value="name">Sort by Name</option>
      </select>
    </div>
  );
}

export default Filters;
