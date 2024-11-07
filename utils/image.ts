export const optimizeImage = (imageUrl: string, width?: number) => {
    if (!imageUrl) return ''
    
    // Return original URL if it's already an optimized URL or data URL
    if (imageUrl.startsWith('data:') || imageUrl.includes('imgix')) {
      return imageUrl
    }
  
    // Add width parameter if specified
    return width ? `${imageUrl}?w=${width}` : imageUrl
  }