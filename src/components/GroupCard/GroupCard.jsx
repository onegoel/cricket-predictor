/* eslint-disable react/prop-types */
import { useRef } from "react";
import westIndiesLogo from "../../assets/flags/westIndies.svg";
import DraggableList from "react-draggable-list";

// eslint-disable-next-line no-unused-vars
const TeamCard = ({ item, itemSelected, dragHandleProps }) => {
  const { onMouseDown, onTouchStart } = dragHandleProps;
  return (
    <div
      className="team-card disable-select dragHandle flex flex-row items-center justify-between border p-2 border-gray-300 bg-stone-900 rounded-md w-72"
      onTouchStart={(e) => {
        e.preventDefault();
        onTouchStart(e);
      }}
      onMouseDown={(e) => {
        onMouseDown(e);
      }}
    >
      <h3 className="text-white">{item?.name}</h3>
      {item?.shortName === "WI" ? (
        <img src={westIndiesLogo} alt="West Indies" className="h-10 w-10" />
      ) : (
        <span
          className={`fi fi-${item?.alpha2?.toLowerCase()} h-10 w-10 disable-select`}
        ></span>
      )}
    </div>
  );
};

const GroupCard = ({ group, teams, onReorderGroup }) => {
  const containerRef = useRef();
  return (
    <div>
      <h2 className="p-1 underline font-bold">Group {group}</h2>
      <div
        ref={containerRef}
        style={{
          touchAction: "pan-y",
        }}
      >
        {teams && (
          <DraggableList
            itemKey="shortName"
            container={() => containerRef.current}
            padding={0}
            onMoveEnd={onReorderGroup}
            list={teams}
            template={TeamCard}
          ></DraggableList>
        )}
      </div>
    </div>
  );
};

export default GroupCard;
