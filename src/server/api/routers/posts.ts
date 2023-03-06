import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "flight-plan/server/api/trpc";


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

  })).query(({ ctx, input }) => {
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
  })})

})