import { useFiles } from "./useMRNs";

import React, { useEffect, useState } from "react";
import SpinnerMini from "../../ui/SpinnerMini";
import Table from "../../ui/Table";
import TableModal from "../../ui/TableModal";
import { MRNType } from "../../interfaces";
import { BiLogOut, BiSearch } from "react-icons/bi";
import AdminMRN from "./AdminMRN";
import { useAdminLogout } from "../authenticaton/useAdminLogout";

const Files: React.FC = () => {
  const { data, isLoading } = useFiles();

  const files = data?.data.files || [];

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [fileId, setFileId] = useState<string | null>("");
  const [viewFile, setViewFile] = useState<MRNType | null>(null);
  const [filteredFiles, setFilteredFiles] = useState<MRNType[]>([]);

  const { logout, isPending } = useAdminLogout();

  useEffect(() => {
    if (files) {
      const term = searchTerm.toLowerCase();
      const filtered = files.filter(
        (file: MRNType) =>
          file.fileNumber.toLowerCase().includes(term) ||
          file.lastName.toLowerCase().includes(term) ||
          file.firstName.toLowerCase().includes(term) ||
          file.phone.toLowerCase().includes(term) ||
          file.mrn.toLowerCase().includes(term)
      );
      setFilteredFiles(filtered);
    }
  }, [searchTerm, files]);

  useEffect(() => {
    if (fileId) {
      const currentFile = filteredFiles.find((file) => file.id === fileId);
      setViewFile(currentFile || null);
    }
  }, [fileId, filteredFiles]);

  // Assign sequential IDs
  const filesWithIds = filteredFiles.map((file, index) => ({
    ...file,
    sequentialId: index + 1,
  }));

  const handleViewClick = (id: string) => {
    setFileId(id);
  };

  const handleCloseModal = () => {
    setFileId(null);
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
          ADMIN FILES
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
            <div className="max-h-[400px] overflow-y-scroll">
              <Table.Body
                data={filesWithIds}
                render={(file: MRNType) => (
                  <Table.Row key={file.id}>
                    {/* Sequential ID */}
                    <div className="border-r text-white text-xs md:text-base font-bold px-2 py-1">
                      {file.sequentialId}
                    </div>

                    <div className=" text-xs md:text-base border-r text-white px-2 py-1 ">
                      {`${file?.firstName} ${file?.lastName}`}
                    </div>

                    <div className=" text-[8px] flex justify-center px-2 py-1">
                      <button
                        className=" text-white bg-blue-500 border border-white hover:bg-blue-600 px-1 rounded-md"
                        type="button"
                        onClick={() => handleViewClick(file.id!)}
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

      {fileId && (
        <TableModal onClose={handleCloseModal}>
          <div className=" max-h-[630px] mt-2 overflow-y-scroll px-2 ">
            <AdminMRN file={viewFile} setFileId={setFileId} />
          </div>
        </TableModal>
      )}
    </div>
  );
};

export default Files;
