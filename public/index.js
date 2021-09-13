"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var resolvers = {
    Query: {
        info: function () { return "This is the API of a HN Clone by jeaa!"; },
        feed: function () { return links; },
    },
    Mutation: {
        post: function (parent, args) {
            var idCount = links.length;
            var link = {
                id: "link-" + idCount++,
                description: args.description,
                url: args.url,
            };
            links.push(link);
            return link;
        }
    },
};
var links = [
    {
        id: 'link-0',
        url: 'www.howtographql.com',
        description: 'Fullstack tutorial for GraphQL'
    },
    {
        id: 'link-1',
        url: 'www.tutorialspoint.com',
        description: 'Learn programming and tech stack for free!!'
    }
];
var server = new apollo_server_1.ApolloServer({
    typeDefs: fs_1.default.readFileSync(path_1.default.join(__dirname, 'schema.graphql'), 'utf8'),
    resolvers: resolvers,
});
server
    .listen()
    .then(function (_a) {
    var url = _a.url;
    return console.log("Server is running on " + url);
});
