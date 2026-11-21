import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  TrendingUp, 
  Shield, 
  Users, 
  Zap, 
  CheckCircle, 
  Star,
  Leaf,
  BarChart3,
  Globe,
  Target,
  Play
} from 'lucide-react';

const Hero = () => {
  return (
    <div className="min-h-screen pt-20 pb-10 flex items-center bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-500 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-emerald-500 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-lime-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-1/4 w-28 h-28 bg-green-400 rounded-full blur-2xl"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-emerald-400 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/5 w-5 h-5 bg-lime-400 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/5 w-2 h-2 bg-green-300 rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* Left Side - Enhanced Text Content */}
          <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-10">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 rounded-full text-sm font-medium mb-6">
              <Star className="h-4 w-4 mr-2 text-yellow-500" />
              Trusted by 10,000+ Farmers
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Predict
              </span>{' '}
              Crop Prices
              <br />
              <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                Optimised 
              </span>{' '}
              Your Harvest Strategy
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl leading-relaxed">
              Make <span className="font-semibold text-green-600">data-driven decisions</span> with our advanced AI-powered crop price prediction system. Stay ahead of market trends and maximize your profits.
            </p>
            
            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Link to="/predict" className="flex items-center">
                  <Zap className="mr-2 h-5 w-5" />
                  Predict Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold px-8 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105"
                onClick={() => {
                  const aboutSection = document.getElementById('about');
                  if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <Play className="mr-2 h-5 w-5" />
                Learn More
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>83% Accuracy Rate</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Real-time Data</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>AI-Powered</span>
              </div>
            </div>
          </div>
          
          {/* Right Side - Enhanced Visual Content */}
          <div className="lg:w-1/2 relative">
            <div className="relative mx-auto max-w-lg">
              {/* Main Image with Enhanced Styling */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
                <img 
                  src="https://media.istockphoto.com/id/1320570548/photo/peanuts-plantation-in-countryside-thailand-near-mountain.jpg?s=612x612&w=0&k=20&c=Rth_YqBkOw4_GA0Ed-zrENSelOnvIopyTH-WYbclrCg="
                  alt="Farmer using digital agriculture technology" 
                  className="relative w-full h-auto rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500"
                />
                
                {/* Floating Cards with Enhanced Design */}
                <div className="absolute -top-6 -left-6 bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white shadow-lg">
                      <BarChart3 className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <p className="text-gray-500 text-sm font-medium">Crop Varieties</p>
                      <p className="text-2xl font-bold text-gray-900">200+</p>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg">
                      <Globe className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <p className="text-gray-500 text-sm font-medium">States Coverage</p>
                      <p className="text-2xl font-bold text-gray-900">30</p>
                    </div>
                  </div>
                </div>

                <div className="absolute top-1/2 -left-8 bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-x-2">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white">
                      <TrendingUp className="h-5 w-5" />
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-500 text-xs font-medium">Success Rate</p>
                      <p className="text-lg font-bold text-gray-900">95%</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Background Decorative Elements */}
              <div className="absolute -z-10 top-10 -right-10 w-20 h-20 bg-green-200 rounded-full opacity-30"></div>
              <div className="absolute -z-10 bottom-10 -left-10 w-16 h-16 bg-emerald-200 rounded-full opacity-30"></div>
            </div>
          </div>
        </div>

        {/* Bottom Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">10,000+</h3>
            <p className="text-gray-600">Active Farmers</p>
          </div>
          
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Target className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">83%</h3>
            <p className="text-gray-600">Prediction Accuracy</p>
          </div>
          
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Leaf className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">200+</h3>
            <p className="text-gray-600">Crop Types</p>
          </div>
          
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">24/7</h3>
            <p className="text-gray-600">Support Available</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
