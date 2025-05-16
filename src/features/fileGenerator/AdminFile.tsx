import React, { Dispatch, SetStateAction, useState } from "react";
import { FileGenerator } from "../../interfaces";
// import { useStation } from "../station/useStation";
// import TableModal from "../../ui/TableModal";
// import EditMemberForm from "./EditMemberForm";
// import Swal from "sweetalert2";
// import { useDeleteMember } from "./useDeleteMember";
import { dateformat } from "../../utils/dateFormat";
import FileAttachmentContainer from "../../ui/FileAttachmentContainer";

interface AdminFileProps {
  file: FileGenerator | null;
  setFileId?: Dispatch<SetStateAction<string | null>>;
}

const AdminFile: React.FC<AdminFileProps> = ({ file }) => {
  // const { data: station, isLoading } = useStation(member?.station_id!);

  // const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isEdit] = useState<boolean>(false);

  const filesAtt = file?.files || [];

  // const handleCloseModal = () => {
  //   setIsEdit(false);
  // };

  // const { deleteMember } = useDeleteMember();

  // const handleDeleteMember = (e: React.MouseEvent) => {
  //   e.stopPropagation();

  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "Do you want to delete this entry?",
  //     showCancelButton: true,
  //     confirmButtonColor: "#052859",
  //     cancelButtonColor: "#DC3340",
  //     confirmButtonText: "Yes, delete it!",
  //     customClass: { popup: "custom-style" },
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       deleteMember(member?.id!);
  //       setIsEdit(false);
  //       if (setMembertId) {
  //         setMembertId(null);
  //       }
  //     }
  //   });
  // };

  // console.log(member?.createdAt);

  // }
  return (
    <>
      {!isEdit && (
        <div
          className="w-full md:w-[500px]  bg-white shadow-lg rounded-lg overflow-hidden pb-4"
          style={{ fontFamily: "Roboto", letterSpacing: "0.6px" }}
        >
          {/* <img
            className="w-full h-36 md:h-44 object-contain"
            src={member?.photo}
            alt={`${member?.name}'s photo`}
          /> */}
          <div
            className="p-4"
            style={{
              wordBreak: "break-word",
              overflowWrap: "break-word",
              whiteSpace: "pre-wrap",
            }}
          >
            <h2 className="text-center font-semibold text-base md:text-lg text-gray-800 mb-2">
              {`${file?.firstName} ${file?.lastName}`}
            </h2>

            <div className="flex flex-col gap-1">
              <p className="text-xs md:text-sm text-gray-600">
                <strong>MRN:</strong> {file?.mrn}
              </p>
              <p className="text-xs md:text-sm text-gray-600">
                <strong>File Number:</strong> {file?.fileNumber}
              </p>
              <p className="text-xs md:text-sm text-gray-600">
                <strong>Phone:</strong> {file?.phone}
              </p>
              <p className="text-xs md:text-sm text-gray-600">
                <strong>Ethnic Group:</strong> {file?.ethnicGroup}
              </p>
              <p className="text-xs md:text-sm text-gray-600">
                <strong>State of Origin:</strong> {file?.stateOfOrigin}
              </p>

              {file && (
                <p className="text-xs md:text-sm text-gray-600">
                  <strong>Generated On:</strong>{" "}
                  {file?.createdAt ? dateformat(file?.createdAt!) : "N/A"}
                </p>
              )}
            </div>
          </div>

          {/* File Attachments Section */}
          {filesAtt && filesAtt.length > 0 && (
            <FileAttachmentContainer files={filesAtt} />
          )}

          {/* <div className="text-sm flex items-center justify-center gap-4 p-1">
            <button
              className="w-24 text-blue-500 border border-blue-500  py-1 px-2 rounded-md"
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>{" "}
            <button
              className="w-24 text-red-500 border border-red-500 p-1 rounded-md"
              // onClick={handleDeletefile}
            >
              Delete
            </button>
          </div> */}
        </div>
      )}
      {/* 
      {isEdit && (
        <TableModal onClose={handleCloseModal}>
          <div className="scale-90">
            <EditFileForm file={file!} setIsEdit={setIsEdit} />
          </div>
        </TableModal>
      )} */}
    </>
  );
};

export default AdminFile;
