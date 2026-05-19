import React, { useState } from "react";
// Vi importerer hook med det rigtige navn
import useFetchCachedData from "../../Hooks/Fetch-Cached-Data";
import Down from "../../img/featherdown.png";
import Logo from "../../img/logo.png";
import ArticleCard from "../Articlecard"; // Dobbelttjek om 'c' skal være stort i dit filnavn!
import "./business.scss";

const getImg = (article) => {
    if (article.multimedia?.[0]?.url) {
        return article.multimedia[0].url;
    }
    if (article.media?.[0]?.["media-metadata"]?.[2]?.url) {
        return article.media[0]["media-metadata"][2].url;
    }
    return Logo;
};

export default function Business({ popularArticles }) {
    const apiKey = "wtLUgKBONr2XcZEobnbpK5fhDFcH5GshjykRqAsuOtFW9rSq";
    
    // RETTET: Nu kalder vi useFetchCachedData (med 'use' foran!)
    const { data, pending, error } = useFetchCachedData(
        "Business_news",
        `https://api.nytimes.com/svc/news/v3/content/all/business.json?api-key=${apiKey}`
    );

    // Hvis der kommer artikler fra 'Popular', bruger vi dem, ellers bruger vi API-data
    const articlesToRender = popularArticles || data?.results;

    // Styring af dropdown
    const [openList, setOpenList] = useState(false);

    const toggleDropDown = () => {
        setOpenList(!openList);
    };

   const handleSaveToArchive = (article) => {
    console.log("Gemmer artikel:", article.title);
    const currentArchive = JSON.parse(localStorage.getItem("myArchive")) || [];
    const alreadyExists = currentArchive.some(item => item.url === article.url);

    if (!alreadyExists) {
        // Vi tvinger kategorien "Business" med ind på objektet, 
        // så ArchiveView altid kan finde den under det rigtige navn!
        const articleWithCategory = {
            ...article,
            section: "Business" 
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
            <article className="BusinessSection">
                <section className="Overskrift">
                    <img src={Logo} alt="a logo" />
                    <h3>Business</h3>
                </section>
                <section className="Pil" onClick={toggleDropDown} style={{ cursor: "pointer" }}>
                    <img src={Down} alt="arrow down" />
                </section>
            </article>

            {/* Listen vises KUN hvis man klikker på pilen, og der er artikler til stede */}
            {openList && articlesToRender && articlesToRender.length > 0 && (
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