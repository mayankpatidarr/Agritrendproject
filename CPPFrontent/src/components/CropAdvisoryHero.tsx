import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  Target,
  MapPin,
  Calendar,
  CheckCircle,
  Star,
  Zap,
  Award
} from 'lucide-react';

const CropAdvisoryHero = () => {
  const features = [
    {
      title: "Smart Crop Selection",
      description: "AI-powered analysis based on profitability and market trends",
      icon: <Target className="h-6 w-6 text-white" />,
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "Complete Timeline",
      description: "Harvest timeline and price projections for optimal planning",
      icon: <Calendar className="h-6 w-6 text-white" />,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Region-Specific",
      description: "Personalized recommendations for your specific state and climate",
      icon: <MapPin className="h-6 w-6 text-white" />,
      gradient: "from-purple-500 to-pink-500"
    }
  ];


  return (
    <div className="py-20 bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
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
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
          
          {/* Right Side - Enhanced Image */}
          <div className="lg:w-1/2 relative">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
              <div className="relative h-80 sm:h-96 md:h-[500px]">
                <img 
                  src="https://plus.unsplash.com/premium_photo-1661962692059-55d5a4319814?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074"
                  alt="Crop field with colorful flowers" 
                  className="w-full h-full object-cover rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500"
                />
                
                {/* Floating Card */}
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white shadow-lg">
                      <Award className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <p className="text-gray-500 text-sm font-medium">Success Rate</p>
                      <p className="text-2xl font-bold text-gray-900">95%</p>
                    </div>
                  </div>
                </div>

                <div className="absolute top-1/2 -left-8 bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-x-2">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-500 text-xs font-medium">AI-Powered</p>
                      <p className="text-lg font-bold text-gray-900">Analysis</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Left Side - Enhanced Text Content */}
          <div className="lg:w-1/2">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 rounded-full text-sm font-medium mb-6">
              <Star className="h-4 w-4 mr-2 text-yellow-500" />
              Smart Crop Recommendations
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Crop
              </span>{' '}
              Advisory
              <br />
              For <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                Smarter,
              </span>{' '}
              More Profitable Harvests
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl leading-relaxed">
              Receive <span className="font-semibold text-green-600">personalized crop recommendations</span> based on your location, season, and market trends to maximize profits.
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
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Link to="/crop-advisory" className="flex items-center">
                <Zap className="mr-2 h-5 w-5" />
                Get Crop Recommendations
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>


      </div>
    </div>
  );
};

export default CropAdvisoryHero;
