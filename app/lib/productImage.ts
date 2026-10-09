import cloudinaryMapRaw from './cloudinaryMap.json';

const CLOUDINARY_MAP = cloudinaryMapRaw as Record<string, string>;
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'p8wgrpnr';

export const getCloudinaryImageUrl = (hash: string) => {
  if (CLOUDINARY_MAP[hash]) {
    return CLOUDINARY_MAP[hash];
  }
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/swatika_products/${hash}.jpg`;
};

export const getProductImageByHash = (hash: string) => {
  if (CLOUDINARY_MAP[hash]) {
    return CLOUDINARY_MAP[hash];
  }
  return getCloudinaryImageUrl(hash);
};

export const resolveProductImageUrl = (urlOrHash?: string | null): string => {
  if (!urlOrHash) return '/images/SwatikaSarees.png';
  if (urlOrHash.startsWith('http://') || urlOrHash.startsWith('https://')) {
    return urlOrHash;
  }
  // Check if it's a 64-character hash
  const hashMatch = urlOrHash.match(/([a-f0-9]{64})/i);
  if (hashMatch) {
    return getProductImageByHash(hashMatch[1]);
  }
  if (urlOrHash.startsWith('/')) {
    return urlOrHash;
  }
  return `/${urlOrHash}`;
};
