import React from "react";
import { motion } from "framer-motion";
import { Dumbbell, Heart, Users, Zap } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Health First",
      description:
        "I believe fitness should be accessible, safe, and enjoyable for everyone, regardless of their starting point.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community Driven",
      description:
        "This platform is built based on real user feedback and the collective wisdom of fitness enthusiasts worldwide.",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Innovation",
      description:
        "I continuously evolve the algorithms and features to provide the most effective and personalized fitness experience.",
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
              <a
                href="/features"
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                Features
              </a>
              <a href="/about" className="text-blue-600 font-medium">
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
              About FitGen ProMax
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              I'm on a mission to make personalized fitness accessible to
              everyone. This platform combines cutting-edge technology with
              proven fitness science to create the perfect workout for you.
            </p>
          </motion.div>

          {/* Mission Section */}
          <motion.div
            className="bg-white/70 backdrop-blur-sm rounded-3xl p-12 mb-16 border border-white/20"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Mission
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  I believe that everyone deserves access to personalized,
                  effective fitness routines. Traditional one-size-fits-all
                  approaches don't work because every person is unique.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed">
                  That's why I've created an intelligent system that considers
                  your individual needs, preferences, and constraints to
                  generate workout routines that are not just effective, but
                  also enjoyable and sustainable.
                </p>
              </div>
              <div className="relative">
                <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Dumbbell className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      Fitness for Everyone
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Values Section */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="text-center bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-6 text-white">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
