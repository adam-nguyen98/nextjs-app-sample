"use client";
import React, { FormEvent, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_NOVELS } from "@/graphql/queries";

import { Novel } from "./Novel";

import { ADD_NOVEL } from "@/graphql/mutations";

export const Novels = () => {
	const [title, setTitle] = useState("");
	const [image, setImage] = useState("");
	const [author, setAuthor] = useState("");
	const { data, loading, error } = useQuery(GET_NOVELS);
	const [addNovel] = useMutation(ADD_NOVEL, {
		variables: { image, title, author },
		refetchQueries: [{ query: GET_NOVELS }],
		awaitRefetchQueries: true,
	});

	const novels: INovel[] = data?.novels;

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (image === "" || title === "" || author === "") return alert("Enter fields");

		addNovel({ variables: { image, title, author } });
		setTitle("");
		setImage("");
		setAuthor("");
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
		<div className="mt-5">
			<form onSubmit={handleSubmit} className="flex my-5 space-x-3">
				<input
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					type="text"
					placeholder="Enter title"
					className="bg-transparent border text-white p-2 rounded-lg"
				/>
				<input
					value={image}
					onChange={(e) => setImage(e.target.value)}
					type="text"
					placeholder="Enter Image url"
					className="bg-transparent border text-white p-2 rounded-lg"
				/>
				<input
					value={author}
					onChange={(e) => setAuthor(e.target.value)}
					type="text"
					placeholder="Enter author"
					className="bg-transparent border text-white p-2 rounded-lg"
				/>
				<button className="bg-yellow-500 p-2 rounded-lg ">
					Add Novel
				</button>
			</form>
			<div className="grid grid-cols-4 gap-2">
				{novels.map((novel) => (
					<Novel novel={novel} />
				))}
			</div>
		</div>
	);
};
