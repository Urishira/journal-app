import { uploadFile } from "../../helpers/notes/uploadFile";

describe("test on fileUpload", () => {
  test("should upload a file and return the url", async () => {
    const resp = await fetch(
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.wallpaperflare.com%2F&psig=AOvVaw3bGJTdHHBsTXNZTo9Ejulw&ust=1624475074083000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCPjh7a_3q_ECFQAAAAAdAAAAABAN"
    );
    const blob = await resp.blob();

    const file = new File([blob], "foto.gif");
    const url = await uploadFile(file);
    console.log(url);
    expect(url).toBe("string");
  });
});
