const { ApolloServer } = require('apollo-server');
const fs = require('fs');
const path = require('path');

const resolvers = {
  Query: {
    info: () => `This is the API of a HN Clone by jeaa!`,
    feed: () => links,
  },
  Mutation: {
    post: (parent, args) => {
    let idCount = links.length
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    }
  },
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf8'
  ),
  resolvers,
})

let links = [
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
]

server
  .listen()
  .then(({ url }) => 
    console.log(`Server is running on ${url}`)
  );
