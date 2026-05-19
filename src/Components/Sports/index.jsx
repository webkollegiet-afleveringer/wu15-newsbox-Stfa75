import useFetchCachedData from "../../Hooks/Fetch-Cached-Data"; 
import { useState } from "react";
import Down from "../../img/featherdown.png";
import Logo from "../../img/logo.png";
import "./sports.scss";
import ArticleCard from "../Articlecard";

const getImg = (article) => {
    if (article.multimedia?.[0]?.url) {
        return article.multimedia[0].url;
    }
    if (article.media?.[0]?.["media-metadata"]?.[2]?.url) {
        return article.media[0]["media-metadata"][2].url;
    }
    return Logo;
};

export default function Sports({ popularArticles }) { 
    const apiKey = "wtLUgKBONr2XcZEobnbpK5fhDFcH5GshjykRqAsuOtFW9rSq";
    
    const { data, pending, error } = useFetchCachedData(
        "sports_News",
        `https://api.nytimes.com/svc/news/v3/content/all/sports.json?api-key=${apiKey}`
    );
    
    const articlesToRender = popularArticles || data?.results;

    const [openList, setOpenList] = useState(false); 

    const toggleDropDown = () => {
        setOpenList(!openList); 
    };

    // 🔥 NU KUN EN ENKELT, REN FUNKTION DER GEMMER SOM SPORTS!
    const handleSaveToArchive = (article) => {
        console.log("Gemmer artikel:", article.title);
        const currentArchive = JSON.parse(localStorage.getItem("myArchive")) || [];
        const alreadyExists = currentArchive.some(item => item.url === article.url);

        if (!alreadyExists) {
            const articleWithCategory = {
                ...article,
                section: "Sports" 
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
            <article className="SportsSection">
                <section className="Overskrift">
                    <img src={Logo} alt="a logo" />
                    <h3>Sports</h3>
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