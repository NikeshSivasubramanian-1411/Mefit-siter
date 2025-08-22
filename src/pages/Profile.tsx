import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Activity,
  Target,
  Trophy,
  Settings,
  Camera,
  Save,
  Shield
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(!user?.hasProfile);

  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    height: '',
    weight: '',
    fitnessLevel: '',
    goals: '',
    medicalConditions: '',
    address: {
      street: '',
      city: '',
      country: '',
      postalCode: ''
    }
  });

  const handleSave = () => {
    // In a real app, this would save to backend
    toast({
      title: "Profile updated!",
      description: "Your profile information has been saved successfully."
    });
    setIsEditing(false);
  };

  const handleRequestContributor = () => {
    toast({
      title: "Request submitted!",
      description: "Your contributor request has been sent to administrators for review."
    });
  };

  const fitnessStats = {
    totalWorkouts: 45,
    weekStreak: 3,
    favoriteExercise: "Push-ups",
    totalCalories: 12450,
    averageWorkoutTime: 42
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Profile</h1>
          <p className="text-muted-foreground mt-2">Manage your personal information and fitness preferences</p>
        </div>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)} className="btn-hero">
            <Settings className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <Card className="card-glow">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                      {user?.firstName[0]}{user?.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button
                      size="icon"
                      variant="outline"
                      className="absolute -bottom-2 -right-2 rounded-full w-8 h-8"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold">{user?.firstName} {user?.lastName}</h2>
                  <p className="text-muted-foreground">{user?.email}</p>
                  <div className="flex items-center justify-center space-x-2 mt-2">
                    {user?.isAdmin && (
                      <Badge className="bg-red-100 text-red-800">Administrator</Badge>
                    )}
                    {user?.isContributor && !user?.isAdmin && (
                      <Badge className="bg-blue-100 text-blue-800">Contributor</Badge>
                    )}
                    {!user?.isContributor && !user?.isAdmin && (
                      <Badge variant="secondary">Member</Badge>
                    )}
                  </div>
                </div>

                {!user?.isContributor && !user?.isAdmin && (
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={handleRequestContributor}
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Request Contributor Access
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="card-glow mt-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="w-5 h-5" />
                <span>Fitness Stats</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Workouts</span>
                <span className="font-medium">{fitnessStats.totalWorkouts}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Current Streak</span>
                <span className="font-medium">{fitnessStats.weekStreak} weeks</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Favorite Exercise</span>
                <span className="font-medium">{fitnessStats.favoriteExercise}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Calories</span>
                <span className="font-medium">{fitnessStats.totalCalories.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Avg. Workout Time</span>
                <span className="font-medium">{fitnessStats.averageWorkoutTime}min</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="fitness">Fitness Profile</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-6">
              <Card className="card-glow">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="w-5 h-5" />
                    <span>Personal Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={profileData.firstName}
                        onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={profileData.lastName}
                        onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                        disabled={!isEditing}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={profileData.dateOfBirth}
                        onChange={(e) => setProfileData({...profileData, dateOfBirth: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select 
                      value={profileData.gender} 
                      onValueChange={(value) => setProfileData({...profileData, gender: value})}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-glow">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5" />
                    <span>Address</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="street">Street Address</Label>
                    <Input
                      id="street"
                      value={profileData.address.street}
                      onChange={(e) => setProfileData({
                        ...profileData, 
                        address: {...profileData.address, street: e.target.value}
                      })}
                      disabled={!isEditing}
                      placeholder="123 Main Street"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={profileData.address.city}
                        onChange={(e) => setProfileData({
                          ...profileData, 
                          address: {...profileData.address, city: e.target.value}
                        })}
                        disabled={!isEditing}
                        placeholder="New York"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        value={profileData.address.country}
                        onChange={(e) => setProfileData({
                          ...profileData, 
                          address: {...profileData.address, country: e.target.value}
                        })}
                        disabled={!isEditing}
                        placeholder="United States"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input
                        id="postalCode"
                        value={profileData.address.postalCode}
                        onChange={(e) => setProfileData({
                          ...profileData, 
                          address: {...profileData.address, postalCode: e.target.value}
                        })}
                        disabled={!isEditing}
                        placeholder="10001"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="fitness" className="space-y-6">
              <Card className="card-glow">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="w-5 h-5" />
                    <span>Physical Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="height">Height (cm)</Label>
                      <Input
                        id="height"
                        type="number"
                        value={profileData.height}
                        onChange={(e) => setProfileData({...profileData, height: e.target.value})}
                        disabled={!isEditing}
                        placeholder="175"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Input
                        id="weight"
                        type="number"
                        value={profileData.weight}
                        onChange={(e) => setProfileData({...profileData, weight: e.target.value})}
                        disabled={!isEditing}
                        placeholder="70"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fitnessLevel">Fitness Level</Label>
                    <Select 
                      value={profileData.fitnessLevel} 
                      onValueChange={(value) => setProfileData({...profileData, fitnessLevel: value})}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your fitness level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                        <SelectItem value="expert">Expert</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="goals">Fitness Goals</Label>
                    <Textarea
                      id="goals"
                      value={profileData.goals}
                      onChange={(e) => setProfileData({...profileData, goals: e.target.value})}
                      disabled={!isEditing}
                      placeholder="Describe your fitness goals..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="medicalConditions">Medical Conditions & Notes</Label>
                    <Textarea
                      id="medicalConditions"
                      value={profileData.medicalConditions}
                      onChange={(e) => setProfileData({...profileData, medicalConditions: e.target.value})}
                      disabled={!isEditing}
                      placeholder="Any medical conditions, injuries, or limitations..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-6">
              <Card className="card-glow">
                <CardHeader>
                  <CardTitle>App Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">Preference settings will be available in a future update.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {isEditing && (
            <div className="flex space-x-4 mt-6">
              <Button onClick={handleSave} className="btn-hero">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;