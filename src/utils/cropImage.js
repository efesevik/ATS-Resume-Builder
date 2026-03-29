/**
 * Helper function to crop the image using a canvas.
 * @param {string} imageSrc - The source of the image (URL or Base64)
 * @param {Object} pixelCrop - The pixel crop coordinates {x, y, width, height}
 */
export async function getCroppedImg(imageSrc, pixelCrop) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return null;
  }

  // Set the canvas size to the desired crop size
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // Draw the cropped portion of the source image to the canvas
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  // Return the base64 output of the cropped canvas
  return canvas.toDataURL('image/jpeg', 0.9);
}

// Helper to create an HTML Image from a source
const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous'); // Use anonymous to avoid CORS issues
    image.src = url;
  });
