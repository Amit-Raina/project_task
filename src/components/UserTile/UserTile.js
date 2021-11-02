import { useState } from "react";
import "./UserTile.css";

const UserTile = ({
  name,
  dob,
  phone,
  imageUrl,
  username,
  email,
  gender,
  address,
}) => {
  const [showDetail, setShowDetail] = useState(false);
  return (
    <div className="user-container">
      <div className="main-content">
        <img src={imageUrl} alt="userProfilePic" />
        <span
          onClick={() => setShowDetail(!showDetail)}
          style={{ cursor: "pointer" }}
        >
          <b>Name: </b> {name}
        </span>
        <span>
          <b>Dob: </b>
          {dob}
        </span>
        <span>
          <b>Username: </b> {username}
        </span>
      </div>
      {showDetail && (
        <div
          className="additional-content "
          onClick={() => setShowDetail(!showDetail)}
        >
          <span>
            <b>Addess: </b> {address}
          </span>
          <span>
            <b>Phone: </b> {phone}
          </span>
          <span>
            <b>Email: </b> {email}
          </span>
          <span>
            <b>Gender: </b> {gender}
          </span>
        </div>
      )}
    </div>
  );
};

export default UserTile;
