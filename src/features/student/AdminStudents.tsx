import React, { useEffect, useState } from "react";
import { useStudents } from "./useStudents";
import SpinnerMini from "../../ui/SpinnerMini";
import Table from "../../ui/Table";

import TableModal from "../../ui/TableModal";
import { StudentType } from "../../interfaces";
import { BiSearch } from "react-icons/bi";
import AdminStudent from "./AdminStudent";

const Students: React.FC = () => {
  const { data: students, isLoading } = useStudents();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [studentId, setStudentId] = useState<string | null>("");
  const [viewStudent, setViewStudent] = useState<StudentType | null>(null);
  const [filteredStudents, setFilteredStudents] = useState<StudentType[]>([]);

  useEffect(() => {
    if (students?.data) {
      const term = searchTerm.toLowerCase();
      const filtered = students.data.filter(
        (student: StudentType) =>
          student.fileNumber.toLowerCase().includes(term) ||
          student.name.toLowerCase().includes(term) ||
          // student.mrn.toLowerCase().includes(term) ||
          student.phone.toLowerCase().includes(term) ||
          student.bvn.toLowerCase().includes(term) ||
          student.nin.toLowerCase().includes(term)
      );
      setFilteredStudents(filtered);
    }
  }, [searchTerm, students]);

  useEffect(() => {
    if (studentId) {
      const currentStudent = filteredStudents.find(
        (student) => student.id === studentId
      );
      setViewStudent(currentStudent || null);
    }
  }, [studentId, filteredStudents]);

  // Assign sequential IDs
  const studentsWithIds = filteredStudents.map((student, index) => ({
    ...student,
    sequentialId: index + 1,
  }));

  const handleViewClick = (id: string) => {
    setStudentId(id);
  };

  const handleCloseModal = () => {
    setStudentId(null);
  };

  if (isLoading) {
    return (
      <div className="relative flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm w-full h-screen">
        <SpinnerMini />
      </div>
    );
  }
  return (
    <div className="bg-blue-500 flex flex-col items-center w-full h-screen py-8 px-2">
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
          <div className="h-[500px] overflow-y-scroll">
            <Table.Body
              data={studentsWithIds}
              render={(student: StudentType) => (
                <Table.Row key={student.id}>
                  {/* Sequential ID */}
                  <div className="border-r text-white text-xs md:text-base font-bold px-2 py-1">
                    {student.sequentialId}
                  </div>

                  <div className=" text-xs md:text-base border-r text-white px-2 py-1 ">
                    {student.name}
                  </div>

                  <div className=" text-[8px] flex justify-center px-2 py-1">
                    <button
                      className=" text-white bg-blue-500 border border-white hover:bg-blue-600 px-1 rounded-md"
                      type="button"
                      onClick={() => handleViewClick(student.id)}
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

      {studentId && (
        <TableModal onClose={handleCloseModal}>
          <div className="max-h-[600px] mt-2 overflow-y-scroll px-2 ">
            <AdminStudent student={viewStudent} setStudentId={setStudentId} />
          </div>
        </TableModal>
      )}
    </div>
  );
};

export default Students;
