import { useEffect } from "react";
import { StatusBar } from "react-native";
import Logo from "../../components/Logo";
import { colors } from "../../theme";
import { useAuth } from "../../context/AuthContext";
import { Container } from "./styles";

export default function Splash({ navigation }) {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        navigation.reset({ index: 0, routes: [{ name: "Home" }] });
      } else {
        navigation.navigate("Welcome");
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation, isAuthenticated]);

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <Logo size={48} />
    </Container>
  );
}
