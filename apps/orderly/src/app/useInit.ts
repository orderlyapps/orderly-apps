import { useEffect } from "react";
import { useSettings } from "../data/zustand/useSettings";
import { supabase } from "../data/supabase/supabase-client";

export function useInit() {
  const setSettingsProperties = useSettings.use.setSettingsProperties();
  const theme = useSettings.use.theme();

  const toggleDarkPalette = (shouldAdd: boolean) => {
    document.documentElement.classList.toggle("ion-palette-dark", shouldAdd);
  };

  const initializeDarkPalette = (isDark: boolean) => {
    setSettingsProperties("theme", isDark ? "dark" : "light");
    toggleDarkPalette(isDark);
  };

  useEffect(() => {
    // set auth session
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setSettingsProperties("session", session);
      }
    });

    // set online status
    setSettingsProperties("online", window.navigator.onLine);
    const updateOnlineStatus = (event: Event) => {
      setSettingsProperties("online", window.navigator.onLine);
    };
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    // set dark palette
    // const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    // initializeDarkPalette(prefersDark.matches);
    // const setDarkPaletteFromMediaQuery = (mediaQuery: MediaQueryListEvent) => {
    //   initializeDarkPalette(mediaQuery.matches);
    // };
    // prefersDark.addEventListener("change", setDarkPaletteFromMediaQuery);

    if (theme === "dark") {
      document.documentElement.classList.toggle("ion-palette-dark", true);
    }
    
    return () => {
      subscription.unsubscribe();
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
      // prefersDark.removeEventListener("change", setDarkPaletteFromMediaQuery);
    };
  }, []);
}
