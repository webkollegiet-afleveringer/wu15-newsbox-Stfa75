import useFetchCachedData from "../../Hooks/Fetch-Cached-Data";
import { useState } from "react";
import Down from "../../img/featherdown.png"
import Bookmark from "../../img/bookmark.png"
import Green from "../../img/Green.png"
import "./arkiv.scss"




export default function Health() {
    const apiKey = "wtLUgKBONr2XcZEobnbpK5fhDFcH5GshjykRqAsuOtFW9rSq"
    const { data, pending, error } = useFetchData(`https://api.nytimes.com/svc/news/v3/content/all/health.json?api-key=${apiKey}`)
    console.log(data);

    //Opretter en state der styrer hvornår listen er åben 
    const [openList, setOpenList] = useState(true); //når vi snakker Når vi snakker om noget, der kun kan have to tilstande bruges Boolan
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
        <section className="ArticleList">
            {data?.results?.slice(0, 20).map((article, index) => (
                <a href={article.url} target="_blank" rel="noopener noreferrer" key={index} className="ArticleLink">
                    <div className="ArticleItem">

                        <div className="Text">
                            <h5>{article.title}</h5>
                            <p>{limitWords(article.abstract)}</p>
                        </div>

                        <div className="Icon-container">
                            <img src={Green} alt="background" className="Green" />
                            <img src={Bookmark} alt="bookmark" className="Bookmark" />
                        </div>

                    </div>
                </a>
            ))}
        </section>
    );
}