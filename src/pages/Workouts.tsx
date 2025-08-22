import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Dumbbell, 
  Search, 
  Filter, 
  Clock, 
  Flame,
  Play,
  Heart,
  Target
} from 'lucide-react';

const Workouts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const workouts = [
    {
      id: 1,
      name: "Upper Body Strength",
      type: "Strength",
      duration: 45,
      exercises: 8,
      difficulty: "Intermediate",
      calories: 220,
      description: "Build upper body strength with compound movements focusing on chest, back, and arms.",
      exerciseList: ["Push-ups", "Pull-ups", "Bench Press", "Rows", "Shoulder Press", "Bicep Curls", "Tricep Dips", "Plank"],
      equipment: ["Dumbbells", "Pull-up bar", "Bench"]
    },
    {
      id: 2,
      name: "HIIT Cardio Blast",
      type: "Cardio",
      duration: 30,
      exercises: 6,
      difficulty: "Advanced",
      calories: 400,
      description: "High-intensity interval training to maximize calorie burn and improve cardiovascular fitness.",
      exerciseList: ["Burpees", "Mountain Climbers", "Jump Squats", "High Knees", "Sprint Intervals", "Jumping Jacks"],
      equipment: ["None"]
    },
    {
      id: 3,
      name: "Lower Body Power",
      type: "Strength",
      duration: 50,
      exercises: 10,
      difficulty: "Intermediate",
      calories: 280,
      description: "Develop explosive power and strength in your legs and glutes.",
      exerciseList: ["Squats", "Deadlifts", "Lunges", "Bulgarian Split Squats", "Calf Raises", "Hip Thrusts", "Wall Sits", "Jump Squats", "Step-ups", "Leg Press"],
      equipment: ["Barbell", "Dumbbells", "Step platform"]
    },
    {
      id: 4,
      name: "Core & Flexibility",
      type: "Flexibility",
      duration: 35,
      exercises: 12,
      difficulty: "Beginner",
      calories: 150,
      description: "Strengthen your core and improve flexibility with stretching and stability exercises.",
      exerciseList: ["Plank", "Side Plank", "Bicycle Crunches", "Dead Bug", "Cat-Cow", "Child's Pose", "Pigeon Pose", "Hamstring Stretch", "Hip Flexor Stretch", "Spinal Twist", "Bridge", "Bird Dog"],
      equipment: ["Yoga mat"]
    },
    {
      id: 5,
      name: "Full Body Circuit",
      type: "Circuit",
      duration: 40,
      exercises: 8,
      difficulty: "Intermediate",
      calories: 320,
      description: "Complete full-body workout combining strength and cardio in a circuit format.",
      exerciseList: ["Squat to Press", "Renegade Rows", "Thrusters", "Burpees", "Kettlebell Swings", "Box Jumps", "Push-up to T", "Turkish Get-ups"],
      equipment: ["Dumbbells", "Kettlebell", "Box"]
    },
    {
      id: 6,
      name: "Yoga Flow",
      type: "Yoga",
      duration: 60,
      exercises: 15,
      difficulty: "Beginner",
      calories: 180,
      description: "Flowing yoga sequence to improve flexibility, balance, and mindfulness.",
      exerciseList: ["Sun Salutation", "Warrior I", "Warrior II", "Triangle Pose", "Tree Pose", "Downward Dog", "Cobra", "Pigeon", "Seated Twist", "Lotus", "Savasana", "Mountain Pose", "Standing Forward Fold", "Bridge Pose", "Happy Baby"],
      equipment: ["Yoga mat", "Blocks", "Strap"]
    }
  ];

  const workoutTypes = ['All', 'Strength', 'Cardio', 'Flexibility', 'Circuit', 'Yoga'];

  const filteredWorkouts = workouts.filter(workout => {
    const matchesSearch = workout.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workout.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || 
                       workout.type.toLowerCase() === typeFilter.toLowerCase();
    return matchesSearch && matchesType;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Strength': return Dumbbell;
      case 'Cardio': return Heart;
      case 'Flexibility': return Target;
      case 'Circuit': return Flame;
      case 'Yoga': return Target;
      default: return Dumbbell;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold gradient-text">Workouts</h1>
        <p className="text-muted-foreground mt-2">Browse and start individual workouts tailored to your fitness level</p>
      </div>

      {/* Search and Filters */}
      <Card className="card-glow">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search workouts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Workout Type" />
              </SelectTrigger>
              <SelectContent>
                {workoutTypes.map((type) => (
                  <SelectItem key={type} value={type.toLowerCase()}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Workouts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkouts.map((workout) => {
          const TypeIcon = getTypeIcon(workout.type);
          return (
            <Card key={workout.id} className="card-glow hover:shadow-glow transition-all duration-300 group">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <TypeIcon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {workout.name}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">{workout.type}</p>
                    </div>
                  </div>
                  <Badge 
                    className={`${getDifficultyColor(workout.difficulty)}`}
                  >
                    {workout.difficulty}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {workout.description}
                </p>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="space-y-1">
                    <Clock className="w-4 h-4 mx-auto text-muted-foreground" />
                    <p className="text-sm font-medium">{workout.duration}min</p>
                  </div>
                  <div className="space-y-1">
                    <Target className="w-4 h-4 mx-auto text-muted-foreground" />
                    <p className="text-sm font-medium">{workout.exercises} exercises</p>
                  </div>
                  <div className="space-y-1">
                    <Flame className="w-4 h-4 mx-auto text-muted-foreground" />
                    <p className="text-sm font-medium">{workout.calories} cal</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Key Exercises:</p>
                  <div className="flex flex-wrap gap-1">
                    {workout.exerciseList.slice(0, 4).map((exercise, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {exercise}
                      </Badge>
                    ))}
                    {workout.exerciseList.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{workout.exerciseList.length - 4} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Equipment:</p>
                  <div className="flex flex-wrap gap-1">
                    {workout.equipment.map((item, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button className="flex-1 btn-hero">
                    <Play className="w-4 h-4 mr-2" />
                    Start Workout
                  </Button>
                  <Button variant="outline" size="icon">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredWorkouts.length === 0 && (
        <Card className="card-glow">
          <CardContent className="text-center py-12">
            <Dumbbell className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-xl font-semibold mb-2">No Workouts Found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Workouts;