import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPasscode, setConfirmPasscode] = useState("");
  const [emailError, setEmailError] = useState("");

  const registerButton = () => {
    console.log("Username", username);
    console.log("Email", email);
    console.log("Password", password);
    console.log("Confirm Password", confirmPasscode);
    navigation.navigate("Log In"); // navigate to Log In screen
  };

  //making sure that everything is filed and that password matches
  const passwordMatch = password === confirmPasscode;
  //making sure nothing is empty
  const fieldsFilled =
    username.length > 0 && email.length > 0 && password.length > 0 && confirmPasscode.length > 0;

  const signUpDisabled = !passwordMatch || !fieldsFilled;
  //152 working
  const emailRegex = new RegExp('^[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-zA-Z0-9]+$');
  //will throw invalid if email is not valid 
  const handleEmailChange = (text) => {
    setEmail(text);
    if (!emailRegex.test(text)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.content}>
      <Text style={styles.welcome}>You're almost a JYM BRO!</Text>
      <Text style={styles.subheading}>See you in the JYM!</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={handleEmailChange}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPasscode}
          onChangeText={(text) => setConfirmPasscode(text)}
        />
    
        {emailError ? <Text style={styles.errorMessage}>{emailError}</Text> : null}
        {passwordMatch ? null : (
          <Text style={styles.errorMessage}>
            Password mismatch, 5 push ups and try again
          </Text>
        )}

        <TouchableOpacity
          style={[styles.button, signUpDisabled && styles.disabledButton]}
          disabled={signUpDisabled} >
          <Text style={styles.buttonText}>SIGN UP</Text>
        </TouchableOpacity>
        <View View style={styles.footer}>
          <Text>
          By signing up you agree our 
          <Text style={{ color: 'tan' }}> Terms & Condition </Text> 
           and  
          <Text style={{ color: 'tan' }}> Privacy Policy</Text>.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},

	content: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 5,
		backgroundColor: "#fff",
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	
	input: {
		width: "70%",
		height: 50,
		borderWidth: 0,
		borderBottomWidth: 1,
		borderColor: "#ccc",
		paddingVertical: 10,
		paddingHorizontal: 20,
		marginBottom: 18,
		color: "#333",
		fontSize: 16,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		
	},
	button: {
		width: "35%",
		height: 50,
		backgroundColor: "#d2b48c",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 25,
		marginBottom: 15,
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},
	
  welcome: {
		fontSize:25,
    fontWeight: '500',
    fontFamily: 'Helvetica',
    color: '#333',
    textAlign: 'center',
    marginBottom: 5,
    marginTop:0,
    marginRight:30,
	},
  subheading:{
    fontSize:20,
    fontWeight: "200",
    color: '#333',
    textAlign: 'left',
    marginBottom:50,
    marginTop:5,
    marginRight:170,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },

  errorMessage: {
    color: "red",
    fontSize: 16,
    marginTop: 5,
    marginBottom: 10,
  },

  footer: {
    position: 'static',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },

}
);

export default RegisterScreen