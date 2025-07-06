import { useAuth } from "../Provider/AuthProvider";

export const LoginPage = () => {
    const { login } = useAuth();
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                ICON
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Please sign in to continue</p>
          </div>
  
          <button
            onClick={login}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            LOGIN ICON
            <span>Sign in with Google</span>
          </button>
  
          <p className="text-xs text-gray-500 text-center mt-4">
            By signing in, you agree to our terms of service and privacy policy.
          </p>
        </div>
      </div>
    );
  };