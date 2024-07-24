export const serverUploadService = {
    uploadImg,
  };
  
  async function uploadImg(ev: React.ChangeEvent<HTMLInputElement>) {
    const UPLOAD_URL = process.env.NODE_ENV === 'production'
  ? '/api/post'
  : 'http://localhost:80/api/post'; 
  
    try {
        console.log("11111")
      const formData = new FormData();
      if (ev.target.files && ev.target.files[0]) {
        formData.append('image', ev.target.files[0]);
        console.log("22222")

        const res = await fetch(UPLOAD_URL, {
          method: 'POST',
          body: formData,
        });
        console.log("res", res)

        if (!res.ok) {
          throw new Error('Failed to upload image');
        }
  
        const imgData = await res.json();
        return imgData;
      }
    } catch (err) {
      console.error('Failed to upload', err);
      throw err;
    }
  }
  