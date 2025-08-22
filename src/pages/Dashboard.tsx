import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Target, 
  Calendar, 
  Flame, 
  Trophy, 
  Clock,
  TrendingUp,
  CheckCircle,
  Plus,
  ArrowRight
} from 'lucide-react';

const Dashboard = () => {
  // Mock data for demonstration
  const currentGoal = {
    id: 1,
    name: "Weekly Strength Training",
    startDate: "2024-01-15",
    endDate: "2024-01-21",
    progress: 65,
    completedWorkouts: 4,
    totalWorkouts: 6,
    daysLeft: 2
  };

  const weeklyStats = {
    totalWorkouts: 4,
    totalExercises: 24,
    caloriesBurned: 1250,
    averageWorkoutTime: 45
  };

  const upcomingWorkouts = [
    { id: 1, name: "Upper Body Strength", time: "9:00 AM", type: "Strength" },
    { id: 2, name: "HIIT Cardio", time: "6:30 PM", type: "Cardio" },
  ];

  const recentAchievements = [
    { id: 1, title: "First Week Complete", date: "2024-01-14", type: "milestone" },
    { id: 2, title: "5 Workouts in a Row", date: "2024-01-13", type: "streak" },
    { id: 3, title: "Personal Best", date: "2024-01-12", type: "record" },
  ];

  const getDaysOfWeek = () => {
    const today = new Date();
    const currentDay = today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() - currentDay + 1);
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(monday);
      day.setDate(monday.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isWorkoutDay = (date: Date) => {
    // Mock logic - assume workouts on Mon, Wed, Fri, Sat
    const day = date.getDay();
    return [1, 3, 5, 6].includes(day);
  };

  const isCompleted = (date: Date) => {
    // Mock logic - completed workouts before today
    return date < new Date() && isWorkoutDay(date);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold gradient-text">Welcome back!</h1>
        <p className="text-xl text-muted-foreground">Ready to crush your fitness goals today?</p>
      </div>

      {/* Current Goal Overview */}
      <Card className="card-glow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-primary" />
              <span>Current Weekly Goal</span>
            </CardTitle>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {currentGoal.daysLeft} days left
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <span className="font-medium">{currentGoal.name}</span>
              <span className="text-sm text-muted-foreground">
                {currentGoal.completedWorkouts}/{currentGoal.totalWorkouts} workouts
              </span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${currentGoal.progress}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
              <span>{currentGoal.progress}% complete</span>
              <span>Goal: {currentGoal.endDate}</span>
            </div>
          </div>

          {/* Weekly Calendar */}
          <div className="space-y-4">
            <h3 className="font-medium flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>This Week</span>
            </h3>
            <div className="grid grid-cols-7 gap-2">
              {getDaysOfWeek().map((date, index) => {
                const isWorkout = isWorkoutDay(date);
                const isComplete = isCompleted(date);
                const today = isToday(date);
                
                return (
                  <div
                    key={index}
                    className={`aspect-square rounded-lg flex flex-col items-center justify-center text-xs border transition-colors ${
                      today 
                        ? 'bg-primary text-primary-foreground border-primary' 
                        : isComplete
                        ? 'bg-success/10 text-success border-success/20'
                        : isWorkout
                        ? 'bg-muted border-border'
                        : 'bg-background border-border/50'
                    }`}
                  >
                    <span className="font-medium">
                      {date.toLocaleDateString('en', { weekday: 'short' })}
                    </span>
                    <span className="text-xs">{date.getDate()}</span>
                    {isComplete && <CheckCircle className="w-3 h-3 mt-1" />}
                    {isWorkout && !isComplete && !today && (
                      <div className="w-2 h-2 bg-primary rounded-full mt-1" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex space-x-2">
            <Button asChild className="btn-hero flex-1">
              <Link to="/goals">
                <Plus className="w-4 h-4 mr-2" />
                Set New Goal
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link to="/goals">
                View Details
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-glow">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Flame className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{weeklyStats.caloriesBurned}</p>
                <p className="text-sm text-muted-foreground">Calories Burned</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-glow">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Trophy className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{weeklyStats.totalWorkouts}</p>
                <p className="text-sm text-muted-foreground">Workouts Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-glow">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-success/10 rounded-lg">
                <Clock className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{weeklyStats.averageWorkoutTime}m</p>
                <p className="text-sm text-muted-foreground">Avg. Workout Time</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-glow">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-info/10 rounded-lg">
                <TrendingUp className="w-6 h-6 text-info" />
              </div>
              <div>
                <p className="text-2xl font-bold">{weeklyStats.totalExercises}</p>
                <p className="text-sm text-muted-foreground">Total Exercises</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Workouts */}
        <Card className="card-glow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-primary" />
              <span>Today's Schedule</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingWorkouts.length > 0 ? (
              upcomingWorkouts.map((workout) => (
                <div key={workout.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">{workout.name}</p>
                    <p className="text-sm text-muted-foreground">{workout.time}</p>
                  </div>
                  <Badge variant="outline">{workout.type}</Badge>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No workouts scheduled for today</p>
                <Button asChild className="mt-4" variant="outline">
                  <Link to="/workouts">Browse Workouts</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Achievements */}
        <Card className="card-glow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-accent" />
              <span>Recent Achievements</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentAchievements.map((achievement) => (
              <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                <div className={`p-2 rounded-full ${
                  achievement.type === 'milestone' ? 'bg-primary/10 text-primary' :
                  achievement.type === 'streak' ? 'bg-accent/10 text-accent' :
                  'bg-success/10 text-success'
                }`}>
                  <Trophy className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{achievement.title}</p>
                  <p className="text-sm text-muted-foreground">{achievement.date}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;