import { useState } from "react";
import { Icon } from "@iconify/react";
import "../styles/pricereport.css";

export default function DailyPriceReports({ rawData, title }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState("recent"); // Default sort by recently added
  const [sortOrder, setSortOrder] = useState("asc"); // Sort order for other keys
  const itemsPerPage = 5;

  // Convert file sizes (e.g., "1.61MB") to numbers for sorting
  const parseFileSize = (size) => parseFloat(size.replace("MB", ""));

  // Sort reports based on the selected key and order
  const sortedReports = [...rawData].sort((a, b) => {
    if (sortKey === "name") {
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortKey === "size") {
      return sortOrder === "asc"
        ? parseFileSize(a.size) - parseFileSize(b.size)
        : parseFileSize(b.size) - parseFileSize(a.size);
    } else if (sortKey === "recent") {
      return rawData.indexOf(a) - rawData.indexOf(b); // Default order by index
    }
    return 0;
  });

  // Filter reports by search term
  const filteredReports = sortedReports.filter((report) =>
    report.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const currentItems = filteredReports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle sorting changes
  const handleSortChange = (key) => {
    if (key === "recent") {
      setSortKey("recent");
    } else if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc"); // Toggle sort order
    } else {
      setSortKey(key);
      setSortOrder("asc"); // Default to ascending order
    }
  };

  return (
    <div className="table-container">
      <h2>{title}</h2>
      <div
        onClick={() => handleSortChange("recent")}
        className={sortKey === "recent" ? "sortable active" : "sortable"}
      >
        Recently Added
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search here..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <table className="reports-table">
        <thead>
          <tr>
            <th
              onClick={() => handleSortChange("name")}
              className={sortKey === "name" ? "sortable active" : "sortable"}
            >
              Resources
              {sortKey === "name" && (
                <Icon
                  icon={sortOrder === "asc" ? "mdi:arrow-up" : "mdi:arrow-down"}
                  className="sort-icon"
                />
              )}
            </th>
            <th
              onClick={() => handleSortChange("size")}
              className={sortKey === "size" ? "sortable active" : "sortable"}
            >
              Size
              {sortKey === "size" && (
                <Icon
                  icon={sortOrder === "asc" ? "mdi:arrow-up" : "mdi:arrow-down"}
                  className="sort-icon"
                />
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((report, index) => (
            <tr key={index}>
              <td className="report-resource">
                <Icon icon="bxs:file" className="file-icon" />
                {report.name}
              </td>
              <td>{report.size}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <span>
          Showing {currentPage * itemsPerPage - (itemsPerPage - 1)} to{" "}
          {Math.min(currentPage * itemsPerPage, filteredReports.length)} of{" "}
          {filteredReports.length} entries
        </span>
        <div>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="pagination-button"
          >
            Previous
          </button>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="pagination-button"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
