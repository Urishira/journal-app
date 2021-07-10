import { cloudinary } from "../../api/cloudinaryApi";
import { uploadFile } from "../../helpers/notes/uploadFile";
describe("test on fileUpload", () => {
  test("should upload a file and return the url", async () => {
    const response = await fetch(
      "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png"
    );
    const blob = await response.blob();
    const file = new File([blob], "image.png");
    const url = await uploadFile(file);
    console.log(url);
    expect(typeof url).toBe("string");
  });

  test("should return an error ", async (done) => {
    const response = await fetch(
      "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png"
    );
    const blob = await response.blob();
    const file = new File([blob], "image.png");
    const url = await uploadFile(file);

    let urlArr = url.split("/")[7].replace(/(.png|.jpg|.gif)/g, "");
    const urlId = urlArr.toString();
    console.log(urlId);
    cloudinary.api.delete_resources(urlId, {}, (error) => {
      throw error;
      done();
    });
    expect(typeof url).toBe("string");
  });
});
