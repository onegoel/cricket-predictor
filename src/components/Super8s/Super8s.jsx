import { Button, Grid } from "@mui/material";
import GroupCard from "../GroupCard/GroupCard";
import { SUPER_8S } from "../../constants/stage";

const Super8s = (super8s, onReorderGroup, setSemiFinals) => {
  const generateSemiFinals = () => {
    const super8sCopy = { ...super8s };
    const semiFinals = {
      1: [super8sCopy[1][0], super8sCopy[2][1]],
      2: [super8sCopy[2][0], super8sCopy[1][1]],
    };
    setSemiFinals(semiFinals);
  };

  return (
    <div className="super-8s">
      {super8s && (
        <>
          <h2>Super 8s</h2>
          <div>
            <Grid container spacing={2}>
              {Object.entries(super8s)?.map(([group, teams]) => (
                <Grid item key={group} xs={6} sm={3}>
                  <GroupCard
                    group={group}
                    teams={teams}
                    onReorderGroup={(list) => onReorderGroup(list, SUPER_8S)}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={generateSemiFinals}
          >
            Save Super 8s
          </Button>
        </>
      )}
    </div>
  );
};

export default Super8s;
