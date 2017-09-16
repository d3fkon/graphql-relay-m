import {
    buildSchema
} from 'graphql';

const schema = buildSchema(`
    input FriendInput {
        id: ID,
        firstName: String,
        language: String,
    }

    type Friend {
        id: ID,
        firstName: String,
        language: String,
    }

    type Query {
        getFriend(id: ID!): Friend
    }

    type Mutation {
        createFriend(input: FriendInput): Friend,
        updateFriend(id: ID!, input: FriendInput): Friend
    }
`);

export default schema;