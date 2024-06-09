export const typeDefs = `#graphql 
    type Novel {
    id: ID!
    title: String
    image: String
    createdAt: String
    updatedAt: String
    author: String
  }

  type Query {
	  novel(id: ID!): Novel 
    novels: [Novel]
  }

  type Mutation {
    addNovel (image:String, title:String, author: String) : Novel
    updateNovel(id:ID!, title:String, image:String, author: String) : Novel
    deleteNovel(id:ID!) : Boolean
  }
`;
