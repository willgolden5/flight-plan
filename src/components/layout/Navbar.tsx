import { Button, Flex } from '@chakra-ui/react';
import { colorButton } from 'flight-plan/pages/sign-in';
import { BuiltInProviderType } from 'next-auth/providers';
import { ClientSafeProvider, getCsrfToken, getProviders, getSession, LiteralUnion, signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';

const NavBar = () => {
  const providers = getProviders();
  const [providerData, setProviderData] = useState(null);
  const logIn = (id: string) => {
    const res = signIn(id);
    console.log(res);
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    providers.then((data) => setProviderData(data));
  }, [providers]);

  if (providerData !== null) {
    return (
      <Flex position='fixed' dir='row' w='100%' h='100px' justify='space-between' p={2}>
        <Flex dir='row'></Flex>
        <Flex dir='row'></Flex>
        <Flex dir='row'>
          {Object.values(providerData as Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>).map(
            (provider) => {
              if (provider.name === 'Email' || provider.name === 'Credentials' || provider.name === 'Google') {
                return null;
              }
              return (
                <Flex key={provider.name} w='100%'>
                  <Button
                    borderColor='blackAlpha.900'
                    colorScheme={colorButton(provider.name)}
                    m={2}
                    w='100%'
                    onClick={() => logIn(provider.id)}
                  >
                    Sign in with {provider.name}
                  </Button>
                </Flex>
              );
            }
          )}
        </Flex>
      </Flex>
    );
  } else {
    return <></>;
  }
};

export default NavBar;
