import Searchbar from "../Components/Searchbar"
import Health from "../Components/Health"
import Sports from "../Components/Sports"
import Business from "../Components/Business"
import Travel from "../Components/Travel"
import Europe from "../Components/Europe"

export default function Home() {
    // Vi henter indstillingerne. 
    // Vi tjekker om de IKKE er "false", så de er "true" som standard.
    const showEurope = localStorage.getItem("europe") !== "false";
    const showHealth = localStorage.getItem("health") !== "false";
    const showSports = localStorage.getItem("sports") !== "false";
    const showBusiness = localStorage.getItem("business") !== "false";
    const showTravel = localStorage.getItem("travel") !== "false";

    const handleSaveToArchive = (article) => {
        console.log(handleSaveToArchive);
        
    // 1. Hent hvad der allerede ligger i arkivet (eller lav et tomt array hvis det er første gang)
    const currentArchive = JSON.parse(localStorage.getItem("myArchive")) || [];

    // 2. Tjek om vi har gemt den før (vi sammenligner URL'er, da de er unikke)
    const alreadyExists = currentArchive.some(item => item.url === article.url);

    if (!alreadyExists) {
        // 3. Tilføj den nye artikel til listen
        const updatedArchive = [...currentArchive, article];

        // 4. Gem den opdaterede liste som en tekst-streng
        localStorage.setItem("myArchive", JSON.stringify(updatedArchive));
        
        alert("Artiklen er nu gemt i dit arkiv!");
    } else {
        alert("Denne artikel ligger allerede i arkivet.");
    }
};
    
    return (
        <>
           
            <Searchbar />

            {/* Her styres om de vises eller ej */}
            {showEurope && <Europe />}
            {showHealth && <Health />}
            {showSports && <Sports />}
            {showBusiness && <Business />}
            {showTravel && <Travel />}
          
        </>
    )
}