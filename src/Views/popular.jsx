import Sports from "../Components/Sports"
import Business from "../Components/Business"
import Travel from "../Components/Travel"
import Health from "../Components/Health"
import useFetchData from "../Hooks/useFetchData" // 1. Tilføjet denne import

const getImg = (article) => {
    // Tjekker for "Top Stories" (Home-siden)
    if (article.multimedia?.[0]?.url) {
        return article.multimedia[0].url;
    }

    // Tjekker for "Most Popular" (Popular-siden)
    // Her ligger billedet typisk inde i media -> media-metadata
    if (article.media?.[0]?.["media-metadata"]?.[2]?.url) {
        return article.media[0]["media-metadata"][2].url;
    }

    return Logo; // Fallback hvis intet findes
};

export default function Popular() {
    const apiKey = "wtLUgKBONr2XcZEobnbpK5fhDFcH5GshjykRqAsuOtFW9rSq";
    const { data, pending, error } = useFetchData(`https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${apiKey}`);

    // 1. SE HER: Vi bruger toLowerCase() så "Health" og "health" begge virker
    // Popular.jsx
    // I Popular.jsx
    const healthData = data?.results?.filter(art =>
        art.section?.toLowerCase().includes("health") ||
        art.section?.toLowerCase().includes("well")
    );

    const businessData = data?.results?.filter(art =>
        art.section?.toLowerCase().includes("business") ||
        art.section?.toLowerCase().includes("economy") ||
        art.section?.toLowerCase().includes("u.s.") // En del populære artikler lander her
    );

    const sportsData = data?.results?.filter(art =>
        art.section?.toLowerCase().includes("sports")
    );

    const travelData = data?.results?.filter(art =>
        art.section?.toLowerCase().includes("travel") ||
        art.section?.toLowerCase().includes("world")
    );


    // 2. DEBUGGING: Åbn din konsol (F12) og se hvad der står her:
    console.log("Alle populære artikler fra API:", data?.results);
    console.log("Hvor mange Health blev fundet?", healthData?.length);

    return (
        <>
            <h1 className="title">Popular</h1>
            <br />
            <Health popularArticles={healthData} />
            <Business popularArticles={data?.results} />
            <Sports popularArticles={sportsData} />
            <Travel popularArticles={travelData} />
        </>
    );
}