import { Cloudinary } from "@cloudinary/url-gen";

export const cloudinary = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  },
});

// Helper function for asset URLs
export const getCloudinaryUrl = (publicId: string) => {
  return cloudinary.image(publicId).toURL();
};
