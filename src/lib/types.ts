export interface _Post {
    /* id        Int      @id @default(autoincrement())
    title     String
    content   String?
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
    published Boolean  @default(false)
    author    User?    @relation(fields: [authorId], references: [id])
    authorId  Int? */
    id: number,
    title: string,
    content: string,
    createdAt: Date,
    updatedAt: Date,
    published: boolean,
    author?: _User,
    authorId?: number
}

export interface _User {
    /*id            Int    @id @default(autoincrement())
    username      String
    password_hash String
    posts         Post[]*/
    id: number,
    username: string,
    password_hash: string,
    posts: _Post[]
}
