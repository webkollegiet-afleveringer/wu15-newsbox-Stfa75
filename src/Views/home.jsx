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