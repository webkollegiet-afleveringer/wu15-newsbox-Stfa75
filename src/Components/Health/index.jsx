import useFetchData from "../../Hooks/useFetchData"
import fetchCachedData from "../../Hooks/Fetch-Cached-Data"
import { useState } from "react";
import Down from "../../img/featherdown.png"
import Logo from "../../img/logo.png"
import "./health.scss"
import GreenIcon from "../GreenIcon"
import ArticleCard from "../Articlecard";

// export const limitWords = (text) => { //her deler jeg headline op 
//     if (!text) return "";
//     const words = text.split(" ");
//     if (words.length <= 4) return text;
//     return words.slice(0, 5).join(" ") + "...";
// }
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

export default function Health({popularArticles}) {
    const apiKey = "wtLUgKBONr2XcZEobnbpK5fhDFcH5GshjykRqAsuOtFW9rSq"
    const { data, pending, error } = useFetchData(`https://api.nytimes.com/svc/news/v3/content/all/health.json?api-key=${apiKey}`)
    const articlesToRender = popularArticles || data?.results;
    console.log(data);

    //Opretter en state der styrer hvornår listen er åben 
    const [openList, setOpenList] = useState(false); //når vi snakker Når vi snakker om noget, der kun kan have to tilstande bruges Boolan
    //er det bedst at bruge boolan - false betyder at listen ikke er åben

    //Funktion der skifter mellem åben/lukket når man klikker
    const toggleDropDown = () => {
        setOpenList(!openList); //husk pilen skal også skifte
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


   return (
    <>  
        <article className="HealthSection">
            <section className="Overskrift">
                <img src={Logo} alt="a logo" />
                <h3>Health</h3>
            </section>
            {/* Pil-sektionen der styrer din dropdown */}
            <section className="Pil" onClick={toggleDropDown} style={{ cursor: "pointer" }}>
                <img src={Down} alt="arrow down" />
            </section>
        </article>

        {/* Her indlæses listen, når openList er true */}
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
)
}
