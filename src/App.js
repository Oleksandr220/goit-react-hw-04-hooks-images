import "./App.css";
import { useState, useEffect } from "react";
import ImageGallery from "./components/ImageGallery";
import Searchbar from "./components/Searchbar";
import Button from "./components/Button";
import Loader from "./components/Loader";
import Modal from "./components/Modal";
import FetchFilmApi from "./components/services/film-api";

function App() {
  const [request, setRequest] = useState("");
  const [pictures, setPictures] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [bigImageUrl, setBigImageUrl] = useState("");
  const [status, setStatus] = useState("loading");
  const [currPage, setCurrPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (request === "") {
      return;
    }

    FetchFilmApi(request, currPage)
      .then((response) => {
        setLoading(true);
        const filteredData = response.data.hits.map((picture) => {
          return {
            id: picture.id,
            webformatURL: picture.webformatURL,
            largeImageURL: picture.largeImageURL,
            tags: picture.tags,
          };
        });

        setPictures((prevState) => [...prevState, ...filteredData]);
      })
      .finally(() => {
        if (currPage > 2) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
        }
        return setStatus(false);
      });
  }, [currPage, request]);

  const handleFormSubmit = (event) => {
    setRequest(event);
    setPictures([]);
    setCurrPage(1);
  };

  const onImageClick = (url) => {
    setBigImageUrl(url);
    toggleModal();
    setStatus("loading");
  };

  const toggleModal = () => {
    return setShowModal(!showModal);
  };

  const onImageLoaded = () => {
    setStatus("loaded");
  };

  const getLoading = () => {
    setLoading(true);
    setCurrPage((prevState) => prevState + 1);
  };

  const showButton = pictures.length > 0 && loading;
  return (
    <>
      {showModal && (
        <Modal onClose={toggleModal}>
          {status === "loading" && <Loader />}
          <img src={bigImageUrl} alt="" onLoad={onImageLoaded} />
        </Modal>
      )}

      <Searchbar requestSubmit={handleFormSubmit} />
      <ImageGallery pictures={pictures} onClick={onImageClick} />
      {showButton && <Button onClick={getLoading} loading={loading} />}
    </>
  );
}

export default App;
