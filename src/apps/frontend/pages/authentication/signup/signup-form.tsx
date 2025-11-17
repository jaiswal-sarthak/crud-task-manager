import React from 'react';
import { Link } from 'react-router-dom';

import {
  Button,
  Flex,
  FormControl,
  Input,
  PasswordInput,
  VerticalStackLayout,
} from 'frontend/components';
import { CustomLayout } from 'frontend/components/layouts/custom-layout.component';
import { LayoutType } from 'frontend/components/layouts/layout-config';
import routes from 'frontend/constants/routes';
import useSignupForm from 'frontend/pages/authentication/signup/signup-form.hook';
import { AsyncError } from 'frontend/types';
import { ButtonKind, ButtonType } from 'frontend/types/button';

type SignupFields =
  | 'firstName'
  | 'lastName'
  | 'username'
  | 'password'
  | 'retypePassword';

interface SignupFormProps {
  onError: (error: AsyncError) => void;
  onSuccess: () => void;
  layoutType?: LayoutType;
}

const SignupForm: React.FC<SignupFormProps> = ({
  onError,
  onSuccess,
  layoutType = LayoutType.Default,
}) => {
  const { formik, isSignupLoading } = useSignupForm({ onSuccess, onError });

  const getFormikError = (field: SignupFields) =>
    formik.touched[field] ? formik.errors[field] : '';

  return (
    <CustomLayout layoutType={layoutType}>
      <form onSubmit={formik.handleSubmit}>
        <VerticalStackLayout gap={5}>
          <Flex gap={6}>
            <div className="w-full">
              <FormControl
                label="First name"
                error={getFormikError('firstName')}
              >
                <Input
                  error={getFormikError('firstName')}
                  data-testid="firstName"
                  disabled={isSignupLoading}
                  name="firstName"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  placeholder="Enter your first name"
                  value={formik.values.firstName}
                />
              </FormControl>
            </div>
            <div className="w-full">
              <FormControl label="Last name" error={getFormikError('lastName')}>
                <Input
                  error={getFormikError('lastName')}
                  data-testid="lastName"
                  disabled={isSignupLoading}
                  name="lastName"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  placeholder="Enter your last name"
                  value={formik.values.lastName}
                />
              </FormControl>
            </div>
          </Flex>
          <FormControl label="Email" error={getFormikError('username')}>
            <Input
              data-testid="username"
              disabled={isSignupLoading}
              endEnhancer={
                <svg className="fill-current opacity-50" width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
                  <g opacity="0.5">
                    <path d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z" fill="currentColor"/>
                  </g>
                </svg>
              }
              error={getFormikError('username')}
              name="username"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Enter your email"
              value={formik.values.username}
            />
          </FormControl>
          <FormControl label="Password" error={getFormikError('password')}>
            <PasswordInput
              error={getFormikError('password')}
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Enter your password"
              value={formik.values.password}
            />
          </FormControl>
          <FormControl
            label="Re-type Password"
            error={getFormikError('retypePassword')}
          >
            <PasswordInput
              error={getFormikError('retypePassword')}
              name="retypePassword"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Re-enter the password"
              value={formik.values.retypePassword}
            />
          </FormControl>
          <Button
            type={ButtonType.SUBMIT}
            kind={ButtonKind.PRIMARY}
            isLoading={isSignupLoading}
          >
            Sign Up
          </Button>
          <p className="self-center font-medium">
            Already have an account?{' '}
            <Link to={routes.LOGIN} className="text-primary">
              Log in
            </Link>
          </p>
        </VerticalStackLayout>
      </form>
    </CustomLayout>
  );
};

export default SignupForm;
