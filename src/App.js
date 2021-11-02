import { useState, useEffect } from "react";
import axios from "axios";
import UserTile from "./components/UserTile/UserTile";
import "./App.css";

const App = () => {
  const [userList, setUserList] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [pageNo, setPageNo] = useState(0);

  const refactorDob = (stringValue) => {
    let newFormat = stringValue.replace(/-/g, "/").split("/");
    return `${newFormat[2]}/${newFormat[1]}/${newFormat[0]}`;
  };

  const refactorPhone = (stringValue) => stringValue.replace(/-/g, "");

  useEffect(() => {
    axios
      .get(`https://randomuser.me/api/?page=${pageNo}&results=10`)
      .then((data) => setUserList(data?.data?.results));
  }, [pageNo]);

  useEffect(() => {
    const newList = userList.filter((data) =>
      data.login.username.toLowerCase().includes(searchKey.toLowerCase())
    );
    setFilteredList(newList);
  }, [searchKey]);

  return (
    <div className="app-container">
      <input
        type="text"
        placeholder="Search here"
        className="search-bar"
        onChange={(e) => setSearchKey(e.target.value)}
      />
      <div className="pagination">
        <div onClick={() => setPageNo(pageNo ? pageNo - 1 : pageNo)}>
          {"<- "}Prev Page
        </div>{" "}
        &nbsp; &nbsp;
        <div onClick={() => setPageNo(pageNo + 1)}>Next Page{" ->"}</div>
      </div>
      {filteredList.length === 0
        ? userList.map(
            ({ name, dob, phone, picture, login, email, gender, location }) => (
              <UserTile
                key={phone}
                name={`${name.first} ${name.last}`}
                dob={refactorDob(dob.date.slice(0, 10))}
                phone={refactorPhone(phone)}
                imageUrl={picture.thumbnail}
                username={login.username}
                email={email}
                gender={gender}
                address={`${location.street.number}, ${location.street.name}, ${location.city}, ${location.postcode}`}
              />
            )
          )
        : filteredList.map(
            ({ name, dob, phone, picture, login, email, gender, location }) => (
              <UserTile
                key={phone}
                name={`${name.first} ${name.last}`}
                dob={refactorDob(dob.date.slice(0, 10))}
                phone={refactorPhone(phone)}
                imageUrl={picture.thumbnail}
                username={login.username}
                email={email}
                gender={gender}
                address={`${location.street.number}, ${location.street.name}, ${location.city}, ${location.postcode}`}
              />
            )
          )}
    </div>
  );
};

export default App;
