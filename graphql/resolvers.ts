import { Context } from "@/pages/api/graphql";

// export const resolvers = {
// 	Query: {
// 		//get novel by id
// 		novel: async (_parent: any, args: any, context: Context) => {
// 			return await context.prisma.novel.findUnique({
// 				where: {
// 					id: args.id,
// 				},
// 			});
// 		},
// 		// get all novels
// 		novels: async (_parent: any, _args: any, context: Context) => {
// 			return await context.prisma.novel.findMany({
// 				include: { author: true },
// 			});
// 		},
// 	},
// 	// nested resolve function to get auhtors in novels
// 	Novel: {
// 		authors: async (parent: any, _args: any, context: Context) => {
// 			return await context.prisma.author.findMany({
// 				where: {
// 					novelId: parent.id,
// 				},
// 			});
// 		},
// 	},
// 	Mutation: {
// 		// add novel
// 		addNovel: async (_parent: any, args: any, context: Context) => {
// 			return await context.prisma.novel.create({
// 				data: {
// 					title: args.title,
// 					image: args.image,
// 				},
// 			});
// 		},
// 		// update novel
// 		updateNovel: async (_parent: any, args: any, context: Context) => {
// 			return await context.prisma.novel.update({
// 				where: {
// 					id: args.id,
// 				},
// 				data: {
// 					title: args.title,
// 					image: args.image,
// 				},
// 			});
// 		},

// 		// delete novel
// 		deleteNovel: async (_parent: any, args: any, context: Context) => {
// 			return await context.prisma.novel.delete({
// 				where: {
// 					id: args.id,
// 				},
// 			});
// 		},

// 		// Author Mutations

// 		// add author
// 		addAuthor: async (_parent: any, args: any, context: Context) => {
// 			return await context.prisma.author.create({
// 				data: {
// 					novelId: args.novelId,
// 					name: args.name,
// 				},
// 			});
// 		},
// 		// delete author
// 		deleteAuthor: async (_parent: any, args: any, context: Context) => {
// 			return await context.prisma.author.delete({
// 				where: {
// 					id: args.id,
// 				},
// 			});
// 		},
// 	},
// };


const novels: INovel[] = [
	{
		id: '1',
		title: 'The Great Gatsby',
		image: 'https://i0.wp.com/americanwritersmuseum.org/wp-content/uploads/2018/02/CK-3.jpg?resize=267%2C400&ssl=1',
		createdAt: '2022-01-01',
		updatedAt: '2022-01-01',
		author: 'F. Scott Fitzgerald'
	},
	{
		id: '2',
		title: 'To Kill a Mockingbird',
		image: 'https://m.media-amazon.com/images/I/81aY1lxk+9L._SY466_.jpg',
		createdAt: '2022-01-01',
		updatedAt: '2022-01-01',
		author: 'Harper Lee',
	},
]

export const resolvers = {
	Query: {
		novels: () => novels,
		novel: (parent: any, args: INovel, context: Context) => {
			return novels.find((novel) => novel.id === args.id)
		}
	},

	Mutation: {
		addNovel: (parent: any, args: INovel, context: Context) => {
			const novel = {
				id: String(novels.length + 1),
				title: args.title,
				image: args.image,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				author: args.author,
			}
			novels.push(novel)
			return novel
		},
		updateNovel: (parent: any, args: INovel, context: Context) => {
			const novel = novels.find((novel) => novel.id === args.id)
			if (novel) {
				novel.title = args.title
				novel.image = args.image
				novel.updatedAt = new Date().toISOString()
				novel.author = args.author
			} else {
				throw new Error('Novel not found')
			}
			return novel
		},

		deleteNovel: (parent: any, args: INovel, context: Context) => {
			const novelIndex = novels.findIndex((novel) => novel.id === args.id)
			if (novelIndex === -1) {
				throw new Error('Novel not found')
			}
			novels.splice(novelIndex, 1)
			return true
		},
	}
}


