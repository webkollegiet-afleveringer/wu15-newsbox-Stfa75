
import Home from "../../img/home.png"
import Bookmark from "../../img/bookmark.png"
import Popular from "../../img/star.png"
import Settings from "../../img/settings.png"
import "./footer.scss"

export default function Footer() {

    return (
        <>
            <article className="All">
                <article className="Footer">
                    <div>
                        <img src={Home} alt="homebutton" className="image" />
                        <p>Home</p>
                    </div>
                    <div>
                        <img src={Bookmark} alt="archivebutton" className="image" />
                        <p>Archive</p>
                    </div>
                    <div>
                        <img src={Popular} alt="popularbutton" className="image" />
                        <p>Popular</p>
                    </div>
                    <div>
                        <img src={Settings} alt="settings" className="image" />
                        <p>Settings</p>
                    </div>
                </article>
                <div className="Line">

                </div>
            </article>
        </>
    )
}