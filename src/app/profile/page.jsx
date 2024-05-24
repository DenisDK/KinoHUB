"use client";
import { app } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import Image from "next/image";
import React from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import Loading from "../loading";
import Link from "next/link";

const ProfilePage = () => {
  const auth = getAuth(app);
  const storage = getStorage();

  const [user, setUser] = useState(null);
  const [newDisplayName, setNewDisplayName] = useState("");
  const [newAvatar, setNewAvatar] = useState(null);
  const [avatarURL, setAvatarURL] = useState("/noavatar.png");
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);

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

  useEffect(() => {
    const storedMovies = JSON.parse(localStorage.getItem("savedMovies")) || [];
    setSavedMovies(storedMovies);
  }, []);

  const handleChangeDisplayName = (e) => {
    setNewDisplayName(e.target.value);
  };

  const handleChangeAvatar = (e) => {
    const file = e.target.files[0];
    setNewAvatar(file);

    // Show selected image in preview
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
        // Update user display name
        await updateProfile(user, { displayName: newDisplayName });

        // If a new avatar is selected, upload it
        if (newAvatar) {
          const avatarRef = ref(storage, `avatars/${user.uid}`);
          await uploadBytes(avatarRef, newAvatar);

          // Get the new profile photo URL
          const newPhotoURL = await getDownloadURL(avatarRef);

          // Update user's profile photo
          await updateProfile(user, { photoURL: newPhotoURL });
        }

        alert("Дані користувача успішно оновлено!");
        window.location.reload(); // Reload the page after successful update
      }
    } catch (error) {
      console.error("Помилка під час оновлення даних користувача:", error.message);
      alert("Виникла помилка під час оновлення даних користувача.");
    }
  };

  const toggleEditMode = () => {
    setEditMode((prevMode) => !prevMode);
  };

  const handleRemoveFromSavedMovies = (movieId) => {
    const updatedMovies = savedMovies.filter((movie) => movie.id !== movieId);
    setSavedMovies(updatedMovies);
    localStorage.setItem("savedMovies", JSON.stringify(updatedMovies));
  };

  // Класи для зменшення відступів між фільмами та збільшення розміру карток
  const movieCardClass = "mb-3 sm:mb-4 md:mb-6 flex flex-col items-center";
  const movieImageClass = "rounded-md mb-2";
  const movieTitleClass = "text-lg font-bold text-center mt-1";
  const movieDateClass = "text-sm text-center";
  const removeButtonClass = "mt-2 px-2 py-1 bg-red-300 text-red-700 rounded-md hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-300";

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <div className="">Користувач не авторизований</div>;
  }

  return (
    <div className="justify-between max-w-screen-2xl mx-auto mt-10 flex">
      <div className="flex flex-col items-center min-w-96">
        <Image
          className="rounded-full border-4 border-white mb-4 mt-10"
          src={avatarURL}
          alt="User image"
          width={150}
          height={150}
          priority={true}
        />
        <h1 className="mt-2 text-3xl font-bold">{user.displayName}</h1>
        <button
          onClick={toggleEditMode}
          className="px-4 py-2 mt-3 dark:bg-[#3a3a3a] dark:hover:bg-[#575757] bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
        >
          {editMode ? "Закрити" : "Редагувати профіль"}
        </button>
        {editMode && (
          <form className="mt-6" onSubmit={handleSubmit}>
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
                className="px-2 py-2 dark:bg-[#3a3a3a] dark:hover:bg-[#353535] duration-300 bg-[#c7c7c7] rounded-md focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 mt-5 dark:bg-[#3a3a3a] dark:hover:bg-[#575757] bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
            >
              зберегти зміни
            </button>
          </form>
        )}
      </div>
      <div className="w-2/3">
        <h2 className="text-2xl font-bold mb-4 text-center">Збережені фільми</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5">
          {savedMovies.length > 0 ? (
            savedMovies.map((movie) => (
              <li key={movie.id} className={movieCardClass}>
                <Link href={`/movie/${movie.id}`}>
                  <div className="flex flex-col items-center"> {/* Замість <a> використовуйте <div> */}
                    <Image
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      width={150}
                      height={225}
                      alt={movie.title}
                      className={movieImageClass}
                    />
                    <h3 className={`${movieTitleClass} text-center`}>{movie.title}</h3>
                    <p className={`${movieDateClass} text-center`}>{movie.release_date}</p>
                    <button
                      onClick={() => handleRemoveFromSavedMovies(movie.id)}
                      className={removeButtonClass}
                    >
                      Видалити
                    </button>
                  </div>
                </Link>
              </li>
            ))
          ) : (
            <p>Немає збережених фільмів.</p>
          )}

        </ul>
      </div>
    </div>
  );
};

export default ProfilePage;

