import { gql } from "@apollo/client";

export const ADD_NOVEL = gql`
	mutation AddNovel($image: String, $title: String, $author: String) {
		addNovel(image: $image, title: $title, author: $author) {
			id
			image
			createdAt
			title
			updatedAt
			author
		}
	}
`;

export const DELETE_NOVEL = gql`
	mutation deleteNovel($id: ID!) {
		deleteNovel(id: $id) {
			id
		}
	}
`;

export const UPDATE_NOVEL = gql`
	mutation UpdateNovel($id: ID!, $title: String, $image: String, $author: String) {
		updateNovel(id: $id, title: $title, image: $image, author: $author) {
			id
			image
			title
			author
		}
	}
`;
