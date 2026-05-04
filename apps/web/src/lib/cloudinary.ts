import { v2 as cloudinary } from "cloudinary";

// Configuration is automatically picked up from CLOUDINARY_URL environment variable
// but we can also set it explicitly if needed.
cloudinary.config({
  secure: true,
});

export { cloudinary };

export async function uploadImage(fileBuffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder: "ivys-beauty",
        resource_type: "auto",
      },
      (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error("Upload failed"));
        resolve(result.secure_url);
      }
    ).end(fileBuffer);
  });
}
