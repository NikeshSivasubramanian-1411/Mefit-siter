import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity, 
  Search, 
  Filter, 
  Play,
  Heart,
  Target,
  Zap,
  Info
} from 'lucide-react';

const Exercises = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [muscleGroupFilter, setMuscleGroupFilter] = useState('all');
  const [selectedExercise, setSelectedExercise] = useState<any>(null);

  const exercises = [
    {
      id: 1,
      name: "Push-ups",
      targetMuscleGroup: "Chest",
      secondaryMuscles: ["Shoulders", "Triceps", "Core"],
      difficulty: "Beginner",
      equipment: "None",
      description: "A classic bodyweight exercise that builds upper body strength and endurance.",
      instructions: [
        "Start in a plank position with hands shoulder-width apart",
        "Lower your body until chest nearly touches the floor",
        "Push back up to starting position",
        "Keep your core tight throughout the movement"
      ],
      tips: [
        "Keep your body in a straight line",
        "Don't let your hips sag or pike up",
        "Control the movement on both up and down phases"
      ],
      variations: ["Knee Push-ups", "Diamond Push-ups", "Decline Push-ups"],
      videoUrl: "/videos/pushups.mp4"
    },
    {
      id: 2,
      name: "Squats",
      targetMuscleGroup: "Legs",
      secondaryMuscles: ["Glutes", "Core"],
      difficulty: "Beginner",
      equipment: "None",
      description: "Fundamental lower body exercise targeting quadriceps, glutes, and hamstrings.",
      instructions: [
        "Stand with feet shoulder-width apart",
        "Lower by bending knees and pushing hips back",
        "Descend until thighs are parallel to floor",
        "Drive through heels to return to standing"
      ],
      tips: [
        "Keep chest up and core engaged",
        "Knees should track over toes",
        "Weight should be on heels, not toes"
      ],
      variations: ["Goblet Squats", "Jump Squats", "Bulgarian Split Squats"],
      videoUrl: "/videos/squats.mp4"
    },
    {
      id: 3,
      name: "Deadlifts",
      targetMuscleGroup: "Back",
      secondaryMuscles: ["Legs", "Glutes", "Core"],
      difficulty: "Intermediate",
      equipment: "Barbell",
      description: "Compound movement that builds total body strength, focusing on the posterior chain.",
      instructions: [
        "Stand with barbell over mid-foot",
        "Bend at hips and knees to grip bar",
        "Keep chest up and shoulders back",
        "Drive through heels to lift bar"
      ],
      tips: [
        "Keep bar close to your body",
        "Maintain neutral spine throughout",
        "Engage lats to keep bar path straight"
      ],
      variations: ["Romanian Deadlifts", "Sumo Deadlifts", "Trap Bar Deadlifts"],
      videoUrl: "/videos/deadlifts.mp4"
    },
    {
      id: 4,
      name: "Pull-ups",
      targetMuscleGroup: "Back",
      secondaryMuscles: ["Biceps", "Shoulders"],
      difficulty: "Advanced",
      equipment: "Pull-up bar",
      description: "Upper body pulling exercise that builds back and arm strength.",
      instructions: [
        "Hang from pull-up bar with palms facing away",
        "Pull body up until chin clears the bar",
        "Lower with control to full arm extension",
        "Maintain tight core throughout"
      ],
      tips: [
        "Start from a dead hang position",
        "Use full range of motion",
        "Avoid swinging or kipping"
      ],
      variations: ["Chin-ups", "Wide-grip Pull-ups", "Assisted Pull-ups"],
      videoUrl: "/videos/pullups.mp4"
    },
    {
      id: 5,
      name: "Plank",
      targetMuscleGroup: "Core",
      secondaryMuscles: ["Shoulders", "Back"],
      difficulty: "Beginner",
      equipment: "None",
      description: "Isometric core exercise that builds stability and endurance.",
      instructions: [
        "Start in push-up position on forearms",
        "Keep body in straight line from head to feet",
        "Hold position while breathing normally",
        "Engage core muscles throughout"
      ],
      tips: [
        "Don't let hips sag or pike up",
        "Keep shoulders over elbows",
        "Breathe steadily during hold"
      ],
      variations: ["Side Plank", "Plank Up-downs", "Mountain Climbers"],
      videoUrl: "/videos/plank.mp4"
    },
    {
      id: 6,
      name: "Bench Press",
      targetMuscleGroup: "Chest",
      secondaryMuscles: ["Shoulders", "Triceps"],
      difficulty: "Intermediate",
      equipment: "Barbell, Bench",
      description: "Classic upper body pressing movement for building chest strength.",
      instructions: [
        "Lie on bench with feet flat on floor",
        "Grip bar slightly wider than shoulder-width",
        "Lower bar to chest with control",
        "Press bar back to starting position"
      ],
      tips: [
        "Keep shoulder blades retracted",
        "Maintain arch in lower back",
        "Control the descent and explosive ascent"
      ],
      variations: ["Dumbbell Press", "Incline Press", "Close-grip Press"],
      videoUrl: "/videos/benchpress.mp4"
    }
  ];

  const muscleGroups = ['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core'];

  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMuscleGroup = muscleGroupFilter === 'all' || 
                              exercise.targetMuscleGroup.toLowerCase() === muscleGroupFilter.toLowerCase();
    return matchesSearch && matchesMuscleGroup;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getMuscleGroupColor = (muscleGroup: string) => {
    const colors = {
      'Chest': 'bg-red-100 text-red-800',
      'Back': 'bg-blue-100 text-blue-800',
      'Legs': 'bg-green-100 text-green-800',
      'Shoulders': 'bg-purple-100 text-purple-800',
      'Arms': 'bg-orange-100 text-orange-800',
      'Core': 'bg-pink-100 text-pink-800'
    };
    return colors[muscleGroup as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (selectedExercise) {
    return (
      <div className="space-y-8 animate-fade-in">
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            onClick={() => setSelectedExercise(null)}
          >
            ← Back to Exercises
          </Button>
          <div>
            <h1 className="text-3xl font-bold gradient-text">{selectedExercise.name}</h1>
            <p className="text-muted-foreground">Exercise Details & Instructions</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video/Image Section */}
          <div className="lg:col-span-2">
            <Card className="card-glow">
              <CardContent className="p-0">
                <div className="w-full h-64 lg:h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                  <Play className="w-20 h-20 text-primary opacity-50" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Exercise Info */}
          <div className="space-y-6">
            <Card className="card-glow">
              <CardHeader>
                <CardTitle>Exercise Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge className={getDifficultyColor(selectedExercise.difficulty)}>
                    {selectedExercise.difficulty}
                  </Badge>
                  <Badge className={getMuscleGroupColor(selectedExercise.targetMuscleGroup)}>
                    {selectedExercise.targetMuscleGroup}
                  </Badge>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Equipment</h4>
                  <p className="text-sm text-muted-foreground">{selectedExercise.equipment}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Secondary Muscles</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedExercise.secondaryMuscles.map((muscle: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {muscle}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button className="w-full btn-hero">
                  <Zap className="w-4 h-4 mr-2" />
                  Add to Workout
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Instructions and Tips */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="card-glow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span>Instructions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3">
                {selectedExercise.instructions.map((instruction: string, index: number) => (
                  <li key={index} className="flex space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    <span className="text-sm">{instruction}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          <Card className="card-glow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Info className="w-5 h-5" />
                <span>Tips & Variations</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">Form Tips</h4>
                <ul className="space-y-2">
                  {selectedExercise.tips.map((tip: string, index: number) => (
                    <li key={index} className="flex items-start space-x-2 text-sm">
                      <span className="text-primary">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-3">Variations</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedExercise.variations.map((variation: string, index: number) => (
                    <Badge key={index} variant="secondary">
                      {variation}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold gradient-text">Exercise Library</h1>
        <p className="text-muted-foreground mt-2">Explore detailed exercise instructions and proper form guides</p>
      </div>

      {/* Search and Filters */}
      <Card className="card-glow">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search exercises..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={muscleGroupFilter} onValueChange={setMuscleGroupFilter}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Muscle Group" />
              </SelectTrigger>
              <SelectContent>
                {muscleGroups.map((group) => (
                  <SelectItem key={group} value={group.toLowerCase()}>
                    {group}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Exercises Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExercises.map((exercise) => (
          <Card key={exercise.id} className="card-glow hover:shadow-glow transition-all duration-300 group cursor-pointer"
                onClick={() => setSelectedExercise(exercise)}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Activity className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {exercise.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{exercise.targetMuscleGroup}</p>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {exercise.description}
              </p>

              <div className="flex flex-wrap gap-2">
                <Badge className={getDifficultyColor(exercise.difficulty)}>
                  {exercise.difficulty}
                </Badge>
                <Badge variant="outline">
                  {exercise.equipment}
                </Badge>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Secondary Muscles:</p>
                <div className="flex flex-wrap gap-1">
                  {exercise.secondaryMuscles.slice(0, 3).map((muscle, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {muscle}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2">
                <Button className="flex-1" variant="outline">
                  View Details
                </Button>
                <Button variant="outline" size="icon">
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredExercises.length === 0 && (
        <Card className="card-glow">
          <CardContent className="text-center py-12">
            <Activity className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-xl font-semibold mb-2">No Exercises Found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Exercises;