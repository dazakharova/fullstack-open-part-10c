import * as yup from 'yup';
import Text from './Text';
import { View, TextInput, Pressable } from 'react-native';
import { useFormik } from 'formik';
import useSignIn from '../hooks/useSignIn';
import theme from "../theme";
import useAuthStorage from '../hooks/useAuthStorage';
import {useApolloClient} from "@apollo/client";
import {useNavigate} from "react-router-native";

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    maxWidth: 300,
    alignSelf: 'center',
    backgroundColor: theme.backgroundColors.mainBackground,
    borderRadius: 10,
  },
  formInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: theme.backgroundColors.repositoryItemBackground,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    color: theme.colors.textPrimary,
    marginHorizontal: 20,
  },
  submitButton: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 10,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  buttonText: {
    color: theme.colors.appBarText,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
  },
  inputError: {
    borderColor: '#d73a4a',
  },
};

const initialValues = {
  username: '',
  password: '',
}

const validationSchema = yup.object().shape({
  username: yup
      .string()
      .required('Username is required'),
  password: yup
      .string()
      .required('Password is required'),
});

const SignIn = () => {
  const [signIn] = useSignIn();
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      const { data } = await signIn({ username, password });
      const accessToken = data?.authenticate?.accessToken;

      if (!accessToken) {
        throw new Error('No access token received. Sign-in failed.');
      }

      await authStorage.setAccessToken(accessToken);
      await apolloClient.resetStore();

      navigate('/');
    } catch (e) {
      console.log("Authentication failed:", e.message);
      console.log("error: ", e);
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
      <View stye={styles.container}>
        <TextInput
            style={[styles.formInput, formik.errors.username ? styles.inputError : null]}
            placeholder="Username"
            value={formik.values.username}
            onChangeText={formik.handleChange('username')}
            autoCapitalize="none"
        />
        {formik.touched.username && formik.errors.username && (
            <Text style={{ color: '#d73a4a', marginHorizontal: 20 }}>{formik.errors.username}</Text>
        )}
        <TextInput
            style={[styles.formInput, formik.errors.password ? styles.inputError : null]}
            secureTextEntry={true}
            placeholder="Password"
            value={formik.values.password}
            onChangeText={formik.handleChange('password')}
            autoCapitalize="none"
        />
        {formik.touched.password && formik.errors.password && (
            <Text style={{ color: '#d73a4a', marginHorizontal: 20 }}>{formik.errors.password}</Text>
        )}
        <Pressable style={styles.submitButton} onPress={formik.handleSubmit}>
          <Text>Sign in</Text>
        </Pressable>
      </View>
  )
};

export default SignIn;