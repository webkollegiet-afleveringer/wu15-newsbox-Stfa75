import { useState, useEffect } from "react";
import ArkivKort from "../Components/Archivecard"; 
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io"; 
import Logo from "../img/logo.png"
import "./ArchiveView.scss";

export default function ArchiveView() {
    const [savedArticles, setSavedArticles] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("myArchive")) || [];
        setSavedArticles(data);
    }, []);

    // Finder unikke kategorier
    const categories = [...new Set(savedArticles.map(article => article.section || "Diverse"))];

    const toggleCategory = (category) => {
        setActiveCategory(activeCategory === category ? null : category);
    };

    const handleDelete = (url) => {
        const updatedList = savedArticles.filter(article => article.url !== url);
        setSavedArticles(updatedList);
        localStorage.setItem("myArchive", JSON.stringify(updatedList));
    };

    // Opdateret getImg der håndterer både Home og Popular formater
    const getImg = (article) => {
        // 1. Tjek for Top Stories format
        if (article.multimedia?.[0]?.url) {
            const url = article.multimedia[0].url;
            return url.startsWith("http") ? url : `https://www.nytimes.com/${url}`;
        }
        
        // 2. Tjek for Most Popular format (det vi lige har fixet i de andre filer)
        if (article.media?.[0]?.["media-metadata"]?.[2]?.url) {
            return article.media[0]["media-metadata"][2].url;
        }

        return Logo; // Fallback til logo
    };

    return (
        <main className="ArchivePage">
            <h1>Arkiverede artikler</h1>

            <div className="ArchiveContainer">
                {savedArticles.length > 0 ? (
                    categories.map((category) => (
                        <section key={category} className="ArchiveCategoryGroup">
                            
                            {/* KATEGORI-HEADER (Nu med Logo og Pile-logik) */}
                            <button 
                                className="CategoryHeader" 
                                onClick={() => toggleCategory(category)}
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <img src={Logo} alt="logo" style={{ width: '25px', height: '25px' }} />
                                    <span>{category}</span>
                                </div>
                                
                                <div className="Pil">
                                    {activeCategory === category ? 
                                        <IoIosArrowDown style={{ fontSize: '1.5rem' }} /> : 
                                        <IoIosArrowForward style={{ fontSize: '1.5rem' }} />
                                    }
                                </div>
                            </button>

                            {/* LISTEN AF KORT */}
                            {activeCategory === category && (
                                <div className="CategoryList">
                                    {savedArticles
                                        .filter(article => (article.section || "Diverse") === category)
                                        .map((article, index) => (
                                            <ArkivKort 
                                                key={article.url || index} 
                                                article={article} 
                                                getImg={getImg}
                                                onDelete={handleDelete} 
                                            />
                                        ))
                                    }
                                </div>
                            )}
                        </section>
                    ))
                ) : (
                    <p className="empty-msg">Du har ikke gemt nogen artikler endnu.</p>
                )}
            </div>
        </main>
    );
}