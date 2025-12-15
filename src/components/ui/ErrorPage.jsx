
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-error">404</h1>
        <p className="text-2xl mt-4">Page Not Found</p>
        <Link to="/" className="btn btn-primary mt-8">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;