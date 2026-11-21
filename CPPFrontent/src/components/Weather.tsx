import { useState, useEffect } from 'react';
import { 
  Cloud, 
  Droplets, 
  Sun, 
  Wind, 
  CloudRain, 
  CloudSnow, 
  CloudFog,
  MapPin,
  Search,
  Thermometer,
  Eye,
  Compass,
  Gauge,
  Calendar,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Loader2,
  RefreshCw,
  Zap,
  Leaf,
  Activity
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';

interface WeatherData {
  location: {
    name: string;
    country: string;
    region: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
    };
    humidity: number;
    wind_kph: number;
    wind_dir: string;
    pressure_mb: number;
    feelslike_c: number;
    uv: number;
    visibility_km: number;
  };
  forecast: {
    forecastday: Array<{
      date: string;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        avgtemp_c: number;
        maxwind_kph: number;
        totalprecip_mm: number;
        avgvis_km: number;
        avghumidity: number;
        condition: {
          text: string;
          icon: string;
        };
        uv: number;
      };
      hour: Array<{
        time: string;
        temp_c: number;
        condition: {
          text: string;
          icon: string;
        };
        humidity: number;
        wind_kph: number;
        chance_of_rain: number;
      }>;
    }>;
  };
}

const Weather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchLocation, setSearchLocation] = useState('New Delhi');
  const [selectedDay, setSelectedDay] = useState(0);

  // Get weather icon based on condition
  const getWeatherIcon = (condition: string, isDay: boolean = true) => {
    const conditionLower = condition.toLowerCase();
    
    if (conditionLower.includes('sunny') || conditionLower.includes('clear')) {
      return <Sun className="h-8 w-8 text-yellow-500" />;
    } else if (conditionLower.includes('cloud')) {
      return <Cloud className="h-8 w-8 text-gray-500" />;
    } else if (conditionLower.includes('rain')) {
      return <CloudRain className="h-8 w-8 text-blue-500" />;
    } else if (conditionLower.includes('snow')) {
      return <CloudSnow className="h-8 w-8 text-blue-300" />;
    } else if (conditionLower.includes('fog') || conditionLower.includes('mist')) {
      return <CloudFog className="h-8 w-8 text-gray-400" />;
    } else {
      return <Cloud className="h-8 w-8 text-gray-500" />;
    }
  };

  // Get weather background gradient
  const getWeatherGradient = (condition: string) => {
    const conditionLower = condition.toLowerCase();
    
    if (conditionLower.includes('sunny') || conditionLower.includes('clear')) {
      return 'from-yellow-400 via-orange-300 to-yellow-500';
    } else if (conditionLower.includes('cloud')) {
      return 'from-gray-400 via-gray-300 to-gray-500';
    } else if (conditionLower.includes('rain')) {
      return 'from-blue-400 via-blue-300 to-blue-500';
    } else if (conditionLower.includes('snow')) {
      return 'from-blue-200 via-blue-100 to-blue-300';
    } else {
      return 'from-gray-400 via-gray-300 to-gray-500';
    }
  };

  // Fetch weather data
  const fetchWeatherData = async (location: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Using OpenWeatherMap API (you'll need to get a free API key)
      const API_KEY = 'your_openweathermap_api_key'; // Replace with your actual API key
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error('Weather data not found');
      }
      
      const data = await response.json();
      
      // Transform the data to match our interface
      const transformedData: WeatherData = {
        location: {
          name: data.city.name,
          country: data.city.country,
          region: data.city.name
        },
        current: {
          temp_c: data.list[0].main.temp,
          temp_f: (data.list[0].main.temp * 9/5) + 32,
          condition: {
            text: data.list[0].weather[0].description,
            icon: data.list[0].weather[0].icon
          },
          humidity: data.list[0].main.humidity,
          wind_kph: data.list[0].wind.speed * 3.6,
          wind_dir: data.list[0].wind.deg,
          pressure_mb: data.list[0].main.pressure,
          feelslike_c: data.list[0].main.feels_like,
          uv: 0, // UV not available in free tier
          visibility_km: data.list[0].visibility / 1000
        },
        forecast: {
          forecastday: data.list.slice(0, 5).map((item: any, index: number) => ({
            date: new Date(item.dt * 1000).toISOString().split('T')[0],
            day: {
              maxtemp_c: item.main.temp_max,
              mintemp_c: item.main.temp_min,
              avgtemp_c: item.main.temp,
              maxwind_kph: item.wind.speed * 3.6,
              totalprecip_mm: item.rain?.['3h'] || 0,
              avgvis_km: item.visibility / 1000,
              avghumidity: item.main.humidity,
              condition: {
                text: item.weather[0].description,
                icon: item.weather[0].icon
              },
              uv: 0
            },
            hour: [] // Simplified for this example
          }))
        }
      };
      
      setWeatherData(transformedData);
    } catch (err) {
      console.error('Weather fetch error:', err);
      // Fallback to sample data if API fails
      setWeatherData(getSampleWeatherData());
    } finally {
      setIsLoading(false);
    }
  };

  // Sample data for demonstration
  const getSampleWeatherData = (): WeatherData => ({
    location: {
      name: searchLocation,
      country: 'IN',
      region: 'Delhi'
    },
    current: {
      temp_c: 28,
      temp_f: 82,
      condition: {
        text: 'Partly Cloudy',
        icon: '02d'
      },
      humidity: 65,
      wind_kph: 12,
      wind_dir: 'NW',
      pressure_mb: 1013,
      feelslike_c: 30,
      uv: 6,
      visibility_km: 10
    },
    forecast: {
      forecastday: [
        {
          date: new Date().toISOString().split('T')[0],
          day: {
            maxtemp_c: 32,
            mintemp_c: 24,
            avgtemp_c: 28,
            maxwind_kph: 15,
            totalprecip_mm: 0,
            avgvis_km: 10,
            avghumidity: 60,
            condition: { text: 'Partly Cloudy', icon: '02d' },
            uv: 6
          },
          hour: []
        },
        {
          date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
          day: {
            maxtemp_c: 30,
            mintemp_c: 22,
            avgtemp_c: 26,
            maxwind_kph: 18,
            totalprecip_mm: 5,
            avgvis_km: 8,
            avghumidity: 70,
            condition: { text: 'Light Rain', icon: '10d' },
            uv: 4
          },
          hour: []
        },
        {
          date: new Date(Date.now() + 172800000).toISOString().split('T')[0],
          day: {
            maxtemp_c: 29,
            mintemp_c: 21,
            avgtemp_c: 25,
            maxwind_kph: 20,
            totalprecip_mm: 12,
            avgvis_km: 6,
            avghumidity: 80,
            condition: { text: 'Moderate Rain', icon: '10d' },
            uv: 3
          },
          hour: []
        },
        {
          date: new Date(Date.now() + 259200000).toISOString().split('T')[0],
          day: {
            maxtemp_c: 31,
            mintemp_c: 23,
            avgtemp_c: 27,
            maxwind_kph: 14,
            totalprecip_mm: 2,
            avgvis_km: 9,
            avghumidity: 65,
            condition: { text: 'Sunny', icon: '01d' },
            uv: 7
          },
          hour: []
        },
        {
          date: new Date(Date.now() + 345600000).toISOString().split('T')[0],
          day: {
            maxtemp_c: 33,
            mintemp_c: 25,
            avgtemp_c: 29,
            maxwind_kph: 16,
            totalprecip_mm: 0,
            avgvis_km: 12,
            avghumidity: 55,
            condition: { text: 'Clear Sky', icon: '01d' },
            uv: 8
          },
          hour: []
        }
      ]
    }
  });

  useEffect(() => {
    fetchWeatherData(searchLocation);
  }, []);

  const handleSearch = () => {
    if (searchLocation.trim()) {
      fetchWeatherData(searchLocation);
    }
  };

  const handleRefresh = () => {
    fetchWeatherData(searchLocation);
  };

  const getWindDirection = (degrees: number) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    return directions[Math.round(degrees / 22.5) % 16];
  };

  const getAgriculturalInsights = (weather: WeatherData) => {
    const insights = [];
    const current = weather.current;
    
    if (current.temp_c > 35) {
      insights.push({
        type: 'warning',
        icon: <AlertTriangle className="h-5 w-5 text-orange-500" />,
        title: 'High Temperature Alert',
        message: 'Consider irrigation to prevent heat stress in crops'
      });
    }
    
    if (current.humidity > 80) {
      insights.push({
        type: 'info',
        icon: <Droplets className="h-5 w-5 text-blue-500" />,
        title: 'High Humidity',
        message: 'Monitor for fungal diseases and ensure proper ventilation'
      });
    }
    
    if (current.wind_kph > 25) {
      insights.push({
        type: 'warning',
        icon: <Wind className="h-5 w-5 text-gray-500" />,
        title: 'Strong Winds',
        message: 'Secure crops and check for wind damage'
      });
    }
    
    if (current.uv > 7) {
      insights.push({
        type: 'info',
        icon: <Sun className="h-5 w-5 text-yellow-500" />,
        title: 'High UV Index',
        message: 'Consider shade protection for sensitive crops'
      });
    }
    
    return insights;
  };

  return (
    <div className="py-20 min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-green-500 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-cyan-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-6 shadow-lg">
            <Cloud className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Weather <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Forecast</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Get accurate weather forecasts for better <span className="font-semibold text-blue-600">agricultural planning</span>
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Enter city name..."
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-10 h-12 text-lg border-blue-200 focus:border-blue-500"
              />
            </div>
            <Button
              onClick={handleSearch}
              disabled={isLoading}
              className="h-12 px-8 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
            >
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
            </Button>
            <Button
              onClick={handleRefresh}
              variant="outline"
              className="h-12 px-4 border-blue-200 hover:bg-blue-50"
            >
              <RefreshCw className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-8">
            <Card className="max-w-4xl mx-auto">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <Skeleton className="h-8 w-48" />
                  <Skeleton className="h-16 w-16 rounded-full" />
                </div>
                <Skeleton className="h-32 w-full mb-4" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Array(4).fill(0).map((_, i) => (
                    <Skeleton key={i} className="h-20 w-full" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : weatherData ? (
          <>
            {/* Current Weather */}
            <Card className="max-w-4xl mx-auto mb-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      {weatherData.location.name}, {weatherData.location.country}
                    </h2>
                    <p className="text-lg text-gray-600 capitalize">
                      {weatherData.current.condition.text}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    {getWeatherIcon(weatherData.current.condition.text)}
                    <div className="text-right">
                      <div className="text-6xl font-bold text-gray-900">
                        {Math.round(weatherData.current.temp_c)}°
                      </div>
                      <div className="text-lg text-gray-600">
                        Feels like {Math.round(weatherData.current.feelslike_c)}°
                      </div>
                    </div>
                  </div>
                </div>

                {/* Weather Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-xl">
                    <Droplets className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{weatherData.current.humidity}%</div>
                    <div className="text-sm text-gray-600">Humidity</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <Wind className="h-8 w-8 text-gray-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{Math.round(weatherData.current.wind_kph)} km/h</div>
                    <div className="text-sm text-gray-600">Wind Speed</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <Eye className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{weatherData.current.visibility_km} km</div>
                    <div className="text-sm text-gray-600">Visibility</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-xl">
                    <Gauge className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{weatherData.current.pressure_mb} mb</div>
                    <div className="text-sm text-gray-600">Pressure</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 5-Day Forecast */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">5-Day Forecast</h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {weatherData.forecast.forecastday.map((day, index) => (
                  <Card 
                    key={index}
                    className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                      selectedDay === index ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedDay(index)}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="text-sm font-medium text-gray-600 mb-2">
                        {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                      <div className="mb-3">
                        {getWeatherIcon(day.day.condition.text)}
                      </div>
                      <div className="text-lg font-bold text-gray-900 mb-1">
                        {Math.round(day.day.maxtemp_c)}°
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        {Math.round(day.day.mintemp_c)}°
                      </div>
                      <div className="text-xs text-gray-500 capitalize">
                        {day.day.condition.text}
                      </div>
                      {day.day.totalprecip_mm > 0 && (
                        <div className="flex items-center justify-center mt-2 text-blue-600">
                          <Droplets className="h-3 w-3 mr-1" />
                          <span className="text-xs">{day.day.totalprecip_mm}mm</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Agricultural Insights */}
            <Card className="max-w-4xl mx-auto mb-8 shadow-xl border-0 bg-gradient-to-r from-green-50 to-emerald-50">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Leaf className="h-6 w-6 mr-2 text-green-600" />
                  Agricultural Insights
                </CardTitle>
                <CardDescription>
                  Weather-based recommendations for your farming activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {getAgriculturalInsights(weatherData).map((insight, index) => (
                    <div key={index} className="flex items-start p-4 bg-white rounded-lg shadow-sm">
                      {insight.icon}
                      <div className="ml-3">
                        <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                        <p className="text-sm text-gray-600">{insight.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Weather Benefits */}
            <Card className="max-w-4xl mx-auto shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-center text-2xl font-bold text-gray-900">
                  How Weather Forecasts Help Farmers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center p-6 bg-blue-50 rounded-xl">
                    <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <h4 className="font-semibold text-gray-900 mb-2">Planting Schedule</h4>
                    <p className="text-sm text-gray-600">Plan optimal planting times based on weather conditions</p>
                  </div>
                  <div className="text-center p-6 bg-green-50 rounded-xl">
                    <Droplets className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <h4 className="font-semibold text-gray-900 mb-2">Irrigation Planning</h4>
                    <p className="text-sm text-gray-600">Optimize water usage with precipitation forecasts</p>
                  </div>
                  <div className="text-center p-6 bg-yellow-50 rounded-xl">
                    <TrendingUp className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                    <h4 className="font-semibold text-gray-900 mb-2">Harvest Timing</h4>
                    <p className="text-sm text-gray-600">Schedule harvests during favorable weather windows</p>
                  </div>
                  <div className="text-center p-6 bg-red-50 rounded-xl">
                    <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
                    <h4 className="font-semibold text-gray-900 mb-2">Risk Management</h4>
                    <p className="text-sm text-gray-600">Prepare for extreme weather events in advance</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8 text-center">
              <AlertTriangle className="h-16 w-16 text-red-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Weather Data Unavailable
              </h3>
              <p className="text-gray-500">
                Unable to fetch weather data. Please check your location and try again.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Weather;
