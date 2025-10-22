import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Clock, MessageSquare, Flame } from "lucide-react";

interface UserProgress {
  total_lessons: number;
  total_words: number;
  total_time_seconds: number;
  current_streak: number;
  longest_streak: number;
}

const ProgressDashboard = () => {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("user_progress")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error) throw error;
      setProgress(data);
    } catch (error) {
      console.error("Error fetching progress:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center p-8">Loading progress...</div>;
  }

  if (!progress) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground">Start your first lesson to see your progress!</p>
      </div>
    );
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  const stats = [
    {
      title: "Total Lessons",
      value: progress.total_lessons,
      icon: MessageSquare,
      color: "text-blue-500",
    },
    {
      title: "Words Spoken",
      value: progress.total_words,
      icon: Trophy,
      color: "text-yellow-500",
    },
    {
      title: "Practice Time",
      value: formatTime(progress.total_time_seconds),
      icon: Clock,
      color: "text-green-500",
    },
    {
      title: "Current Streak",
      value: `${progress.current_streak} days`,
      icon: Flame,
      color: "text-orange-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Your Progress</h2>
        <p className="text-muted-foreground">Keep up the great work!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Longest Streak</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Personal Best</span>
              <span className="font-medium">{progress.longest_streak} days</span>
            </div>
            <Progress 
              value={(progress.current_streak / Math.max(progress.longest_streak, 1)) * 100} 
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressDashboard;
