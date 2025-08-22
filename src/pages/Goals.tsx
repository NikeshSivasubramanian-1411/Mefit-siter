import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Target, 
  Calendar, 
  Plus, 
  CheckCircle,
  Clock,
  Trophy,
  TrendingUp,
  Zap
} from 'lucide-react';

const Goals = () => {
  const [activeTab, setActiveTab] = useState('current');

  // Mock data
  const currentGoal = {
    id: 1,
    name: "Weekly Strength Training",
    startDate: "2024-01-15",
    endDate: "2024-01-21",
    progress: 65,
    completedWorkouts: 4,
    totalWorkouts: 6,
    daysLeft: 2,
    workouts: [
      { id: 1, name: "Upper Body Strength", completed: true, date: "2024-01-15" },
      { id: 2, name: "Lower Body Power", completed: true, date: "2024-01-16" },
      { id: 3, name: "HIIT Cardio", completed: true, date: "2024-01-17" },
      { id: 4, name: "Core & Flexibility", completed: true, date: "2024-01-18" },
      { id: 5, name: "Full Body Circuit", completed: false, date: "2024-01-19" },
      { id: 6, name: "Active Recovery", completed: false, date: "2024-01-20" },
    ]
  };

  const previousGoals = [
    {
      id: 2,
      name: "Cardio Week Challenge",
      period: "Jan 8-14, 2024",
      progress: 100,
      completedWorkouts: 5,
      totalWorkouts: 5,
      status: "completed"
    },
    {
      id: 3,
      name: "Strength Foundation",
      period: "Jan 1-7, 2024",
      progress: 80,
      completedWorkouts: 4,
      totalWorkouts: 5,
      status: "partially_completed"
    }
  ];

  const availablePrograms = [
    {
      id: 1,
      name: "Beginner's Strength",
      category: "Strength Training",
      duration: "4 weeks",
      workoutsPerWeek: 3,
      difficulty: "Beginner",
      description: "Perfect for building foundational strength"
    },
    {
      id: 2,
      name: "HIIT Blast",
      category: "Cardio",
      duration: "2 weeks",
      workoutsPerWeek: 4,
      difficulty: "Intermediate",
      description: "High-intensity workouts for rapid results"
    },
    {
      id: 3,
      name: "Flexibility Focus",
      category: "Flexibility",
      duration: "3 weeks",
      workoutsPerWeek: 5,
      difficulty: "All Levels",
      description: "Improve mobility and reduce tension"
    }
  ];

  const logWorkout = (workoutId: number) => {
    // In a real app, this would update the backend
    console.log(`Logging workout ${workoutId} as completed`);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Fitness Goals</h1>
          <p className="text-muted-foreground mt-2">Track and manage your weekly workout goals</p>
        </div>
        <Button className="btn-hero">
          <Plus className="w-4 h-4 mr-2" />
          Set New Goal
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="current">Current Goal</TabsTrigger>
          <TabsTrigger value="history">Goal History</TabsTrigger>
          <TabsTrigger value="programs">Available Programs</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-6">
          {currentGoal ? (
            <>
              {/* Goal Overview */}
              <Card className="card-glow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="w-5 h-5 text-primary" />
                      <span>{currentGoal.name}</span>
                    </CardTitle>
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {currentGoal.daysLeft} days left
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">
                        {currentGoal.completedWorkouts}
                      </div>
                      <p className="text-sm text-muted-foreground">Completed</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-accent mb-2">
                        {currentGoal.totalWorkouts - currentGoal.completedWorkouts}
                      </div>
                      <p className="text-sm text-muted-foreground">Remaining</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-success mb-2">
                        {currentGoal.progress}%
                      </div>
                      <p className="text-sm text-muted-foreground">Progress</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Overall Progress</span>
                      <span className="text-sm text-muted-foreground">
                        {currentGoal.completedWorkouts}/{currentGoal.totalWorkouts} workouts
                      </span>
                    </div>
                    <Progress value={currentGoal.progress} className="h-3" />
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{currentGoal.startDate} - {currentGoal.endDate}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{currentGoal.daysLeft} days remaining</span>
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Workouts List */}
              <Card className="card-glow">
                <CardHeader>
                  <CardTitle>Weekly Workouts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {currentGoal.workouts.map((workout) => (
                      <div
                        key={workout.id}
                        className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                          workout.completed
                            ? 'bg-success/5 border-success/20'
                            : 'bg-muted/50 border-border'
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <div className={`p-2 rounded-full ${
                            workout.completed
                              ? 'bg-success text-white'
                              : 'bg-muted text-muted-foreground'
                          }`}>
                            {workout.completed ? (
                              <CheckCircle className="w-5 h-5" />
                            ) : (
                              <Clock className="w-5 h-5" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{workout.name}</p>
                            <p className="text-sm text-muted-foreground">{workout.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {workout.completed ? (
                            <Badge className="bg-success text-white">Completed</Badge>
                          ) : (
                            <Button
                              size="sm"
                              onClick={() => logWorkout(workout.id)}
                              className="bg-primary hover:bg-primary/90"
                            >
                              Mark Complete
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="card-glow">
              <CardContent className="text-center py-12">
                <Target className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-xl font-semibold mb-2">No Current Goal</h3>
                <p className="text-muted-foreground mb-6">Set a weekly fitness goal to start tracking your progress</p>
                <Button className="btn-hero">
                  <Plus className="w-4 h-4 mr-2" />
                  Set Your First Goal
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <div className="grid gap-6">
            {previousGoals.map((goal) => (
              <Card key={goal.id} className="card-glow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold">{goal.name}</h3>
                      <p className="text-sm text-muted-foreground">{goal.period}</p>
                    </div>
                    <Badge 
                      variant={goal.status === 'completed' ? 'default' : 'secondary'}
                      className={goal.status === 'completed' ? 'bg-success text-white' : ''}
                    >
                      {goal.status === 'completed' ? 'Completed' : 'Partial'}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{goal.completedWorkouts}/{goal.totalWorkouts} workouts</span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="programs" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availablePrograms.map((program) => (
              <Card key={program.id} className="card-glow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{program.name}</CardTitle>
                    <Badge variant="outline">{program.difficulty}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{program.description}</p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Category</span>
                      <span>{program.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration</span>
                      <span>{program.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Frequency</span>
                      <span>{program.workoutsPerWeek}/week</span>
                    </div>
                  </div>

                  <Button className="w-full btn-hero">
                    <Zap className="w-4 h-4 mr-2" />
                    Start Program
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Goals;