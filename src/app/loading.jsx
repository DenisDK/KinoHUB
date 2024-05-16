import Image from "next/image";
import React from "react";

const loading = () => {
  return (
    <div className="flex justify-center mt-20">
      <Image
        className="h-40"
        src="/spinner.svg"
        alt="loading..."
        width={150}
        height={150}
        property="false"
      />
    </div>
  );
};

export default loading;
