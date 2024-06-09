import { gql } from "@apollo/client";

export const GET_NOVELS = gql`
	query Novels {
		novels {
			id
			image
			createdAt
			title
			updatedAt
			author
		}
	}
`;

export const GET_NOVEL = gql`
	query Novel($id: ID!) {
		novel(id: $id) {
			author
			id
			image
			title
		}
	}
`;
