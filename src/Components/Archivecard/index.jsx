import "./arkiv.scss"
import { useRef, useState } from "react"
import TrashIcon from "../../img/trashIcon.png" // Husk at have et slette-ikon


export default function ArchiveCard({ article, getImg, onDelete }) {
    const articleRef = useRef(); 
    const [diff, seteDiff] = useState(0);

    function handleTouchStart(event) {
        seteDiff(event.touches[0].screenX);
        articleRef.current.style.transition = "none";
    }

    function handleTouchEnd(event) {
        const endX = event.changedTouches[0].screenX;
        const distance = diff - endX;

        articleRef.current.style.transition = "transform 0.3s ease"; 

        if (distance > 50) {
            articleRef.current.style.transform = `translateX(-80px)`;
        } else {
            articleRef.current.style.transform = `translateX(0px)`;
        }
    }

    return (
        <div className="ArchiveWrapper">
            
            {/* RØDT LAG TIL SLETNING */}
            <div className="red-action-layer" onClick={() => onDelete(article.url)}>
                <img src={TrashIcon} alt="slet" />
            </div>
            
           <article 
                ref={articleRef} 
                className="ArchiveItem" 
                onTouchStart={handleTouchStart} 
                onTouchEnd={handleTouchEnd}
            >
                {/* Vi gør indholdet klikbart her */}
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="ArchiveLink">
                    <img src={getImg ? getImg(article) : ""} alt={article.title} className="ArchiveImage" />
                    
                    <div className="text">
                        {/* Her viser vi kategorien (section) */}
                        <span className="Archive_category">{article.section}</span>
                        <h4 className="Archive_heading">{article.title}</h4>
                        <p className="Archive_abstract">{article.abstract}</p>
                    </div>
                </a>                
            </article>

        </div>
    );
}