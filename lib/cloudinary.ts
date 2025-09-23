import { v2 as cloudinary } from "cloudinary";

const ensureEnv = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
};

export function configureCloudinary() {
  cloudinary.config({
    cloud_name: ensureEnv("CLOUDINARY_CLOUD_NAME"),
    api_key: ensureEnv("CLOUDINARY_API_KEY"),
    api_secret: ensureEnv("CLOUDINARY_API_SECRET"),
    secure: true,
  });
  return cloudinary;
}

export type CloudinaryFolder = "cars" | "users" | "misc";

const DEFAULT_FOLDER = process.env.CLOUDINARY_FOLDER_CARS || "cars";

export async function uploadImage(
  buffer: Buffer,
  filename: string,
  folder?: CloudinaryFolder | string
) {
  const cld = configureCloudinary();
  return await new Promise<{
    public_id: string;
    secure_url: string;
    width: number;
    height: number;
    format: string;
  }>((resolve, reject) => {
    const options: Record<string, unknown> = {
      folder: folder ?? DEFAULT_FOLDER,
      public_id: filename.split(".")[0],
      resource_type: "image",
    };
    if (process.env.CLOUDINARY_UPLOAD_PRESET) {
      options.upload_preset = process.env.CLOUDINARY_UPLOAD_PRESET;
    }
    const stream = cld.uploader.upload_stream(options, (error, result) => {
      if (error || !result) return reject(error);
      resolve({
        public_id: result.public_id,
        secure_url: result.secure_url!,
        width: result.width!,
        height: result.height!,
        format: result.format!,
      });
    });
    stream.end(buffer);
  });
}
