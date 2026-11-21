import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  Cloud,
  CloudRain,
  Target,
  Star,
  Activity,
  CheckCircle
} from 'lucide-react';

const WeatherHero = () => {
  const features = [
    {
      title: "Accurate Predictions",
      description: "Advanced meteorological models provide precise rainfall and temperature forecasts",
      icon: <Target className="h-6 w-6 text-white" />,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Seasonal Planning",
      description: "Long-term forecasting to optimize planting and harvesting schedules",
      icon: <CloudRain className="h-6 w-6 text-white" />,
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "Climate Analysis",
      description: "Comprehensive climate pattern analysis to prepare for extreme conditions",
      icon: <Activity className="h-6 w-6 text-white" />,
      gradient: "from-purple-500 to-pink-500"
    }
  ];


  return (
    <div className="py-20 bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-cyan-500 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-sky-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-1/4 w-28 h-28 bg-blue-400 rounded-full blur-2xl"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-cyan-400 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/5 w-5 h-5 bg-sky-400 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/5 w-2 h-2 bg-blue-300 rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Side - Enhanced Weather Image */}
          <div className="lg:w-1/2 relative">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
              <div className="relative h-80 sm:h-96 md:h-[500px]">
                <img 
                  src="https://images.unsplash.com/photo-1601134467661-3d775b999c8b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1975"
                  alt="Weather landscape with sun rays" 
                  className="w-full h-full object-cover rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500"
                />
                

                <div className="absolute top-1/2 -left-8 bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-x-2">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-500 text-xs font-medium">Real-time</p>
                      <p className="text-lg font-bold text-gray-900">Updates</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Side - Enhanced Text Content */}
          <div className="lg:w-1/2">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 rounded-full text-sm font-medium mb-6">
              <Star className="h-4 w-4 mr-2 text-yellow-500" />
              Advanced Weather Intelligence
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Weather
              </span>{' '}
              Forecasts
              <br />
              For Smarter <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Farming
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl leading-relaxed">
              Make precise farming <span className="font-semibold text-blue-600">decision</span> with our tailored weather forecasts for farmers and agricultural experts.
            </p>
            
            {/* Enhanced Feature List */}
            <div className="space-y-6 mb-10">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start group">
                  <div className="flex-shrink-0 mr-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {feature.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">{feature.title}</h4>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Enhanced CTA Button */}
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Link to="/weather" className="flex items-center">
                <Cloud className="mr-2 h-5 w-5" />
                Check Weather Forecast
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>


      </div>
    </div>
  );
};

export default WeatherHero;
