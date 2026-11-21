import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight, Leaf, TrendingUp, Shield, Users, Target, Award, Globe, BarChart3, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutUsPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen max-w-[100vw] overflow-x-hidden">
      <Navbar />
      <main className="flex-grow pt-16">
        {/* Enhanced Hero Section */}
        <section className="relative bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50 py-24 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-10 w-32 h-32 bg-green-500 rounded-full blur-3xl"></div>
            <div className="absolute top-40 right-20 w-24 h-24 bg-emerald-500 rounded-full blur-2xl"></div>
            <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-lime-500 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-6 shadow-lg">
                <Leaf className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                About <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">AgriTrend</span>
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto mb-8 rounded-full"></div>
              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Empowering farmers with <span className="font-semibold text-green-600">data-driven insights</span> for better agricultural decisions
              </p>
            </div>
          </div>
        </section>

        {/* Enhanced Stats Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              {[
                { icon: Calendar, number: "2025", label: "Founded" },
                { icon: BarChart3, number: "85K+", label: "Data Entries" },
                { icon: TrendingUp, number: "83%", label: "Accuracy" },
                { icon: Globe, number: "200+", label: "Crops Covered" }
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Mission Section */}
        <section className="py-20 bg-gradient-to-r from-gray-50 to-green-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="lg:w-1/2">
                <div className="mb-8">
                  <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
                    <Target className="h-4 w-4 mr-2" />
                    Our Mission
                  </div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                    Transforming Agriculture with Smart 
                    <span className="text-green-600"> Technology</span>
                  </h2>
                </div>
                
                <div className="space-y-6">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    AgriTrend was founded with a mission to make agricultural intelligence accessible to every farmer. We believe that no matter the scale of their farm, all farmers should have the tools and insights needed to boost productivity and profitability.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Our platform harnesses advanced machine learning technologies and extensive historical crop price data to deliver accurate and dependable market predictions. By uncovering patterns, seasonal variations, and market dynamics, AgriTrend enables farmers to make smarter decisions about when to plant, harvest, and sell their crops.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Additionally, our integrated weather forecasting system provides timely insights into upcoming climate conditions, helping farmers prepare for and adapt to shifting weather patterns.
                  </p>
                </div>

                <div className="mt-8 space-y-4">
                  {[
                    "Founded in 2025 with a vision for agricultural innovation",
                    "Trained on 85,000+ entries from 6 years of comprehensive data",
                    "Achieving 83% prediction accuracy across all crop types",
                    "Covering 200+ crops across 30 Indian states"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start group">
                      <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5 group-hover:bg-green-200 transition-colors">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="text-gray-700 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:w-1/2">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl transform rotate-3"></div>
                  <img
                    src="https://images.unsplash.com/photo-1560493676-04071c5f467b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074"
                    alt="Farmer using tablet for digital agriculture"
                    className="relative w-full h-auto rounded-2xl shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Values Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto mb-6 rounded-full"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The principles that guide our mission to transform agriculture
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: "Reliability",
                  description: "We deliver precise, data-backed insights that farmers can confidently rely on when making vital agricultural decisions."
                },
                {
                  icon: Users,
                  title: "Accessibility",
                  description: "We ensure that cutting-edge agricultural technology is within reach of every farmer regardless of their scale, location, or background."
                },
                {
                  icon: Award,
                  title: "Innovation",
                  description: "We are committed to constant improvement, refining our algorithms and enhancing our features to better support the evolving needs of farmers."
                }
              ].map((value, index) => (
                <div key={index} className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-lg transition-all duration-300 group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Team Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto mb-6 rounded-full"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The brilliant minds behind AgriTrend's innovative agricultural solutions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  name: "Mayank Patidar",
                  image: "/mayankpatidar.jpg"
                
                },
                {
                  name: "Mohammed Hamid",
                  image: "/hamid.jpg"
                  
                },
                {
                  name: "Manasvi Jain",
                  image: "/girl.jpg"
                  
                }
              ].map((member, index) => (
                <div key={index} className="group">
                  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2">
                    <div className="flex flex-col items-center text-center">
                      <div className="relative mb-6">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full transform rotate-3"></div>
                        <img
                          src={member.image}
                          alt={member.name}
                          className="relative w-32 h-32 rounded-full object-cover object-[center_5%] border-4 border-white shadow-lg"
                        />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                      <p className="text-green-600 font-medium">{member.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-16">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Link to="/predict" className="flex items-center">
                  Try Our Crop Price Prediction 
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUsPage;
