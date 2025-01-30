interface GalleryItem {
  image: string;
  fallback: string;
  alt: string;
  srcset: string;
  sizes: string;
  width: number;
  height: number;
}

export function useImageLoader() {
  const generateGallery = (
    galleryNumber: number,
    itemsCount: number
  ): GalleryItem[] => {
    return Array.from({ length: itemsCount }, (_, i) => {
      const imgNumber = i + 1;
<<<<<<< HEAD
      const basePath = `/images/residencias/gallery${galleryNumber}/${imgNumber}`; // Updated path
=======
      // Use Vite's asset handling
      const webpPath = `/images/residencias/gallery${galleryNumber}/${imgNumber}.webp`;
      const jpgPath = `/images/residencias/gallery${galleryNumber}/${imgNumber}.jpg`;
>>>>>>> b64f4ef (Residencia)

      return {
        image: `${basePath}.webp`,
        fallback: `${basePath}.jpg`,
        srcset: `${basePath}.webp 400w, ${basePath}-800w.webp 800w, ${basePath}-1200w.webp 1200w`, // Example with different sizes
        sizes: "(max-width: 768px) 100vw, 50vw",
        alt: `Gallery ${galleryNumber} - Image ${imgNumber}`,
        width: 800,
        height: 533,
      };
    });
  };

  return { generateGallery };
}
