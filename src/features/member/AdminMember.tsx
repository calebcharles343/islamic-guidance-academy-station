import React, { Dispatch, SetStateAction, useState } from "react";
import { MemberType } from "../../interfaces";
import { useStation } from "../authenticaton/useStation";
import TableModal from "../../ui/TableModal";
import EditMemberForm from "./EditMemberForm";
import Swal from "sweetalert2";
import { useDeleteMember } from "./useDeleteMember";
import { dateformat } from "../../utils/dateFormat";

interface AdminMemberProps {
  member: MemberType | null;
  setMembertId: Dispatch<SetStateAction<string | null>>;
}

const AdminMember: React.FC<AdminMemberProps> = ({ member, setMembertId }) => {
  const { data: station, isLoading } = useStation(member?.station_id!);

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleCloseModal = () => {
    setIsEdit(false);
  };

  const { deleteMember } = useDeleteMember();

  const handleDeleteMember = (e: React.MouseEvent) => {
    e.stopPropagation();

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this entry?",
      showCancelButton: true,
      confirmButtonColor: "#052859",
      cancelButtonColor: "#DC3340",
      confirmButtonText: "Yes, delete it!",
      customClass: { popup: "custom-style" },
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMember(member?.id!);
        setIsEdit(false);
        if (setMembertId) {
          setMembertId(null);
        }
      }
    });
  };

  // console.log(member?.createdAt);

  // }
  return (
    <>
      {!isEdit && (
        <div
          className="w-full md:w-[500px]  bg-white shadow-lg rounded-lg overflow-hidden pb-4"
          style={{ fontFamily: "Roboto", letterSpacing: "0.6px" }}
        >
          <img
            className="w-full h-36 md:h-44 object-contain"
            src={member?.photo}
            alt={`${member?.name}'s photo`}
          />
          <div
            className="p-4"
            style={{
              wordBreak: "break-word",
              overflowWrap: "break-word",
              whiteSpace: "pre-wrap",
            }}
          >
            <h2 className="text-center font-semibold text-base md:text-lg text-gray-800 mb-2">
              {member?.name}
            </h2>

            <div className="flex flex-col gap-1">
              <p className="text-xs md:text-sm text-gray-600">
                <strong>MRN:</strong> {member?.mrn}
              </p>
              <p className="text-xs md:text-sm text-gray-600">
                <strong>File Number:</strong> {member?.fileNumber}
              </p>
              <p className="text-xs md:text-sm text-gray-600">
                <strong>Date of Birth:</strong> {member?.dateOfBirth}
              </p>
              <p className="text-xs md:text-sm text-gray-600">
                <strong>Phone:</strong> {member?.phone}
              </p>
              <p className="text-xs md:text-sm text-gray-600">
                <strong>Ethnic Group:</strong> {member?.ethnicGroup}
              </p>
              <p className="text-xs md:text-sm text-gray-600">
                <strong>State of Origin:</strong> {member?.stateOfOrigin}
              </p>
              <p className="text-xs md:text-sm text-gray-600">
                <strong>Address:</strong> {member?.residentialAddress}
              </p>
              <p className="text-xs md:text-sm text-gray-600">
                <strong>Occupation:</strong> {member?.occupation}
              </p>
              <p className="text-xs md:text-sm text-gray-600">
                <strong>Family House Name:</strong> {member?.familyHouseName}
              </p>
              <p className="text-xs md:text-sm text-gray-600">
                <strong>FHRN:</strong> {member?.fhrn}
              </p>
              <p className="text-xs md:text-sm text-gray-600">
                <strong>NIN:</strong> {member?.nin}
              </p>
              <p className="text-xs md:text-sm text-gray-600">
                <strong>BVN:</strong> {member?.bvn}
              </p>
              {isLoading ? (
                <p> "loading station ..."</p>
              ) : (
                <p className="text-xs md:text-sm text-gray-600">
                  <strong>Verified By:</strong> {station.name}
                  {` - ${station.station} - ${
                    station.drn !== undefined ? station.drn : ""
                  } `}
                </p>
              )}

              {member && (
                <p className="text-xs md:text-sm text-gray-600">
                  <strong>Verified On:</strong> {dateformat(member?.createdAt!)}
                </p>
              )}
            </div>
          </div>
          <div className="text-sm flex items-center justify-center gap-4 p-1">
            <button
              className="w-24 text-blue-500 border border-blue-500  py-1 px-2 rounded-md"
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>{" "}
            <button
              className="w-24 text-red-500 border border-red-500 p-1 rounded-md"
              onClick={handleDeleteMember}
            >
              Delete
            </button>
          </div>
        </div>
      )}

      {isEdit && (
        <TableModal onClose={handleCloseModal}>
          <div className="scale-90">
            <EditMemberForm member={member!} setIsEdit={setIsEdit} />
          </div>
        </TableModal>
      )}
    </>
  );
};

export default AdminMember;
