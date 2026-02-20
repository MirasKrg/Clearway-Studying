// A simple string-to-color hash function
const stringToColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
};

// Generates a pixelated avatar SVG from a string (e.g., username)
export const generateAvatar = (seed: string, size = 64) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = size;
  canvas.height = size;

  if (!ctx) return '';

  const blockSize = size / 8;
  const mainColor = stringToColor(seed);
  
  // A pseudo-random number generator based on the seed
  let randomSeed = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const random = () => {
    const x = Math.sin(randomSeed++) * 10000;
    return x - Math.floor(x);
  };

  // Fill background with a light grey
  ctx.fillStyle = '#f0f0f0';
  ctx.fillRect(0, 0, size, size);

  ctx.fillStyle = mainColor;

  // Create a symmetric pattern
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 4; x++) { // Only iterate through half the width
      if (random() > 0.5) {
        // Draw pixel on the left side
        ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
        // Mirror to the right side
        ctx.fillRect((7 - x) * blockSize, y * blockSize, blockSize, blockSize);
      }
    }
  }

  return canvas.toDataURL();
};
