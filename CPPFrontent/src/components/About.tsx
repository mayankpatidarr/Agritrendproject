import { 
  CheckCircle, 
  ArrowRight, 
  Brain, 
  CloudRain, 
  TrendingUp, 
  BarChart3,
  Award,
  Star,
  Activity
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const About = () => {
  const features = [
    {
      title: "AI-Powered Predictions",
      description: "Our advanced machine learning models analyze years of historical data to provide accurate crop price forecasts.",
      icon: <Brain className="h-8 w-8 text-white" />,
      gradient: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600"
    },
    {
      title: "Weather Integration",
      description: "Access weather forecasts to understand how climate impacts crop prices and yields.",
      icon: <CloudRain className="h-8 w-8 text-white" />,
      gradient: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600"
    },
    {
      title: "Market Insights",
      description: "Stay informed with real-time market trends, supply-demand analysis, and seasonal patterns.",
      icon: <TrendingUp className="h-8 w-8 text-white" />,
      gradient: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      textColor: "text-green-600"
    },
    {
      title: "Data Visualization",
      description: "Easy-to-understand charts and graphs that visualize complex data for better decision making.",
      icon: <BarChart3 className="h-8 w-8 text-white" />,
      gradient: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600"
    },
  ];


  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 via-white to-green-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-500 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-emerald-500 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-lime-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 rounded-full text-sm font-medium mb-6">
            <Star className="h-4 w-4 mr-2 text-yellow-500" />
            About AgriTrend
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            About <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">AgriTrend</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We combine <span className="font-semibold text-green-600">cutting-edge technology</span> with agricultural expertise to help farmers and traders make data-driven decisions.
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-16 items-center mb-20">
          {/* Left Side - Enhanced Content */}
          <div className="lg:w-1/2">
            <div className="mb-8">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Empowering Farmers with Intelligent
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"> Decisions</span>
              </h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                AgriTrend was founded with a mission to bridge the gap between agricultural data and real-world decision-making. Our dedicated team of data scientists, agricultural experts, and software engineers collaborates to deliver precise crop price predictions that empower farmers to maximize their profits.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                By harnessing historical data, real-time market trends, and advanced machine learning algorithms, we provide actionable insights that were once accessible only to large agribusinesses-putting the power of data-driven farming directly in the hands of every farmer.
              </p>
            </div>

            {/* Enhanced Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              {features.map((feature, index) => (
                <div key={index} className="group">
                  <div className={`p-6 rounded-2xl ${feature.bgColor} hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}>
                    <div className="flex items-start">
                      <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-full flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {feature.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-bold text-gray-900 mb-2 ${feature.textColor}`}>{feature.title}</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Link to="/about-us" className="flex items-center">
                <Activity className="mr-2 h-5 w-5" />
                Learn More About Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Right Side - Enhanced Image */}
          <div className="lg:w-1/2">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
              <img 
                src="/decision.png" 
                alt="Farmer using tablet for digital agriculture" 
                className="relative w-full h-auto rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500"
              />
              
              {/* Floating Elements */}
              <div className="absolute -top-6 -left-6 bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white">
                    <Award className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-500 text-xs font-medium">Award Winning</p>
                    <p className="text-lg font-bold text-gray-900">Platform</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-500 text-xs font-medium">Trusted by</p>
                    <p className="text-lg font-bold text-gray-900">Farmers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
