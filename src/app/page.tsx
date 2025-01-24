import CallNotification from "@/component/callNotification/CallNotification";
import ListOnlineUsers from "@/component/listOnlineUsers/ListOnlineUsers";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <ListOnlineUsers />
      <CallNotification />
    </div>
  );
}
