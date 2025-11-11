function Photo(props) {
  async function deletePhoto(url) {
    try {
      const response = await fetch(url, {
        method: "DELETE",
      });

      const result = await response.json();
      console.log("Delete successful:", result);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
    props.setPhotosData((prev) => {
      return [...prev].filter((value, index) => {
        return index !== props.index;
      });
    });
  }
  return (
    <>
      <button
        onClick={() => deletePhoto(`http://localhost:3500/photos/${props.id}`)}
      >
        delete
      </button>
      <img src={props.thumbnailUrl} alt=""></img>
    </>
  );
}

export default Photo;
