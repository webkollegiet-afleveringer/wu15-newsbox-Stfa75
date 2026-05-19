import useFetchCachedData from "../../Hooks/Fetch-Cached-Data";
import { useState } from "react";
import Down from "../../img/featherdown.png";
import Logo from "../../img/logo.png";
import "./europe.scss"; // 💡 Husk at omdøbe din .scss fil til world.scss hvis du vil have stylingen med!
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

export default function World({ popularArticles }) {
    const apiKey = "wtLUgKBONr2XcZEobnbpK5fhDFcH5GshjykRqAsuOtFW9rSq";
    
    // RETTET: Bruger nu world_News cachen og det rigtige world-api link
    const { data, pending, error } = useFetchCachedData(
        "world_News",
        `https://api.nytimes.com/svc/news/v3/content/all/world.json?api-key=${apiKey}`
    );
    
    const articlesToRender = popularArticles || data?.results;

    // Opretter en state der styrer hvornår listen er åben 
    const [openList, setOpenList] = useState(false); 

    // Funktion der skifter mellem åben/lukket når man klikker
    const toggleDropDown = () => {
        setOpenList(!openList); 
    };

    // RETTET: Sat pænt på plads, rette kommentarer og gemmer nu som "World"
    const handleSaveToArchive = (article) => {
        console.log("Gemmer artikel:", article.title);
        const currentArchive = JSON.parse(localStorage.getItem("myArchive")) || [];
        const alreadyExists = currentArchive.some(item => item.url === article.url);

        if (!alreadyExists) {
            // Vi tvinger kategorien "World" med ind på objektet, 
            // så ArchiveView altid kan finde den under det rigtige navn!
            const articleWithCategory = {
                ...article,
                section: "World" 
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
            {/* RETTET: className og h3-overskrift er ændret til World */}
            <article className="WorldSection">
                <section className="Overskrift">
                    <img src={Logo} alt="a logo" />
                    <h3>World</h3>
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