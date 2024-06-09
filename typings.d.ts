// import { Author, Novel } from "@prisma/client";

// interface INovel extends Novel {
// 	authors: Author[];
// }

interface INovel {
    id: string
    title: string
    image: string
    createdAt: any
    updatedAt: any
    author: string
}

