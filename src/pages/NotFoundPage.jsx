import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="container py-5 text-center">
      <h1 className="text-white">404 - Page Not Found</h1>
      <p className="text-white">
        The page you are looking for does not exist. Please check the URL or go
        back to the homepage.
      </p>
      <Link to="/" className="btn btn-primary rounded-0">
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;
