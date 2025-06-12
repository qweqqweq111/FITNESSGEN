import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Dumbbell, RotateCcw } from "lucide-react";

interface ExerciseCardProps {
  name?: string;
  sets?: number;
  reps?: number;
  restPeriod?: string;
  imageUrl?: string;
  muscleGroup?: string;
  equipment?: string;
  onChangeExercise?: () => void;
}

const ExerciseCard = ({
  name = "Barbell Squat",
  sets = 3,
  reps = 12,
  restPeriod = "60 seconds",
  imageUrl = "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?w=400&q=80",
  muscleGroup = "Legs",
  equipment = "Barbell",
  onChangeExercise = () => {},
}: ExerciseCardProps) => {
  return (
    <Card className="w-full bg-white overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-0 group">
      <div className="relative h-52 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        <Badge className="absolute top-3 right-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-0 shadow-lg">
          {muscleGroup}
        </Badge>
        <div className="absolute top-3 left-3">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        </div>
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
          {name}
        </CardTitle>
        <div className="flex items-center text-sm text-gray-600 bg-gray-50 rounded-full px-3 py-1 w-fit">
          <Dumbbell className="h-4 w-4 mr-2 text-blue-500" />
          <span className="font-medium">{equipment}</span>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl text-center border border-blue-100 hover:border-blue-200 transition-colors">
            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">
              Sets × Reps
            </p>
            <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {sets} × {reps}
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl text-center border border-green-100 hover:border-green-200 transition-colors">
            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">
              Rest Time
            </p>
            <div className="flex items-center justify-center">
              <Clock className="h-4 w-4 mr-1 text-green-600" />
              <p className="text-lg font-bold text-green-700">{restPeriod}</p>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-3">
        <Button
          variant="outline"
          size="sm"
          className="w-full border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700 hover:text-blue-700 font-medium transition-all duration-200 group/btn"
          onClick={onChangeExercise}
        >
          <RotateCcw className="h-4 w-4 mr-2 group-hover/btn:rotate-180 transition-transform duration-300" />
          Switch Exercise
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ExerciseCard;
