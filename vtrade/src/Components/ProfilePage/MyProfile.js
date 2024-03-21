import * as React from "react";
import { starSvg } from "../../Constants";
import { LuCalendarDays } from "react-icons/lu";
import { useState, useRef, useEffect } from "react";
import apiClient from "../../Services/apiClient";
import Loader from "../Loader";
import pic from "../../Assets/profile_pic.png";

export default function MyProfile(props) {
  const [loader, setLoader] = useState(true);
  const [user, setUser] = useState(null);
  // temporary
  useEffect(() => {
    const getUser = async () => {
      try {
        const { data, error } = await apiClient.getUser(props.user.id);

        console.log("here");
        console.log(data);
        if (data) {
          setUser(data.user);
        } else {
          console.error("Error fetching data:", error);
        }
      } catch (error) {
        console.error("Error setting data:", error);
      }
    };
    if (user === null) getUser();
  }, [user]);
  useEffect(() => {
    if (user) setLoader(false);
  }, [user]);

  return (
    <div>
      {loader ? (
        <Loader />
      ) : (
        <div className="mt-10 relative bg-gray-300 border border-black p-4 w-[400px] h-[380px] flex justify-start items-end shadow-md mb-2 ">
          <img
            src={user.profileimage ? user.profileimage : pic}
            alt="Your Profile Picture"
            className="absolute top-2 -left-5 transform -translate-x-1 -translate-y-1/4 rounded-full border-black border"
            style={{ width: "200px", height: "200px" }}
          />

          <div className="flex flex-col space-y-3 w-full">
            <div>
              <p className="font-mulish font-bold text-xl">
                {user.firstname} {user.lastname}
              </p>
            </div>
            <div className="flex flex-col space-y-2">
              <p className="font-mulish text-gray-800 font-normal text-sm">
                @{user.username}
              </p>
              <div className="flex flex-row items-center">
                <LuCalendarDays className="mr-1" />
                <p className="font-mulish text-gray-800 font-normal text-sm">
                  {" "}
                  joined since {new Date(user.createdat).getFullYear()}
                </p>
              </div>
              <div className="flex flex-row items-center">
                {starSvg}
                <p className="ml-1 font-mulish text-gray-800 font-normal text-sm">
                  rated {user.rating.toFixed(1)} out of 5.0
                </p>
              </div>
              <div
                className="bg-white p-1 rounded-md"
                style={{ height: "3.6rem", overflow: "hidden" }}
              >
                <p className="font-mulish text-gray-800 font-normal text-sm line-clamp-3">
                  {user.bio || "No bio available"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
