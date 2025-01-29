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
      const webpPath = new URL(
        `/src/assets/images/residencias/gallery${galleryNumber}/${imgNumber}.webp`,
        import.meta.url
      ).href;
      const jpgPath = new URL(
        `/src/assets/images/residencias/gallery${galleryNumber}/${imgNumber}.jpg`,
        import.meta.url
      ).href;

      return {
        image: webpPath,
        fallback: jpgPath,
        alt: `Gallery ${galleryNumber} - Image ${imgNumber}`,
      };
    });
  };

  return { generateGallery };
}
