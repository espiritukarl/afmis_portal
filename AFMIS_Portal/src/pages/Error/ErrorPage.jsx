import "./ErrorPage.css";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  // useEffect(() => {
  //   document.title = "Oops! Page Not Found";
  // }, []);

  return (
    <main className="error roboto-regular">
      <h1 className="roboto-bold">404</h1>
      <h2>Oops! Something Went Wrong</h2>

      <p className="roboto-regular-italic">
        The page you're looking for is either missing or is temporarily
        unavailable.
      </p>

      <Link to="/" className="redirect">
        Go back to Homepage
      </Link>

      <div className="contact-us">
        <h3 className="roboto-bold">Need help?</h3>
        <p>Email: amas@da.gov.ph</p>
        <p>Phone: (632) 8920.2216 / 8920.4072-73 / 8920.4077 / 8926.8203</p>
      </div>

      <div className="fun-fact roboto-bold-italic">
        <p>
          <em>
            Fun fact: This error page gets more visits than our office printer!
          </em>
        </p>
      </div>
    </main>
  );
}
