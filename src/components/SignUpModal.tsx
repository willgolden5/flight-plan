import { Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from '@chakra-ui/react';
import { type ChangeEvent, useEffect, useState } from 'react';
import useDebounce from 'flight-plan/hooks/useDebounce';

type SignUpProps = {
  dataAction: (email: string, first: string, last: string) => void;
};

function SignUp({ dataAction }: SignUpProps) {
  const [input, setInput] = useState({
    email: '',
    first: '',
    last: '',
  });

  const debouncedAction = useDebounce(dataAction, 500);

  useEffect(() => {
    if (input.email !== '' && input.first !== '' && input.last !== '') {
      void debouncedAction(input.email, input.first, input.last);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, dataAction]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setInput({ ...input, [e.target.id]: e.target.value });

  const isError = input.email === '';

  return (
    <FormControl isInvalid={isError}>
      <FormLabel>Email</FormLabel>
      <Input type='email' id='email' value={input.email} onChange={handleInputChange} />
      {!isError ? (
        <FormHelperText>Enter the email you'd like to create your account with.</FormHelperText>
      ) : (
        <FormErrorMessage>Email is required.</FormErrorMessage>
      )}
      <Flex direction='row'>
        <Flex direction='column' pr={2}>
          <FormLabel>First</FormLabel>
          <Input id={'first'} type='first' value={input.first} onChange={handleInputChange} />
        </Flex>
        <Flex direction='column' pl={2}>
          <FormLabel>Last</FormLabel>
          <Input id={'last'} type='last' value={input.last} onChange={handleInputChange} />
        </Flex>
      </Flex>
    </FormControl>
  );
}

export default SignUp;
