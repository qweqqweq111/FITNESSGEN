import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const ClassDiagram = () => {
  return (
    <Card className="w-full bg-white">
      <CardContent className="p-6">
        <div className="overflow-auto">
          <svg
            width="1000"
            height="800"
            viewBox="0 0 1000 800"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* HomePage Class */}
            <rect
              x="400"
              y="50"
              width="200"
              height="150"
              fill="#e6f7ff"
              stroke="#1890ff"
              strokeWidth="2"
            />
            <text x="500" y="75" textAnchor="middle" fontWeight="bold">
              HomePage
            </text>
            <line
              x1="400"
              y1="85"
              x2="600"
              y2="85"
              stroke="#1890ff"
              strokeWidth="2"
            />
            <text x="410" y="105" fontSize="12">
              - workoutRoutine: WorkoutRoutineData
            </text>
            <text x="410" y="125" fontSize="12">
              - isLoading: boolean
            </text>
            <line
              x1="400"
              y1="135"
              x2="600"
              y2="135"
              stroke="#1890ff"
              strokeWidth="2"
            />
            <text x="410" y="155" fontSize="12">
              + generateWorkoutRoutine()
            </text>
            <text x="410" y="175" fontSize="12">
              + handleGenerateNewRoutine()
            </text>

            {/* PreferenceForm Class */}
            <rect
              x="100"
              y="300"
              width="200"
              height="150"
              fill="#f6ffed"
              stroke="#52c41a"
              strokeWidth="2"
            />
            <text x="200" y="325" textAnchor="middle" fontWeight="bold">
              PreferenceForm
            </text>
            <line
              x1="100"
              y1="335"
              x2="300"
              y2="335"
              stroke="#52c41a"
              strokeWidth="2"
            />
            <text x="110" y="355" fontSize="12">
              - form: FormData
            </text>
            <text x="110" y="375" fontSize="12">
              - durations: Array
            </text>
            <text x="110" y="395" fontSize="12">
              - fitnessLevels: Array
            </text>
            <text x="110" y="415" fontSize="12">
              - equipmentOptions: Array
            </text>
            <line
              x1="100"
              y1="425"
              x2="300"
              y2="425"
              stroke="#52c41a"
              strokeWidth="2"
            />
            <text x="110" y="445" fontSize="12">
              + handleSubmit(data: FormData)
            </text>

            {/* WorkoutRoutine Class */}
            <rect
              x="400"
              y="300"
              width="200"
              height="170"
              fill="#fff7e6"
              stroke="#fa8c16"
              strokeWidth="2"
            />
            <text x="500" y="325" textAnchor="middle" fontWeight="bold">
              WorkoutRoutine
            </text>
            <line
              x1="400"
              y1="335"
              x2="600"
              y2="335"
              stroke="#fa8c16"
              strokeWidth="2"
            />
            <text x="410" y="355" fontSize="12">
              - workoutExercises: Exercise[]
            </text>
            <text x="410" y="375" fontSize="12">
              - alternativeExercises: Object
            </text>
            <line
              x1="400"
              y1="385"
              x2="600"
              y2="385"
              stroke="#fa8c16"
              strokeWidth="2"
            />
            <text x="410" y="405" fontSize="12">
              + handlePrint()
            </text>
            <text x="410" y="425" fontSize="12">
              + handleChangeExercise(id)
            </text>

            {/* ExerciseCard Class */}
            <rect
              x="700"
              y="300"
              width="200"
              height="150"
              fill="#f9f0ff"
              stroke="#722ed1"
              strokeWidth="2"
            />
            <text x="800" y="325" textAnchor="middle" fontWeight="bold">
              ExerciseCard
            </text>
            <line
              x1="700"
              y1="335"
              x2="900"
              y2="335"
              stroke="#722ed1"
              strokeWidth="2"
            />
            <text x="710" y="355" fontSize="12">
              - name: string
            </text>
            <text x="710" y="375" fontSize="12">
              - sets: number
            </text>
            <text x="710" y="395" fontSize="12">
              - reps: number
            </text>
            <text x="710" y="415" fontSize="12">
              - restPeriod: string
            </text>
            <text x="710" y="435" fontSize="12">
              - imageUrl: string
            </text>
            <line
              x1="700"
              y1="445"
              x2="900"
              y2="445"
              stroke="#722ed1"
              strokeWidth="2"
            />
            <text x="710" y="465" fontSize="12">
              + onChangeExercise()
            </text>

            {/* Exercise Interface */}
            <rect
              x="400"
              y="550"
              width="200"
              height="170"
              fill="#f0f5ff"
              stroke="#2f54eb"
              strokeWidth="2"
              rx="5"
              ry="5"
            />
            <text
              x="500"
              y="575"
              textAnchor="middle"
              fontWeight="bold"
              fontStyle="italic"
            >
              «interface»
            </text>
            <text x="500" y="595" textAnchor="middle" fontWeight="bold">
              Exercise
            </text>
            <line
              x1="400"
              y1="605"
              x2="600"
              y2="605"
              stroke="#2f54eb"
              strokeWidth="2"
            />
            <text x="410" y="625" fontSize="12">
              + id: string
            </text>
            <text x="410" y="645" fontSize="12">
              + name: string
            </text>
            <text x="410" y="665" fontSize="12">
              + sets: number
            </text>
            <text x="410" y="685" fontSize="12">
              + reps: number
            </text>
            <text x="410" y="705" fontSize="12">
              + rest: number
            </text>
            <text x="410" y="725" fontSize="12">
              + illustration: string
            </text>

            {/* FormData Interface */}
            <rect
              x="100"
              y="550"
              width="200"
              height="130"
              fill="#f0f5ff"
              stroke="#2f54eb"
              strokeWidth="2"
              rx="5"
              ry="5"
            />
            <text
              x="200"
              y="575"
              textAnchor="middle"
              fontWeight="bold"
              fontStyle="italic"
            >
              «interface»
            </text>
            <text x="200" y="595" textAnchor="middle" fontWeight="bold">
              FormData
            </text>
            <line
              x1="100"
              y1="605"
              x2="300"
              y2="605"
              stroke="#2f54eb"
              strokeWidth="2"
            />
            <text x="110" y="625" fontSize="12">
              + duration: string
            </text>
            <text x="110" y="645" fontSize="12">
              + fitnessLevel: string
            </text>
            <text x="110" y="665" fontSize="12">
              + equipment: string[]
            </text>
            <text x="110" y="685" fontSize="12">
              + targetMuscles: string[]
            </text>

            {/* WorkoutRoutineData Interface */}
            <rect
              x="700"
              y="550"
              width="200"
              height="100"
              fill="#f0f5ff"
              stroke="#2f54eb"
              strokeWidth="2"
              rx="5"
              ry="5"
            />
            <text
              x="800"
              y="575"
              textAnchor="middle"
              fontWeight="bold"
              fontStyle="italic"
            >
              «interface»
            </text>
            <text x="800" y="595" textAnchor="middle" fontWeight="bold">
              WorkoutRoutineData
            </text>
            <line
              x1="700"
              y1="605"
              x2="900"
              y2="605"
              stroke="#2f54eb"
              strokeWidth="2"
            />
            <text x="710" y="625" fontSize="12">
              + title: string
            </text>
            <text x="710" y="645" fontSize="12">
              + exercises: WorkoutExercise[]
            </text>

            {/* Relationships */}
            {/* HomePage uses PreferenceForm */}
            <line
              x1="400"
              y1="125"
              x2="200"
              y2="300"
              stroke="#000"
              strokeWidth="1"
              strokeDasharray="5,5"
            />
            <polygon points="200,290 190,300 210,300" fill="#000" />
            <text x="250" y="250" fontSize="12">
              uses
            </text>

            {/* HomePage uses WorkoutRoutine */}
            <line
              x1="500"
              y1="200"
              x2="500"
              y2="300"
              stroke="#000"
              strokeWidth="1"
              strokeDasharray="5,5"
            />
            <polygon points="490,290 500,300 510,290" fill="#000" />
            <text x="510" y="250" fontSize="12">
              uses
            </text>

            {/* WorkoutRoutine uses ExerciseCard */}
            <line
              x1="600"
              y1="375"
              x2="700"
              y2="375"
              stroke="#000"
              strokeWidth="1"
              strokeDasharray="5,5"
            />
            <polygon points="690,365 700,375 690,385" fill="#000" />
            <text x="650" y="365" fontSize="12">
              uses
            </text>

            {/* WorkoutRoutine implements Exercise */}
            <line
              x1="500"
              y1="470"
              x2="500"
              y2="550"
              stroke="#000"
              strokeWidth="1"
            />
            <polygon points="490,540 500,550 510,540" fill="#000" />

            {/* PreferenceForm implements FormData */}
            <line
              x1="200"
              y1="450"
              x2="200"
              y2="550"
              stroke="#000"
              strokeWidth="1"
            />
            <polygon points="190,540 200,550 210,540" fill="#000" />

            {/* HomePage implements WorkoutRoutineData */}
            <line
              x1="600"
              y1="125"
              x2="800"
              y2="550"
              stroke="#000"
              strokeWidth="1"
            />
            <polygon points="790,540 800,550 810,540" fill="#000" />
          </svg>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClassDiagram;
