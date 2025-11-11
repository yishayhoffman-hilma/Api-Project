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
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      ></form>
      {photosData.map((value, index) => {
        return (
          <Photo
            setPhotosData={setPhotosData}
            key={index}
            thumbnailUrl={value.thumbnailUrl}
            id={value.id}
            index={index}
          />
        );
      })}
    </>
  );
}

export default PhotosPage;
