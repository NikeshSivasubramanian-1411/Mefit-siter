import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save,
  PlaySquare,
  Dumbbell,
  Activity,
  Search,
  Filter
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contributor = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('programs');
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for contributor's created content
  const myPrograms = [
    {
      id: 1,
      name: "Beginner's Strength Foundation",
      category: "Strength Training",
      workouts: 12,
      created: "2024-01-10",
      status: "published"
    },
    {
      id: 2,
      name: "HIIT Cardio Challenge",
      category: "Cardio",
      workouts: 8,
      created: "2024-01-08",
      status: "draft"
    }
  ];

  const myWorkouts = [
    {
      id: 1,
      name: "Upper Body Strength",
      type: "Strength",
      exercises: 8,
      duration: 45,
      created: "2024-01-12",
      status: "published"
    },
    {
      id: 2,
      name: "HIIT Cardio Blast",
      type: "Cardio",
      exercises: 6,
      duration: 30,
      created: "2024-01-11",
      status: "published"
    },
    {
      id: 3,
      name: "Core & Flexibility",
      type: "Flexibility",
      exercises: 12,
      duration: 35,
      created: "2024-01-09",
      status: "draft"
    }
  ];

  const myExercises = [
    {
      id: 1,
      name: "Diamond Push-ups",
      targetMuscle: "Chest",
      equipment: "None",
      difficulty: "Intermediate",
      created: "2024-01-13",
      status: "published"
    },
    {
      id: 2,
      name: "Bulgarian Split Squats",
      targetMuscle: "Legs",
      equipment: "Bench",
      difficulty: "Intermediate",
      created: "2024-01-12",
      status: "published"
    },
    {
      id: 3,
      name: "Turkish Get-ups",
      targetMuscle: "Full Body",
      equipment: "Kettlebell",
      difficulty: "Advanced",
      created: "2024-01-10",
      status: "draft"
    }
  ];

  const [newProgram, setNewProgram] = useState({
    name: '',
    category: '',
    description: '',
    duration: '',
    workoutsPerWeek: ''
  });

  const [newWorkout, setNewWorkout] = useState({
    name: '',
    type: '',
    description: '',
    estimatedDuration: '',
    difficulty: ''
  });

  const [newExercise, setNewExercise] = useState({
    name: '',
    targetMuscle: '',
    equipment: '',
    difficulty: '',
    description: '',
    instructions: ''
  });

  if (!user?.isContributor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="card-glow max-w-md">
          <CardContent className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Access Restricted</h2>
            <p className="text-muted-foreground mb-6">
              You need contributor permissions to access this area.
            </p>
            <Button asChild>
              <a href="/profile">Request Access</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleCreateProgram = () => {
    toast({
      title: "Program created!",
      description: "Your new program has been saved as a draft."
    });
    setNewProgram({ name: '', category: '', description: '', duration: '', workoutsPerWeek: '' });
    setIsCreating(false);
  };

  const handleCreateWorkout = () => {
    toast({
      title: "Workout created!",
      description: "Your new workout has been saved as a draft."
    });
    setNewWorkout({ name: '', type: '', description: '', estimatedDuration: '', difficulty: '' });
    setIsCreating(false);
  };

  const handleCreateExercise = () => {
    toast({
      title: "Exercise created!",
      description: "Your new exercise has been saved as a draft."
    });
    setNewExercise({ name: '', targetMuscle: '', equipment: '', difficulty: '', description: '', instructions: '' });
    setIsCreating(false);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Contributor Area</h1>
          <p className="text-muted-foreground mt-2">Create and manage fitness content</p>
        </div>
        <Button 
          onClick={() => setIsCreating(true)} 
          className="btn-hero"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create New
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="programs" className="flex items-center space-x-2">
            <PlaySquare className="w-4 h-4" />
            <span>Programs</span>
          </TabsTrigger>
          <TabsTrigger value="workouts" className="flex items-center space-x-2">
            <Dumbbell className="w-4 h-4" />
            <span>Workouts</span>
          </TabsTrigger>
          <TabsTrigger value="exercises" className="flex items-center space-x-2">
            <Activity className="w-4 h-4" />
            <span>Exercises</span>
          </TabsTrigger>
        </TabsList>

        {/* Programs Tab */}
        <TabsContent value="programs" className="space-y-6">
          {isCreating && activeTab === 'programs' ? (
            <Card className="card-glow">
              <CardHeader>
                <CardTitle>Create New Program</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="program-name">Program Name</Label>
                    <Input
                      id="program-name"
                      value={newProgram.name}
                      onChange={(e) => setNewProgram({...newProgram, name: e.target.value})}
                      placeholder="Enter program name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="program-category">Category</Label>
                    <Select 
                      value={newProgram.category} 
                      onValueChange={(value) => setNewProgram({...newProgram, category: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="strength">Strength Training</SelectItem>
                        <SelectItem value="cardio">Cardio</SelectItem>
                        <SelectItem value="flexibility">Flexibility</SelectItem>
                        <SelectItem value="yoga">Yoga</SelectItem>
                        <SelectItem value="sports">Sports Specific</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="program-duration">Duration (weeks)</Label>
                    <Input
                      id="program-duration"
                      type="number"
                      value={newProgram.duration}
                      onChange={(e) => setNewProgram({...newProgram, duration: e.target.value})}
                      placeholder="4"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="program-frequency">Workouts per week</Label>
                    <Input
                      id="program-frequency"
                      type="number"
                      value={newProgram.workoutsPerWeek}
                      onChange={(e) => setNewProgram({...newProgram, workoutsPerWeek: e.target.value})}
                      placeholder="3"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="program-description">Description</Label>
                  <Textarea
                    id="program-description"
                    value={newProgram.description}
                    onChange={(e) => setNewProgram({...newProgram, description: e.target.value})}
                    placeholder="Describe your program..."
                    rows={4}
                  />
                </div>

                <div className="flex space-x-4">
                  <Button onClick={handleCreateProgram} className="btn-hero">
                    <Save className="w-4 h-4 mr-2" />
                    Save Program
                  </Button>
                  <Button variant="outline" onClick={() => setIsCreating(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search programs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="grid gap-4">
                {myPrograms.map((program) => (
                  <Card key={program.id} className="card-glow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-primary/10 rounded-lg">
                            <PlaySquare className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{program.name}</h3>
                            <p className="text-sm text-muted-foreground">{program.category}</p>
                            <p className="text-xs text-muted-foreground">Created: {program.created}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Badge variant={program.status === 'published' ? 'default' : 'secondary'}>
                            {program.status}
                          </Badge>
                          <div className="text-right text-sm text-muted-foreground">
                            <p>{program.workouts} workouts</p>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="icon">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="icon">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </TabsContent>

        {/* Workouts Tab */}
        <TabsContent value="workouts" className="space-y-6">
          {isCreating && activeTab === 'workouts' ? (
            <Card className="card-glow">
              <CardHeader>
                <CardTitle>Create New Workout</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="workout-name">Workout Name</Label>
                    <Input
                      id="workout-name"
                      value={newWorkout.name}
                      onChange={(e) => setNewWorkout({...newWorkout, name: e.target.value})}
                      placeholder="Enter workout name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="workout-type">Type</Label>
                    <Select 
                      value={newWorkout.type} 
                      onValueChange={(value) => setNewWorkout({...newWorkout, type: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="strength">Strength</SelectItem>
                        <SelectItem value="cardio">Cardio</SelectItem>
                        <SelectItem value="flexibility">Flexibility</SelectItem>
                        <SelectItem value="circuit">Circuit</SelectItem>
                        <SelectItem value="yoga">Yoga</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="workout-duration">Duration (minutes)</Label>
                    <Input
                      id="workout-duration"
                      type="number"
                      value={newWorkout.estimatedDuration}
                      onChange={(e) => setNewWorkout({...newWorkout, estimatedDuration: e.target.value})}
                      placeholder="45"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="workout-difficulty">Difficulty</Label>
                    <Select 
                      value={newWorkout.difficulty} 
                      onValueChange={(value) => setNewWorkout({...newWorkout, difficulty: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="workout-description">Description</Label>
                  <Textarea
                    id="workout-description"
                    value={newWorkout.description}
                    onChange={(e) => setNewWorkout({...newWorkout, description: e.target.value})}
                    placeholder="Describe your workout..."
                    rows={4}
                  />
                </div>

                <div className="flex space-x-4">
                  <Button onClick={handleCreateWorkout} className="btn-hero">
                    <Save className="w-4 h-4 mr-2" />
                    Save Workout
                  </Button>
                  <Button variant="outline" onClick={() => setIsCreating(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search workouts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="grid gap-4">
                {myWorkouts.map((workout) => (
                  <Card key={workout.id} className="card-glow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-primary/10 rounded-lg">
                            <Dumbbell className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{workout.name}</h3>
                            <p className="text-sm text-muted-foreground">{workout.type}</p>
                            <p className="text-xs text-muted-foreground">Created: {workout.created}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Badge variant={workout.status === 'published' ? 'default' : 'secondary'}>
                            {workout.status}
                          </Badge>
                          <div className="text-right text-sm text-muted-foreground">
                            <p>{workout.exercises} exercises</p>
                            <p>{workout.duration}min</p>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="icon">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="icon">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </TabsContent>

        {/* Exercises Tab */}
        <TabsContent value="exercises" className="space-y-6">
          {isCreating && activeTab === 'exercises' ? (
            <Card className="card-glow">
              <CardHeader>
                <CardTitle>Create New Exercise</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="exercise-name">Exercise Name</Label>
                    <Input
                      id="exercise-name"
                      value={newExercise.name}
                      onChange={(e) => setNewExercise({...newExercise, name: e.target.value})}
                      placeholder="Enter exercise name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="exercise-muscle">Target Muscle</Label>
                    <Select 
                      value={newExercise.targetMuscle} 
                      onValueChange={(value) => setNewExercise({...newExercise, targetMuscle: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select muscle group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="chest">Chest</SelectItem>
                        <SelectItem value="back">Back</SelectItem>
                        <SelectItem value="legs">Legs</SelectItem>
                        <SelectItem value="shoulders">Shoulders</SelectItem>
                        <SelectItem value="arms">Arms</SelectItem>
                        <SelectItem value="core">Core</SelectItem>
                        <SelectItem value="full-body">Full Body</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="exercise-equipment">Equipment</Label>
                    <Input
                      id="exercise-equipment"
                      value={newExercise.equipment}
                      onChange={(e) => setNewExercise({...newExercise, equipment: e.target.value})}
                      placeholder="e.g., Dumbbells, None, Barbell"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="exercise-difficulty">Difficulty</Label>
                    <Select 
                      value={newExercise.difficulty} 
                      onValueChange={(value) => setNewExercise({...newExercise, difficulty: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="exercise-description">Description</Label>
                  <Textarea
                    id="exercise-description"
                    value={newExercise.description}
                    onChange={(e) => setNewExercise({...newExercise, description: e.target.value})}
                    placeholder="Brief description of the exercise..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="exercise-instructions">Instructions</Label>
                  <Textarea
                    id="exercise-instructions"
                    value={newExercise.instructions}
                    onChange={(e) => setNewExercise({...newExercise, instructions: e.target.value})}
                    placeholder="Step-by-step instructions..."
                    rows={5}
                  />
                </div>

                <div className="flex space-x-4">
                  <Button onClick={handleCreateExercise} className="btn-hero">
                    <Save className="w-4 h-4 mr-2" />
                    Save Exercise
                  </Button>
                  <Button variant="outline" onClick={() => setIsCreating(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search exercises..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="grid gap-4">
                {myExercises.map((exercise) => (
                  <Card key={exercise.id} className="card-glow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-primary/10 rounded-lg">
                            <Activity className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{exercise.name}</h3>
                            <p className="text-sm text-muted-foreground">{exercise.targetMuscle}</p>
                            <p className="text-xs text-muted-foreground">Created: {exercise.created}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Badge variant={exercise.status === 'published' ? 'default' : 'secondary'}>
                            {exercise.status}
                          </Badge>
                          <div className="text-right text-sm text-muted-foreground">
                            <p>{exercise.difficulty}</p>
                            <p>{exercise.equipment}</p>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="icon">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="icon">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Contributor;