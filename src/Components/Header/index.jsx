import Logo from "../../img/logo.png"
import "./header.scss"


export default function Header() {


    return (
        <>
            <section className="Header">
                <img src={Logo} alt="Logo" />
                <h2>Newsify</h2>
            </section>
        </>
    )
}