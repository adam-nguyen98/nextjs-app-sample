"use client";
import { UPDATE_NOVEL } from "@/graphql/mutations";
import { GET_NOVEL } from "@/graphql/queries";
import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useMemo, useState } from "react";
type Props = {
	params: {
		id: string;
	};
};

const Novel = ({ params: { id } }: Props) => {
	const [state, setState] = useState({ title: "", url: "", author: "" });
	const { title, url, author } = state;

	const { data, loading, error } = useQuery(GET_NOVEL, {
		variables: { id },
	  });
	
	const novel: INovel = data?.novel;

	useEffect(() => {
        if (novel) {
            setState({
                title: novel.title,
                url: novel.image,
                author: novel.author,
            });
        }
    }, [novel]);

	const updateNovelVariables = useMemo(
		() => ({ id: id, title: title, image: url, author: author }),
		[id, title, url, author]
	);

	const [updateNovel] = useMutation(UPDATE_NOVEL, {
		variables: { id: id, title: title, image: url, author: author },
		refetchQueries: [{ query: GET_NOVEL, variables: { id } }],
	});


	const handleUpdateNovel = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!title || !url || !author) {
			alert("Please enter fields");
			return;
		}
		updateNovel({ variables: updateNovelVariables });
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setState((prevState) => ({ ...prevState, [name]: value }));
	};

	if (loading)
		return (
			<p className="text-white flex items-center justify-center">
				Loading ....
			</p>
		);
	if (error)
		return (
			<p className="text-white flex items-center justify-center">
				Oops! Something went wrong ....
			</p>
		);
	return (
		<article className="max-w-5xl mx-auto text-white">
			<section className="flex gap-2 ">
				{novel?.image && (
					<img
					src={novel.image}
					height={143}
					width={143}
					alt=""
				  />
				)}

				<div className="p-2 flex flex-col">
					<h1 className="text-4xl ">Title : {novel.title}</h1>
					<h3 className="text-2xl ">{novel.author}</h3>
					<p className="text-slate-400 ">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Architecto cum nam sed voluptates sunt aliquid nemo
						maxime itaque tempora, autem alias nostrum molestiae
						deserunt earum animi numquam reprehenderit laboriosam
						libero? Quas, atque totam vero nostrum dolore, nihil
						autem neque architecto deserunt illo itaque, ab quae
						ipsam corrupti ipsum quaerat? Sed hic ipsum excepturi
						earum minus consectetur soluta totam temporibus libero.
					</p>
				</div>
			</section>
			{/* update form */}
			<form onSubmit={handleUpdateNovel} className="flex gap-2 pt-10">
				<input
					value={title}
					onChange={(e) => handleChange(e)}
					name="title"
					type="text"
					placeholder="Enter new title"
					className="bg-transparent border text-white p-2 rounded-lg"
				/>
				<input
					value={url}
					onChange={(e) => handleChange(e)}
					type="text"
					name="url"
					placeholder="new url"
					className="bg-transparent border text-white p-2 rounded-lg"
				/>
				<input
					value={author}
					onChange={(e) => handleChange(e)}
					type="text"
					name="author"
					placeholder="author"
					className="bg-transparent border text-white p-2 rounded-lg"
				/>
				<button className="bg-yellow-500 rounded-lg p-2">Update</button>
			</form>
		</article>
	);
};

export default Novel;
