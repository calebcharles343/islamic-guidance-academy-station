import React from "react";
import { MemberType } from "../../interfaces";
import { useStation } from "../station/useStation";

interface memberProps {
  member: MemberType;
}

const Member: React.FC<memberProps> = ({ member }) => {
  const { data: station, isLoading } = useStation(member.station_id!);

  // }
  return (
    <div
      className="w-full  md:min-w-[400px] bg-white shadow-lg rounded-lg overflow-hidden"
      style={{ fontFamily: "Roboto", letterSpacing: "0.6px" }}
    >
      <img
        className="w-full h-36 md:h-44 object-contain"
        src={member.photo}
        alt={`${member.name}'s photo`}
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
          {member.name}
        </h2>

        <div className="flex flex-col gap-1">
          <p className="text-xs md:text-sm text-gray-600">
            <strong>MRN:</strong> {member.mrn}
          </p>
          <p className="text-xs md:text-sm text-gray-600">
            <strong>File Number:</strong> {member.fileNumber}
          </p>
          <p className="text-xs md:text-sm text-gray-600">
            <strong>Date of Birth:</strong> {member.dateOfBirth}
          </p>
          <p className="text-xs md:text-sm text-gray-600">
            <strong>Phone:</strong> {member.phone}
          </p>
          <p className="text-xs md:text-sm text-gray-600">
            <strong>Ethnic Group:</strong> {member.ethnicGroup}
          </p>
          <p className="text-xs md:text-sm text-gray-600">
            <strong>State of Origin:</strong> {member.stateOfOrigin}
          </p>
          <p className="text-xs md:text-sm text-gray-600">
            <strong>Address:</strong> {member.residentialAddress}
          </p>
          <p className="text-xs md:text-sm text-gray-600">
            <strong>Occupation:</strong> {member.occupation}
          </p>
          <p className="text-xs md:text-sm text-gray-600">
            <strong>Family House Name:</strong> {member.familyHouseName}
          </p>
          <p className="text-xs md:text-sm text-gray-600">
            <strong>FHRN:</strong> {member.fhrn}
          </p>
          <p className="text-xs md:text-sm text-gray-600">
            <strong>NIN:</strong> {member.nin}
          </p>
          <p className="text-xs md:text-sm text-gray-600">
            <strong>BVN:</strong> {member.bvn}
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
    </div>
  );
};

export default Member;
