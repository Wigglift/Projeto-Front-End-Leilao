import { Modal, TouchableWithoutFeedback } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  DrawerOverlay,
  DrawerContainer,
  DrawerHeader,
  DrawerTitle,
  CloseButton,
  MenuList,
  MenuItem,
  MenuItemIcon,
  MenuItemText,
  MenuDivider,
} from "./styles";

export default function MenuDrawer({ visible, onClose, onLogout, navigation }) {
  const handleMenuItemPress = (screenName) => {
    onClose();
    if (screenName && navigation) {
      navigation.navigate(screenName);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <DrawerOverlay>
          <TouchableWithoutFeedback>
            <DrawerContainer>
              <DrawerHeader>
                <DrawerTitle>Menu</DrawerTitle>
                <CloseButton onPress={onClose}>
                  <Ionicons name="close" size={28} color="#333" />
                </CloseButton>
              </DrawerHeader>

              <MenuList>
                <MenuItem onPress={() => handleMenuItemPress('Home')}>
                  <MenuItemIcon>
                    <Ionicons name="home-outline" size={24} color="#333" />
                  </MenuItemIcon>
                  <MenuItemText>Início</MenuItemText>
                </MenuItem>

                <MenuItem onPress={() => handleMenuItemPress('Profile')}>
                  <MenuItemIcon>
                    <Ionicons name="person-outline" size={24} color="#333" />
                  </MenuItemIcon>
                  <MenuItemText>Meu Perfil</MenuItemText>
                </MenuItem>

                <MenuItem onPress={() => handleMenuItemPress('AuctionListForLots')}>
                  <MenuItemIcon>
                    <Ionicons name="cube-outline" size={24} color="#333" />
                  </MenuItemIcon>
                  <MenuItemText>Lotes</MenuItemText>
                </MenuItem>

                <MenuItem onPress={() => handleMenuItemPress()}>
                  <MenuItemIcon>
                    <Ionicons name="hammer-outline" size={24} color="#333" />
                  </MenuItemIcon>
                  <MenuItemText>Meus Lances</MenuItemText>
                </MenuItem>

                <MenuItem onPress={() => handleMenuItemPress()}>
                  <MenuItemIcon>
                    <Ionicons name="heart-outline" size={24} color="#333" />
                  </MenuItemIcon>
                  <MenuItemText>Favoritos</MenuItemText>
                </MenuItem>

                <MenuItem onPress={() => handleMenuItemPress()}>
                  <MenuItemIcon>
                    <Ionicons name="settings-outline" size={24} color="#333" />
                  </MenuItemIcon>
                  <MenuItemText>Configurações</MenuItemText>
                </MenuItem>

                <MenuDivider />

                <MenuItem 
                  onPress={() => {
                    onLogout();
                  }}
                >
                  <MenuItemIcon>
                    <Ionicons name="log-out-outline" size={24} color="#ff6b35" />
                  </MenuItemIcon>
                  <MenuItemText style={{ color: "#ff6b35" }}>Sair</MenuItemText>
                </MenuItem>
              </MenuList>
            </DrawerContainer>
          </TouchableWithoutFeedback>
        </DrawerOverlay>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
