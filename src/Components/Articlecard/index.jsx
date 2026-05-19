import { useRef, useState } from "react";
import Arkivbillede from "../../img/arkivbillede.png";
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

    // 🔥 RETTET: Funktion der stopper linket i at åbne, når du klikker på gem
    const handleSaveClick = (e) => {
        e.preventDefault();  // Stopper linket i at åbne
        e.stopPropagation(); // Stopper klikket i at boble op til artiklen
        onSave(article);     // Affyrer den rigtige gem-funktion fra komponenten
        
        // Smækker kortet på plads igen efter man har trykket gem
        if (articleRef.current) {
            articleRef.current.style.transform = `translateX(0px)`;
        }
    };

    return (
        <div className="ArticleWrapper">
            <article
                ref={articleRef}
                className="ArticleItem"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="ArchiveLink">
                    <img 
                        src={getImg ? getImg(article) : ""} 
                        alt={article.title} 
                        className="ArticleImage"
                    />
                    <div className="text">
                        <h4 className="Article_heading">{article.title}</h4>
                        <p className="Article_abstract">{article.abstract}</p>
                    </div>
                </a>               

                {/* 🔥 FLYTTE RETTET: Det grønne lag ligger nu INDENI artiklen, 
                    så det følger med i swipet og rent faktisk kan klikkes på! */}
                <div className="green-action-layer" onClick={handleSaveClick}>
                    <img src={Arkivbillede} alt="gem" />
                </div>
            </article>
        </div>
    );
}