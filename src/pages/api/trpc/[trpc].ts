import { createNextApiHandler } from "@trpc/server/adapters/next";

import { env } from "flight-plan/env.mjs";
import { createTRPCContext } from "flight-plan/server/api/trpc";
import { appRouter } from "flight-plan/server/api/root";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
          );
        }
      : undefined,
});
