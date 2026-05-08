
import Home from "../../img/home.png"
import Bookmark from "../../img/bookmark.png"
import Popular from "../../img/star.png"
import Settings from "../../img/settings.png"
import "./footer.scss"
import { NavLink } from "react-router-dom"

export default function Navbar() {

    return (
        <>
            <article className="All">
                <article className="Footer">
                    <NavLink title="Home" to="/">
                        <div>
                            <img src={Home} alt="homebutton" className="image" />
                            <p>Home</p>
                        </div>
                    </NavLink>
                    <NavLink title="Archive" to="/Archive">
                        <div>
                            <img src={Bookmark} alt="archivebutton" className="image" />
                            <p>Archive</p>
                        </div>
                    </NavLink>
                    <NavLink title="Popular" to="/Popular">
                        <div>
                            <img src={Popular} alt="popularbutton" className="image" />
                            <p>Popular</p>
                        </div>
                    </NavLink>
                    <NavLink title="Settings" to="/Settings">
                        <div>
                            <img src={Settings} alt="settings" className="image" />
                            <p>Settings</p>
                        </div>
                    </NavLink>
                </article>
                <div className="Line">

                </div>
            </article>
        </>
    )
}