import { ActivityIndicator, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../context/AuthContext";
import { colors } from "../theme";
import { SCREEN_NAMES, getScreenOptions } from "./constants";
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
    <Stack.Navigator>
      {isAuthenticated ? (
        <>
          <Stack.Screen 
            name={SCREEN_NAMES.HOME} 
            component={Home} 
            options={getScreenOptions(SCREEN_NAMES.HOME)} 
          />
          <Stack.Screen 
            name={SCREEN_NAMES.PROFILE} 
            component={Profile} 
            options={getScreenOptions(SCREEN_NAMES.PROFILE)} 
          />
          <Stack.Screen 
            name={SCREEN_NAMES.AUCTION_DETAILS} 
            component={AuctionDetails} 
            options={getScreenOptions(SCREEN_NAMES.AUCTION_DETAILS)} 
          />
          <Stack.Screen 
            name={SCREEN_NAMES.AUCTION_LIST_FOR_LOTS} 
            component={AuctionListForLots} 
            options={getScreenOptions(SCREEN_NAMES.AUCTION_LIST_FOR_LOTS)} 
          />
          <Stack.Screen 
            name={SCREEN_NAMES.LOT_LIST} 
            component={LotList} 
            options={getScreenOptions(SCREEN_NAMES.LOT_LIST)} 
          />
          <Stack.Screen 
            name={SCREEN_NAMES.LOT_DETAILS} 
            component={LotDetails} 
            options={getScreenOptions(SCREEN_NAMES.LOT_DETAILS)} 
          />
        </>
      ) : (
        <>
          <Stack.Screen 
            name={SCREEN_NAMES.SPLASH} 
            component={Splash} 
            options={getScreenOptions(SCREEN_NAMES.SPLASH)} 
          />
          <Stack.Screen 
            name={SCREEN_NAMES.WELCOME} 
            component={Welcome} 
            options={getScreenOptions(SCREEN_NAMES.WELCOME)} 
          />
          <Stack.Screen 
            name={SCREEN_NAMES.LOGIN} 
            component={Login} 
            options={getScreenOptions(SCREEN_NAMES.LOGIN)} 
          />
          <Stack.Screen 
            name={SCREEN_NAMES.SIGNUP} 
            component={SignUp} 
            options={getScreenOptions(SCREEN_NAMES.SIGNUP)} 
          />
        </>
      )}
    </Stack.Navigator>
  );
}
