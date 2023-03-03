import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "flight-plan/server/api/trpc";


export const alphaRouter = createTRPCRouter({
  alpha: protectedProcedure
    .input(z.object({ email: z.string(), first: z.string(), last: z.string() }))
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    .mutation(({ input, ctx }) => ctx.prisma.alpha.create({
      data: {
        email: input.email,
        first: input.first,
        last: input.last,
      }
    })),

});
