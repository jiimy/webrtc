import CallNotification from "@/component/callNotification/CallNotification";
import ListOnlineUsers from "@/component/listOnlineUsers/ListOnlineUsers";
import VideoCall from "@/component/videoCall/VideoCall";

export default function Home() {
  return (
    <div>
      <ListOnlineUsers />
      <CallNotification />
      <VideoCall />
    </div>
  );
}
