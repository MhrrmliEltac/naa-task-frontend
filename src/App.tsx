import { Outlet } from "react-router";
import "./App.css";
import Sidebar from "./components/Sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  // Create a client
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <main className="mx-auto flex h-screen bg-[#FEFEFE] font-lato overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </QueryClientProvider>
  );
}

export default App;
