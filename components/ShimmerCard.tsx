import React from "react";
import "./Shimmer.css"; // Import the shimmer CSS

export const Card = () => {
  return (
    <div className="flex max-w-sm h-72 p-4 bg-white shadow rounded-lg space-x-4">
      <div className="w-full bg-gray-300 rounded shimmer"></div>
    </div>
  );
};

const ShimmerCard = () => {
  return (
    <div className="py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-screen-lg mx-auto custom-scrollbar rounded-lg">
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
};

export default ShimmerCard;
