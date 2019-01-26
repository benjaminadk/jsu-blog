module.exports = {
        typeDefs: /* GraphQL */ `type AggregatePost {
  count: Int!
}

type AggregatePublication {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

scalar DateTime

scalar Long

type Mutation {
  createPost(data: PostCreateInput!): Post!
  updatePost(data: PostUpdateInput!, where: PostWhereUniqueInput!): Post
  updateManyPosts(data: PostUpdateManyMutationInput!, where: PostWhereInput): BatchPayload!
  upsertPost(where: PostWhereUniqueInput!, create: PostCreateInput!, update: PostUpdateInput!): Post!
  deletePost(where: PostWhereUniqueInput!): Post
  deleteManyPosts(where: PostWhereInput): BatchPayload!
  createPublication(data: PublicationCreateInput!): Publication!
  updatePublication(data: PublicationUpdateInput!, where: PublicationWhereUniqueInput!): Publication
  updateManyPublications(data: PublicationUpdateManyMutationInput!, where: PublicationWhereInput): BatchPayload!
  upsertPublication(where: PublicationWhereUniqueInput!, create: PublicationCreateInput!, update: PublicationUpdateInput!): Publication!
  deletePublication(where: PublicationWhereUniqueInput!): Publication
  deleteManyPublications(where: PublicationWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Post {
  id: ID!
  topic: Topic!
  title: String!
  subtitle: String
  body: String
  image: String
  tags: [String!]!
  published: Boolean
  author: User!
  publication: Publication
  updatedAt: DateTime!
  createdAt: DateTime!
}

type PostConnection {
  pageInfo: PageInfo!
  edges: [PostEdge]!
  aggregate: AggregatePost!
}

input PostCreateInput {
  topic: Topic
  title: String
  subtitle: String
  body: String
  image: String
  tags: PostCreatetagsInput
  published: Boolean
  author: UserCreateOneWithoutPostsInput!
  publication: PublicationCreateOneWithoutPostsInput
}

input PostCreateManyWithoutAuthorInput {
  create: [PostCreateWithoutAuthorInput!]
  connect: [PostWhereUniqueInput!]
}

input PostCreateManyWithoutPublicationInput {
  create: [PostCreateWithoutPublicationInput!]
  connect: [PostWhereUniqueInput!]
}

input PostCreatetagsInput {
  set: [String!]
}

input PostCreateWithoutAuthorInput {
  topic: Topic
  title: String
  subtitle: String
  body: String
  image: String
  tags: PostCreatetagsInput
  published: Boolean
  publication: PublicationCreateOneWithoutPostsInput
}

input PostCreateWithoutPublicationInput {
  topic: Topic
  title: String
  subtitle: String
  body: String
  image: String
  tags: PostCreatetagsInput
  published: Boolean
  author: UserCreateOneWithoutPostsInput!
}

type PostEdge {
  node: Post!
  cursor: String!
}

enum PostOrderByInput {
  id_ASC
  id_DESC
  topic_ASC
  topic_DESC
  title_ASC
  title_DESC
  subtitle_ASC
  subtitle_DESC
  body_ASC
  body_DESC
  image_ASC
  image_DESC
  published_ASC
  published_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type PostPreviousValues {
  id: ID!
  topic: Topic!
  title: String!
  subtitle: String
  body: String
  image: String
  tags: [String!]!
  published: Boolean
  updatedAt: DateTime!
  createdAt: DateTime!
}

input PostScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  topic: Topic
  topic_not: Topic
  topic_in: [Topic!]
  topic_not_in: [Topic!]
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  subtitle: String
  subtitle_not: String
  subtitle_in: [String!]
  subtitle_not_in: [String!]
  subtitle_lt: String
  subtitle_lte: String
  subtitle_gt: String
  subtitle_gte: String
  subtitle_contains: String
  subtitle_not_contains: String
  subtitle_starts_with: String
  subtitle_not_starts_with: String
  subtitle_ends_with: String
  subtitle_not_ends_with: String
  body: String
  body_not: String
  body_in: [String!]
  body_not_in: [String!]
  body_lt: String
  body_lte: String
  body_gt: String
  body_gte: String
  body_contains: String
  body_not_contains: String
  body_starts_with: String
  body_not_starts_with: String
  body_ends_with: String
  body_not_ends_with: String
  image: String
  image_not: String
  image_in: [String!]
  image_not_in: [String!]
  image_lt: String
  image_lte: String
  image_gt: String
  image_gte: String
  image_contains: String
  image_not_contains: String
  image_starts_with: String
  image_not_starts_with: String
  image_ends_with: String
  image_not_ends_with: String
  published: Boolean
  published_not: Boolean
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  AND: [PostScalarWhereInput!]
  OR: [PostScalarWhereInput!]
  NOT: [PostScalarWhereInput!]
}

type PostSubscriptionPayload {
  mutation: MutationType!
  node: Post
  updatedFields: [String!]
  previousValues: PostPreviousValues
}

input PostSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: PostWhereInput
  AND: [PostSubscriptionWhereInput!]
  OR: [PostSubscriptionWhereInput!]
  NOT: [PostSubscriptionWhereInput!]
}

input PostUpdateInput {
  topic: Topic
  title: String
  subtitle: String
  body: String
  image: String
  tags: PostUpdatetagsInput
  published: Boolean
  author: UserUpdateOneRequiredWithoutPostsInput
  publication: PublicationUpdateOneWithoutPostsInput
}

input PostUpdateManyDataInput {
  topic: Topic
  title: String
  subtitle: String
  body: String
  image: String
  tags: PostUpdatetagsInput
  published: Boolean
}

input PostUpdateManyMutationInput {
  topic: Topic
  title: String
  subtitle: String
  body: String
  image: String
  tags: PostUpdatetagsInput
  published: Boolean
}

input PostUpdateManyWithoutAuthorInput {
  create: [PostCreateWithoutAuthorInput!]
  delete: [PostWhereUniqueInput!]
  connect: [PostWhereUniqueInput!]
  disconnect: [PostWhereUniqueInput!]
  update: [PostUpdateWithWhereUniqueWithoutAuthorInput!]
  upsert: [PostUpsertWithWhereUniqueWithoutAuthorInput!]
  deleteMany: [PostScalarWhereInput!]
  updateMany: [PostUpdateManyWithWhereNestedInput!]
}

input PostUpdateManyWithoutPublicationInput {
  create: [PostCreateWithoutPublicationInput!]
  delete: [PostWhereUniqueInput!]
  connect: [PostWhereUniqueInput!]
  disconnect: [PostWhereUniqueInput!]
  update: [PostUpdateWithWhereUniqueWithoutPublicationInput!]
  upsert: [PostUpsertWithWhereUniqueWithoutPublicationInput!]
  deleteMany: [PostScalarWhereInput!]
  updateMany: [PostUpdateManyWithWhereNestedInput!]
}

input PostUpdateManyWithWhereNestedInput {
  where: PostScalarWhereInput!
  data: PostUpdateManyDataInput!
}

input PostUpdatetagsInput {
  set: [String!]
}

input PostUpdateWithoutAuthorDataInput {
  topic: Topic
  title: String
  subtitle: String
  body: String
  image: String
  tags: PostUpdatetagsInput
  published: Boolean
  publication: PublicationUpdateOneWithoutPostsInput
}

input PostUpdateWithoutPublicationDataInput {
  topic: Topic
  title: String
  subtitle: String
  body: String
  image: String
  tags: PostUpdatetagsInput
  published: Boolean
  author: UserUpdateOneRequiredWithoutPostsInput
}

input PostUpdateWithWhereUniqueWithoutAuthorInput {
  where: PostWhereUniqueInput!
  data: PostUpdateWithoutAuthorDataInput!
}

input PostUpdateWithWhereUniqueWithoutPublicationInput {
  where: PostWhereUniqueInput!
  data: PostUpdateWithoutPublicationDataInput!
}

input PostUpsertWithWhereUniqueWithoutAuthorInput {
  where: PostWhereUniqueInput!
  update: PostUpdateWithoutAuthorDataInput!
  create: PostCreateWithoutAuthorInput!
}

input PostUpsertWithWhereUniqueWithoutPublicationInput {
  where: PostWhereUniqueInput!
  update: PostUpdateWithoutPublicationDataInput!
  create: PostCreateWithoutPublicationInput!
}

input PostWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  topic: Topic
  topic_not: Topic
  topic_in: [Topic!]
  topic_not_in: [Topic!]
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  subtitle: String
  subtitle_not: String
  subtitle_in: [String!]
  subtitle_not_in: [String!]
  subtitle_lt: String
  subtitle_lte: String
  subtitle_gt: String
  subtitle_gte: String
  subtitle_contains: String
  subtitle_not_contains: String
  subtitle_starts_with: String
  subtitle_not_starts_with: String
  subtitle_ends_with: String
  subtitle_not_ends_with: String
  body: String
  body_not: String
  body_in: [String!]
  body_not_in: [String!]
  body_lt: String
  body_lte: String
  body_gt: String
  body_gte: String
  body_contains: String
  body_not_contains: String
  body_starts_with: String
  body_not_starts_with: String
  body_ends_with: String
  body_not_ends_with: String
  image: String
  image_not: String
  image_in: [String!]
  image_not_in: [String!]
  image_lt: String
  image_lte: String
  image_gt: String
  image_gte: String
  image_contains: String
  image_not_contains: String
  image_starts_with: String
  image_not_starts_with: String
  image_ends_with: String
  image_not_ends_with: String
  published: Boolean
  published_not: Boolean
  author: UserWhereInput
  publication: PublicationWhereInput
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  AND: [PostWhereInput!]
  OR: [PostWhereInput!]
  NOT: [PostWhereInput!]
}

input PostWhereUniqueInput {
  id: ID
}

type Publication {
  id: ID!
  name: String!
  description: String!
  avatar: String!
  logo: String
  email: String
  twitter: String
  facebook: String
  tags: [String!]!
  owner: User
  editors(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User!]
  writers(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User!]
  posts(where: PostWhereInput, orderBy: PostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Post!]
  updatedAt: DateTime!
  createdAt: DateTime!
}

type PublicationConnection {
  pageInfo: PageInfo!
  edges: [PublicationEdge]!
  aggregate: AggregatePublication!
}

input PublicationCreateInput {
  name: String!
  description: String!
  avatar: String!
  logo: String
  email: String
  twitter: String
  facebook: String
  tags: PublicationCreatetagsInput
  owner: UserCreateOneWithoutPubsOwnerInput
  editors: UserCreateManyWithoutPubsEditorInput
  writers: UserCreateManyWithoutPubsWriterInput
  posts: PostCreateManyWithoutPublicationInput
}

input PublicationCreateManyWithoutEditorsInput {
  create: [PublicationCreateWithoutEditorsInput!]
  connect: [PublicationWhereUniqueInput!]
}

input PublicationCreateManyWithoutOwnerInput {
  create: [PublicationCreateWithoutOwnerInput!]
  connect: [PublicationWhereUniqueInput!]
}

input PublicationCreateManyWithoutWritersInput {
  create: [PublicationCreateWithoutWritersInput!]
  connect: [PublicationWhereUniqueInput!]
}

input PublicationCreateOneWithoutPostsInput {
  create: PublicationCreateWithoutPostsInput
  connect: PublicationWhereUniqueInput
}

input PublicationCreatetagsInput {
  set: [String!]
}

input PublicationCreateWithoutEditorsInput {
  name: String!
  description: String!
  avatar: String!
  logo: String
  email: String
  twitter: String
  facebook: String
  tags: PublicationCreatetagsInput
  owner: UserCreateOneWithoutPubsOwnerInput
  writers: UserCreateManyWithoutPubsWriterInput
  posts: PostCreateManyWithoutPublicationInput
}

input PublicationCreateWithoutOwnerInput {
  name: String!
  description: String!
  avatar: String!
  logo: String
  email: String
  twitter: String
  facebook: String
  tags: PublicationCreatetagsInput
  editors: UserCreateManyWithoutPubsEditorInput
  writers: UserCreateManyWithoutPubsWriterInput
  posts: PostCreateManyWithoutPublicationInput
}

input PublicationCreateWithoutPostsInput {
  name: String!
  description: String!
  avatar: String!
  logo: String
  email: String
  twitter: String
  facebook: String
  tags: PublicationCreatetagsInput
  owner: UserCreateOneWithoutPubsOwnerInput
  editors: UserCreateManyWithoutPubsEditorInput
  writers: UserCreateManyWithoutPubsWriterInput
}

input PublicationCreateWithoutWritersInput {
  name: String!
  description: String!
  avatar: String!
  logo: String
  email: String
  twitter: String
  facebook: String
  tags: PublicationCreatetagsInput
  owner: UserCreateOneWithoutPubsOwnerInput
  editors: UserCreateManyWithoutPubsEditorInput
  posts: PostCreateManyWithoutPublicationInput
}

type PublicationEdge {
  node: Publication!
  cursor: String!
}

enum PublicationOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  description_ASC
  description_DESC
  avatar_ASC
  avatar_DESC
  logo_ASC
  logo_DESC
  email_ASC
  email_DESC
  twitter_ASC
  twitter_DESC
  facebook_ASC
  facebook_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type PublicationPreviousValues {
  id: ID!
  name: String!
  description: String!
  avatar: String!
  logo: String
  email: String
  twitter: String
  facebook: String
  tags: [String!]!
  updatedAt: DateTime!
  createdAt: DateTime!
}

input PublicationScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  avatar: String
  avatar_not: String
  avatar_in: [String!]
  avatar_not_in: [String!]
  avatar_lt: String
  avatar_lte: String
  avatar_gt: String
  avatar_gte: String
  avatar_contains: String
  avatar_not_contains: String
  avatar_starts_with: String
  avatar_not_starts_with: String
  avatar_ends_with: String
  avatar_not_ends_with: String
  logo: String
  logo_not: String
  logo_in: [String!]
  logo_not_in: [String!]
  logo_lt: String
  logo_lte: String
  logo_gt: String
  logo_gte: String
  logo_contains: String
  logo_not_contains: String
  logo_starts_with: String
  logo_not_starts_with: String
  logo_ends_with: String
  logo_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  twitter: String
  twitter_not: String
  twitter_in: [String!]
  twitter_not_in: [String!]
  twitter_lt: String
  twitter_lte: String
  twitter_gt: String
  twitter_gte: String
  twitter_contains: String
  twitter_not_contains: String
  twitter_starts_with: String
  twitter_not_starts_with: String
  twitter_ends_with: String
  twitter_not_ends_with: String
  facebook: String
  facebook_not: String
  facebook_in: [String!]
  facebook_not_in: [String!]
  facebook_lt: String
  facebook_lte: String
  facebook_gt: String
  facebook_gte: String
  facebook_contains: String
  facebook_not_contains: String
  facebook_starts_with: String
  facebook_not_starts_with: String
  facebook_ends_with: String
  facebook_not_ends_with: String
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  AND: [PublicationScalarWhereInput!]
  OR: [PublicationScalarWhereInput!]
  NOT: [PublicationScalarWhereInput!]
}

type PublicationSubscriptionPayload {
  mutation: MutationType!
  node: Publication
  updatedFields: [String!]
  previousValues: PublicationPreviousValues
}

input PublicationSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: PublicationWhereInput
  AND: [PublicationSubscriptionWhereInput!]
  OR: [PublicationSubscriptionWhereInput!]
  NOT: [PublicationSubscriptionWhereInput!]
}

input PublicationUpdateInput {
  name: String
  description: String
  avatar: String
  logo: String
  email: String
  twitter: String
  facebook: String
  tags: PublicationUpdatetagsInput
  owner: UserUpdateOneWithoutPubsOwnerInput
  editors: UserUpdateManyWithoutPubsEditorInput
  writers: UserUpdateManyWithoutPubsWriterInput
  posts: PostUpdateManyWithoutPublicationInput
}

input PublicationUpdateManyDataInput {
  name: String
  description: String
  avatar: String
  logo: String
  email: String
  twitter: String
  facebook: String
  tags: PublicationUpdatetagsInput
}

input PublicationUpdateManyMutationInput {
  name: String
  description: String
  avatar: String
  logo: String
  email: String
  twitter: String
  facebook: String
  tags: PublicationUpdatetagsInput
}

input PublicationUpdateManyWithoutEditorsInput {
  create: [PublicationCreateWithoutEditorsInput!]
  delete: [PublicationWhereUniqueInput!]
  connect: [PublicationWhereUniqueInput!]
  disconnect: [PublicationWhereUniqueInput!]
  update: [PublicationUpdateWithWhereUniqueWithoutEditorsInput!]
  upsert: [PublicationUpsertWithWhereUniqueWithoutEditorsInput!]
  deleteMany: [PublicationScalarWhereInput!]
  updateMany: [PublicationUpdateManyWithWhereNestedInput!]
}

input PublicationUpdateManyWithoutOwnerInput {
  create: [PublicationCreateWithoutOwnerInput!]
  delete: [PublicationWhereUniqueInput!]
  connect: [PublicationWhereUniqueInput!]
  disconnect: [PublicationWhereUniqueInput!]
  update: [PublicationUpdateWithWhereUniqueWithoutOwnerInput!]
  upsert: [PublicationUpsertWithWhereUniqueWithoutOwnerInput!]
  deleteMany: [PublicationScalarWhereInput!]
  updateMany: [PublicationUpdateManyWithWhereNestedInput!]
}

input PublicationUpdateManyWithoutWritersInput {
  create: [PublicationCreateWithoutWritersInput!]
  delete: [PublicationWhereUniqueInput!]
  connect: [PublicationWhereUniqueInput!]
  disconnect: [PublicationWhereUniqueInput!]
  update: [PublicationUpdateWithWhereUniqueWithoutWritersInput!]
  upsert: [PublicationUpsertWithWhereUniqueWithoutWritersInput!]
  deleteMany: [PublicationScalarWhereInput!]
  updateMany: [PublicationUpdateManyWithWhereNestedInput!]
}

input PublicationUpdateManyWithWhereNestedInput {
  where: PublicationScalarWhereInput!
  data: PublicationUpdateManyDataInput!
}

input PublicationUpdateOneWithoutPostsInput {
  create: PublicationCreateWithoutPostsInput
  update: PublicationUpdateWithoutPostsDataInput
  upsert: PublicationUpsertWithoutPostsInput
  delete: Boolean
  disconnect: Boolean
  connect: PublicationWhereUniqueInput
}

input PublicationUpdatetagsInput {
  set: [String!]
}

input PublicationUpdateWithoutEditorsDataInput {
  name: String
  description: String
  avatar: String
  logo: String
  email: String
  twitter: String
  facebook: String
  tags: PublicationUpdatetagsInput
  owner: UserUpdateOneWithoutPubsOwnerInput
  writers: UserUpdateManyWithoutPubsWriterInput
  posts: PostUpdateManyWithoutPublicationInput
}

input PublicationUpdateWithoutOwnerDataInput {
  name: String
  description: String
  avatar: String
  logo: String
  email: String
  twitter: String
  facebook: String
  tags: PublicationUpdatetagsInput
  editors: UserUpdateManyWithoutPubsEditorInput
  writers: UserUpdateManyWithoutPubsWriterInput
  posts: PostUpdateManyWithoutPublicationInput
}

input PublicationUpdateWithoutPostsDataInput {
  name: String
  description: String
  avatar: String
  logo: String
  email: String
  twitter: String
  facebook: String
  tags: PublicationUpdatetagsInput
  owner: UserUpdateOneWithoutPubsOwnerInput
  editors: UserUpdateManyWithoutPubsEditorInput
  writers: UserUpdateManyWithoutPubsWriterInput
}

input PublicationUpdateWithoutWritersDataInput {
  name: String
  description: String
  avatar: String
  logo: String
  email: String
  twitter: String
  facebook: String
  tags: PublicationUpdatetagsInput
  owner: UserUpdateOneWithoutPubsOwnerInput
  editors: UserUpdateManyWithoutPubsEditorInput
  posts: PostUpdateManyWithoutPublicationInput
}

input PublicationUpdateWithWhereUniqueWithoutEditorsInput {
  where: PublicationWhereUniqueInput!
  data: PublicationUpdateWithoutEditorsDataInput!
}

input PublicationUpdateWithWhereUniqueWithoutOwnerInput {
  where: PublicationWhereUniqueInput!
  data: PublicationUpdateWithoutOwnerDataInput!
}

input PublicationUpdateWithWhereUniqueWithoutWritersInput {
  where: PublicationWhereUniqueInput!
  data: PublicationUpdateWithoutWritersDataInput!
}

input PublicationUpsertWithoutPostsInput {
  update: PublicationUpdateWithoutPostsDataInput!
  create: PublicationCreateWithoutPostsInput!
}

input PublicationUpsertWithWhereUniqueWithoutEditorsInput {
  where: PublicationWhereUniqueInput!
  update: PublicationUpdateWithoutEditorsDataInput!
  create: PublicationCreateWithoutEditorsInput!
}

input PublicationUpsertWithWhereUniqueWithoutOwnerInput {
  where: PublicationWhereUniqueInput!
  update: PublicationUpdateWithoutOwnerDataInput!
  create: PublicationCreateWithoutOwnerInput!
}

input PublicationUpsertWithWhereUniqueWithoutWritersInput {
  where: PublicationWhereUniqueInput!
  update: PublicationUpdateWithoutWritersDataInput!
  create: PublicationCreateWithoutWritersInput!
}

input PublicationWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  avatar: String
  avatar_not: String
  avatar_in: [String!]
  avatar_not_in: [String!]
  avatar_lt: String
  avatar_lte: String
  avatar_gt: String
  avatar_gte: String
  avatar_contains: String
  avatar_not_contains: String
  avatar_starts_with: String
  avatar_not_starts_with: String
  avatar_ends_with: String
  avatar_not_ends_with: String
  logo: String
  logo_not: String
  logo_in: [String!]
  logo_not_in: [String!]
  logo_lt: String
  logo_lte: String
  logo_gt: String
  logo_gte: String
  logo_contains: String
  logo_not_contains: String
  logo_starts_with: String
  logo_not_starts_with: String
  logo_ends_with: String
  logo_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  twitter: String
  twitter_not: String
  twitter_in: [String!]
  twitter_not_in: [String!]
  twitter_lt: String
  twitter_lte: String
  twitter_gt: String
  twitter_gte: String
  twitter_contains: String
  twitter_not_contains: String
  twitter_starts_with: String
  twitter_not_starts_with: String
  twitter_ends_with: String
  twitter_not_ends_with: String
  facebook: String
  facebook_not: String
  facebook_in: [String!]
  facebook_not_in: [String!]
  facebook_lt: String
  facebook_lte: String
  facebook_gt: String
  facebook_gte: String
  facebook_contains: String
  facebook_not_contains: String
  facebook_starts_with: String
  facebook_not_starts_with: String
  facebook_ends_with: String
  facebook_not_ends_with: String
  owner: UserWhereInput
  editors_every: UserWhereInput
  editors_some: UserWhereInput
  editors_none: UserWhereInput
  writers_every: UserWhereInput
  writers_some: UserWhereInput
  writers_none: UserWhereInput
  posts_every: PostWhereInput
  posts_some: PostWhereInput
  posts_none: PostWhereInput
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  AND: [PublicationWhereInput!]
  OR: [PublicationWhereInput!]
  NOT: [PublicationWhereInput!]
}

input PublicationWhereUniqueInput {
  id: ID
  name: String
}

type Query {
  post(where: PostWhereUniqueInput!): Post
  posts(where: PostWhereInput, orderBy: PostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Post]!
  postsConnection(where: PostWhereInput, orderBy: PostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PostConnection!
  publication(where: PublicationWhereUniqueInput!): Publication
  publications(where: PublicationWhereInput, orderBy: PublicationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Publication]!
  publicationsConnection(where: PublicationWhereInput, orderBy: PublicationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PublicationConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

enum Role {
  USER
  ADMIN
}

type Subscription {
  post(where: PostSubscriptionWhereInput): PostSubscriptionPayload
  publication(where: PublicationSubscriptionWhereInput): PublicationSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

enum Topic {
  ARTIFICIAL_INTELLIGENCE
  CYBER_SECURITY
  DATA_SCIENCE
  JAVASCRIPT
  MACHINE_LEARNING
  MATH
  NONE
  PROGRAMMING
  SCIENCE
  SPACE
  TECHNOLOGY
}

type User {
  id: ID!
  email: String!
  name: String!
  password: String
  image: String
  bio: String
  role: Role!
  posts(where: PostWhereInput, orderBy: PostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Post!]
  pubsOwner(where: PublicationWhereInput, orderBy: PublicationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Publication!]
  pubsEditor(where: PublicationWhereInput, orderBy: PublicationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Publication!]
  pubsWriter(where: PublicationWhereInput, orderBy: PublicationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Publication!]
  topics: [Topic!]!
  updatedAt: DateTime!
  createdAt: DateTime!
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  email: String!
  name: String!
  password: String
  image: String
  bio: String
  role: Role
  posts: PostCreateManyWithoutAuthorInput
  pubsOwner: PublicationCreateManyWithoutOwnerInput
  pubsEditor: PublicationCreateManyWithoutEditorsInput
  pubsWriter: PublicationCreateManyWithoutWritersInput
  topics: UserCreatetopicsInput
}

input UserCreateManyWithoutPubsEditorInput {
  create: [UserCreateWithoutPubsEditorInput!]
  connect: [UserWhereUniqueInput!]
}

input UserCreateManyWithoutPubsWriterInput {
  create: [UserCreateWithoutPubsWriterInput!]
  connect: [UserWhereUniqueInput!]
}

input UserCreateOneWithoutPostsInput {
  create: UserCreateWithoutPostsInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutPubsOwnerInput {
  create: UserCreateWithoutPubsOwnerInput
  connect: UserWhereUniqueInput
}

input UserCreatetopicsInput {
  set: [Topic!]
}

input UserCreateWithoutPostsInput {
  email: String!
  name: String!
  password: String
  image: String
  bio: String
  role: Role
  pubsOwner: PublicationCreateManyWithoutOwnerInput
  pubsEditor: PublicationCreateManyWithoutEditorsInput
  pubsWriter: PublicationCreateManyWithoutWritersInput
  topics: UserCreatetopicsInput
}

input UserCreateWithoutPubsEditorInput {
  email: String!
  name: String!
  password: String
  image: String
  bio: String
  role: Role
  posts: PostCreateManyWithoutAuthorInput
  pubsOwner: PublicationCreateManyWithoutOwnerInput
  pubsWriter: PublicationCreateManyWithoutWritersInput
  topics: UserCreatetopicsInput
}

input UserCreateWithoutPubsOwnerInput {
  email: String!
  name: String!
  password: String
  image: String
  bio: String
  role: Role
  posts: PostCreateManyWithoutAuthorInput
  pubsEditor: PublicationCreateManyWithoutEditorsInput
  pubsWriter: PublicationCreateManyWithoutWritersInput
  topics: UserCreatetopicsInput
}

input UserCreateWithoutPubsWriterInput {
  email: String!
  name: String!
  password: String
  image: String
  bio: String
  role: Role
  posts: PostCreateManyWithoutAuthorInput
  pubsOwner: PublicationCreateManyWithoutOwnerInput
  pubsEditor: PublicationCreateManyWithoutEditorsInput
  topics: UserCreatetopicsInput
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  email_ASC
  email_DESC
  name_ASC
  name_DESC
  password_ASC
  password_DESC
  image_ASC
  image_DESC
  bio_ASC
  bio_DESC
  role_ASC
  role_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type UserPreviousValues {
  id: ID!
  email: String!
  name: String!
  password: String
  image: String
  bio: String
  role: Role!
  topics: [Topic!]!
  updatedAt: DateTime!
  createdAt: DateTime!
}

input UserScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  image: String
  image_not: String
  image_in: [String!]
  image_not_in: [String!]
  image_lt: String
  image_lte: String
  image_gt: String
  image_gte: String
  image_contains: String
  image_not_contains: String
  image_starts_with: String
  image_not_starts_with: String
  image_ends_with: String
  image_not_ends_with: String
  bio: String
  bio_not: String
  bio_in: [String!]
  bio_not_in: [String!]
  bio_lt: String
  bio_lte: String
  bio_gt: String
  bio_gte: String
  bio_contains: String
  bio_not_contains: String
  bio_starts_with: String
  bio_not_starts_with: String
  bio_ends_with: String
  bio_not_ends_with: String
  role: Role
  role_not: Role
  role_in: [Role!]
  role_not_in: [Role!]
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  AND: [UserScalarWhereInput!]
  OR: [UserScalarWhereInput!]
  NOT: [UserScalarWhereInput!]
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateInput {
  email: String
  name: String
  password: String
  image: String
  bio: String
  role: Role
  posts: PostUpdateManyWithoutAuthorInput
  pubsOwner: PublicationUpdateManyWithoutOwnerInput
  pubsEditor: PublicationUpdateManyWithoutEditorsInput
  pubsWriter: PublicationUpdateManyWithoutWritersInput
  topics: UserUpdatetopicsInput
}

input UserUpdateManyDataInput {
  email: String
  name: String
  password: String
  image: String
  bio: String
  role: Role
  topics: UserUpdatetopicsInput
}

input UserUpdateManyMutationInput {
  email: String
  name: String
  password: String
  image: String
  bio: String
  role: Role
  topics: UserUpdatetopicsInput
}

input UserUpdateManyWithoutPubsEditorInput {
  create: [UserCreateWithoutPubsEditorInput!]
  delete: [UserWhereUniqueInput!]
  connect: [UserWhereUniqueInput!]
  disconnect: [UserWhereUniqueInput!]
  update: [UserUpdateWithWhereUniqueWithoutPubsEditorInput!]
  upsert: [UserUpsertWithWhereUniqueWithoutPubsEditorInput!]
  deleteMany: [UserScalarWhereInput!]
  updateMany: [UserUpdateManyWithWhereNestedInput!]
}

input UserUpdateManyWithoutPubsWriterInput {
  create: [UserCreateWithoutPubsWriterInput!]
  delete: [UserWhereUniqueInput!]
  connect: [UserWhereUniqueInput!]
  disconnect: [UserWhereUniqueInput!]
  update: [UserUpdateWithWhereUniqueWithoutPubsWriterInput!]
  upsert: [UserUpsertWithWhereUniqueWithoutPubsWriterInput!]
  deleteMany: [UserScalarWhereInput!]
  updateMany: [UserUpdateManyWithWhereNestedInput!]
}

input UserUpdateManyWithWhereNestedInput {
  where: UserScalarWhereInput!
  data: UserUpdateManyDataInput!
}

input UserUpdateOneRequiredWithoutPostsInput {
  create: UserCreateWithoutPostsInput
  update: UserUpdateWithoutPostsDataInput
  upsert: UserUpsertWithoutPostsInput
  connect: UserWhereUniqueInput
}

input UserUpdateOneWithoutPubsOwnerInput {
  create: UserCreateWithoutPubsOwnerInput
  update: UserUpdateWithoutPubsOwnerDataInput
  upsert: UserUpsertWithoutPubsOwnerInput
  delete: Boolean
  disconnect: Boolean
  connect: UserWhereUniqueInput
}

input UserUpdatetopicsInput {
  set: [Topic!]
}

input UserUpdateWithoutPostsDataInput {
  email: String
  name: String
  password: String
  image: String
  bio: String
  role: Role
  pubsOwner: PublicationUpdateManyWithoutOwnerInput
  pubsEditor: PublicationUpdateManyWithoutEditorsInput
  pubsWriter: PublicationUpdateManyWithoutWritersInput
  topics: UserUpdatetopicsInput
}

input UserUpdateWithoutPubsEditorDataInput {
  email: String
  name: String
  password: String
  image: String
  bio: String
  role: Role
  posts: PostUpdateManyWithoutAuthorInput
  pubsOwner: PublicationUpdateManyWithoutOwnerInput
  pubsWriter: PublicationUpdateManyWithoutWritersInput
  topics: UserUpdatetopicsInput
}

input UserUpdateWithoutPubsOwnerDataInput {
  email: String
  name: String
  password: String
  image: String
  bio: String
  role: Role
  posts: PostUpdateManyWithoutAuthorInput
  pubsEditor: PublicationUpdateManyWithoutEditorsInput
  pubsWriter: PublicationUpdateManyWithoutWritersInput
  topics: UserUpdatetopicsInput
}

input UserUpdateWithoutPubsWriterDataInput {
  email: String
  name: String
  password: String
  image: String
  bio: String
  role: Role
  posts: PostUpdateManyWithoutAuthorInput
  pubsOwner: PublicationUpdateManyWithoutOwnerInput
  pubsEditor: PublicationUpdateManyWithoutEditorsInput
  topics: UserUpdatetopicsInput
}

input UserUpdateWithWhereUniqueWithoutPubsEditorInput {
  where: UserWhereUniqueInput!
  data: UserUpdateWithoutPubsEditorDataInput!
}

input UserUpdateWithWhereUniqueWithoutPubsWriterInput {
  where: UserWhereUniqueInput!
  data: UserUpdateWithoutPubsWriterDataInput!
}

input UserUpsertWithoutPostsInput {
  update: UserUpdateWithoutPostsDataInput!
  create: UserCreateWithoutPostsInput!
}

input UserUpsertWithoutPubsOwnerInput {
  update: UserUpdateWithoutPubsOwnerDataInput!
  create: UserCreateWithoutPubsOwnerInput!
}

input UserUpsertWithWhereUniqueWithoutPubsEditorInput {
  where: UserWhereUniqueInput!
  update: UserUpdateWithoutPubsEditorDataInput!
  create: UserCreateWithoutPubsEditorInput!
}

input UserUpsertWithWhereUniqueWithoutPubsWriterInput {
  where: UserWhereUniqueInput!
  update: UserUpdateWithoutPubsWriterDataInput!
  create: UserCreateWithoutPubsWriterInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  image: String
  image_not: String
  image_in: [String!]
  image_not_in: [String!]
  image_lt: String
  image_lte: String
  image_gt: String
  image_gte: String
  image_contains: String
  image_not_contains: String
  image_starts_with: String
  image_not_starts_with: String
  image_ends_with: String
  image_not_ends_with: String
  bio: String
  bio_not: String
  bio_in: [String!]
  bio_not_in: [String!]
  bio_lt: String
  bio_lte: String
  bio_gt: String
  bio_gte: String
  bio_contains: String
  bio_not_contains: String
  bio_starts_with: String
  bio_not_starts_with: String
  bio_ends_with: String
  bio_not_ends_with: String
  role: Role
  role_not: Role
  role_in: [Role!]
  role_not_in: [Role!]
  posts_every: PostWhereInput
  posts_some: PostWhereInput
  posts_none: PostWhereInput
  pubsOwner_every: PublicationWhereInput
  pubsOwner_some: PublicationWhereInput
  pubsOwner_none: PublicationWhereInput
  pubsEditor_every: PublicationWhereInput
  pubsEditor_some: PublicationWhereInput
  pubsEditor_none: PublicationWhereInput
  pubsWriter_every: PublicationWhereInput
  pubsWriter_some: PublicationWhereInput
  pubsWriter_none: PublicationWhereInput
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  email: String
}
`
      }
    