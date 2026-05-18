import useFetchCachedData from "../../Hooks/Fetch-Cached-Data";
import fetchCachedData from "../../Hooks/Fetch-Cached-Data"
import { useState } from "react";
import Down from "../../img/featherdown.png"
import Logo from "../../img/logo.png"
import "./business.scss"
import ArticleCard from "../Articlecard"

const getImg = (article) => {
    // 1. Tjek for Home-billeder (Top Stories)
    if (article.multimedia?.[0]?.url) {
        return article.multimedia[0].url;
    }

    // 2. Tjek for Popular-billeder (Most Popular)
    // Vi leder efter den største version (index 2) inde i media-metadata
    if (article.media?.[0]?.["media-metadata"]?.[2]?.url) {
        return article.media[0]["media-metadata"][2].url;
    }

    // 3. Fallback hvis der slet ingen billeder er
    return Logo;
};

export default function Business({ popularArticles }) {
    const apiKey = "wtLUgKBONr2XcZEobnbpK5fhDFcH5GshjykRqAsuOtFW9rSq";
    const { data, pending, error } = fetchCachedData(
        "Business_news",
        `https://api.nytimes.com/svc/news/v3/content/all/business.json?api-key=${apiKey}`);
    const articlesToRender = popularArticles || data?.results;


    const [openList, setOpenList] = useState(false);

    const toggleDropDown = () => {
        setOpenList(!openList);
    }

    const handleSaveToArchive = (article) => {
        console.log("Gemmer artikel:", article.title);

        const currentArchive = JSON.parse(localStorage.getItem("myArchive")) || [];
        const alreadyExists = currentArchive.some(item => item.url === article.url);

        if (!alreadyExists) {
            const updatedArchive = [...currentArchive, article];
            localStorage.setItem("myArchive", JSON.stringify(updatedArchive));
            alert("Artiklen er nu gemt i dit arkiv!");
        } else {
            alert("Denne artikel ligger allerede i arkivet.");
        }
    };
    console.log("Business modtager disse artikler:", popularArticles);

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

            {openList && articlesToRender?.length > 0 && (
                <section className="ArticleList">
                    {articlesToRender.slice(0, 20).map((article, index) => (
                        <ArticleCard
                            key={article.url}
                            article={article}
                            getImg={getImg}
                            onSave={() => handleSaveToArchive(article)}
                        />
                    ))}
                </section>
            )}
        </>
    );
}