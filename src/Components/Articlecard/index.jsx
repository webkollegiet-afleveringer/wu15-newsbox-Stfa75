import { useRef, useState } from "react";
import Arkivbillede from "../../img/arkivbillede.png" 
import "./articleCard.scss";

export default function ArticleCard({ article, getImg, onSave = () => {} }) {
    const articleRef = useRef();
    const [startX, setStartX] = useState(0);

    function handleTouchStart(event) {
        setStartX(event.touches[0].screenX);
        articleRef.current.style.transition = "none";
    }

    function handleTouchEnd(event) {
        const endX = event.changedTouches[0].screenX;
        const distance = startX - endX;

        articleRef.current.style.transition = "transform 0.3s ease";

        // Swipe til venstre (viser gem-knap)
        if (distance > 50) {
            articleRef.current.style.transform = `translateX(-80px)`;
        } else {
            articleRef.current.style.transform = `translateX(0px)`;
        }
    }

    return (
        <div className="ArticleWrapper">
            {/* GRØNT LAG TIL AT GEMME */}
            <div className="green-action-layer" onClick={() => onSave(article)}>
                <img src={Arkivbillede} alt="gem" />
            </div>

            <article
                ref={articleRef}
                className="ArticleItem"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                 <a href={article.url} target="_blank" rel="noopener noreferrer" className="ArchiveLink">
                <img src={getImg ? getImg(article) : ""} alt={article.title} className="ArticleImage"
                 
                />
                <div className="text">
                    <h4 className="Article_heading">{article.title}</h4>
                    <p className="Article_abstract">{article.abstract}</p>
                </div>
                </a>               

            </article>
        </div>
    );
}