import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
  Modal,
  Button,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { usePushNotifications, useVacation } from '../hooks/useSwitch';
import ThemeContext from '../hooks/ThemeContext';
import { auth } from '../configuration/firebaseConfig';
import { Picker } from '@react-native-picker/picker';
import CountDown from 'react-native-countdown-component';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';


const SettingScreen = () => {
	const { isDarkMode, toggleTheme } = React.useContext(ThemeContext);
	const styles = createThemedStyles(isDarkMode);
	const [isVacation, toggleVacation] = useVacation(false);
	const [isPushNotifications, togglePushNotifications] = usePushNotifications(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [days, setDays] = useState(0);
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [countdownVisible, setCountdownVisible] = useState(false);
	const [totalDuration, setTotalDuration] = useState(0);
	const navigation = useNavigation();
  
	const handleVacationModeToggle = () => {
	  if (!isVacation) {
		setModalVisible(true);
	  } else {
		toggleVacation();
	  }
	};
  
	const handleContinue = () => {
		toggleVacation();
		setModalVisible(false);
		// Calculate total duration in seconds
		const durationInSeconds = days * 86400 + hours * 3600 + minutes * 60;
		setTotalDuration(durationInSeconds);
		setCountdownVisible(true);
	  };
  
	const handleCancel = () => {
	  setModalVisible(false);
	};
  
	function logOut() {
	  console.log(auth.currentUser.email + " logged out...");
	  auth.signOut();
	}
  
	return (
  <ScrollView>
	  <View style={styles.container}>
		<Image
		  style={styles.image}
		  source={require("./images/default-profile.png")}
		/>
		<View style={styles.editIconContainer}>
		  <FontAwesome name="pencil" size={20} color="white" />
		</View>
  
		<Text style={styles.welcome}>
		  Welcome, <Text style={styles.user}>User</Text>
		</Text>
  
		{[
		  ["Dark Mode", isDarkMode, toggleTheme],
		  ["Vacation Mode", isVacation, toggleVacation],
		  ["Push Notifications", isPushNotifications, togglePushNotifications],
		].map(([label, value, toggle]) => (
		  <View key={label} style={styles.notificationContainer}>
			<Text style={styles.notificationText}>{label}</Text>
			<Switch
			  trackColor={{ false: "#767577", true: "#013220" }}
			  thumbColor={value ? "#f4f3f4" : "#f4f3f4"}
			  ios_backgroundColor="#3e3e3e"
			  onValueChange={handleVacationModeToggle} 
			  value={value}
			/>
		  </View>
   
		))}
  
		<TouchableOpacity style={styles.logout}>
		  <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
			LOG OUT
		  </Text>
		</TouchableOpacity>
  
		<Text style={{ marginTop: 20, marginBottom: 0, fontSize: 10 }}>
		  POWERED BY
		</Text>
		<Image
		  style={{ width: 120, height: 200, marginTop: -65 }}
		  resizeMode="contain"
		  source={styles.logoImage.source}
		/>
	  </View>
	  <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Set Vacation Duration</Text>
          <View style={styles.pickersContainer}>
            <Picker
              selectedValue={days}
              style={styles.picker}
              onValueChange={(itemValue) => setDays(itemValue)}>
              {Array.from({ length: 101 }, (_, i) => (
                <Picker.Item key={i} label={`${i} `} value={i} />
              ))}
            </Picker>
            <Picker
              selectedValue={hours}
              style={styles.picker}
              onValueChange={(itemValue) => setHours(itemValue)}>
              {Array.from({ length: 23 }, (_, i) => (
                <Picker.Item key={i} label={`${i} `} value={i} />
              ))}
            </Picker>
            <Picker
              selectedValue={minutes}
              style={styles.picker}
              onValueChange={(itemValue) => setMinutes(itemValue)}>
              {Array.from({ length: 59 }, (_, i) => (
                <Picker.Item key={i} label={`${i} `} value={i} />
              ))}
            </Picker>
          </View>
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
	  <Modal
        animationType="slide"
        transparent={false}
        visible={countdownVisible}
        onRequestClose={() => setCountdownVisible(false)}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Countdown Timer</Text>
          <CountDown
            until={totalDuration}
            timetoShow={('H', 'M', 'S')}
            onFinish={() => {
              setCountdownVisible(false);
			  navigation.navigate('Home'); // show home page
            }}
            onPress={() => {}}
            size={20}
            style={styles.countdown}
          />
        </View>
      </Modal>
  </ScrollView>
  );
};

	  
	
	export default SettingScreen;


	const createThemedStyles = (isDarkMode) => {
		const logoImage = isDarkMode
		  ? require("./images/RealLogoWhite.png")
		  : require("./images/RealLogo.png");
	  
		return StyleSheet.create({
		  container: {
			flex: 1,
			alignItems: "center",
			backgroundColor: isDarkMode ? "#000" : "#fff",
		  },
		  image: {
			width: "34%",
			height: "21%",
			borderRadius: 70,
			marginTop: 35,
		  },
		  editIconContainer: {
			backgroundColor: "#013220",
			padding: 8,
			borderRadius: 50,
			marginTop: -20,
		  },
		  logout: {
			width: "70%",
			height: 50,
			backgroundColor: "#013220",
			justifyContent: "center",
			alignItems: "center",
			borderRadius: 20,
			marginBottom: 5,
			marginTop: 25,
		  },
		  notificationContainer: {
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
			width: "100%",
			marginTop: 25,
			paddingHorizontal: 70,
		  },
		  notificationText: {
			fontSize: 18,
			fontWeight: "bold",
			color: isDarkMode ? "#fff" : "#000",
		  },
		  logoImage: {
			width: 120,
			height: 200,
			marginTop: -65,
			source: logoImage,
		  },
		  welcome:{
			fontSize: 20, 
			marginTop: 20,
			color: isDarkMode ? "#fff" : "#000",
		  },
		  user:{
			 fontWeight: "bold",
			 color: isDarkMode ? "#fff" : "#000",
		  },
	
		  modalContainer: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: isDarkMode ? '#000' : '#fff',
		  },
		  modalTitle: {
			fontSize: 24,
			fontWeight: 'bold',
			marginBottom: 20,
			color: isDarkMode ? '#fff' : '#000',
		  },
		  pickersContainer: {
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			marginBottom: 20,
		  },
		  picker: {
			width: '33%',
		  },
		  modalButtons: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			width: '80%',
			marginBottom: 20,
		  },
		  continueButton: {
			backgroundColor: '#013220',
			paddingVertical: 10,
			paddingHorizontal: 20,
			borderRadius: 5,
		  },
		  cancelButton: {
			backgroundColor: '#999',
			paddingVertical: 10,
			paddingHorizontal: 20,
			borderRadius: 5,
		  },
		  buttonText: {
			color: '#fff',
			fontSize: 16,
			fontWeight: 'bold',
		  },
		  countdown: {
			marginTop: 20,
		  },
		});
	  };
