/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button, Flex, Heading, Input, Stack, Text } from '@chakra-ui/react';
import Layout from 'flight-plan/components/Layout';
import { NextPageContext } from 'next';
import { BuiltInProviderType } from 'next-auth/providers';
import { getProviders, getSession, getCsrfToken, LiteralUnion, ClientSafeProvider, signIn } from 'next-auth/react';

type SignInProps = {
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null;
  csrfToken: string | undefined;
};

const SignIn = ({ providers, csrfToken }: SignInProps) => {
  console.log(providers, csrfToken);
  return (
    <Layout>
      <Flex align='center' justify='center'>
        <Heading alignContent='center'>Sign In</Heading>
        <form method='post' action='/api/auth/signin/email'>
          <Input name='csrfToken' type='hidden' defaultValue={csrfToken} />
          <label>
            Email Address
            <Input name='email' type='text' id='email' />
          </label>
          <Button type='submit'>Sign in</Button>
        </form>
      </Flex>
      <Stack isInline margin='12'>
        {Object.values(providers as Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>).map(
          (provider) => {
            if (provider.name === 'Email') {
              return null;
            }
            return (
              <Flex key={provider.name}>
                <Button onClick={() => signIn(provider.id)}>Sign in with {provider.name}</Button>
              </Flex>
            );
          }
        )}
      </Stack>
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
