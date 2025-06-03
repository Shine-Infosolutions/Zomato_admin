import React from "react";
import OnlineDetails from "./OnlineDetails";
import DineInDetails from "./DineInDetails";

const MainDeatil = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-between px-4 py-2 bg-white shadow-sm">
        <span className="text-xl">POS : Point Of Sale</span>
        <div className="flex gap-4">
          <button className="bg-green-500 rounded text-white px-2 my-2">
            + New
          </button>
          <button className="bg-amber-500 rounded text-white px-2 my-2">
            Store Pickup
          </button>
        </div>
      </div>
      <div className="flex flex-row gap-4 p-4 flex-1 overflow-hidden">
        <div className="w-1/2 overflow-auto">
          <OnlineDetails />
        </div>
        <div className="w-1/2 overflow-auto">
          <DineInDetails />
        </div>
      </div>
    </div>
  );
};

export default MainDeatil;
