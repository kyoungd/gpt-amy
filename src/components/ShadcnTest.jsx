import React from 'react';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Input } from './ui/input';

const ShadcnTest = () => {
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">shadcn/ui Test</h1>
      
      <div className="flex gap-4">
        <Button>Default Button</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="destructive">Destructive</Button>
      </div>

      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Test Card</CardTitle>
          <CardDescription>This is a test of the shadcn/ui Card component.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input placeholder="Test input..." />
            <Button className="w-full">Submit</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShadcnTest;