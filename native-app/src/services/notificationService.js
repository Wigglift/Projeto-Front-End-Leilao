import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const notificationService = {
  async requestPermissions() {
    const { status } = await Notifications.requestPermissionsAsync();
    return status === "granted";
  },

  async sendWelcomeNotification(username) {
    try {
      const granted = await this.requestPermissions();
      if (!granted) return;

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Bem-vindo ao BidLive! 👋",
          body: `Olá, ${username}! Boas-vindas de volta ao seu app de leilões.`,
        },
        trigger: null,
      });
    } catch (error) {
      console.error("Erro ao enviar notificação de boas-vindas:", error);
    }
  },

  async sendPhotoUpdatedNotification() {
    try {
      const granted = await this.requestPermissions();
      if (!granted) return;

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Foto de perfil atualizada! 📸",
          body: "Sua foto de perfil foi atualizada com sucesso.",
        },
        trigger: null,
      });
    } catch (error) {
      console.error("Erro ao enviar notificação de foto:", error);
    }
  },
};

export default notificationService;
