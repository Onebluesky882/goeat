import React from "react";
import type { Building } from "types/buildMapping";

interface GameInfoProps {
  buildings: Building[];
}

const GameInfo: React.FC<GameInfoProps> = ({ buildings }) => {
  const counts = buildings.reduce((acc, building) => {
    acc[building.type] = (acc[building.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="p-4 border-b bg-white">
      <h1 className="text-xl font-bold text-center mb-2">City Builder</h1>
      <div className="flex justify-center gap-4 text-sm">
        <div>Buildings: {buildings.length}</div>
        {Object.entries(counts).length > 0 && (
          <div className="flex gap-2">
            {Object.entries(counts).map(([type, count]) => (
              <span key={type} className="text-gray-600">
                {type}: {count}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GameInfo;
