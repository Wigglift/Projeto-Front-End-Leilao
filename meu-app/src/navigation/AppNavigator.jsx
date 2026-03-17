import { ActivityIndicator, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../context/AuthContext";
import { colors } from "../theme";
import Splash from "../screens/Splash";
import Welcome from "../screens/Welcome";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import AuctionDetails from "../screens/AuctionDetails";
import AuctionListForLots from "../screens/AuctionListForLots";
import LotList from "../screens/LotList";
import LotDetails from "../screens/LotDetails";

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
  gestureEnabled: true,
  fullScreenGestureEnabled: true,
  animation: "slide_from_right",
};

export default function AppNavigator() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      {isAuthenticated ? (
        <>
          <Stack.Screen name="Home" component={Home} options={{ gestureEnabled: false }} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="AuctionDetails" component={AuctionDetails} />
          <Stack.Screen name="AuctionListForLots" component={AuctionListForLots} />
          <Stack.Screen name="LotList" component={LotList} />
          <Stack.Screen name="LotDetails" component={LotDetails} />
        </>
      ) : (
        <>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </>
      )}
    </Stack.Navigator>
  );
}
