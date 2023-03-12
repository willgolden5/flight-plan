import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "flight-plan/server/api/trpc";
import { MeiliSearch } from 'meilisearch'

const client = new MeiliSearch({ host: 'http://localhost:7700' })
// client.index('movies').addDocuments(movies)
//   .then((res) => console.log(res))


export const postsRouter = createTRPCRouter({
  all: protectedProcedure
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    .query(({ ctx }) => ctx.prisma.posts.findMany()),
  create: protectedProcedure.input(z.object({
    title: z.string(),
    content: z.string(),
    published: z.boolean(),
    authorId: z.string(),
    certificate: z.array(z.string()),
    ratings: z.array(z.string()),
    status: z.string(),
    author: z.string(),

  })).mutation(({ ctx, input }) => {
    return ctx.prisma.posts.create({
      data: {
        updatedAt: new Date(),
        title: input.title,
        content: input.content,
        published: input.published,
        authorId: input.authorId,
        certificate: input.certificate,
        ratings: input.ratings,
        status: input.status,
      }
  })}),
  filtered: protectedProcedure.input(z.object({searchTerm: z.string()})).mutation(async ({ ctx, input }) => {
    // create posts index then add all posts as documents
    await client.index('posts').updateFilterableAttributes([
      'certificate',
      'ratings',
      'status',
      'category',
      'class',
      'avionics',
      'flightLocation',
      'author',
      'access'
    ])
    const posts = await ctx.prisma.posts.findMany()
    await client.index('posts').addDocuments(posts)
    const results = await client.index('posts').search(input.searchTerm)
    return results;
  }
  ),

})