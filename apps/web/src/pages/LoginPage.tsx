const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5 bg-gray-50">
      <h1 className="text-3xl font-bold mb-3 text-gray-900">Login</h1>
      <p className="text-base text-gray-600 mb-8">12s Platform - Sign In</p>
      <div className="flex flex-col gap-4 w-80">
        <input
          type="email"
          placeholder="Email"
          className="p-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <button className="p-3 bg-primary-500 hover:bg-primary-600 text-white border-none rounded-md text-base cursor-pointer transition-colors">
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
