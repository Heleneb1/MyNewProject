import axios from 'axios';
import React, { useRef, useState } from 'react';

export default function Test() {
  const inputRef = useRef(null);
  const [picture, setPicture] = useState(null);

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const formData = new FormData();
    formData.append('avatar', inputRef.current.files[0]);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/avatar`,
        formData
      );
      console.info(response);

      const newPicture = response.data.picture;
      setPicture(newPicture);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (evt) => {
    const file = evt.target.files[0];
    setPicture(URL.createObjectURL(file));
  };

  return (
    <div>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <input
          type="file"
          name="avatar"
          ref={inputRef}
          onChange={handleFileChange}
        />
        <button type="submit">Envoyer</button>
      </form>
      {picture && <img className="picture" src={picture} alt="Aperçu" />}
    </div>
  );
}
