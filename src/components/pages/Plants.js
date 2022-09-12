import React from "react";
import PlantList from "../plants/PlantList";
import LoadingSpinner from "../ui/LoadingSpinner";

const Plants = (props) => {
  // if (status === "pending") {
  //   return (
  //     <div className="centered">
  //       <LoadingSpinner />;
  //     </div>
  //   );
  // }

  return <PlantList />;
};

export default Plants;
