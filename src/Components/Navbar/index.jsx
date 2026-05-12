
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
                    <NavLink title="Home" to="/" className="Link_active">
                        <div className="Icon">
                            <img src={Home} alt="homebutton" className="image" />
                            <p>Home</p>
                        </div>
                    </NavLink>
                    <NavLink title="Archive" to="/Archive">
                        <div className="Icon">
                            <img src={Bookmark} alt="archivebutton" className="image" />
                            <p>Archive</p>
                        </div>
                    </NavLink>
                    <NavLink title="Popular" to="/Popular">
                        <div className="Icon">
                            <img src={Popular} alt="popularbutton" className="image" />
                            <p>Popular</p>
                        </div>
                    </NavLink>
                    <NavLink title="Settings" to="/Settings">
                        <div className="Icon">
                            <img src={Settings} alt="settings" className="image" />
                            <p>Settings</p>
                        </div>
                    </NavLink>
                </article>
            </article>
        </>
    )
}