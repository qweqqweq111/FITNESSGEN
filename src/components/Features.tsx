import React from "react";
import { motion } from "framer-motion";
import { Dumbbell, Zap, Target, Clock, Users, Award } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Dumbbell className="h-8 w-8" />,
      title: "Smart Exercise Selection",
      description:
        "Our intelligent algorithm selects the perfect exercises based on your available equipment, fitness level, and target muscle groups.",
      color: "from-blue-500 to-indigo-500",
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Personalized Routines",
      description:
        "Every workout is tailored specifically to your goals, whether you're building strength, losing weight, or improving endurance.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Flexible Duration",
      description:
        "Choose from quick 15-minute sessions to comprehensive 90-minute workouts that fit perfectly into your schedule.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Instant Generation",
      description:
        "Get your complete workout routine in seconds. No waiting, no complicated setup - just instant, actionable fitness plans.",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "All Fitness Levels",
      description:
        "From complete beginners to advanced athletes, our system adapts to provide appropriate challenges for everyone.",
      color: "from-teal-500 to-cyan-500",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Professional Quality",
      description:
        "Every routine follows proven fitness principles and includes proper form guidance, rest periods, and progression strategies.",
      color: "from-indigo-500 to-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
                <Dumbbell className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                FitGen ProMax
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a
                href="/"
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                Home
              </a>
              <a href="/features" className="text-blue-600 font-medium">
                Features
              </a>
              <a
                href="/about"
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                About
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6">
              Powerful Features
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover what makes FitGen ProMax the ultimate fitness routine
              generator. Every feature is designed to help you achieve your
              fitness goals faster and more effectively.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 text-white`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            className="mt-20 text-center bg-white/70 backdrop-blur-sm rounded-3xl p-12 border border-white/20"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Fitness Journey?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of users who have already discovered the power of
              personalized workout generation.
            </p>
            <a
              href="/"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
            >
              Start Generating Workouts
              <svg
                className="ml-2 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Features;
