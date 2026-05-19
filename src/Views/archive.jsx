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
        <main className="ArchivePage" style={{ padding: "20px" }}>
            <h2 className="Overskrift2">Arkiverede artikler (RÅ TEST-VISNING)</h2>
            
            <div style={{ background: "#f0f0f0", padding: "10px", marginBottom: "20px", color: "black" }}>
                <p>Antal artikler i state: <strong>{savedArticles.length}</strong></p>
                <p>Fundne kategorier: <strong>{JSON.stringify(categories)}</strong></p>
            </div>

            <div className="CategoryList" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {savedArticles.length > 0 ? (
                    savedArticles.map((article, index) => (
                        <div key={article.url || index} style={{ border: "2px solid red", padding: "15px", background: "#fff", color: "black" }}>
                            <h3>{article.title || "INGEN TITEL"}</h3>
                            <p>Section i data: <strong style={{ color: "blue" }}>{article.section || "Ikke defineret"}</strong></p>
                            <p>Section_name i data: <strong style={{ color: "green" }}>{article.section_name || "Ikke defineret"}</strong></p>
                            <button onClick={() => handleDelete(article.url)} style={{ background: "red", color: "white", padding: "5px 10px", border: "none", cursor: "pointer" }}>
                                Slet denne
                            </button>
                        </div>
                    ))
                ) : (
                    <p style={{ color: "red", fontSize: "20px" }}>Der er fuldstændig tomt i savedArticles state!</p>
                )}
            </div>
        </main>
    );

}