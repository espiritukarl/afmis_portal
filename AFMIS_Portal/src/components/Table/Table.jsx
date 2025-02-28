import { useState } from "react";
import { Icon } from "@iconify/react";
import "./table.css";

// Change rawData to whatever data you want to fill the table: rawData is an object {name: string, size: string}
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

  // Can do this via pagination (set up via backend)
  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const currentItems = filteredReports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle sorting changes
  const handleSortChange = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc"); // Toggle sort order
    } else {
      setSortKey(key);
      setSortOrder("desc"); // Default to ascending order
    }
  };

  return (
    <div className="table-container roboto-regular">
      <div className="table-info-container">
        <h2 className="roboto-bold">{title}</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search here..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="search-input roboto-thin"
          />
        </div>
      </div>

      <table className="table-data">
        <thead>
          <tr className="roboto-bold">
            <th
              onClick={() => handleSortChange("name")}
              className={sortKey === "name" ? "sortable active" : "sortable "}
            >
              <span>Resources</span>
              {sortKey === "name" && (
                <Icon
                  icon={sortOrder === "asc" ? "mdi:arrow-up" : "mdi:arrow-down"}
                  className="sort-icon"
                  width={15}
                />
              )}
            </th>
            <th
              onClick={() => handleSortChange("size")}
              className={sortKey === "size" ? "sortable active" : "sortable "}
            >
              <span>Size</span>
              {sortKey === "size" && (
                <Icon
                  icon={sortOrder === "asc" ? "mdi:arrow-up" : "mdi:arrow-down"}
                  className="sort-icon"
                  width={15}
                />
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length ? (
            currentItems.map((report, index) => (
              <tr key={index}>
                <td className="table-resource">
                  <Icon
                    icon="bxs:file"
                    className="file-icon"
                    width={32}
                    color="#4d6180"
                  />
                  {report.name}
                </td>
                <td className="table-size">{report.size}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="roboto-light-italic">No data found</td>
              <td></td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="pagination">
        <span>
          Showing{" "}
          {currentItems.length
            ? currentPage * itemsPerPage - (itemsPerPage - 1)
            : 0}{" "}
          to {Math.min(currentPage * itemsPerPage, filteredReports.length)} of{" "}
          {filteredReports.length} entries
        </span>
        <div>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1 || currentItems.length === 0}
            className="pagination-button roboto-bold"
          >
            <Icon icon={"icon-park-outline:left"} width={20} />
            Previous
          </button>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages || currentItems.length === 0}
            className="pagination-button roboto-bold"
          >
            Next
            <Icon icon={"icon-park-outline:right"} width={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
