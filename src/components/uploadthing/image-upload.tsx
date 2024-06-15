"use client";
import Image from "next/image";
import { useState } from "react";
import { UploadButton } from "~/utils/uploadthing";

interface ImageUploaderProps {
  setCustomValue: (key: string, value: any) => void;
}

const ImageUpload: React.FC<ImageUploaderProps> = ({ setCustomValue }) => {
  const [imageUrl, setImageUrl] = useState<string>("");

  return (
    <>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          console.log("Files: ", res);
          setImageUrl(res[0].url);
          setCustomValue("imageSrc", res[0].url);
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
      {imageUrl && (
        <Image
        className="mx-auto"
          alt="Image"
          src={imageUrl}
          width={500}
          height={500}
          style={{ objectFit: "cover" }}
        />
      )}
    </>
  );
};

export default ImageUpload;