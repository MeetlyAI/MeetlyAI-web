"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useUser } from '@clerk/nextjs';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Video, Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';

const VideoCard = ({ _id, fileName, img, date, jsonText, userId, cleanRes, embedding }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    sessionStorage.setItem('currentVideo', JSON.stringify({ _id, fileName, img, date, jsonText, userId, cleanRes, embedding }));
    router.push(`/home/meet/${cleanRes}`);
  };

  return (
    <Card 
      className="w-full overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer relative"
      onClick={handleClick}
    >
      <div className="relative">
        <div className="aspect-video w-full overflow-hidden bg-gray-200">
          {/* Placeholder for video thumbnail */}
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <Video className="w-16 h-16 text-white opacity-70" />
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold truncate">{fileName}</h3>
      </CardContent>
      <CardFooter className="px-4 py-2 bg-gray-50">
        <p className="text-sm text-gray-500">{new Date(date).toLocaleDateString()}</p>
      </CardFooter>
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center">
          <Loader className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
      )}
    </Card>
  );
};

const VideoCardGrid = () => {
  const { user } = useUser();
  const videos = useQuery(api.meet.getMeet, { userId: user?.id });

  if (!videos) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 h-full overflow-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {videos.map((video) => (
          <VideoCard key={video._id} {...video} />
        ))}
      </div>
    </div>
  );
};

export default VideoCardGrid;