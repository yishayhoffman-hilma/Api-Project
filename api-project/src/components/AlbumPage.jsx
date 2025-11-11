import { useState, useEffect } from "react";
import Album from "./Album";
import { Outlet } from "react-router";

function AlbumPage() {
  const [albumsData, setAlbumsData] = useState([]);
  const userDetails = JSON.parse(localStorage.getItem("current-user"));

  useEffect(() => {
    async function getData() {
      const url = `http://localhost:3500/albums?userId=${userDetails.userId}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();

        setAlbumsData(result);
      } catch (error) {
        console.error(error.message);
      }
    }
    getData();
  }, [userDetails.userId]);

  return (
    <>
      <h2>albums page</h2>

      {albumsData.map((value, index) => {
        return <Album key={index} value={value} index={index} />;
      })}
    </>
  );
}

export default AlbumPage;
