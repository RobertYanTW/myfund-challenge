
import React, { useState } from "react";

export default function MyFundChallenge() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        generateImage(reader.result, text);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
    if (image) generateImage(image, e.target.value);
  };

  const generateImage = (baseImage, customText) => {
    const canvas = document.createElement("canvas");
    const img = new Image();
    img.src = baseImage;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      ctx.font = "bold 48px sans-serif";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(`我想用My基金買${customText}`, canvas.width / 2, canvas.height - 50);
      setPreviewUrl(canvas.toDataURL("image/png"));
    };
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleFBShare = () => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=https://www.nomurafunds.com.tw/myfundchallenge&quote=${encodeURIComponent(
      `我參加了#My基金挑戰賽，我想用My基金買${text}！`)}&hashtag=%23我想用My基金買${text}`;
    window.open(fbUrl, '_blank');
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '1rem', textAlign: 'center' }}>
      <h1 style={{ color: '#1D4ED8', fontWeight: 'bold' }}>📣 My基金挑戰賽上線囉！</h1>
      <p>快來上傳圖片，輸入你想買的東西，產出專屬圖片並分享到 Facebook！</p>

      <div style={{ marginTop: '1rem' }}>
        <h2>📷 步驟一：上傳照片</h2>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>

      <div style={{ marginTop: '1rem' }}>
        <h2>✏️ 步驟二：輸入夢想</h2>
        <input
          style={{ width: '100%', padding: '8px' }}
          placeholder="我想用My基金買...(如：一間房子)"
          value={text}
          onChange={handleTextChange}
        />
      </div>

      {previewUrl && (
        <div style={{ marginTop: '1rem' }}>
          <h3>🖼️ 產出結果：</h3>
          <img src={previewUrl} alt="產出圖片" style={{ maxWidth: '100%', borderRadius: '8px' }} />
          <div style={{ marginTop: '0.5rem' }}>
            <a href={previewUrl} download="myfund_image.png">
              <button style={{ marginRight: '0.5rem' }}>⬇️ 下載圖片</button>
            </a>
            <button onClick={handleSubmit}>✔️ 完成上傳</button>
            <button onClick={handleFBShare} style={{ marginLeft: '0.5rem', backgroundColor: '#1877f2', color: '#fff' }}>
              🔗 分享到 Facebook
            </button>
          </div>
        </div>
      )}

      {submitted && (
        <div style={{ marginTop: '1rem', background: '#dcfce7', padding: '1rem', borderRadius: '8px' }}>
          <p>✅ 恭喜你完成參賽！</p>
          <p>#My基金挑戰賽 #我想用My基金買{text}</p>
        </div>
      )}
    </div>
  );
}
