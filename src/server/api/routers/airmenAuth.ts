import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "flight-plan/server/api/trpc";


export const pilotCheckRouter = createTRPCRouter({
  pilotCheck: protectedProcedure
    .input(z.object({ last: z.string(), certNum: z.string(), userId: z.string() }))
    .mutation(async ({input}) => {
      const res = await fetch(`https://airmen-auth-service.fly.dev/pilot?lastName=${input.last}&certificate=${input.certNum}&id=${input.userId}`)
      return res
    })

});
