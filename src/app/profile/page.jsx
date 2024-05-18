"use client";
import { app } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import Image from "next/image";
import React from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import Loading from "../loading";

const ProfilePage = () => {
  const auth = getAuth(app);
  const storage = getStorage();

  const [user, setUser] = useState(null);
  const [newDisplayName, setNewDisplayName] = useState("");
  const [newAvatar, setNewAvatar] = useState(null);
  const [avatarURL, setAvatarURL] = useState("/noavatar.png");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setNewDisplayName(currentUser.displayName || "");
        setAvatarURL(currentUser.photoURL || "/noavatar.png");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleChangeDisplayName = (e) => {
    setNewDisplayName(e.target.value);
  };

  const handleChangeAvatar = (e) => {
    const file = e.target.files[0];
    setNewAvatar(file);

    // Показать выбранное изображение в предварительном просмотре
    const reader = new FileReader();
    reader.onload = () => {
      setAvatarURL(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (user) {
        // Обновляем имя пользователя
        await updateProfile(user, { displayName: newDisplayName });

        // Если выбрано новое фото профиля, загружаем его
        if (newAvatar) {
          const avatarRef = ref(storage, `avatars/${user.uid}`);
          await uploadBytes(avatarRef, newAvatar);

          // Получаем URL новой фотографии профиля
          const newPhotoURL = await getDownloadURL(avatarRef);

          // Обновляем фото профиля пользователя
          await updateProfile(user, { photoURL: newPhotoURL });
        }

        alert("Дані користувача успішно оновлено!");
        window.location.reload(); // Перезагрузка страницы после успешного обновления
      }
    } catch (error) {
      console.error(
        "Помилка під час оновлення даних користувача:",
        error.message
      );
      alert("Виникла помилка під час оновлення даних користувача.");
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <div className="">Користувач не авторизований</div>;
  }

  return (
    <div className="max-w-screen-lg mx-auto mt-10">
      <Image
        className="rounded-2xl"
        src={avatarURL}
        alt="User image"
        width={250}
        height={250}
        //   style={{ width: "auto", height: "auto" }}
        //   style={{ objectFit: "contain" }}
        //   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={true}
      />
      <form className="" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="avatar" className="block my-5 text-xl">
            Виберіть фото профілю:
          </label>
          <input
            id="avatar"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleChangeAvatar}
          />
          <label
            htmlFor="avatar"
            className="px-4 py-2 dark:bg-[#3a3a3a] dark:hover:bg-[#575757] bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 transition duration-300"
          >
            Вибрати зображення
          </label>
        </div>
        <div className="mt-10">
          <label htmlFor="displayName" className="block mb-2 text-xl">
            {"Нове Ім'я:"}
          </label>
          <input
            id="displayName"
            type="text"
            value={newDisplayName}
            onChange={handleChangeDisplayName}
            className="px-4 py-2 dark:bg-[#3a3a3a] dark:hover:bg-[#353535] duration-300 bg-[#c7c7c7] rounded-md focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 mt-5 dark:bg-[#3a3a3a] dark:hover:bg-[#575757] bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
        >
          зберегти зміни
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
