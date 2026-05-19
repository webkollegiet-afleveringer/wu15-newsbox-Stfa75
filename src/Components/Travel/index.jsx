import useFetchCachedData from "../../Hooks/Fetch-Cached-Data"; 
import { useState } from "react";
import Down from "../../img/featherdown.png";
import Logo from "../../img/logo.png";
import "./travel.scss";
import ArticleCard from "../Articlecard";

const getImg = (article) => {
    // 1. Tjek for Home-billeder (Top Stories)
    if (article.multimedia?.[0]?.url) {
        return article.multimedia[0].url;
    }

    // 2. Tjek for Popular-billeder (Most Popular)
    if (article.media?.[0]?.["media-metadata"]?.[2]?.url) {
        return article.media[0]["media-metadata"][2].url;
    }

    // 3. Fallback hvis der slet ingen billeder er
    return Logo;
};

export default function Travel({ popularArticles }) { 
    const apiKey = "wtLUgKBONr2XcZEobnbpK5fhDFcH5GshjykRqAsuOtFW9rSq";
    
    const { data, pending, error } = useFetchCachedData(
        "travel_News",
        `https://api.nytimes.com/svc/news/v3/content/all/travel.json?api-key=${apiKey}`
    );
    
    const articlesToRender = popularArticles || data?.results;

    // Styring af dropdown
    const [openList, setOpenList] = useState(false); 

    const toggleDropDown = () => {
        setOpenList(!openList); 
    };

    // Gem-funktion rykket pænt på plads og med opdateret kommentar
    const handleSaveToArchive = (article) => {
        console.log("Gemmer artikel:", article.title);
        const currentArchive = JSON.parse(localStorage.getItem("myArchive")) || [];
        const alreadyExists = currentArchive.some(item => item.url === article.url);

        if (!alreadyExists) {
            // Vi tvinger kategorien "Travel" med ind på objektet
            const articleWithCategory = {
                ...article,
                section: "Travel" 
            };

            const updatedArchive = [...currentArchive, articleWithCategory];
            localStorage.setItem("myArchive", JSON.stringify(updatedArchive));
            alert("Artiklen er nu gemt i dit arkiv!");
        } else {
            alert("Denne artikel ligger allerede i arkivet.");
        }
    };

    return (
        <>  
            <article className="TravelSection">
                <section className="Overskrift">
                    <img src={Logo} alt="a logo" />
                    <h3>Travel</h3>
                </section>
                <section className="Pil" onClick={toggleDropDown} style={{ cursor: "pointer" }}>
                    <img src={Down} alt="arrow down" />
                </section>
            </article>

            {openList && articlesToRender?.length > 0 && (
                <section className="ArticleList">
                    {articlesToRender.slice(0, 20).map((article, index) => (
                        <ArticleCard 
                            key={article.url || index} 
                            article={article} 
                            getImg={getImg} 
                            onSave={handleSaveToArchive}
                        />
                    ))}
                </section>
            )}
        </>
    );
}