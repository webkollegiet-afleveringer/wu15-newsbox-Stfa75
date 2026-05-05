import ArchiveIcon from "../../img/bookmark.png"
import Green from"../../img/Green.png"
import "./GreenIcon.scss"

export default function greenBox(){

    return(

    <article>
        <div>
          <img src={ArchiveIcon} alt="bookmark" className="bookmark" />
          <img src={Green} alt="A green background" className="Green" />  
        </div>
    </article>


    ) 
}