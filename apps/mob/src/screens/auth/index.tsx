import { AuthNavigation } from '../../types/navigation';

export type NavProps = {
    navigation: AuthNavigation;
  };

export { default as HomeScreen } from './HomeScreen';
export { default as LoginScreen } from './LoginScreen';
export { default as SignupScreen } from './SignupScreen';
export { default as ForgotPasswordScreen } from './ForgotPasswordScreen';
export { default as Dashboard } from './Dashboard';

