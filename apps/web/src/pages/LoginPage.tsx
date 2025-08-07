import { useAuth0 } from "@auth0/auth0-react";

const LoginPage = () => {
  const { loginWithRedirect, isLoading } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5 bg-gray-50">
      <h1 className="text-3xl font-bold mb-3 text-gray-900">Login</h1>
      <p className="text-base text-gray-600 mb-8">12s Platform - Sign In</p>
      <div className="flex flex-col gap-4 w-80">
        <button
          onClick={handleLogin}
          disabled={isLoading}
          className="p-3 bg-blue-600 hover:bg-blue-700 text-white border-none rounded-md text-base cursor-pointer transition-colors disabled:opacity-50"
        >
          {isLoading ? "Loading..." : "Login with Auth0"}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
