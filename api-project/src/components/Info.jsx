import { useEffect, useState } from "react";

export default function Info() {
  const [infoData, setInfoData] = useState([]);

  const userDetails = JSON.parse(localStorage.getItem("current-user"));

  useEffect(() => {
    async function getData() {
      const url = `http://localhost:3500/users/${userDetails.userId}`;
      console.log(url);

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();

        setInfoData(result);
      } catch (error) {
        console.error(error.message);
      }
    }
    getData();
  }, []);

  console.log(infoData.toString());

  return (
    <>
      <p>{JSON.stringify(infoData)}</p>
    </>
  );
}
