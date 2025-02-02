import React, { Dispatch, SetStateAction, useState } from "react";
import { SignupTypes } from "../../interfaces";
import TableModal from "../../ui/TableModal";
// import EditstationForm from "./EditstationForm";
import Swal from "sweetalert2";
// import { useDeleteStation } from "./useDeleteStation";
import { dateformat } from "../../utils/dateFormat";
import { useDeleteStation } from "./useDeleteStation";
import EditStationForm from "./EditStationForm";

interface AdminStationProps {
  station: SignupTypes | null;
  setStationId: Dispatch<SetStateAction<string | null>>;
}

const AdminStation: React.FC<AdminStationProps> = ({
  station,
  setStationId,
}) => {
  // const { data: station, isLoading } = useStation(station?.station_id!);

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleCloseModal = () => {
    setIsEdit(false);
  };

  const { deleteStation } = useDeleteStation();

  const handleDeletestation = (e: React.MouseEvent) => {
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
        deleteStation(station?.id!);
        setIsEdit(false);
        if (setStationId) {
          setStationId(null);
        }
      }
    });
  };

  console.log(station);

  // }
  return (
    // <div></div>
    <>
      {!isEdit && (
        <div
          className="w-full md:w-[500px]  bg-white shadow-lg rounded-lg overflow-hidden pb-4"
          style={{ fontFamily: "Roboto", letterSpacing: "0.6px" }}
        >
          {/* <img
            className="w-full h-36 md:h-44 object-contain"
            src={station?.photo}
            alt={`${station?.name}'s photo`}
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
              STATION
            </h2>
            {/* <h2 className="text-center font-semibold text-base md:text-lg text-gray-800 mb-2">
              {station?.name}
            </h2> */}

            <div className="flex flex-col gap-1">
              <p className="text-xs md:text-sm text-gray-600">
                <strong>NAME:</strong> {station?.name}
              </p>
              <p className="text-xs md:text-sm text-gray-600">
                <strong>DRN:</strong> {station?.drn}
              </p>
              <p className="text-xs md:text-sm text-gray-600">
                <strong>File Number:</strong> {station?.fileNumber}
              </p>
              <p className="text-xs md:text-sm text-gray-600">
                <strong>Phone:</strong> {station?.phone}
              </p>

              {station && (
                <p className="text-xs md:text-sm text-gray-600">
                  <strong>Jioned On:</strong> {dateformat(station?.createdAt!)}
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
              onClick={handleDeletestation}
            >
              Delete
            </button>
          </div>
        </div>
      )}

      {isEdit && (
        <TableModal onClose={handleCloseModal}>
          <div className="scale-90 mt-4">
            <EditStationForm station={station!} setIsEdit={setIsEdit} />
          </div>
        </TableModal>
      )}
    </>
  );
};

export default AdminStation;
