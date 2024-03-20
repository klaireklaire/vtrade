import * as React from "react";
import { EditAccount, Listing, Sidebar, MyProfile } from "./ProfilePage";

export default function Dashboard(props) {
  return props.user ? (
    <div>
      <div className="flex flex-row flex-start justify-start ml-28 items-start space-x-5 mt-4">
        {/* profile side */}
        <div className="flex flex-col space-y-4">
          {/* profile */}
          <MyProfile user={props.user} />
          {/* menu */}
          <Sidebar user={props.user} />
          <div></div>
        </div>
        {/* listing side */}
        <div className="flex flex-col">
          <EditAccount user={props.user} />
        </div>
      </div>
    </div>
  ) : null;
}
