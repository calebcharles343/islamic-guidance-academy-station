import React from "react";
import { StudentType } from "../../interfaces";
import { useStation } from "../authenticaton/useStation";

interface StudentProps {
  student: StudentType;
}

const Student: React.FC<StudentProps> = ({ student }) => {
  const { data: station, isLoading } = useStation(student.station_id!);

  // }
  return (
    <div
      className="w-full  mxx-w-[400px] bg-white shadow-lg rounded-lg overflow-hidden"
      style={{ fontFamily: "Roboto", letterSpacing: "0.6px" }}
    >
      <img
        className="w-full h-48 object-contain"
        src={student.photo}
        alt={`${student.name}'s photo`}
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
          {student.name}
        </h2>

        <div className="flex flex-col gap-1">
          <p className="text-xs md:text-sm text-gray-600">
            <strong>MRN:</strong> {student.mrn}
          </p>
          <p className="text-xs md:text-sm text-gray-600">
            <strong>File Number:</strong> {student.fileNumber}
          </p>
          <p className="text-xs md:text-sm text-gray-600">
            <strong>Date of Birth:</strong> {student.dateOfBirth}
          </p>
          <p className="text-xs md:text-sm text-gray-600">
            <strong>Phone:</strong> {student.phone}
          </p>
          <p className="text-xs md:text-sm text-gray-600">
            <strong>Ethnic Group:</strong> {student.ethnicGroup}
          </p>
          <p className="text-xs md:text-sm text-gray-600">
            <strong>State of Origin:</strong> {student.stateOfOrigin}
          </p>
          <p className="text-xs md:text-sm text-gray-600">
            <strong>Address:</strong> {student.residentialAddress}
          </p>
          <p className="text-xs md:text-sm text-gray-600">
            <strong>Occupation:</strong> {student.occupation}
          </p>
          <p className="text-xs md:text-sm text-gray-600">
            <strong>Family House Name:</strong> {student.familyHouseName}
          </p>
          <p className="text-xs md:text-sm text-gray-600">
            <strong>FHRN:</strong> {student.fhrn}
          </p>
          <p className="text-xs md:text-sm text-gray-600">
            <strong>NIN:</strong> {student.nin}
          </p>
          <p className="text-xs md:text-sm text-gray-600">
            <strong>BVN:</strong> {student.bvn}
          </p>
          {isLoading ? (
            <p> "loading station ..."</p>
          ) : (
            <p className="text-xs md:text-sm text-gray-600">
              <strong>Verified By:</strong> {station.name}
              {` - ${station.station}`}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Student;
