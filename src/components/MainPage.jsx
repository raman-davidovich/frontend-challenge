import { useEffect, useRef } from "react";
import { useFavourites } from "../FavouritesContext";

const MainPage = () => {
  const {
    favourites,
    toggleFavourite,
    catImages,
    loading,
    fetchMoreImages,
    fetchingMore,
  } = useFavourites();

  const imagesContainerRef = useRef(null);

  useEffect(() => {
    const container = imagesContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;

      if (
        scrollHeight - scrollTop - clientHeight < 300 &&
        !fetchingMore &&
        !loading
      ) {
        fetchMoreImages();
      }
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [fetchingMore, loading, fetchMoreImages]);

  if (loading) return <div>Загрузка...</div>;

  return (
    <div>
      <div className="images" ref={imagesContainerRef}>
        {catImages.map((cat) => (
          <div key={cat.id} className="card">
            <img src={cat.url} alt="A cute cat" className="image" />
            <button className="like" onClick={() => toggleFavourite(cat)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={
                  favourites.some((fav) => fav.id === cat.id)
                    ? "red"
                    : "transparent"
                }
                stroke="red"
                strokeWidth="2"
                style={{ width: "24px", height: "24px" }}
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {fetchingMore && (
        <div style={{ textAlign: "center", marginTop: "16px" }}>
          <p>Загружаем больше котиков...</p>
        </div>
      )}
    </div>
  );
};

export default MainPage;
