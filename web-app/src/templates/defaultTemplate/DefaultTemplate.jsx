import Footer from "../../components/footer/Footer";
import Header from "../../components/header/defaultHeader/Header";

export default function DefaultTemplate({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
