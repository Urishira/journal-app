import { uploadFile } from "../../helpers/notes/uploadFile";
import cloudinary from "../../api/cloudinaryApi";

describe("test on fileUpload", () => {
  test("should upload a file and return the url", async () => {
    const response = await fetch(
      "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png"
    );
    const blob = await response.blob();
    const file = new File([blob], "image.png");
    const url = await uploadFile(file);

    expect(typeof url).toBe("string");

    let urlArr = url.split("/")[7].replace(/(.png|.jpg|.gif)/g, "");
    const urlId = urlArr.toString().trim();
    cloudinary.v2.api.delete_resources(urlId, {}, () => {});
  });
});
