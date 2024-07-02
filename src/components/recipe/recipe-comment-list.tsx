import Image from "next/image";
import { SafeComment } from "~/app/types";
import Heading from "../heading";
import { FaRegStar } from "react-icons/fa";
import { formatDate } from "~/helpers/formatDate";

interface RecipeCommentListProps {
  comments: SafeComment[];
}

const RecipeCommentList = ({ comments }: RecipeCommentListProps) => {
  return (
    <div className="mt-6 border-t-2">
      <Heading title="Comments" />
      <div className="mt-4">
        {comments.length === 0 ? (
          <p>No comments yet</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="mb-4 border-b pb-4">
              <div className="flex items-center">
                <div className="w-full">
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Image
                        src={comment.user.image}
                        alt="User"
                        width={20}
                        height={20}
                        className="rounded-full"
                      />
                      <h4 className="text-lg font-semibold">
                        {comment.user.name}
                      </h4>
                    </div>
                    <p className="text-sm font-light text-slate-400">
                      {formatDate(comment.updatedAt ?? comment.createdAt)}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-gray-500">{comment.content}</p>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, index) => (
                        <FaRegStar
                          key={index}
                          color={index < comment.rating ? "#ffc107" : "#e4e5e9"}
                          size={20}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecipeCommentList;
