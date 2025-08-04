import Navigation from "@/components/Navigation";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  return (
    <div className="flex flex-col h-screen bg-background">
      <Navigation />
      <main className="flex-grow overflow-y-auto">
        <Dashboard />
      </main>
    </div>
  );
};

export default Index;
