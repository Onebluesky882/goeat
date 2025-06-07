import { BranchScroller } from "@/components/BranchScroller";
import { DateRangeFilter } from "@/components/DateRangeFilterProps";
import React from "react";
const Dashboard = () => {
  const summaryData = [
    { name: "Restaurant 1", earning: 12890, orders: 320, customers: 180 },
    { name: "Restaurant 2", earning: 8450, orders: 210, customers: 132 },
    { name: "Restaurant 3", earning: 15360, orders: 402, customers: 224 },
    { name: "Restaurant 4", earning: 10900, orders: 256, customers: 164 },
    { name: "Restaurant 5", earning: 7400, orders: 189, customers: 93 },
    { name: "Restaurant 6", earning: 16700, orders: 460, customers: 277 },
  ];

  const branches = [
    "Restaurant 1",
    "Restaurant 2",
    "Restaurant 3",
    "Restaurant 4",
    "Restaurant 5",
    "Restaurant 6",
  ];

  const [dateRange, setDateRange] = React.useState<{ from?: Date; to?: Date }>({
    from: undefined,
    to: undefined,
  });

  const [selectedBranch, setSelectedBranch] = React.useState(branches[0]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-white to-purple-50">
      <div className="container flex flex-col flex-1 py-8 max-w-4xl mx-auto w-full">
        <h1 className="text-3xl md:text-4xl font-playfair font-bold text-primary mb-6">
          Dashboard
        </h1>
        Branch Selector
        <BranchScroller
          branches={branches}
          selected={selectedBranch}
          onSelect={setSelectedBranch}
        />
        {/* Analytics Section */}
        <section className="bg-white/80 rounded-2xl shadow-md p-6 mb-6 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-3">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold font-playfair mb-1">
                Data Analytics
              </h2>
              <p className="text-gray-500 text-sm">
                See earnings and key stats for each branch.
              </p>
            </div>
            <DateRangeFilter range={dateRange} setRange={setDateRange} />
          </div>
          {/* <StatsWidgets
            earning={stats.earning}
            orders={stats.orders}
            customers={stats.customers}
          /> */}
        </section>
        <div className="flex-grow" />
      </div>
    </div>
  );
};

export default Dashboard;
