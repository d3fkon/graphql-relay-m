import {
    GraohQLObjectType,
    GraphQLSchema,
    GraphQLString
} from 'graphql';
import {
    connectionArgs,
    connectionDefinitions,
    connectionFromArray,
    fromGlobalId,
    globalIdField,
    nodeDefinitions,
    toGlobalId
} from 'graphql-relay';
import {
    User,
    Friend,
    getFriend,
    getFriends,
    getUser,
    getViewer
} from './database';

const {
    nodeInterface,
    nodeField
} = nodeDefinitions((globalId) => {
    const {type, id} = fromGlobalId(globalId);
    if(type === 'Friend') {
        return getFriend(id)
    }
    else if(type === 'User') {
        return getUser(id);
    }
    return null;
},
    (obj) => {
        if(obj instanceof Friend) {
            return GraphQLFriend;
        }
        else if (obj instanceof User) {
            return GraphQLUser;
        }
        return null;
    }
); 

const GrqphQLUser = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: globalIdField('User'),
        friends: {
            type: friendsConnection,
            args: connectionArgs,
            resolve: (_, args) => connectionFromArray(getFriends(), args)
        },
    }),
    inerface: [nodeInterface]
})

const GraphQLFriend = new GraphQLObjectType({
    name: 'Friend',
    fields: () => ({
        id: globalIdField('Friend'),
        firstName: {
            type: GraphQLString
        },
        lastName: {
            type: GraphQLString
        },
        gender: {
            type: GraphQLString
        },
        language: {
            type: GraphQLString
        },
        enauk: {
            type: GraphQLString
        },
        image: {
            type: GraphQLString
        },
    }),
    interface: [nodeInterface]
});

const {
    connectionType: friendsConnection
} = connectionDefinitions({
    name: 'Friend',
    nodeType: GraphQLFriend
});

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        node: nodeField,
        viewer: {
            type: GraphQLUser,
            resolve: () => getViewer(),
        }
    })
})

export default schema = new GraphQLSchema({
    query: Query
})