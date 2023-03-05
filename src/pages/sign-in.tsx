/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button, Flex, Heading, Input, Stack, Text } from '@chakra-ui/react';
import Layout from 'flight-plan/components/Layout';
import { type NextPageContext } from 'next';
import { type BuiltInProviderType } from 'next-auth/providers';
import {
  getProviders,
  getSession,
  getCsrfToken,
  type LiteralUnion,
  type ClientSafeProvider,
  signIn,
} from 'next-auth/react';

type SignInProps = {
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null;
  csrfToken: string | undefined;
};

const SignIn = ({ providers, csrfToken }: SignInProps) => {
  return (
    <Layout>
      <Flex align='left' p={2} justify='center' direction='column' w='375px'>
        <Heading mb={4} alignContent='center'>
          Sign In
        </Heading>
        <Flex w='100%' h='100%'>
          <form method='post' action='/api/auth/signin/email'>
            <Input name='csrfToken' type='hidden' defaultValue={csrfToken} />
            <label>
              Email Address
              <Input name='email' type='text' id='email' />
            </label>
            <label>
              Password
              <Input name='email' type='text' id='email' />
            </label>
            <Button my={4} colorScheme='facebook' type='submit' w='100%'>
              Sign in
            </Button>
          </form>
        </Flex>
        <Stack isInline p={4}>
          {Object.values(providers as Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>).map(
            (provider) => {
              if (provider.name === 'Email') {
                return null;
              }
              return (
                <Flex key={provider.name}>
                  <Button
                    variant='outline'
                    borderColor='blackAlpha.900'
                    color='facebook'
                    onClick={() => signIn(provider.id)}
                  >
                    Sign in with {provider.name}
                  </Button>
                </Flex>
              );
            }
          )}
        </Stack>
      </Flex>
    </Layout>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession({ req: context.req });
  if (session?.user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);
  return {
    props: { providers, session: null, csrfToken },
  };
}

export default SignIn;
