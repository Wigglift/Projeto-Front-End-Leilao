import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";

export default function DefaultTemplate({ children }) {
    return (
        <div>
            <Header/>
            {children}
            <Footer />
        </div>
    );
}