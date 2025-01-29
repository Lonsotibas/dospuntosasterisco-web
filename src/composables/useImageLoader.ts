interface GalleryItem {
  image: string;
  alt: string;
}

export function useImageLoader() {
  const generateGallery = (
    galleryNumber: number,
    itemsCount: number
  ): GalleryItem[] => {
    return Array.from({ length: itemsCount }, (_, i) => {
      const imgNumber = i + 1;
      return {
        // Add WebP version if available
        image: `/src/assets/images/residencias/gallery${galleryNumber}/${imgNumber}.webp`,
        fallback: `/src/assets/images/residencias/gallery${galleryNumber}/${imgNumber}.jpg`,
        alt: `Gallery ${galleryNumber} - Image ${imgNumber}`,
      };
    });
  };

  return { generateGallery };
}
