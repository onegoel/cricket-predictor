/* eslint-disable react/prop-types */
import { useState } from "react";
import { FINAL } from "../../constants/stage";

const Fixture = ({ teams, setFinal, setChampion, stage = "" }) => {
  const [selectedTeam, setSelectedTeam] = useState(null);

  const selectWinner = (team) => {
    setFinal((prev) => {
      const updated = [...prev];
      updated.push(team);
      return updated;
    });
    setSelectedTeam(team);
  };

  return (
    <div>
      <div className="team-card disable-select dragHandle flex flex-row items-center justify-between border p-2 border-gray-300 bg-stone-900 rounded-md w-72">
        <div
          className={`home-team flex flex-col justify-center items-center m-2 w-[45%] ${
            selectedTeam === teams[0] ? "bg-green-500" : ""
          }`}
        >
          <div
            className={`fi fi-${teams[0]?.alpha2.toLowerCase()} cursor-pointer h-10 w-10`}
            onClick={() => {
              if (stage === FINAL) {
                setChampion(teams[0]);
              }
              selectWinner(teams[0]);
            }}
          ></div>
          <h3 className="text-white">{teams[0]?.name}</h3>
        </div>
        <h3 className="text-white">vs</h3>
        <div
          className={`away-team flex flex-col justify-center items-center m-2 w-[45%] ${
            selectedTeam === teams[1] ? "bg-green-500" : ""
          }`}
        >
          <div
            className={`fi fi-${teams[1]?.alpha2.toLowerCase()} cursor-pointer h-10 w-10`}
            onClick={() => {
              if (stage === FINAL) {
                setChampion(teams[1]);
              }
              selectWinner(teams[1]);
            }}
          ></div>
          <h3 className="text-white">{teams[1]?.name}</h3>
        </div>
      </div>
    </div>
  );
};

export default Fixture;
