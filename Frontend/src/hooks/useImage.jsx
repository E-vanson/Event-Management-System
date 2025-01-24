// hooks/useImage.js
import { useState, useEffect } from "react";

const useImage = (imagePath) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!imagePath) {
      setIsLoading(false);
      return;
    }

    const imageUrl = `http://localhost:3000/assets/${imagePath}`;

    // Check if the image exists by attempting to load it
    const img = new Image();
    img.onload = () => {
      setImageUrl(imageUrl);
      setIsLoading(false);
    };
    img.onerror = () => {
      setError("Failed to load image");
      setIsLoading(false);
    };
    img.src = imageUrl;
  }, [imagePath]);

  return { imageUrl, isLoading, error };
};

export default useImage;
