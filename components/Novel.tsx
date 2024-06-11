import { DELETE_NOVEL } from "@/graphql/mutations";
import { GET_NOVELS } from "@/graphql/queries";
import { useMutation } from "@apollo/client";
import Link from "next/link";
import React, { memo } from "react";

export const BASE_URL = process.env.NEXT_PUBLIC_URL;

type Props = {
  novel: INovel;
};

export const Novel = memo(({ novel }: Props) => {
  const [deleteNovel] = useMutation(DELETE_NOVEL, {
    refetchQueries: [{ query: GET_NOVELS }],
    awaitRefetchQueries: true, // Optimize by awaiting refetch queries
  });

  const handleDelete = async () => {
    try {
      await deleteNovel({ variables: { id: novel.id } });
    } catch (error) {
      console.error("Error deleting novel:", error);
      alert("delete failed")
    }
  };

  return (
    <article className="flex flex-col p-4 bg-slate-200 dark:bg-zinc-800 hover:text-black hover:scale-105 shadow-sm hover:shadow-lg hover:bg-slate-300 transition duration-300 ease-out text-white">
      {/* image */}
      {novel.image && (
        <div>
          <img
            src={novel.image}
            alt={novel.title}
            className="h-56 w-full object-cover rounded-t-lg shadow-md"
            loading="lazy" // Optimize image loading
          />
        </div>
      )}

      {/*title  */}
      <h1 className="font-bold text-xl my-2 line-clamp-1">{novel.title}</h1>
      {/* description */}
      <p className="text-xs my-2 line-clamp-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
                ab recusandae repudiandae ratione quia voluptatibus tempora
                dolores, veritatis cum, soluta numquam voluptatum earum
                obcaecati illum dolor. Fuga incidunt maxime culpa.
    	</p>
      {/* source and date */}
      <div className="flex justify-between italic text-xs mt-auto">
        <p className="text-lg">Author: {novel.author}</p>
      </div>
      <Link
        href={`${BASE_URL}/novel/${novel.id}`}
        className="bg-orange-500 mt-5 p-2 rounded-lg"
      >
        Read More
      </Link>

      <button
        onClick={handleDelete}
        className="bg-red-500 mt-5 p-2 rounded-lg"
      >
        Delete
      </button>
    </article>
  );
});