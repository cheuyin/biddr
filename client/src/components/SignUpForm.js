import {
  Heading,
  Input,
  Select,
  FormErrorMessage,
  FormControl,
  FormLabel,
  Button,
  Text,
  Link,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import StatusPopup from './StatusPopup';

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [locations, setLocations] = useState([]);
  const [popupMessage, setpopUpMessage] = useState({});
  const navigate = useNavigate();

  // For the drop-down menu for location, pull from the database for the list of locations.
  useEffect(() => {
    const getLocations = async () => {
      try {
        const response = await axios.get('/auth/locations');
        // Set locations state to a sorted list of all the locations
        setLocations(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    getLocations();
  }, []);

  const onSubmit = async (formData) => {
    setIsSubmitting(true);

    const { username, email, fullName, password, dateOfBirth, location } =
      formData;

    try {
      await axios.post(
        '/auth/signup',
        { username, email, fullName, password, dateOfBirth, location },
        {
          'Content-Type': 'application/json',
        },
      );
      setpopUpMessage({ message: 'Successful sign up!', isError: false });
      setTimeout(() => {
        navigate('/auth/signin');
      }, 3000);
    } catch (error) {
      setpopUpMessage({
        message: error.response?.data?.error || error.message || error,
        isError: true,
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setpopUpMessage({});
      }, 5000);
    }
  };

  return (
    <>
      <Heading as="h1" size="lg" m={4} textAlign={'center'}>
        Sign Up
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.username}>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            id="username"
            {...register('username', {
              required: 'A username is required.',
              minLength: {
                value: 3,
                message: 'A username must be at least 3 characters long.',
              },
              maxLength: {
                value: 32,
                message: 'A username must be at most 32 characters long.',
              },
            })}
          />
          <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.email}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            {...register('email', {
              required: 'Please enter your email.',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Please enter a valid email address.',
              },
              maxLength: {
                value: 256,
                message: 'Your email cannot be more than 256 characters long.',
              },
            })}
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.fullName}>
          <FormLabel htmlFor="fullName">Full Name</FormLabel>
          <Input
            id="fullName"
            {...register('fullName', {
              required: 'Please enter your full name.',
            })}
          />
          <FormErrorMessage>{errors.fullName?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.password}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            type="password"
            {...register('password', {
              required: 'Please enter a password.',
              minLength: {
                value: 8,
                message: 'Your password must be at least 8 characters long.',
              },
              maxLength: {
                value: 24,
                message:
                  'Your password cannot be more than 24 characters long.',
              },
            })}
          />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.confirmPassword}>
          <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
          <Input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword', {
              required: 'Please confirm your password.',
              validate: (val) => {
                if (watch('password') !== val) {
                  return 'Your passwords do not match.';
                }
              },
            })}
          />
          <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.dateOfBirth}>
          <FormLabel htmlFor="dateOfBirth">Date of Birth</FormLabel>
          <Input
            id="dateOfBirth"
            type="date"
            {...register('dateOfBirth', {
              required: 'Please enter your date of birth.',
            })}
          />
          <FormErrorMessage>{errors.dateOfBirth?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.location}>
          <FormLabel htmlFor="location">Location</FormLabel>
          <Select
            id="location"
            {...register('location', {
              required: 'Please enter your location.',
            })}
            placeholder="Select location"
          >
            {locations.map((location) => (
              <option
                key={location.location + location.ageofmajority}
                value={location.location}
              >
                {location.location}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{errors.location?.message}</FormErrorMessage>
        </FormControl>

        <Text my={3}>
          Already have an account?{' '}
          <Link color="blue.400" href="/auth/signin">
            Sign In
          </Link>
        </Text>

        <Button
          isLoading={isSubmitting}
          loadingText="Submitting"
          spinnerPlacement="start"
          width="100%"
          mt={4}
          type="submit"
        >
          Submit
        </Button>
      </form>
      {popupMessage.message && (
        <StatusPopup
          message={popupMessage.message}
          isError={popupMessage.isError}
        />
      )}
    </>
  );
};

export default SignUpForm;
