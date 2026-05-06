import ArchiveIcon from "../../img/bookmark.png"
import Green from "../../img/Green.png"
import "./GreenIcon.scss"

export default function greenBox() {

    return (

        <article className="icon-wrapper">
            <img src={Green} alt="background" className="Green" />
            <img src={ArchiveIcon} alt="bookmark" className="bookmark" />
        </article >


    )
}