import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Camera, Webcam, Video, VideoOff, Cctv } from "lucide-react";

const cameras = [
  {
    id: 1,
    name: "Main Entrance",
    location: "Front Door",
    status: "online",
    preview:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Kitchen Area",
    location: "Main Kitchen",
    status: "online",
    preview:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Dining Area 1",
    location: "Front Section",
    status: "online",
    preview:
      "https://images.unsplash.com/photo-1587574293340-e0011c4e8ecf?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Dining Area 2",
    location: "Back Section",
    status: "offline",
    preview:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop&brightness=-10",
  },
  {
    id: 5,
    name: "Bar Counter",
    location: "Bar Area",
    status: "online",
    preview:
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Outdoor Seating",
    location: "Patio",
    status: "online",
    preview:
      "https://images.unsplash.com/photo-1595925889916-1dabb95cc85e?q=80&w=1200&auto=format&fit=crop",
  },
];

const CCTVLive = () => {
  const [selectedCamera, setSelectedCamera] = useState(cameras[0]);
  const [viewMode, setViewMode] = useState("grid");

  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              CCTV Monitoring
            </h1>
            <p className="text-muted-foreground mt-2">
              Monitor your restaurant security cameras in real-time
            </p>
          </div>

          <div className="flex gap-4 items-center">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter cameras" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cameras</SelectItem>
                <SelectItem value="online">Online Only</SelectItem>
                <SelectItem value="offline">Offline Only</SelectItem>
                <SelectItem value="dining">Dining Areas</SelectItem>
                <SelectItem value="kitchen">Kitchen Only</SelectItem>
              </SelectContent>
            </Select>

            <Tabs
              defaultValue="grid"
              className="w-[200px]"
              onValueChange={(value) => setViewMode(value)}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="grid">Grid View</TabsTrigger>
                <TabsTrigger value="single">Single View</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Camera Views */}
        <div className="space-y-6">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cameras.map((camera) => (
                <Card key={camera.id} className="overflow-hidden">
                  <CardHeader className="p-4">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg font-medium">
                        {camera.name}
                      </CardTitle>
                      <Badge
                        variant={
                          camera.status === "online" ? "default" : "destructive"
                        }
                      >
                        {camera.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0 relative">
                    {camera.status === "online" ? (
                      <div className="aspect-video bg-zinc-950 relative">
                        <img
                          src={camera.preview}
                          alt={camera.name}
                          className="w-full h-full object-cover opacity-80"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge variant="secondary" className="bg-black/50">
                            <Cctv className="h-3 w-3 mr-1" /> Live
                          </Badge>
                        </div>
                      </div>
                    ) : (
                      <div className="aspect-video bg-zinc-900 flex items-center justify-center">
                        <div className="text-center">
                          <VideoOff className="h-12 w-12 mx-auto text-zinc-600" />
                          <p className="text-zinc-400 mt-2">Camera Offline</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="p-4 pt-3 flex justify-between">
                    <p className="text-sm text-muted-foreground">
                      {camera.location}
                    </p>
                    <Button variant="outline" size="sm">
                      <Camera className="mr-1 h-4 w-4" /> Full View
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              <Card className="overflow-hidden">
                <CardHeader className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <CardTitle className="text-xl font-medium">
                        {selectedCamera.name}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {selectedCamera.location}
                      </p>
                    </div>
                    <Badge
                      variant={
                        selectedCamera.status === "online"
                          ? "default"
                          : "destructive"
                      }
                      className="ml-2"
                    >
                      {selectedCamera.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {selectedCamera.status === "online" ? (
                    <div className="aspect-video md:aspect-[21/9] bg-zinc-950 relative">
                      <img
                        src={selectedCamera.preview}
                        alt={selectedCamera.name}
                        className="w-full h-full object-cover opacity-80"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="bg-black/50">
                          <Cctv className="h-3 w-3 mr-1" /> Live
                        </Badge>
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-video md:aspect-[21/9] bg-zinc-900 flex items-center justify-center">
                      <div className="text-center">
                        <VideoOff className="h-20 w-20 mx-auto text-zinc-600" />
                        <p className="text-zinc-400 mt-4 text-lg">
                          Camera Offline
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="p-4 flex flex-wrap gap-3 justify-between">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Video className="mr-1 h-4 w-4" /> Record
                    </Button>
                    <Button variant="outline" size="sm">
                      <Webcam className="mr-1 h-4 w-4" /> Screenshot
                    </Button>
                  </div>
                  <Select
                    value={selectedCamera.id.toString()}
                    onValueChange={(value) => {
                      const camera = cameras.find(
                        (c) => c.id.toString() === value
                      );
                      if (camera) setSelectedCamera(camera);
                    }}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Camera" />
                    </SelectTrigger>
                    <SelectContent>
                      {cameras.map((camera) => (
                        <SelectItem
                          key={camera.id}
                          value={camera.id.toString()}
                        >
                          {camera.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardFooter>
              </Card>

              <div className="grid grid-cols-6 gap-2">
                {cameras.map((camera) => (
                  <div
                    key={camera.id}
                    className={`cursor-pointer relative aspect-video rounded-md overflow-hidden border-2 ${
                      selectedCamera.id === camera.id
                        ? "border-orange-500"
                        : "border-transparent"
                    }`}
                    onClick={() => setSelectedCamera(camera)}
                  >
                    {camera.status === "online" ? (
                      <img
                        src={camera.preview}
                        alt={camera.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
                        <VideoOff className="h-4 w-4 text-zinc-600" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CCTVLive;
