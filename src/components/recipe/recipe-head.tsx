import Image from "next/image";
import Heading from "../heading";
import HeartButton from "../heart-button";
import { type SafeUser } from "~/app/types";
import { IoMdPrint } from "react-icons/io";
import { RiShareForwardFill } from "react-icons/ri";

interface RecipeHeadProps {
  id: string;
  title: string;
  imageUrl: string;
  userImg: string | null;
  userName: string | null;
  currentUser?: SafeUser | null;
}
const RecipeHead =  ({
  title,
  imageUrl,
  currentUser,
  id,
  userImg,
  userName,
}: RecipeHeadProps)  => {
  
  const shareRecipe = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Instagram",
          text: "Instagram",
          url: "https://instagram.com",
        });
        console.log("Content shared successfully");
      } catch (error) {
        console.error("Error sharing content", error);
      }
    } else {
      
      console.log("Web Share API is not supported in your browser.");
    }
  };
  return (
    <>
      <style>
        {`
        @media print {
        
          header, footer, .ignore-print {
            display: none;
          }
        }
                
      `}
      </style>
      <div>
        <Heading title={title} />
        <div className="flex items-center justify-between">
          <div className="flex items-center font-light text-neutral-500">
            Posted by:
            <div className="ml-2 flex gap-1">
              <Image
                alt={`${userName} profile picture`}
                src={userImg ?? "/images/placeholder.jpg"}
                width={20}
                height={20}
                className="rounded-full object-cover "
              />
              {userName}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div onClick={() => window.print()} className="cursor-pointer">
              <IoMdPrint size={26} />
            </div>
            <div>
              <RiShareForwardFill
                size={26}
                onClick={shareRecipe}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-[60vh] w-full overflow-hidden rounded-xl print:h-[0px]">
        <Image
          src={imageUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="w-full rounded-lg "
        />
        <div className="absolute right-5 top-5">
          <HeartButton recipeId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default RecipeHead;
