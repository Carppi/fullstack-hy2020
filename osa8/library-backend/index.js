const config = require('./utils/config')
const { ApolloServer, UserInputError, gql, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const mongoUrl = config.MONGODB_URI
const jwtSecret = config.JWT_SECRET


console.log('connecting to', mongoUrl)

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int
      author: String!
      genres: [String]
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {

      let bookList = await Book.find({}).populate('author')

      /*if (args.author) {
        bookList = bookList.filter(book => book.author === args.author)
      }*/
      if (args.genre) {
        bookList = bookList.filter(book => book.genres.includes(args.genre))
      }


      return bookList
    },

    allAuthors: () => Author.find({}),

    me: (root, args, context) => {
      return context.currentUser
    }
  },

  Author: {
    bookCount: async (root) => {
      const books = await Book.find({ author: root._id })
      return books.length
    }
  },

  Mutation: {
    addBook: async (root, args, { currentUser }) => {

      console.log('currentUser', currentUser)

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      try {
        const authors = await Author.find({})

        let authorId = null

        if (args.author && !authors.map(author => author.name).includes(args.author)) {
          const author = new Author({ name: args.author, born: null })

          const savedAuthor = await author.save()
          authorId = savedAuthor.id
          console.log(author, savedAuthor)
        } else {
          const author = await Author.findOne({ name: args.author })
          authorId = author.id
        }

        const book = new Book({
          ...args,
          author: authorId
        })

        await book.save()

        return book

      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },

    editAuthor: async (root, args, { currentUser }) => {

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      try {
        const author = await Author.findOne({ name: args.name },)

        if (!author) {
          return null
        }

        if (args.setBornTo) {
          author.born = args.setBornTo
          const updateAuthor = await author.save()
          return updateAuthor
        }

        return author

      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

    },

    createUser: (root, args) => {

      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre
      })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })

    },

    login: async (root, args) => {
      const user = await User.findOne({
        username: args.username
      })

      if (!user || args.password !== 'secret') {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, jwtSecret) }
    }

  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), jwtSecret
      )
      const currentUser = await User.findById(decodedToken.id)

      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})