import { useState } from "react";
import { Button } from "@/components/ui/button";
import RiskMatrixPage from "./RiskMatrixPage"; // The new component
import Navigation from "@/components/Navigation";
import Map from "@/components/Map";
import { Badge } from "@/components/ui/badge";
import "./Risk.css";

const OriginalRiskPage = () => {
  // Mock data based on the image
  const risks = [
    {
      title: "Uneven Pavement Near Chapel Entrance",
      location: "Gerehu LDS Stake",
      date: "2024-08-01",
      status: "Identified",
      riskLevel: "High",
    },
    {
      title: "Faulty Light in North Parking Lot",
      location: "Wainui LDS Branch",
      date: "2024-07-28",
      status: "Mitigation in Progress",
      riskLevel: "Medium",
    },
    {
      title: "Overgrown Bushes Obstructing South Fence",
      location: "Gerehu LDS Stake",
      date: "2024-07-25",
      status: "Resolved",
      riskLevel: "Low",
    },
  ];

  const locations = [
    {
      id: "1",
      name: "Gerehu LDS Stake",
      latitude: -9.418,
      longitude: 147.151,
    },
  ];

  return (
    <div className="flex-1 flex flex-col">
      <main className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Risk Management</h1>
              <p className="text-muted-foreground">
                Track and manage all identified risks and hazards across sites.
              </p>
            </div>
            <Button>+ Identify New Hazard</Button>
          </div>
          <div className="space-y-4">
            {risks.map((risk, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{risk.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {risk.location} • {risk.date}
                    </p>
                  </div>
                  <Badge
                    variant={
                      risk.riskLevel === "High"
                        ? "destructive"
                        : risk.riskLevel === "Medium"
                        ? "secondary"
                        : "default"
                    }
                  >
                    {risk.riskLevel}
                  </Badge>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <Badge variant="outline">{risk.status}</Badge>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Update Status
                    </Button>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex flex-col">
          <h2 className="font-semibold mb-2">
            Hazard Location for Gerehu LDS Stake
          </h2>
          <div className="flex-1 rounded-lg overflow-hidden">
            <Map locations={locations} />
          </div>
          <div className="pt-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">HAZARD ID</p>
                <p className="font-semibold">HAZ-2024-001</p>
              </div>
              <div>
                <p className="text-muted-foreground">ASSIGNED TO</p>
                <p className="font-semibold">Officer Johnson</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-muted-foreground">DESCRIPTION</p>
              <p>
                Significant cracks and uneven pavement on the main walkway to
                the chapel entrance, posing a trip hazard.
              </p>
            </div>
            <div className="mt-4">
              <p className="text-muted-foreground">Mitigation Actions</p>
              <p>...</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const RiskPage = () => {
  const [activeTab, setActiveTab] = useState("original");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex flex-col h-screen">
      <Navigation searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="flex justify-end p-4">
        <Button
          onClick={() => setActiveTab("original")}
          variant={activeTab === "original" ? "default" : "outline"}
          className="mr-2"
        >
          Original View
        </Button>
        <Button
          onClick={() => setActiveTab("matrix")}
          variant={activeTab === "matrix" ? "default" : "outline"}
        >
          Matrix View
        </Button>
      </div>

      <div className="flex-1 overflow-auto">
        {activeTab === "original" ? <OriginalRiskPage /> : <RiskMatrixPage />}
      </div>
    </div>
  );
};

export default RiskPage;
