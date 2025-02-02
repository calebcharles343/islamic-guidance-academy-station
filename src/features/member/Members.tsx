import React, { useEffect, useState } from "react";
import { useMembers } from "./useMembers";
import SpinnerMini from "../../ui/SpinnerMini";
import Table from "../../ui/Table";
import Member from "./Member";
import TableModal from "../../ui/TableModal";
import { Verification } from "../../interfaces";
import { BiSearch } from "react-icons/bi";

const Members: React.FC = () => {
  const { data: members, isLoading } = useMembers();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredMembers, setFilteredMembers] = useState<Verification[]>([]);
  const [selectedMember, setSelectedMember] = useState<Verification | null>(
    null
  );

  useEffect(() => {
    if (members?.data) {
      const term = searchTerm.toLowerCase();
      const filtered = members.data.filter(
        (member: Verification) =>
          member.fileNumber.toLowerCase().includes(term) ||
          member.name.toLowerCase().includes(term) ||
          // member.mrn.toLowerCase().includes(term) ||
          member.phone.toLowerCase().includes(term) ||
          member.bvn.toLowerCase().includes(term) ||
          member.nin.toLowerCase().includes(term)
      );
      setFilteredMembers(filtered);
    }
  }, [searchTerm, members]);

  // Assign sequential IDs
  const membersWithIds = filteredMembers.map((member, index) => ({
    ...member,
    sequentialId: index + 1,
  }));

  const handleViewClick = (member: Verification) => {
    setSelectedMember(member);
  };

  const handleCloseModal = () => {
    setSelectedMember(null);
  };

  if (isLoading) {
    return (
      <div className="relative flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm w-full h-screen">
        <SpinnerMini />
      </div>
    );
  }

  return (
    <div className="bg-blue-500 flex flex-col items-center w-full h-screen py-8 px-2 overflow-y-scroll">
      <span
        className="text-xl font-bold text-white text-center mb-4 border-2 py-2 px-4 rounded-lg"
        style={{ letterSpacing: "4px" }}
      >
        MEMBERS
      </span>

      <span className="text-base md:text-lg font-bold text-gray-200">
        {" "}
        SEARCH
      </span>

      <div className="flex items-center w-full max-w-[260px] md:max-w-[275px] mb-2  md:mb-4 gap-1 md:gap-2">
        <div className="flex items-center text-gray-200 ">
          <span className="border p-1">
            <BiSearch className="w-4 h-4 md:w-6 md:h-6" />
          </span>
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-1 md:p-2 border border-gray-500 rounded-md placeholder:text-[11px]  placeholder:text-gray-600"
          placeholder="File Number, BVN, NIN, MRN or Phone"
        />
      </div>

      <div className="w-full md:w-[600px] flex flex-col items-center  px-2">
        <Table columns="">
          <Table.Header>
            <div className=" h-full text-xs  md:text-base border-r border-gray-800 px-2 py-1">
              s/N
            </div>
            <div className="h-full r text-xs  md:text-base border-r border-gray-800 px-2 py-1 ">
              Name
            </div>

            <div className="min-w-[90px] h-full text-xs md:text-base px-1 md:px-2 py-1">
              Actions
            </div>
          </Table.Header>
          <div className="msx-h-[500px] overflow-y-scroll">
            <Table.Body
              data={membersWithIds}
              render={(member: Verification) => (
                <Table.Row key={member.id}>
                  {/* Sequential ID */}
                  <div className="border-r text-white text-xs md:text-base font-bold px-2 py-1">
                    {member.sequentialId}
                  </div>

                  <div className=" text-xs md:text-base border-r text-white px-2 py-1 ">
                    {member.name}
                  </div>

                  <div className=" text-[8px] flex justify-center px-2 py-1">
                    <button
                      className=" text-white bg-blue-500 border border-white hover:bg-blue-600 px-1 rounded-md"
                      type="button"
                      onClick={() => handleViewClick(member)}
                    >
                      View
                    </button>
                  </div>
                </Table.Row>
              )}
            />
          </div>
        </Table>
      </div>

      {selectedMember && (
        <TableModal onClose={handleCloseModal}>
          <div className="max-h-[600px] mt-2 overflow-y-scroll">
            <Member member={selectedMember} />
          </div>
        </TableModal>
      )}
    </div>
  );
};

export default Members;
