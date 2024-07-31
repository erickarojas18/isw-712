const { buildSchema } = require('graphql');
exports.graphQLschema = buildSchema(`
  type Query {
    getAllCourses: [Course]
    searchCourses(name: String!): [Course]
    hello: String
    version: String
  }

  type Mutation {
    createCourse(input: CreateCourseInput!): Course
  }

  type Course {
    _id: ID!
    name: String,
    credits: Int,
    teacher: Teacher
  }

  type Teacher {
    _id: ID!,
    first_name: String!,
    last_name: String!,
    cedula: String!,
    age: Int
  }

  input CreateCourseInput {
    name: String!
    credits: Int!
  }
`);