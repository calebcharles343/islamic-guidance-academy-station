import Members from "../features/member/Members";

const MembersTable: React.FC = () => {
  return (
    <div
      className="h-max "
      style={{ fontFamily: "Roboto", letterSpacing: "0.8px" }}
    >
      <Members />
    </div>
  );
};

export default MembersTable;
