import SocketContextProvider from "@/contexts/socketio";
import { AchievementProvider } from "@/contexts/achievement-context";
import Preloader from "./preloader";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "./ui/toaster";

import { TooltipProvider } from "./ui/tooltip";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider
    attribute="class"
    defaultTheme="dark"
    disableTransitionOnChange
  >
    <Preloader>
      <SocketContextProvider>
        <AchievementProvider>
          <TooltipProvider>
            {children}
          </TooltipProvider>
          <Toaster />
        </AchievementProvider>
      </SocketContextProvider>
    </Preloader>
  </ThemeProvider>;
};
