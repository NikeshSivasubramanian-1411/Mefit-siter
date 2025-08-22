import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Settings as SettingsIcon, Bell, Shield, Palette, Database } from 'lucide-react';

const Settings = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold gradient-text">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your application preferences and account settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-glow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <span>Notifications</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Notification settings will be available in a future update.</p>
          </CardContent>
        </Card>

        <Card className="card-glow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Privacy & Security</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Privacy and security settings will be available in a future update.</p>
          </CardContent>
        </Card>

        <Card className="card-glow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Palette className="w-5 h-5" />
              <span>Appearance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Theme and appearance settings will be available in a future update.</p>
          </CardContent>
        </Card>

        <Card className="card-glow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="w-5 h-5" />
              <span>Data Management</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Data export and management features will be available in a future update.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;