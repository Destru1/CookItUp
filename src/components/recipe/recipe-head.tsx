import Image from "next/image";
import Heading from "../heading";
import HeartButton from "../heart-button";
import { SafeUser } from "~/app/types";

interface RecipeHeadProps {
  id: string;
  title: string;
  imageUrl: string;
  userImg: string;
  userName: string;
  currentUser?: SafeUser | null;
}
const RecipeHead = ({
  title,
  imageUrl,
  currentUser,
  id,
  userImg,
  userName,
}: RecipeHeadProps) => {
  return (
    <>
      <div>
        <Heading title={title} />
        <div className="flex items-center font-light text-neutral-500">
          Posted by:
          <div className="ml-2 flex gap-1">
            <Image
              alt={`${userName} profile picture`}
              src={userImg}
              width={20}
              height={20}
              className="rounded-xl object-cover"
            />
            {userName}
          </div>
        </div>
      </div>
      <div className="relative h-[60vh] w-full overflow-hidden rounded-xl">
        <Image
          src={imageUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="w-full rounded-lg"
        />
        <div className="absolute right-5 top-5">
          <HeartButton recipeId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default RecipeHead;
