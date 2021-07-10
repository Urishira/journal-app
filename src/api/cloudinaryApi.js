import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: "dqofvbkla",
  api_key: process.env.REACT_APP_CLOUDINARY_APIKEY,
  api_secret: process.env.REACT_APP_CLOUDINARY_APIKEY_SECRET,
  secure: true,
});

export { cloudinary };
