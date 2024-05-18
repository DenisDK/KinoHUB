import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center mt-20">
      <Image
        className="h-40"
        src="/spinner.svg"
        alt="loading..."
        width={150}
        height={150}
        style={{ width: "auto", height: "auto" }}
        priority={true} // указываем приоритет загрузки
      />
    </div>
  );
};

export default Loading;
