import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center ">
      <h1 className="text-3xl font-bold mb-8">Page Not Found !!!</h1>
      <Link to={"/"} className="text-blue-500 text-2xl underline cursor-pointer">
        Back to Home Page
      </Link>
    </div>
  );
};

export default ErrorPage;
