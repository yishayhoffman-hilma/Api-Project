import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Photo from "./Photo";

function PhotosPage() {
  const params = useParams();
  const [photosData, setPhotosData] = useState([]);

  useEffect(() => {
    async function getData() {
      const url = `http://localhost:3500/photos?albumId=${params.id}`;
      console.log(url);

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();

        setPhotosData(result);
      } catch (error) {
        console.error(error.message);
      }
    }
    getData();
  }, []);

  console.log(photosData);

  return (
    <>
      {photosData.map((value, index) => {
        return <Photo key={index} thumbnailUrl={value.thumbnailUrl} />;
      })}
    </>
  );
}

export default PhotosPage;
