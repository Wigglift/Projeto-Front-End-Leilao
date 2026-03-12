import Footer from "../../components/footer/Footer";
import LogedInHeader from "../../components/header/logedInHeader/LogedInHeader";

export default function DefaultTemplate({ children }) {
    return (
        <div>
            <LogedInHeader/>
                {children}
            <Footer />
        </div>
    );
}