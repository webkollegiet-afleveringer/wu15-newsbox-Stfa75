import Logo from "../../img/logo.png"
import "./header.scss"


export default function Header() {


    return (
        <>
            <section className="Header">
                <img src={Logo} alt="arrow down" />
                <h3>Newsify</h3>
            </section>
        </>
    )
}