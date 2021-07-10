export const uploadFile = async (file) => {
  const cloudUrl = "https://api.cloudinary.com/v1_1/dqofvbkla/upload";
  const formData = new FormData();
  formData.append("upload_preset", "journal-app");
  formData.append("file", file);

  const dataCloud = await fetch(cloudUrl, {
    method: "POST",
    body: formData,
  });

  try {
    const formResp = await dataCloud.json();
    if (dataCloud.ok) {
      console.log(formResp.secure_url);
      return formResp.secure_url;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

//I need to build a function that I have twice equal img
// it do request get img like first and delete the img equal first
