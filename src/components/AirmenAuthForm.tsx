/* eslint-disable @typescript-eslint/no-floating-promises */
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  useToast,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { ChangeEvent, useEffect, useState } from 'react';
import { api } from 'flight-plan/utils/api';
import { useRouter } from 'next/router';

const AirmenAuthForm = () => {
  const router = useRouter();
  const toast = useToast();
  const { data } = useSession();
  const [input, setInput] = useState({
    certNum: '',
    userId: '',
    last: '',
  });
  const pilotCheck = api.pilot.pilotCheck.useMutation();

  const submit = () => {
    try {
      pilotCheck.mutate(input);
      toast({
        title: 'Success',
        description: 'Your certificate has been validated.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      router.push('/');
    } catch (e) {
      toast({
        title: 'Error',
        description: 'There was an error validating your certificate. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      console.log(e);
    }
  };

  useEffect(() => {
    if (data) {
      setInput({ ...input, userId: data.user.id });
    }
  }, [data]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setInput({ ...input, [e.target.id]: e.target.value });

  const isError = input.certNum === '';

  return (
    <Flex direction='column' p={2} justify='center' align='center'>
      <Heading>Pilot Certificate Validation:</Heading>
      <FormControl isInvalid={isError}>
        <FormLabel>Certificate Number:</FormLabel>
        <Input type='text' id='certNum' value={input.certNum} onChange={handleInputChange} />
        {!isError ? (
          <FormHelperText>Enter your pilots certificate number above</FormHelperText>
        ) : (
          <FormErrorMessage>Certificate number is required.</FormErrorMessage>
        )}
        <Flex direction='row'>
          <Input hidden id={'userId'} type='userId' value={data?.user.id} />
          <Flex direction='column' pl={2} w='100%'>
            <FormLabel>Last Name:</FormLabel>
            <Input id={'last'} type='last' value={input.last} onChange={handleInputChange} />
          </Flex>
        </Flex>
        <Button onClick={submit} colorScheme='facebook' type='submit'>
          Submit
        </Button>
      </FormControl>
    </Flex>
  );
};

export default AirmenAuthForm;
