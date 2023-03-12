import { type AppType } from 'next/app';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { Analytics } from '@vercel/analytics/react';

import { api } from 'flight-plan/utils/api';

import 'flight-plan/styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';

const MyApp: AppType<{ session: Session | null }> = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <ChakraProvider>
      <SessionProvider session={session}>
        <Component {...pageProps} />
        <Analytics />
      </SessionProvider>
    </ChakraProvider>
  );
};

export default api.withTRPC(MyApp);
