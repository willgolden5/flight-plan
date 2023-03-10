import { createTRPCRouter } from "flight-plan/server/api/trpc";
import { exampleRouter } from "flight-plan/server/api/routers/example";
import { userRouter } from "./routers/user";
import { pilotCheckRouter } from "./routers/airmenAuth";
import { postsRouter } from "./routers/posts";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  alpha: userRouter,
  pilot: pilotCheckRouter,
  post: postsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
