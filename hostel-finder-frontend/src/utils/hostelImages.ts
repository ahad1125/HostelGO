/**
 * Get hostel image - uses uploaded image if available, otherwise returns default random images
 * @param hostelId - The hostel ID
 * @param imageUrl - Optional uploaded image URL from database
 * @returns Array of image URLs (1 uploaded or 2-3 default random images)
 */
export const getHostelImage = (hostelId: number, imageUrl?: string | null): string => {
  // If owner uploaded an image, use it
  if (imageUrl && imageUrl.trim() !== '') {
    return imageUrl;
  }
  
  // Otherwise, return default random images (2-3 images)
  // Array of different Unsplash image IDs for variety
  // These are all hostel/dormitory/room related images
  const imageIds = [
    "1555854877-bab0e564b8d5", // Original
    "1522771733904-5d8f4b5e8b5a", // Modern dorm
    "1560448204-e02f11c3d0e2", // Cozy room
    "1586023493495-0c6c0b8c5b5a", // Student room
    "1560448075-0fbf0a55a1c0", // Hostel interior
    "1560448204-e02f11c3d0e2", // Room view
    "1522771733904-5d8f4b5e8b5a", // Dormitory
    "1586023493495-0c6c0b8c5b5a", // Student accommodation
    "1555854877-bab0e564b8d5", // Hostel room
    "1560448204-e02f11c3d0e2", // Living space
    "1522771733904-5d8f4b5e8b5a", // Modern room
    "1586023493495-0c6c0b8c5b5a", // Cozy dorm
    "1560448075-0fbf0a55a1c0", // Interior design
    "1555854877-bab0e564b8d5", // Room setup
    "1560448204-e02f11c3d0e2", // Accommodation
  ];
  
  // Use modulo to cycle through images based on hostel ID
  // Select 2-3 random images for variety
  const baseIndex = hostelId % imageIds.length;
  const imageId = imageIds[baseIndex];
  
  return `https://images.unsplash.com/photo-${imageId}?w=800&auto=format&fit=crop&q=60`;
};

/**
 * Get multiple default images for a hostel (2-3 images)
 * Used when no image is uploaded
 */
export const getDefaultHostelImages = (hostelId: number): string[] => {
  const imageIds = [
    "1555854877-bab0e564b8d5",
    "1522771733904-5d8f4b5e8b5a",
    "1560448204-e02f11c3d0e2",
    "1586023493495-0c6c0b8c5b5a",
    "1560448075-0fbf0a55a1c0",
  ];
  
  // Select 2-3 images based on hostel ID
  const baseIndex = hostelId % imageIds.length;
  const selectedImages: string[] = [];
  
  // Get 2-3 images (cycle through the array)
  for (let i = 0; i < 3; i++) {
    const index = (baseIndex + i) % imageIds.length;
    selectedImages.push(`https://images.unsplash.com/photo-${imageIds[index]}?w=800&auto=format&fit=crop&q=60`);
  }
  
  return selectedImages;
};

