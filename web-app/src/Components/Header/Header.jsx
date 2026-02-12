import LoginButton from "../LoginButton/LoginButton"
import TopMenu from "../Menu/Top/TopMenu"
import styles from "./Header.module.scss"
import logo from "../../Assets/Images/bidlive_logo.svg" 

export default function Header(){
    return (
    <header className={styles.main}>
        <div className={styles.header_container}>
            <div>
                <image>
                    <a href="">
                        <img src={logo} alt="" />
                    </a>
                </image>
            </div>
            <TopMenu/>
            <LoginButton/>
        </div>
    </header>
    )
}