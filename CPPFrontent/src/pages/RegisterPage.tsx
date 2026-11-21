import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Eye, EyeOff, ArrowLeft, UserPlus, User, Mail, Phone, Briefcase, Lock, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { registerUser } from '@/api/auth'; // Import the API function

type RegisterFormValues = {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phone: string;
  profession: string;
  password: string;
  confirmPassword: string;
};

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterFormValues>({
    defaultValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      phone: '',
      profession: '',
      password: '',
      confirmPassword: '',
    }
  });
  
  const password = watch('password');
  
  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
  
    try {
      const response = await registerUser({
        firstName: data.firstName,
        middleName: data.middleName || '',
        lastName: data.lastName,
        phone: data.phone,
        email: data.email,
        profession: data.profession,
        password: data.password,
      });
  
      toast.success(response.message || 'Registration successful!');
      navigate('/login'); // Redirect to login after success
    } catch (error: any) {
      toast.error(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    {
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      text: "Access to crop price predictions"
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      text: "Personalized weather forecasts"
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      text: "Crop advisory recommendations"
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      text: "Market insights and trends"
    }
  ];
  
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
            {/* Centered Registration form */}
            <div className="w-full max-w-2xl">
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
                    <UserPlus className="h-8 w-8 text-white" />
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                    Create Account
                  </h1>
                  <p className="text-gray-600 text-lg">Join AgriTrend and start your agricultural journey</p>
                </div>

                {/* Benefits */}
                <div className="mb-8 p-6 bg-green-50 rounded-2xl border border-green-100">
                  <h3 className="font-semibold text-gray-900 mb-4 text-center">What you'll get:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center">
                        {benefit.icon}
                        <span className="ml-2 text-sm text-gray-700">{benefit.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Registration Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-sm font-medium text-gray-700 flex items-center">
                        <User className="h-4 w-4 mr-2 text-green-600" />
                        First Name *
                      </Label>
                      <Input
                        id="firstName"
                        placeholder="Enter first name"
                        {...register('firstName', { 
                          required: 'First name is required' 
                        })}
                        className={`h-12 text-lg ${errors.firstName ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-green-500'} transition-colors`}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm flex items-center">
                          <span className="mr-1">⚠️</span>
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="middleName" className="text-sm font-medium text-gray-700 flex items-center">
                        <User className="h-4 w-4 mr-2 text-gray-400" />
                        Middle Name
                      </Label>
                      <Input
                        id="middleName"
                        placeholder="Optional"
                        {...register('middleName')}
                        className="h-12 text-lg border-gray-300 focus:border-green-500 transition-colors"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-sm font-medium text-gray-700 flex items-center">
                        <User className="h-4 w-4 mr-2 text-green-600" />
                        Last Name *
                      </Label>
                      <Input
                        id="lastName"
                        placeholder="Enter last name"
                        {...register('lastName', { 
                          required: 'Last name is required' 
                        })}
                        className={`h-12 text-lg ${errors.lastName ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-green-500'} transition-colors`}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm flex items-center">
                          <span className="mr-1">⚠️</span>
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-green-600" />
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      className={`h-12 text-lg ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-green-500'} transition-colors`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm flex items-center">
                        <span className="mr-1">⚠️</span>
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  
                  {/* Phone and Profession */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium text-gray-700 flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-green-600" />
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter phone number"
                        {...register('phone', { 
                          required: 'Phone number is required',
                          pattern: {
                            value: /^[0-9+\-\s()]{10,15}$/,
                            message: 'Invalid phone number'
                          }
                        })}
                        className={`h-12 text-lg ${errors.phone ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-green-500'} transition-colors`}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm flex items-center">
                          <span className="mr-1">⚠️</span>
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="profession" className="text-sm font-medium text-gray-700 flex items-center">
                        <Briefcase className="h-4 w-4 mr-2 text-green-600" />
                        Profession *
                      </Label>
                      <Input
                        id="profession"
                        placeholder="e.g. Farmer, Trader, Analyst"
                        {...register('profession', { 
                          required: 'Profession is required' 
                        })}
                        className={`h-12 text-lg ${errors.profession ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-green-500'} transition-colors`}
                      />
                      {errors.profession && (
                        <p className="text-red-500 text-sm flex items-center">
                          <span className="mr-1">⚠️</span>
                          {errors.profession.message}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {/* Password Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm font-medium text-gray-700 flex items-center">
                        <Lock className="h-4 w-4 mr-2 text-green-600" />
                        Password *
                      </Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Create a strong password"
                          {...register('password', { 
                            required: 'Password is required',
                            minLength: {
                              value: 8,
                              message: 'Password must be at least 8 characters'
                            }
                          })}
                          className={`h-12 text-lg pr-12 ${errors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-green-500'} transition-colors`}
                        />
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
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 flex items-center">
                        <Lock className="h-4 w-4 mr-2 text-green-600" />
                        Confirm Password *
                      </Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="Confirm your password"
                          {...register('confirmPassword', { 
                            required: 'Please confirm your password',
                            validate: value => value === password || 'Passwords do not match'
                          })}
                          className={`h-12 text-lg pr-12 ${errors.confirmPassword ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-green-500'} transition-colors`}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-sm flex items-center">
                          <span className="mr-1">⚠️</span>
                          {errors.confirmPassword.message}
                        </p>
                      )}
                    </div>
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
                        Creating Account...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <UserPlus className="h-5 w-5 mr-2" />
                        Create Account
                      </div>
                    )}
                  </Button>
                  
                  {/* Login Link */}
                  <div className="text-center pt-4">
                    <p className="text-gray-600">
                      Already have an account?{' '}
                      <Link 
                        to="/login" 
                        className="text-green-600 hover:text-green-700 font-semibold hover:underline transition-colors"
                      >
                        Sign In Here
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

export default RegisterPage;
