import { useEffect, useState } from "react";

export function useOnlineState() {
  const [isOnline, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    function updateOnlineStatus(event: Event) {
      setOnline(window.navigator.onLine);
    }
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);
    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  return isOnline;
}
