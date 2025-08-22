import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  PlaySquare, 
  Search, 
  Filter, 
  Clock, 
  Target,
  Zap,
  Users,
  Star
} from 'lucide-react';

const Programs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const programs = [
    {
      id: 1,
      name: "Beginner's Strength Foundation",
      category: "Strength Training",
      duration: "4 weeks",
      workouts: 12,
      difficulty: "Beginner",
      rating: 4.8,
      enrolled: 1250,
      description: "Build a solid foundation with basic strength movements and proper form.",
      workoutList: ["Upper Body Basics", "Lower Body Foundations", "Core Strength", "Full Body Integration"],
      image: "/api/placeholder/300/200"
    },
    {
      id: 2,
      name: "HIIT Fat Burn Challenge",
      category: "Cardio",
      duration: "3 weeks",
      workouts: 15,
      difficulty: "Intermediate",
      rating: 4.9,
      enrolled: 890,
      description: "High-intensity interval training to maximize calorie burn and improve cardiovascular fitness.",
      workoutList: ["Tabata Blast", "Cardio Circuit", "Metabolic Burn", "HIIT & Core"],
      image: "/api/placeholder/300/200"
    },
    {
      id: 3,
      name: "Flexibility & Mobility",
      category: "Flexibility",
      duration: "6 weeks",
      workouts: 30,
      difficulty: "All Levels",
      rating: 4.7,
      enrolled: 2100,
      description: "Improve your range of motion and reduce muscle tension with daily stretching routines.",
      workoutList: ["Morning Flow", "Hip Mobility", "Shoulder Release", "Evening Stretch"],
      image: "/api/placeholder/300/200"
    },
    {
      id: 4,
      name: "Advanced Powerlifting",
      category: "Strength Training",
      duration: "8 weeks",
      workouts: 24,
      difficulty: "Advanced",
      rating: 4.6,
      enrolled: 450,
      description: "Master the big three lifts: squat, bench press, and deadlift with progressive overload.",
      workoutList: ["Squat Focus", "Bench Mastery", "Deadlift Power", "Accessory Work"],
      image: "/api/placeholder/300/200"
    },
    {
      id: 5,
      name: "Bodyweight Mastery",
      category: "Bodyweight",
      duration: "5 weeks",
      workouts: 20,
      difficulty: "Intermediate",
      rating: 4.8,
      enrolled: 1600,
      description: "Master your bodyweight with progressive calisthenics movements.",
      workoutList: ["Push Progressions", "Pull Strength", "Core Control", "Skill Work"],
      image: "/api/placeholder/300/200"
    },
    {
      id: 6,
      name: "Yoga Flow Journey",
      category: "Yoga",
      duration: "4 weeks",
      workouts: 16,
      difficulty: "Beginner",
      rating: 4.9,
      enrolled: 3200,
      description: "Find balance and strength through flowing yoga sequences.",
      workoutList: ["Sun Salutations", "Warrior Flows", "Hip Openers", "Restorative Practice"],
      image: "/api/placeholder/300/200"
    }
  ];

  const categories = ['All', 'Strength Training', 'Cardio', 'Flexibility', 'Bodyweight', 'Yoga'];

  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || 
                           program.category.toLowerCase() === categoryFilter.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold gradient-text">Workout Programs</h1>
        <p className="text-muted-foreground mt-2">Discover structured workout programs to reach your fitness goals</p>
      </div>

      {/* Search and Filters */}
      <Card className="card-glow">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search programs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category.toLowerCase()}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Programs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrograms.map((program) => (
          <Card key={program.id} className="card-glow hover:shadow-glow transition-all duration-300 group">
            <CardHeader className="p-0">
              <div className="relative">
                <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-t-lg flex items-center justify-center">
                  <PlaySquare className="w-16 h-16 text-primary opacity-50" />
                </div>
                <Badge 
                  className={`absolute top-4 right-4 ${getDifficultyColor(program.difficulty)}`}
                >
                  {program.difficulty}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {program.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">{program.category}</p>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2">
                {program.description}
              </p>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-medium">{program.rating}</span>
                </div>
                <div className="flex items-center space-x-1 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{program.enrolled.toLocaleString()}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>{program.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-muted-foreground" />
                  <span>{program.workouts} workouts</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Included Workouts:</p>
                <div className="flex flex-wrap gap-1">
                  {program.workoutList.slice(0, 3).map((workout, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {workout}
                    </Badge>
                  ))}
                  {program.workoutList.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{program.workoutList.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              <Button className="w-full btn-hero group-hover:scale-105 transition-transform">
                <Zap className="w-4 h-4 mr-2" />
                Start Program
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPrograms.length === 0 && (
        <Card className="card-glow">
          <CardContent className="text-center py-12">
            <PlaySquare className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-xl font-semibold mb-2">No Programs Found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Programs;