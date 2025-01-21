import { createContext, useState, useContext, useEffect } from "react";

const FavouritesContext = createContext();

export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);
  const [catImages, setCatImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchingMore, setFetchingMore] = useState(false);

  useEffect(() => {
    const fetchInitialImages = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "https://api.thecatapi.com/v1/images/search?limit=10"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch cat images.");
        }

        const data = await response.json();
        setCatImages((prevImages) => [...prevImages, ...data]);
      } catch (error) {
        console.error("Error fetching initial cat images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialImages();
  }, []);

  const fetchMoreImages = async () => {
    if (fetchingMore) return;

    try {
      setFetchingMore(true);
      const response = await fetch(
        "https://api.thecatapi.com/v1/images/search?limit=10"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch more cat images.");
      }
      const newImages = await response.json();
      setCatImages((prevImages) => [...prevImages, ...newImages]);
    } catch (error) {
      console.error("Error fetching more cat images:", error);
    } finally {
      setFetchingMore(false);
    }
  };

  const toggleFavourite = (image) => {
    setFavourites((prevFavourites) => {
      if (prevFavourites.some((fav) => fav.id === image.id)) {
        return prevFavourites.filter((fav) => fav.id !== image.id);
      } else {
        return [...prevFavourites, image];
      }
    });
  };

  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        toggleFavourite,
        catImages,
        loading,
        fetchMoreImages,
        fetchingMore,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => useContext(FavouritesContext);
