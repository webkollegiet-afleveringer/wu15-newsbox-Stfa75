import Searchbar from "../Components/Searchbar";
import Health from "../Components/Health";
import Sports from "../Components/Sports";
import Business from "../Components/Business";
import Travel from "../Components/Travel";
import World from "../Components/World"; // Hvis din fil hedder Europe.jsx og eksporterer 'World', virker dette fint, men tjek gerne navnet.

export default function Home() {
    // Vi henter indstillingerne. 
    // Hvis værdien slet ikke findes endnu (null), sætter vi den til true som standard.
    const showEurope = localStorage.getItem("world") !== "false";
    const showHealth = localStorage.getItem("health") !== "false";
    const showSports = localStorage.getItem("sports") !== "false";
    const showBusiness = localStorage.getItem("business") !== "false";
    const showTravel = localStorage.getItem("travel") !== "false";

    // handleSaveToArchive er fjernet herfra, da komponenterne selv styrer det nu!

    return (
        <>
            <Searchbar />

            {/* Her styres om de vises eller ej */}
            {showEurope && <World />}
            {showHealth && <Health />}
            {showSports && <Sports />}
            {showBusiness && <Business />}
            {showTravel && <Travel />}
        </>
    );
}