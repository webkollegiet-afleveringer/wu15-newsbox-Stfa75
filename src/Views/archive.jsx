import { useState, useEffect } from "react";
import ArchiveCard from "../Components/ArchiveCard";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import Logo from "../img/logo.png";
import "./ArchiveView.scss";

export default function ArchiveView() {
    const [savedArticles, setSavedArticles] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("myArchive")) || [];
        console.log("Artikler hentet fra localStorage:", data);
        setSavedArticles(data);
    }, []);

    // Brugerindstillinger fra Settings
    const showWorld = localStorage.getItem("world") !== "false"; // Ændret navn til showWorld så det matcher filteret
    const showHealth = localStorage.getItem("health") !== "false";
    const showSports = localStorage.getItem("sports") !== "false";
    const showBusiness = localStorage.getItem("business") !== "false";
    const showTravel = localStorage.getItem("travel") !== "false";

    // En hjælpefunktion til at finde kategorinavnet uanset API-format
    const getCategoryName = (article) => {
        const section = article.section || article.section_name || "Diverse";
        return section.charAt(0).toUpperCase() + section.slice(1).toLowerCase();
    };

    // Find unikke kategorier og filtrér ud fra Settings
    const categories = [...new Set(savedArticles.map(article => getCategoryName(article)))];


    const toggleCategory = (category) => {
        setActiveCategory(activeCategory === category ? null : category);
    };

    const handleDelete = (url) => {
        const updatedList = savedArticles.filter(article => article.url !== url);
        setSavedArticles(updatedList);
        localStorage.setItem("myArchive", JSON.stringify(updatedList));
    };

    const getImg = (article) => {
        if (article.multimedia?.[0]?.url) {
            const url = article.multimedia[0].url;
            return url.startsWith("http") ? url : `https://www.nytimes.com/${url}`;
        }
        if (article.media?.[0]?.["media-metadata"]?.[2]?.url) {
            return article.media[0]["media-metadata"][2].url;
        }
        return Logo;
    };

    return (
        <main className="ArchivePage">
            <h2 className="Overskrift2">Arkiverede artikler</h2>

            {/* Vi genbruger din eksisterende ArchiveContainer-klasse fra din SCSS */}
            <div className="ArchiveContainer">
                {savedArticles.length > 0 ? (
                    /* Vi laver en stor liste med alle de rigtige komponenter */
                    <div className="ArticleList">
                        {savedArticles.map((article, index) => (
                            <ArchiveCard
                                key={article.url || index}
                                article={article}
                                getImg={getImg}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="empty-msg">Du har ikke gemt nogen artikler endnu.</p>
                )}
            </div>
        </main>
    );
}