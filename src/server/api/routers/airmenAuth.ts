import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "flight-plan/server/api/trpc";


export const pilotCheckRouter = createTRPCRouter({
  pilotCheck: protectedProcedure
    .input(z.object({ last: z.string(), certNum: z.string(), userId: z.string() }))
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    .query(({input}) => fetch(`https://airmen-auth-service.fly.dev/pilot?lastName=${input.last}&certificate=${input.certNum}&id=${input.userId}`))

});
