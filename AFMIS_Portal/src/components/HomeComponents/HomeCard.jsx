import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const iconSize = 32;

export default function HomeCard({ header = "", list, iconSrc, navUrl }) {
  return (
    <div className="card-container">
      <h4 className="card-header lato-bold">{header}</h4>
      {list.map((event) => (
        <ListCard
          key={event.id}
          title={event.title}
          date={event.date}
          icon={iconSrc}
        />
      ))}
      <Link to={navUrl} className="card-links roboto-medium">
        {`More ${header.toLowerCase()}`}
      </Link>
    </div>
  );
}

function ListCard({ title, date, icon }) {
  return (
    <div className="card-content-container">
      <Icon icon={icon} width={iconSize} height={iconSize} />
      <div className="card-content">
        <h4 className="roboto-regular">{title}</h4>
        <p className="roboto-light">{date}</p>
      </div>
    </div>
  );
}
