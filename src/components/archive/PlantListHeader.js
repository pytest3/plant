// import React from "react";
// import classes from "./PlantListHeader.module.css";
// import SmallCard from "../ui/SmallCard";
// import Card from "../ui/Card";

// const PlantListHeader = (props) => {
//   const { onSortDays, onSortDates, onSortNames } = props;

//   const sortDaysHandler = () => {
//     onSortDays();
//   };

//   const sortDatesHandler = () => {
//     onSortDates();
//   };

//   const sortNamesHandler = () => {
//     onSortNames();
//   };

//   return (
//     <Card className={classes.header}>
//       <SmallCard onClick={sortNamesHandler} className={classes.plant}>
//         Plant name
//       </SmallCard>
//       <SmallCard onClick={sortDatesHandler} className={classes.lastWatered}>
//         Last watered
//       </SmallCard>
//       <SmallCard onClick={sortDaysHandler} className={classes.daysHeader}>
//         Days since last
//       </SmallCard>
//       <SmallCard className={classes.freqHeader}>Freq</SmallCard>
//       <SmallCard className={classes.water}></SmallCard>
//     </Card>
//   );
// };

// export default PlantListHeader;
