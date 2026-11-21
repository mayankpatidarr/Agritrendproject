import { useAuth } from '@/context/AuthContext'; // adjust path if needed
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Eye, EyeOff, ArrowLeft, Shield, Zap, Phone, Lock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const baseURL = import.meta.env.VITE_API_BASE_URL;

type LoginFormValues = {
  identifier: string;
  password: string;
  rememberMe: boolean;
};

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    defaultValues: {
      identifier: '',
      password: '',
      rememberMe: true,
    }
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);

    try {
      const response = await fetch(`${baseURL}api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: data.identifier,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        login(result.token, result.user); // 👈 Context-based login
        toast.success("Login successful!");
        navigate("/");
      } else {
        const errorMessage = result?.message || "Invalid credentials. Please try again.";
        toast.error(errorMessage);
      }
    } catch (error) {
      toast.error("Login failed. Please check your internet connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <Navbar />
      <main className="flex-grow pt-16 md:pt-20 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse delay-500"></div>
        </div>

        <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
          <div className="flex justify-center">
            {/* Centered Login form */}
            <div className="w-full max-w-md">
              <div className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-2xl border border-white/20 animate-fade-in">
                {/* Back Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="mb-6 text-agri-green-dark hover:bg-green-50 group"
                  onClick={() => navigate('/')}
                >
                  <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                  Back to Home
                </Button>

                {/* Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-4">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                    Welcome Back
                  </h1>
                  <p className="text-gray-600 text-lg">Sign in to access your agricultural dashboard</p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Phone/Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="identifier" className="text-sm font-medium text-gray-700 flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-green-600" />
                      Phone Number
                    </Label>
                    <div className="relative">
                      <Input
                        id="identifier"
                        type="text"
                        placeholder="Enter your phone number"
                        {...register('identifier', {
                          required: 'Phone number is required'
                        })}
                        className={`pl-10 h-12 text-lg ${errors.identifier ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-green-500'} transition-colors`}
                      />
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                    {errors.identifier && (
                      <p className="text-red-500 text-sm flex items-center">
                        <span className="mr-1">⚠️</span>
                        {errors.identifier.message}
                      </p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700 flex items-center">
                      <Lock className="h-4 w-4 mr-2 text-green-600" />
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        {...register('password', {
                          required: 'Password is required'
                        })}
                        className={`pl-10 pr-12 h-12 text-lg ${errors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-green-500'} transition-colors`}
                      />
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-sm flex items-center">
                        <span className="mr-1">⚠️</span>
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="rememberMe" 
                        {...register('rememberMe')} 
                        className="border-green-500 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                      />
                      <Label htmlFor="rememberMe" className="text-sm cursor-pointer text-gray-700">
                        Remember me for 30 days
                      </Label>
                    </div>
                    <Link 
                      to="/forgot-password" 
                      className="text-sm text-green-600 hover:text-green-700 hover:underline font-medium transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Signing in...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Zap className="h-5 w-5 mr-2" />
                        Sign In
                      </div>
                    )}
                  </Button>

                  {/* Register Link */}
                  <div className="text-center pt-4">
                    <p className="text-gray-600">
                      Don't have an account?{' '}
                      <Link 
                        to="/register" 
                        className="text-green-600 hover:text-green-700 font-semibold hover:underline transition-colors"
                      >
                        Create Account
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
