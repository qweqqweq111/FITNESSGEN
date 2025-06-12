import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";

interface PreferenceFormProps {
  onSubmit: (data: FormData) => void;
}

interface FormData {
  duration: string;
  fitnessLevel: string;
  equipment: string[];
  targetMuscles: string[];
}

const PreferenceForm: React.FC<PreferenceFormProps> = ({
  onSubmit = () => {},
}) => {
  const { toast } = useToast();
  const form = useForm<FormData>({
    defaultValues: {
      duration: "30",
      fitnessLevel: "beginner",
      equipment: [],
      targetMuscles: [],
    },
  });

  const durations = [
    { value: "15", label: "15 minutes" },
    { value: "30", label: "30 minutes" },
    { value: "45", label: "45 minutes" },
    { value: "60", label: "60 minutes" },
    { value: "90", label: "90 minutes" },
  ];

  const fitnessLevels = [
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
  ];

  const equipmentOptions = [
    { id: "bodyweight", label: "Bodyweight Only" },
    { id: "dumbbells", label: "Dumbbells" },
    { id: "barbell", label: "Barbell" },
    { id: "kettlebell", label: "Kettlebell" },
    { id: "resistance_bands", label: "Resistance Bands" },
    { id: "pull_up_bar", label: "Pull-up Bar" },
    { id: "bench", label: "Bench" },
    { id: "cable_machine", label: "Cable Machine" },
  ];

  const muscleGroups = [
    { id: "full_body", label: "Full Body" },
    { id: "upper_body", label: "Upper Body" },
    { id: "lower_body", label: "Lower Body" },
    { id: "core", label: "Core" },
    { id: "chest", label: "Chest" },
    { id: "back", label: "Back" },
    { id: "shoulders", label: "Shoulders" },
    { id: "arms", label: "Arms" },
    { id: "legs", label: "Legs" },
    { id: "glutes", label: "Glutes" },
  ];

  const handleSubmit = (data: FormData) => {
    // Validate that at least one equipment and one target muscle is selected
    if (data.equipment.length === 0 || data.targetMuscles.length === 0) {
      toast({
        title: "Selection Required",
        description:
          "Choosing an available equipment and target muscle is required",
        variant: "destructive",
      });
      return;
    }
    onSubmit(data);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-lg font-semibold text-gray-900 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Workout Duration
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full h-12 text-base border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 transition-colors">
                          <SelectValue placeholder="How long do you want to work out?" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {durations.map((duration) => (
                          <SelectItem
                            key={duration.value}
                            value={duration.value}
                            className="text-base py-3"
                          >
                            {duration.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fitnessLevel"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-lg font-semibold text-gray-900 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      Fitness Level
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full h-12 text-base border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 transition-colors">
                          <SelectValue placeholder="What's your current fitness level?" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {fitnessLevels.map((level) => (
                          <SelectItem
                            key={level.value}
                            value={level.value}
                            className="text-base py-3"
                          >
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <FormLabel className="text-lg font-semibold text-gray-900 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                  Available Equipment
                </FormLabel>
                <p className="text-sm text-gray-600">
                  Select all equipment you have access to
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {equipmentOptions.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-3 p-3 rounded-lg border-2 border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all cursor-pointer"
                    >
                      <Checkbox
                        id={`equipment-${item.id}`}
                        checked={form.watch("equipment")?.includes(item.id)}
                        onCheckedChange={(checked) => {
                          const currentEquipment =
                            form.getValues("equipment") || [];
                          if (checked) {
                            form.setValue("equipment", [
                              ...currentEquipment,
                              item.id,
                            ]);
                          } else {
                            form.setValue(
                              "equipment",
                              currentEquipment.filter(
                                (value) => value !== item.id,
                              ),
                            );
                          }
                        }}
                        className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      />
                      <label
                        htmlFor={`equipment-${item.id}`}
                        className="text-sm font-medium leading-none cursor-pointer flex-1"
                      >
                        {item.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <FormLabel className="text-lg font-semibold text-gray-900 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Target Muscle Groups
                </FormLabel>
                <p className="text-sm text-gray-600">
                  Choose which areas you want to focus on
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {muscleGroups.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-3 p-3 rounded-lg border-2 border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all cursor-pointer"
                    >
                      <Checkbox
                        id={`muscle-${item.id}`}
                        checked={form.watch("targetMuscles")?.includes(item.id)}
                        onCheckedChange={(checked) => {
                          const currentMuscles =
                            form.getValues("targetMuscles") || [];
                          if (checked) {
                            form.setValue("targetMuscles", [
                              ...currentMuscles,
                              item.id,
                            ]);
                          } else {
                            form.setValue(
                              "targetMuscles",
                              currentMuscles.filter(
                                (value) => value !== item.id,
                              ),
                            );
                          }
                        }}
                        className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      />
                      <label
                        htmlFor={`muscle-${item.id}`}
                        className="text-sm font-medium leading-none cursor-pointer flex-1"
                      >
                        {item.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-8">
            <Button
              type="submit"
              size="lg"
              className="w-full max-w-md h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Generate My Workout Routine
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PreferenceForm;
