import {novelResolvers} from "./novel"

export const resolvers = {
    Query: {
        ...novelResolvers.Query
    },
    Mutation: {
        ...novelResolvers.Mutation
    }
}