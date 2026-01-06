/**
 * Get the base API URL without the /api suffix
 * Used for constructing image URLs and other static assets
 */
export const getBaseUrl = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  
  if (!apiUrl) {
    console.error('⚠️ Warning: VITE_API_URL is not set.');
    // In production, this should never happen, but fallback for development
    return '';
  }
  
  // Remove /api suffix if present to get base URL
  return apiUrl.replace('/api', '');
};

/**
 * Get full image URL from relative path
 * @param {string} imagePath - Relative path like /uploads/blogs/image.jpg
 * @returns {string} Full URL to the image
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  
  // If already a full URL, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  const baseUrl = getBaseUrl();
  return `${baseUrl}${imagePath}`;
};

