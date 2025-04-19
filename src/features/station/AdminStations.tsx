import React, { useEffect, useState } from "react";
import { useStations } from "./useStations";
import SpinnerMini from "../../ui/SpinnerMini";
import Table from "../../ui/Table";
import TableModal from "../../ui/TableModal";
import { StationTypes } from "../../interfaces";
import { BiLogOut, BiSearch } from "react-icons/bi";

import { useAdminLogout } from "../authenticaton/useAdminLogout";
import AdminStation from "./AdminStation";

const AdminStations: React.FC = () => {
  const { data: stations, isLoading } = useStations();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [stationId, setStationId] = useState<string | null>("");
  const [viewStation, setViewStation] = useState<StationTypes | null>(null);
  const [filteredStations, setFilteredStations] = useState<StationTypes[]>([]);

  const { logout, isPending } = useAdminLogout();

  console.log(viewStation);

  useEffect(() => {
    if (stations) {
      const term = searchTerm.toLowerCase();
      const filtered = stations.filter(
        (station: StationTypes) =>
          station.name?.toLowerCase().includes(term) ||
          station.email?.toLowerCase().includes(term) ||
          station.fileNumber?.includes(term) ||
          station.drn?.includes(term) ||
          station.phone?.includes(term)
      );
      setFilteredStations(filtered);
    }
  }, [searchTerm, stations]);

  useEffect(() => {
    if (stationId) {
      const currentStation = filteredStations.find(
        (station) => station.id === stationId
      );
      setViewStation(currentStation || null);
    }
  }, [stationId, filteredStations]);

  // Assign sequential IDs
  const stationsWithIds = filteredStations.map((station, index) => ({
    ...station,
    sequentialId: index + 1,
  }));

  const handleViewClick = (id: string) => {
    setStationId(id);
  };

  const handleCloseModal = () => {
    setStationId(null);
  };

  const handleLogout = async () => {
    logout();
  };

  if (isLoading) {
    return (
      <div className="relative flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm w-full h-screen">
        <SpinnerMini />
      </div>
    );
  }
  return (
    // <div className="border bg-blue-500 flex flex-col items-center w-full h-screen py-8 px-2 md:px-4 gap-8">
    <div className="bg-blue-500 h-screen py-8 px-2 md:px-4 gap-8">
      {isPending ? (
        <SpinnerMini />
      ) : (
        <button
          className="flex items-center self-start justify-center gap-2 mt-auto mb-8 text-gray-800 bg-gray-50 p-2 rounded hover:bg-gray-800 hover:text-gray-50 transition-colors duration-200"
          onClick={handleLogout}
        >
          <BiLogOut />
          Log out
        </button>
      )}

      <div className="flex flex-col items-center">
        <span
          className="text-xl font-bold text-white text-center mb-4 border-2 py-2 px-4 rounded-lg"
          style={{ letterSpacing: "4px" }}
        >
          STATION
        </span>

        <span className="text-base md:text-lg font-bold text-gray-200">
          {" "}
          SEARCH
        </span>

        <div className="flex items-center w-full h-10 bg-white max-w-[260px] md:max-w-[275px] mb-2  md:mb-4  rounded-lg">
          <div className="flex items-center text-gray-200 ">
            <span className="text-gray-500 p-1 rounded-lg">
              <BiSearch className="w-4 h-4 md:w-6" />
            </span>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border w-full h-full pb-1 px-2  rounded-md placeholder:text-[11px]  placeholder:text-gray-600"
            placeholder="File Number, name, email, DRN or Phone"
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
            <div className="max-h-[500px] overflow-y-scroll">
              <Table.Body
                data={stationsWithIds}
                render={(station: StationTypes) => (
                  <Table.Row key={station.id}>
                    {/* Sequential ID */}
                    <div className="border-r text-white text-xs md:text-base font-bold px-2 py-1">
                      {station.sequentialId}
                    </div>

                    <div className=" text-xs md:text-base border-r text-white px-2 py-1 ">
                      {station.name}
                    </div>

                    <div className=" text-[8px] flex justify-center px-2 py-1">
                      <button
                        className=" text-white bg-blue-500 border border-white hover:bg-blue-600 px-1 rounded-md"
                        type="button"
                        onClick={() => handleViewClick(station.id!)}
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
      </div>

      {stationId && (
        <TableModal onClose={handleCloseModal}>
          <div className="mt-2 overflow-y-scroll">
            <AdminStation station={viewStation} setStationId={setStationId} />
          </div>
        </TableModal>
      )}
    </div>
  );
};

export default AdminStations;
