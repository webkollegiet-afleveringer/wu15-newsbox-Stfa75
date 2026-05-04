import useFetchData from "../../Hooks/useFetchData"
import { useState } from "react";
import Down from "../../img/featherdown.png"
import Logo from "../../img/logo.png"
import "./health.scss"


export default function Health() {
    const apiKey = "wtLUgKBONr2XcZEobnbpK5fhDFcH5GshjykRqAsuOtFW9rSq"
    const { data, pending, error } = useFetchData(`https://api.nytimes.com/svc/news/v3/content/all/health.json?api-key=${apiKey}`)
    console.log(data);

    //Opretter en state der styrer hvornår listen er åben 
    const [openList, setOpenList] = useState(false); //når vi snakker Når vi snakker om noget, der kun kan have to tilstande bruges Boolan
    //er det bedst at bruge boolan - false betyder at listen ikke er åben
    const getImg = (article) => article.multimedia?.[0]?.url || Logo;
    //Funktion der skifter mellem åben/lukket når man klikker
    const toggleDropDown = () => {
        setOpenList(!openList); //husk pilen skal også skifte
    }
    const limitWords = (text) => { //her deler jeg headline op 
        if (!text) return "";
        const words = text.split(" ");
        if (words.length <= 4) return text;
        return words.slice(0, 10).join(" ") + "...";
    }


    return (
        <>  <article className="HealthSection">
            <section className="Overskrift">
                <img src={Logo} alt="a logo" />
                <h3>Health</h3>
            </section>
            <section className="Pil" onClick={toggleDropDown} style={{ cursor: "pointer" }}>
                <img src={Down} alt="arrow down" />
            </section>
        </article>

            {openList && data?.results?.length > 0 && (
                <section className="ArticleList">
                    {data.results.slice(0, 20).map((article, index) => (
                        <a href={article.url} target="_blank" rel="noopener noreferrer">

                            <div key={index} className="ArticleItem">
                                <img src={getImg(article)} alt={article.title} className="ArticleImage" />
                                <div className="text">
                                    <h4>{article.title}</h4>
                                    <p>{limitWords(article.abstract)}</p>
                                </div>

                            </div></a>
                    ))}
                </section>
            )}
        </>
    )
}
