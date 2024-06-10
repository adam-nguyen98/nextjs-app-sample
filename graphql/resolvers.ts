import { Context } from "@/pages/api/graphql";

export const resolvers = {
	Query: {
		//get novel by id
		novel: async (_parent: any, args: INovel, context: Context) => {
			return await context.prisma.novel.findUnique({
				where: {
					id: args.id,
				},
			});
		},
		// get all novels
		novels: async (_parent: any, _args: INovel, context: Context) => {
			return await context.prisma.novel.findMany();
		},
	},
	Mutation: {
		// add novel
		addNovel: async (_parent: any, args: INovel, context: Context) => {
			return await context.prisma.novel.create({
				data: {
					title: args.title,
					image: args.image,
					author: args.author,
				},
			});
		},
		// update novel
		updateNovel: async (_parent: any, args: INovel, context: Context) => {
			return await context.prisma.novel.update({
				where: {
					id: args.id,
				},
				data: {
					title: args.title,
					image: args.image,
					author: args.author,
				},
			});
		},

		// delete novel
		deleteNovel: async (_parent: any, args: INovel, context: Context) => {
			return await context.prisma.novel.delete({
				where: {
					id: args.id,
				},
			});
		},
	},
};



