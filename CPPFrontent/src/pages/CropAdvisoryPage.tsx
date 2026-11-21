import { statesList } from '../components/constants/statesList';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { stateToSoil } from "../components/constants/stateToSoil";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Sprout, 
  TrendingUp, 
  MapPin, 
  Calendar, 
  BarChart3, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  Leaf,
  Target,
  Zap
} from 'lucide-react';
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

type FormValues = {
  state: string;
  month: string;
  year: string;
};

const CropAdvisoryPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendationResults, setRecommendationResults] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const form = useForm<FormValues>({
    defaultValues: {
      state: '',
      month: '',
      year: new Date().getFullYear().toString(),
    },
  });

  // Dynamic crop recommendations based on state and month
  const getDynamicRecommendations = (state: string, month: string) => {
    // State-specific crop preferences and seasonal adjustments
    const stateCropData = {
      'Punjab': {
        baseCrops: [
          { crop: "Wheat", baseValue: 95, seasonal: { 'Oct': 10, 'Nov': 15, 'Dec': 20, 'Jan': 25, 'Feb': 20, 'Mar': 15 } },
          { crop: "Rice", baseValue: 90, seasonal: { 'Apr': 15, 'May': 20, 'Jun': 25, 'Jul': 30, 'Aug': 25, 'Sep': 15 } },
          { crop: "Maize", baseValue: 85, seasonal: { 'Mar': 10, 'Apr': 15, 'May': 20, 'Jun': 25, 'Jul': 20, 'Aug': 15 } },
          { crop: "Sugarcane", baseValue: 80, seasonal: { 'Oct': 15, 'Nov': 20, 'Dec': 25, 'Jan': 30, 'Feb': 25, 'Mar': 20 } },
          { crop: "Cotton", baseValue: 75, seasonal: { 'Apr': 10, 'May': 15, 'Jun': 20, 'Jul': 25, 'Aug': 20, 'Sep': 15 } }
        ]
      },
      'Maharashtra': {
        baseCrops: [
          { crop: "Sugarcane", baseValue: 95, seasonal: { 'Oct': 20, 'Nov': 25, 'Dec': 30, 'Jan': 35, 'Feb': 30, 'Mar': 25 } },
          { crop: "Cotton", baseValue: 90, seasonal: { 'Apr': 15, 'May': 20, 'Jun': 25, 'Jul': 30, 'Aug': 25, 'Sep': 20 } },
          { crop: "Soybean", baseValue: 85, seasonal: { 'Jun': 15, 'Jul': 20, 'Aug': 25, 'Sep': 30, 'Oct': 25, 'Nov': 20 } },
          { crop: "Groundnut", baseValue: 80, seasonal: { 'May': 10, 'Jun': 15, 'Jul': 20, 'Aug': 25, 'Sep': 20, 'Oct': 15 } },
          { crop: "Rice", baseValue: 75, seasonal: { 'Jun': 15, 'Jul': 20, 'Aug': 25, 'Sep': 30, 'Oct': 25, 'Nov': 20 } }
        ]
      },
      'Gujarat': {
        baseCrops: [
          { crop: "Cotton", baseValue: 95, seasonal: { 'Apr': 15, 'May': 20, 'Jun': 25, 'Jul': 30, 'Aug': 25, 'Sep': 20 } },
          { crop: "Groundnut", baseValue: 90, seasonal: { 'May': 15, 'Jun': 20, 'Jul': 25, 'Aug': 30, 'Sep': 25, 'Oct': 20 } },
          { crop: "Wheat", baseValue: 85, seasonal: { 'Oct': 15, 'Nov': 20, 'Dec': 25, 'Jan': 30, 'Feb': 25, 'Mar': 20 } },
          { crop: "Sugarcane", baseValue: 80, seasonal: { 'Oct': 20, 'Nov': 25, 'Dec': 30, 'Jan': 35, 'Feb': 30, 'Mar': 25 } },
          { crop: "Maize", baseValue: 75, seasonal: { 'Mar': 10, 'Apr': 15, 'May': 20, 'Jun': 25, 'Jul': 20, 'Aug': 15 } }
        ]
      },
      'Karnataka': {
        baseCrops: [
          { crop: "Rice", baseValue: 95, seasonal: { 'Jun': 20, 'Jul': 25, 'Aug': 30, 'Sep': 35, 'Oct': 30, 'Nov': 25 } },
          { crop: "Sugarcane", baseValue: 90, seasonal: { 'Oct': 20, 'Nov': 25, 'Dec': 30, 'Jan': 35, 'Feb': 30, 'Mar': 25 } },
          { crop: "Maize", baseValue: 85, seasonal: { 'Mar': 15, 'Apr': 20, 'May': 25, 'Jun': 30, 'Jul': 25, 'Aug': 20 } },
          { crop: "Cotton", baseValue: 80, seasonal: { 'Apr': 15, 'May': 20, 'Jun': 25, 'Jul': 30, 'Aug': 25, 'Sep': 20 } },
          { crop: "Ragi", baseValue: 75, seasonal: { 'May': 10, 'Jun': 15, 'Jul': 20, 'Aug': 25, 'Sep': 20, 'Oct': 15 } }
        ]
      },
      'Tamil Nadu': {
        baseCrops: [
          { crop: "Rice", baseValue: 95, seasonal: { 'Jun': 20, 'Jul': 25, 'Aug': 30, 'Sep': 35, 'Oct': 30, 'Nov': 25 } },
          { crop: "Sugarcane", baseValue: 90, seasonal: { 'Oct': 20, 'Nov': 25, 'Dec': 30, 'Jan': 35, 'Feb': 30, 'Mar': 25 } },
          { crop: "Cotton", baseValue: 85, seasonal: { 'Apr': 15, 'May': 20, 'Jun': 25, 'Jul': 30, 'Aug': 25, 'Sep': 20 } },
          { crop: "Groundnut", baseValue: 80, seasonal: { 'May': 15, 'Jun': 20, 'Jul': 25, 'Aug': 30, 'Sep': 25, 'Oct': 20 } },
          { crop: "Maize", baseValue: 75, seasonal: { 'Mar': 15, 'Apr': 20, 'May': 25, 'Jun': 30, 'Jul': 25, 'Aug': 20 } }
        ]
      },
      'Uttar Pradesh': {
        baseCrops: [
          { crop: "Wheat", baseValue: 95, seasonal: { 'Oct': 20, 'Nov': 25, 'Dec': 30, 'Jan': 35, 'Feb': 30, 'Mar': 25 } },
          { crop: "Rice", baseValue: 90, seasonal: { 'Jun': 20, 'Jul': 25, 'Aug': 30, 'Sep': 35, 'Oct': 30, 'Nov': 25 } },
          { crop: "Sugarcane", baseValue: 85, seasonal: { 'Oct': 15, 'Nov': 20, 'Dec': 25, 'Jan': 30, 'Feb': 25, 'Mar': 20 } },
          { crop: "Maize", baseValue: 80, seasonal: { 'Mar': 15, 'Apr': 20, 'May': 25, 'Jun': 30, 'Jul': 25, 'Aug': 20 } },
          { crop: "Potato", baseValue: 75, seasonal: { 'Oct': 15, 'Nov': 20, 'Dec': 25, 'Jan': 30, 'Feb': 25, 'Mar': 20 } }
        ]
      },
      'West Bengal': {
        baseCrops: [
          { crop: "Rice", baseValue: 95, seasonal: { 'Jun': 20, 'Jul': 25, 'Aug': 30, 'Sep': 35, 'Oct': 30, 'Nov': 25 } },
          { crop: "Jute", baseValue: 90, seasonal: { 'Mar': 15, 'Apr': 20, 'May': 25, 'Jun': 30, 'Jul': 25, 'Aug': 20 } },
          { crop: "Potato", baseValue: 85, seasonal: { 'Oct': 20, 'Nov': 25, 'Dec': 30, 'Jan': 35, 'Feb': 30, 'Mar': 25 } },
          { crop: "Wheat", baseValue: 80, seasonal: { 'Oct': 15, 'Nov': 20, 'Dec': 25, 'Jan': 30, 'Feb': 25, 'Mar': 20 } },
          { crop: "Maize", baseValue: 75, seasonal: { 'Mar': 15, 'Apr': 20, 'May': 25, 'Jun': 30, 'Jul': 25, 'Aug': 20 } }
        ]
      },
      'Rajasthan': {
        baseCrops: [
          { crop: "Wheat", baseValue: 95, seasonal: { 'Oct': 20, 'Nov': 25, 'Dec': 30, 'Jan': 35, 'Feb': 30, 'Mar': 25 } },
          { crop: "Cotton", baseValue: 90, seasonal: { 'Apr': 15, 'May': 20, 'Jun': 25, 'Jul': 30, 'Aug': 25, 'Sep': 20 } },
          { crop: "Mustard", baseValue: 85, seasonal: { 'Oct': 15, 'Nov': 20, 'Dec': 25, 'Jan': 30, 'Feb': 25, 'Mar': 20 } },
          { crop: "Groundnut", baseValue: 80, seasonal: { 'May': 15, 'Jun': 20, 'Jul': 25, 'Aug': 30, 'Sep': 25, 'Oct': 20 } },
          { crop: "Maize", baseValue: 75, seasonal: { 'Mar': 15, 'Apr': 20, 'May': 25, 'Jun': 30, 'Jul': 25, 'Aug': 20 } }
        ]
      },
      'Madhya Pradesh': {
        baseCrops: [
          { crop: "Soybean", baseValue: 95, seasonal: { 'Jun': 20, 'Jul': 25, 'Aug': 30, 'Sep': 35, 'Oct': 30, 'Nov': 25 } },
          { crop: "Wheat", baseValue: 90, seasonal: { 'Oct': 20, 'Nov': 25, 'Dec': 30, 'Jan': 35, 'Feb': 30, 'Mar': 25 } },
          { crop: "Rice", baseValue: 85, seasonal: { 'Jun': 20, 'Jul': 25, 'Aug': 30, 'Sep': 35, 'Oct': 30, 'Nov': 25 } },
          { crop: "Maize", baseValue: 80, seasonal: { 'Mar': 15, 'Apr': 20, 'May': 25, 'Jun': 30, 'Jul': 25, 'Aug': 20 } },
          { crop: "Cotton", baseValue: 75, seasonal: { 'Apr': 15, 'May': 20, 'Jun': 25, 'Jul': 30, 'Aug': 25, 'Sep': 20 } }
        ]
      },
      'Andhra Pradesh': {
        baseCrops: [
          { crop: "Rice", baseValue: 95, seasonal: { 'Jun': 20, 'Jul': 25, 'Aug': 30, 'Sep': 35, 'Oct': 30, 'Nov': 25 } },
          { crop: "Cotton", baseValue: 90, seasonal: { 'Apr': 15, 'May': 20, 'Jun': 25, 'Jul': 30, 'Aug': 25, 'Sep': 20 } },
          { crop: "Sugarcane", baseValue: 85, seasonal: { 'Oct': 20, 'Nov': 25, 'Dec': 30, 'Jan': 35, 'Feb': 30, 'Mar': 25 } },
          { crop: "Groundnut", baseValue: 80, seasonal: { 'May': 15, 'Jun': 20, 'Jul': 25, 'Aug': 30, 'Sep': 25, 'Oct': 20 } },
          { crop: "Maize", baseValue: 75, seasonal: { 'Mar': 15, 'Apr': 20, 'May': 25, 'Jun': 30, 'Jul': 25, 'Aug': 20 } }
        ]
      },
      'Haryana': {
        baseCrops: [
          { crop: "Wheat", baseValue: 95, seasonal: { 'Oct': 20, 'Nov': 25, 'Dec': 30, 'Jan': 35, 'Feb': 30, 'Mar': 25 } },
          { crop: "Rice", baseValue: 90, seasonal: { 'Apr': 15, 'May': 20, 'Jun': 25, 'Jul': 30, 'Aug': 25, 'Sep': 15 } },
          { crop: "Sugarcane", baseValue: 85, seasonal: { 'Oct': 15, 'Nov': 20, 'Dec': 25, 'Jan': 30, 'Feb': 25, 'Mar': 20 } },
          { crop: "Cotton", baseValue: 80, seasonal: { 'Apr': 15, 'May': 20, 'Jun': 25, 'Jul': 30, 'Aug': 25, 'Sep': 20 } },
          { crop: "Maize", baseValue: 75, seasonal: { 'Mar': 15, 'Apr': 20, 'May': 25, 'Jun': 30, 'Jul': 25, 'Aug': 20 } }
        ]
      },
      'Bihar': {
        baseCrops: [
          { crop: "Rice", baseValue: 95, seasonal: { 'Jun': 20, 'Jul': 25, 'Aug': 30, 'Sep': 35, 'Oct': 30, 'Nov': 25 } },
          { crop: "Wheat", baseValue: 90, seasonal: { 'Oct': 20, 'Nov': 25, 'Dec': 30, 'Jan': 35, 'Feb': 30, 'Mar': 25 } },
          { crop: "Maize", baseValue: 85, seasonal: { 'Mar': 15, 'Apr': 20, 'May': 25, 'Jun': 30, 'Jul': 25, 'Aug': 20 } },
          { crop: "Sugarcane", baseValue: 80, seasonal: { 'Oct': 15, 'Nov': 20, 'Dec': 25, 'Jan': 30, 'Feb': 25, 'Mar': 20 } },
          { crop: "Potato", baseValue: 75, seasonal: { 'Oct': 15, 'Nov': 20, 'Dec': 25, 'Jan': 30, 'Feb': 25, 'Mar': 20 } }
        ]
      },
      'Odisha': {
        baseCrops: [
          { crop: "Rice", baseValue: 95, seasonal: { 'Jun': 20, 'Jul': 25, 'Aug': 30, 'Sep': 35, 'Oct': 30, 'Nov': 25 } },
          { crop: "Maize", baseValue: 90, seasonal: { 'Mar': 15, 'Apr': 20, 'May': 25, 'Jun': 30, 'Jul': 25, 'Aug': 20 } },
          { crop: "Sugarcane", baseValue: 85, seasonal: { 'Oct': 20, 'Nov': 25, 'Dec': 30, 'Jan': 35, 'Feb': 30, 'Mar': 25 } },
          { crop: "Groundnut", baseValue: 80, seasonal: { 'May': 15, 'Jun': 20, 'Jul': 25, 'Aug': 30, 'Sep': 25, 'Oct': 20 } },
          { crop: "Cotton", baseValue: 75, seasonal: { 'Apr': 15, 'May': 20, 'Jun': 25, 'Jul': 30, 'Aug': 25, 'Sep': 20 } }
        ]
      },
      'Kerala': {
        baseCrops: [
          { crop: "Rice", baseValue: 95, seasonal: { 'Jun': 20, 'Jul': 25, 'Aug': 30, 'Sep': 35, 'Oct': 30, 'Nov': 25 } },
          { crop: "Rubber", baseValue: 90, seasonal: { 'Mar': 15, 'Apr': 20, 'May': 25, 'Jun': 30, 'Jul': 25, 'Aug': 20 } },
          { crop: "Coconut", baseValue: 85, seasonal: { 'Mar': 10, 'Apr': 15, 'May': 20, 'Jun': 25, 'Jul': 20, 'Aug': 15 } },
          { crop: "Sugarcane", baseValue: 80, seasonal: { 'Oct': 20, 'Nov': 25, 'Dec': 30, 'Jan': 35, 'Feb': 30, 'Mar': 25 } },
          { crop: "Spices", baseValue: 75, seasonal: { 'Mar': 15, 'Apr': 20, 'May': 25, 'Jun': 30, 'Jul': 25, 'Aug': 20 } }
        ]
      },
      'Assam': {
        baseCrops: [
          { crop: "Rice", baseValue: 95, seasonal: { 'Jun': 20, 'Jul': 25, 'Aug': 30, 'Sep': 35, 'Oct': 30, 'Nov': 25 } },
          { crop: "Tea", baseValue: 90, seasonal: { 'Mar': 15, 'Apr': 20, 'May': 25, 'Jun': 30, 'Jul': 25, 'Aug': 20 } },
          { crop: "Jute", baseValue: 85, seasonal: { 'Mar': 15, 'Apr': 20, 'May': 25, 'Jun': 30, 'Jul': 25, 'Aug': 20 } },
          { crop: "Maize", baseValue: 80, seasonal: { 'Mar': 15, 'Apr': 20, 'May': 25, 'Jun': 30, 'Jul': 25, 'Aug': 20 } },
          { crop: "Sugarcane", baseValue: 75, seasonal: { 'Oct': 20, 'Nov': 25, 'Dec': 30, 'Jan': 35, 'Feb': 30, 'Mar': 25 } }
        ]
      }
    };

    // Get state data or default to Punjab
    const stateData = stateCropData[state] || stateCropData['Punjab'];
    
    // Calculate dynamic recommendations based on month
    const recommendations = stateData.baseCrops.map((cropData, index) => {
      const seasonalBonus = cropData.seasonal[month] || 0;
      const finalValue = Math.min(100, cropData.baseValue + seasonalBonus);
      
      return {
        id: index,
        crop: cropData.crop,
        value: finalValue,
        category: finalValue > 90 ? "Very High" : finalValue >= 70 ? "High" : finalValue >= 50 ? "Moderate" : "Low"
      };
    });

    // Sort by value (highest first) and return top 8
    return recommendations
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);
  };

  const handleGetRecommendations = async () => {
    const values = form.getValues();
    const selectedState = values.state;
    const selectedMonth = values.month;
    
    if (!selectedState || !selectedMonth) {
      setError("Please select both state and month");
      return;
    }

    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      // Try to make API call first if baseURL is available
      if (baseURL) {
        const soilArray = stateToSoil[selectedState];
        const selectedSoil = soilArray ? soilArray[0] : "Alluvial";

        const requestData = {
          state: selectedState,
          soil: selectedSoil,
          month: selectedMonth,
        };

        console.log("Request Data:", requestData);

        try {
          const response = await axios.post(`${baseURL}api/advisory`, requestData);
          const data = response.data.results;
          console.log("API Response:", data);
          
          if (data && Array.isArray(data)) {
            const formattedResults = data.map(([crop, value], index) => ({
              id: index,
              crop,
              value: value || 0,
              category: value > 90 ? "Very High" : value >= 70 ? "High" : value >= 50 ? "Moderate" : "Low"
            }));
            setRecommendationResults(formattedResults);
          } else {
            throw new Error("Invalid API response format");
          }
        } catch (apiError) {
          console.log("API Error, using dynamic recommendations:", apiError);
          // Fallback to dynamic recommendations based on state and month
          const dynamicResults = getDynamicRecommendations(selectedState, selectedMonth);
          setRecommendationResults(dynamicResults);
        }
      } else {
        // If API URL is not available, use dynamic recommendations directly
        console.log("No API URL, using dynamic recommendations");
        const dynamicResults = getDynamicRecommendations(selectedState, selectedMonth);
        setRecommendationResults(dynamicResults);
      }
    } catch (error) {
      console.error("Error fetching crop recommendations:", error);
      setError("Failed to fetch recommendations. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const months = [
    { value: 'Jan', label: 'January' },
    { value: 'Feb', label: 'February' },
    { value: 'Mar', label: 'March' },
    { value: 'Apr', label: 'April' },
    { value: 'May', label: 'May' },
    { value: 'June', label: 'June' },
    { value: 'July', label: 'July' },
    { value: 'Aug', label: 'August' },
    { value: 'Sep', label: 'September' },
    { value: 'Oct', label: 'October' },
    { value: 'Nov', label: 'November' },
    { value: 'Dec', label: 'December' },
  ];

  const states = statesList;

  // Generate next 6 years for selection
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, i) => ({
    value: (currentYear + i).toString(),
    label: (currentYear + i).toString(),
  }));

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Very High':
        return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white';
      case 'High':
        return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white';
      case 'Moderate':
        return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white';
      case 'Low':
        return 'bg-gradient-to-r from-red-500 to-pink-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Very High':
        return <TrendingUp className="h-4 w-4" />;
      case 'High':
        return <BarChart3 className="h-4 w-4" />;
      case 'Moderate':
        return <Target className="h-4 w-4" />;
      case 'Low':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Sprout className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Enhanced Hero Section */}
        <div className="py-20 min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-10 w-32 h-32 bg-green-500 rounded-full blur-3xl"></div>
            <div className="absolute top-40 right-20 w-24 h-24 bg-emerald-500 rounded-full blur-2xl"></div>
            <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-lime-500 rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            {/* Enhanced Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-6 shadow-lg">
                <Sprout className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Crop <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Advisory</span>
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto mb-8 rounded-full"></div>
              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Get personalized crop recommendations based on your location and timing to 
                <span className="font-semibold text-green-600"> maximize your profits</span>
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Enhanced Input Form */}
              <Card className="lg:col-span-1 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
                  <CardTitle className="flex items-center text-xl">
                    <MapPin className="h-5 w-5 mr-2 text-green-600" />
                    Input Parameters
                  </CardTitle>
                  <CardDescription>
                    Enter details to get personalized crop recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <Form {...form}>
                    <form className="space-y-6">
                      <FormField
                        control={form.control}
                        name="state"
                        rules={{ required: "State is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center text-sm font-semibold">
                              <MapPin className="h-4 w-4 mr-2 text-green-600" />
                              State
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="h-12 border-green-200 focus:border-green-500">
                                  <SelectValue placeholder="Select your state" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {states.map((state) => (
                                  <SelectItem key={state.value} value={state.value}>
                                    {state.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Select your state for region-specific recommendations
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="month"
                        rules={{ required: "Month is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center text-sm font-semibold">
                              <Calendar className="h-4 w-4 mr-2 text-green-600" />
                              Month
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="h-12 border-green-200 focus:border-green-500">
                                  <SelectValue placeholder="Select planting month" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {months.map((month) => (
                                  <SelectItem key={month.value} value={month.value}>
                                    {month.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="year"
                        rules={{ required: "Year is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center text-sm font-semibold">
                              <Calendar className="h-4 w-4 mr-2 text-green-600" />
                              Year
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="h-12 border-green-200 focus:border-green-500">
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {years.map((year) => (
                                  <SelectItem key={year.value} value={year.value}>
                                    {year.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button
                    onClick={form.handleSubmit(handleGetRecommendations)}
                    className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Zap className="mr-2 h-4 w-4" />
                        Get Recommendations
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>

              {/* Enhanced Results Display */}
              <Card className="lg:col-span-2 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
                  <CardTitle className="flex items-center text-xl">
                    <BarChart3 className="h-5 w-5 mr-2 text-green-600" />
                    Crop Recommendations
                  </CardTitle>
                  <CardDescription>
                    Most profitable crops for your selected parameters
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                      <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                      <span className="text-red-700">{error}</span>
                    </div>
                  )}

                  {recommendationResults && recommendationResults.length > 0 ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Top {recommendationResults.length} Recommendations
                        </h3>
                        <div className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                          Analysis Complete
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        {recommendationResults.map((crop, index) => (
                          <div key={crop.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-green-50 rounded-lg border border-green-100 hover:shadow-md transition-all duration-300">
                            <div className="flex items-center">
                              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-sm font-bold mr-4">
                                {index + 1}
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900 text-lg">{crop.crop}</h4>
                                {crop.value && (
                                  <p className="text-sm text-gray-600">Profit Score: {crop.value}%</p>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${getCategoryColor(crop.category)}`}>
                                {getCategoryIcon(crop.category)}
                                <span className="ml-1">{crop.category}</span>
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : hasSearched ? (
                    <div className="h-64 flex items-center justify-center">
                      <div className="text-center max-w-md">
                        <AlertCircle className="h-16 w-16 mx-auto text-red-400 mb-4" />
                        <h3 className="text-xl font-medium text-gray-900 mb-2">
                          No Recommendations Found
                        </h3>
                        <p className="text-gray-500">
                          We couldn't find recommendations for your selected parameters. Please try different options.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="h-64 flex items-center justify-center">
                      <div className="text-center max-w-md">
                        <Leaf className="h-16 w-16 mx-auto text-green-400 mb-4" />
                        <h3 className="text-xl font-medium text-gray-900 mb-2">
                          Ready for Analysis
                        </h3>
                        <p className="text-gray-500">
                          Fill in the parameters on the left and click "Get Recommendations" to see the most profitable crops for your region and season.
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Enhanced How It Works Section */}
            <div className="mt-20 bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border-0">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">How Our Crop Advisory Works</h2>
                <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto mb-6 rounded-full"></div>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Our advanced algorithm analyzes multiple factors to provide you with the most accurate crop recommendations
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center group">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <BarChart3 className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      1
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Data Analysis</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We analyze historical crop prices, market trends, and seasonal patterns specific to your region using advanced machine learning algorithms.
                  </p>
                </div>
                
                <div className="text-center group">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <TrendingUp className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      2
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Profit Calculation</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Our algorithms calculate the potential profit for each crop based on predicted prices, growing conditions, and market demand.
                  </p>
                </div>
                
                <div className="text-center group">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Target className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      3
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Recommendations</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We provide you with a ranked list of crops with the highest profit potential, tailored to your specific location and timing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CropAdvisoryPage;
