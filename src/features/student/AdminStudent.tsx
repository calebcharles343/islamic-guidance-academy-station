import React, { Dispatch, SetStateAction, useState } from "react";
import { StudentType } from "../../interfaces";
import { useStation } from "../authenticaton/useStation";
import TableModal from "../../ui/TableModal";
import EditVerificationForm from "./EditStudentForm";
import Swal from "sweetalert2";
import { useDeleteStudent } from "./useDeleteStudent";

interface StudentProps {
  student: StudentType | null;
  setStudentId: Dispatch<SetStateAction<string | null>>;
}

const AdminStudent: React.FC<StudentProps> = ({ student, setStudentId }) => {
  const { data: station, isLoading } = useStation(student?.station_id!);

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleCloseModal = () => {
    setIsEdit(false);
  };

  const { deleteStudent } = useDeleteStudent();

  const handleDeleteStudent = (e: React.MouseEvent) => {
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
        deleteStudent(student?.id!);
        setIsEdit(false);
        if (setStudentId) {
          setStudentId(null);
        }
      }
    });
  };

  // }
  return (
    <>
      {!isEdit && (
        <div
          className="w-full  bg-white shadow-lg rounded-lg overflow-hidden"
          style={{ fontFamily: "Roboto", letterSpacing: "0.6px" }}
        >
          <img
            className="w-full h-36 md:h-44 object-contain"
            src={student?.photo}
            alt={`${student?.name}'s photo`}
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
              {student?.name}
            </h2>

            <div className="flex flex-col gap-1">
              <p className="text-xs md:text-sm text-gray-600">
                <strong>MRN:</strong> {student?.mrn}
              </p>
              <p className="text-xs md:text-sm text-gray-600">
                <strong>File Number:</strong> {student?.fileNumber}
              </p>
              <p className="text-xs md:text-sm text-gray-600">
                <strong>Date of Birth:</strong> {student?.dateOfBirth}
              </p>
              <p className="text-xs md:text-sm text-gray-600">
                <strong>Phone:</strong> {student?.phone}
              </p>
              <p className="text-xs md:text-sm text-gray-600">
                <strong>Ethnic Group:</strong> {student?.ethnicGroup}
              </p>
              <p className="text-xs md:text-sm text-gray-600">
                <strong>State of Origin:</strong> {student?.stateOfOrigin}
              </p>
              <p className="text-xs md:text-sm text-gray-600">
                <strong>Address:</strong> {student?.residentialAddress}
              </p>
              <p className="text-xs md:text-sm text-gray-600">
                <strong>Occupation:</strong> {student?.occupation}
              </p>
              <p className="text-xs md:text-sm text-gray-600">
                <strong>Family House Name:</strong> {student?.familyHouseName}
              </p>
              <p className="text-xs md:text-sm text-gray-600">
                <strong>FHRN:</strong> {student?.fhrn}
              </p>
              <p className="text-xs md:text-sm text-gray-600">
                <strong>NIN:</strong> {student?.nin}
              </p>
              <p className="text-xs md:text-sm text-gray-600">
                <strong>BVN:</strong> {student?.bvn}
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
              onClick={handleDeleteStudent}
            >
              Delete
            </button>
          </div>
        </div>
      )}

      {isEdit && (
        <TableModal onClose={handleCloseModal}>
          <div className="scale-90">
            <EditVerificationForm student={student!} setIsEdit={setIsEdit} />
          </div>
        </TableModal>
      )}
    </>
  );
};

export default AdminStudent;
