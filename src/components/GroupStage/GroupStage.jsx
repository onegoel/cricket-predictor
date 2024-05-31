/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import teams from "../../../public/teams.json";
import { Button } from "@mui/material";
import GroupCard from "../GroupCard/GroupCard";
import { FINAL, GROUP_STAGE, SUPER_8S } from "../../constants/stage";
import Fixture from "../Fixture/Fixture";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { ArrowBack } from "@mui/icons-material";
// import Super8s from "../Super8s/Super8s";

const GroupStage = () => {
  const [groups, setGroups] = useState([]);
  const [super8s, setSuper8s] = useState(null);
  const [semiFinals, setSemiFinals] = useState(null);
  const [final, setFinal] = useState([]);
  const [champion, setChampion] = useState(null);

  useEffect(() => {
    const groupTeams = teams.reduce((acc, team) => {
      if (!acc[team.group]) {
        acc[team.group] = [];
      }
      acc[team.group].push(team);
      return acc;
    }, {});

    const groupTeamsArray = Object.entries(groupTeams);
    setGroups(groupTeamsArray);
  }, []);

  const generateSuper8s = () =>
    // groups, setSuper8s
    {
      const groupsCopy = [...groups];
      let groupsWithTop2 = [];
      groupsCopy.forEach((group) => {
        const [, groupTeams] = group;
        const top2 = groupTeams.slice(0, 2);
        if (top2[0].seed === 2 && top2[1].seed === 1) {
          top2.reverse();
        }
        groupsWithTop2.push(top2);
      });
      const super8s = {
        1: [
          groupsWithTop2[0][0],
          groupsWithTop2[1][1],
          groupsWithTop2[2][0],
          groupsWithTop2[3][1],
        ],
        2: [
          groupsWithTop2[1][0],
          groupsWithTop2[0][1],
          groupsWithTop2[3][0],
          groupsWithTop2[2][1],
        ],
      };
      // set super8sGroup for each team
      Object.entries(super8s).forEach(([group, teams]) => {
        teams.forEach((team) => {
          team.super8sGroup = group;
        });
      });
      console.log(super8s);
      setSuper8s(super8s);
    };

  const onReorderGroup = (list, stage) => {
    if (stage === GROUP_STAGE) {
      const selectedGroup = list[0].group;
      const groupsCopy = [...groups];
      const groupIndex = groupsCopy.findIndex(
        (group) => group[0] === selectedGroup,
      );
      groupsCopy[groupIndex][1] = list;
      setGroups(groupsCopy);
    } else if (stage === SUPER_8S) {
      const selectedGroup = list[0].super8sGroup;
      const super8sCopy = { ...super8s };
      super8sCopy[selectedGroup] = list;
      setSuper8s(super8sCopy);
    }
  };

  const generateSemiFinals = () => {
    const super8sCopy = { ...super8s };
    const semiFinals = {
      1: [super8sCopy[1][0], super8sCopy[2][1]],
      2: [super8sCopy[2][0], super8sCopy[1][1]],
    };
    setSemiFinals(semiFinals);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4 text-white">
      {!super8s && (
        <div className="group-stage">
          <div className="mt-2 mb-4 font-extrabold text-3xl">GROUP STAGE</div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 my-4">
            {groups.map((group, index) => (
              <GroupCard
                key={index}
                group={group[0]}
                teams={group[1]}
                onReorderGroup={(list) => onReorderGroup(list, GROUP_STAGE)}
              />
            ))}
          </div>
          <div className="group-stage-buttons flex flex-row justify-between align-center w-full mt-4 mb-4">
            <>Drag to reorder groups</>
            <Button
              className="my-4"
              variant="contained"
              color="error"
              onClick={generateSuper8s}
              endIcon={<ArrowForwardIcon />}
            >
              Super 8s
            </Button>
          </div>
        </div>
      )}
      {super8s && !semiFinals && (
        <div className="super-8s">
          <div className="mt-2 mb-4 font-extrabold text-3xl">SUPER 8s</div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 my-4">
            {Object.entries(super8s).map(([group, teams]) => (
              <GroupCard
                key={group}
                group={group}
                teams={teams}
                onReorderGroup={(list) => onReorderGroup(list, SUPER_8S)}
              />
            ))}
          </div>
          <div className="super-8s-buttons flex flex-row justify-between w-full mt-4 mb-4">
            <Button
              variant="outlined"
              color="error"
              onClick={() => setSuper8s(null)}
              startIcon={<ArrowBack />}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={generateSemiFinals}
              endIcon={<ArrowForwardIcon />}
            >
              Semi Finals
            </Button>
          </div>
        </div>
      )}
      {semiFinals && (
        <div className="semi-finals">
          <div className="mt-2 mb-4 font-extrabold text-3xl text-center">
            SEMI FINALS
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 my-4">
            {Object.entries(semiFinals).map(([group, teams]) => (
              <Fixture
                key={group}
                teams={teams}
                setFinal={setFinal}
                setChampion={setChampion}
              />
            ))}
          </div>
        </div>
      )}
      {final.length > 0 && (
        <div className="final flex flex-col justify-between items-start my-4">
          <div className="my-2 font-extrabold text-3xl w-full text-center">
            FINAL
          </div>
          <Fixture
            teams={final}
            setFinal={setFinal}
            setChampion={setChampion}
            stage={FINAL}
          />
        </div>
      )}
      {champion && (
        <div className="champion flex flex-col justify-center items-center my-4">
          <div className="my-2 font-extrabold text-4xl w-full text-center">
            CHAMPIONS
          </div>
          <div className="team-card disable-select dragHandle flex flex-col items-center justify-center border p-2 bg-[#F1E166] bg-opacity-25 rounded-md w-72 border-yellow-400 mb-8">
            <h3 className="text-white font-extrabold text-3xl">
              {champion?.name.toUpperCase()}
            </h3>
            <span
              className={`fi fi-${champion?.alpha2?.toLowerCase()} h-[100px] w-[100px] disable-select`}
            ></span>
          </div>
        </div>
      )}
      {semiFinals ? (
        !champion ? (
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              setSemiFinals(null);
              setFinal([]);
              setChampion(null);
            }}
            startIcon={<ArrowBack />}
          >
            Back
          </Button>
        ) : (
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              setSuper8s(null);
              setSemiFinals(null);
              setFinal([]);
              setChampion(null);
            }}
          >
            Reset
          </Button>
        )
      ) : null}
    </div>
  );
};

export default GroupStage;
