import Footer from "../../components/footer/Footer";
import LoggedInHeader from "../../components/header/loggedInHeader/LoggedInHeader";

export default function LoggedInTemplate({ children }) {
  return (
    <div>
      <LoggedInHeader />
      {children}
      <Footer />
    </div>
  );
}
