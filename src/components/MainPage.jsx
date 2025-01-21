import { useEffect, useState } from "react";

const MainPage = () => {
  const [catImages, setCatImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCatImages = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "https://api.thecatapi.com/v1/images/search?limit=10"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch cat images.");
        }

        const data = await response.json();
        setCatImages(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCatImages();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div class="images">
        {catImages.map((cat) => (
          <img key={cat.id} src={cat.url} alt="A cute cat" class="image" />
        ))}
      </div>
    </div>
  );
};

export default MainPage;
