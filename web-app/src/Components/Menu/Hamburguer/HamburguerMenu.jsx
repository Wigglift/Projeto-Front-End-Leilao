import LoginButton from "../../LoginButton/LoginButton"
import styles from "./HamburguerMenu.module.scss"

export default  function TopMenu(){
    return(
       <nav>
        <ul className={styles.items}>
            <li><a href="">Home</a></li>
            <li><a href="">Serviços</a></li>
            <li><a href="">Vantagens</a></li>
            <li><a href="">Sobre</a></li>
        </ul>
        <LoginButton/>
       </nav> 
    )
}