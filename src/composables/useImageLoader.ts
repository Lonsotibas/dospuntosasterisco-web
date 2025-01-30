interface GalleryItem {
  image: string;
  fallback: string;
  alt: string;
}

export function useImageLoader() {
  const generateGallery = (
    galleryNumber: number,
    itemsCount: number
  ): GalleryItem[] => {
    return Array.from({ length: itemsCount }, (_, i) => {
      const imgNumber = i + 1;
      // Use Vite's asset handling
      const webpPath = `/images/residencias/gallery${galleryNumber}/${imgNumber}.webp`;
      const jpgPath = `/images/residencias/gallery${galleryNumber}/${imgNumber}.jpg`;

      return {
        image: webpPath,
        fallback: jpgPath,
        alt: `Gallery ${galleryNumber} - Image ${imgNumber}`,
      };
    });
  };

  return { generateGallery };
}
