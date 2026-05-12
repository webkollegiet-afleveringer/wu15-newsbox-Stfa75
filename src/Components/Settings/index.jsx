import { useEffect, useRef } from "react"
import "./settings.scss"
import Header from "../Header"
import Navbar from "../Navbar"
import Logo from "../../img/logo.png"



export default function Settings() {

    function inputHandler(event) {
        localStorage.setItem(event.target.dataset.category, event.target.checked)//her skal stå en key og en værdi
    }


    return (

        <>
            <h3 className="Subheading">Categories</h3>
            <article className="Options">
                <div className="Name"><img src={Logo} alt="Logo" className="Logo" />
                    <h3 className="Word">EUROPE</h3></div>

                <div>
                    <label class="switch">
                        <input type="checkbox" data-category="europe" id="Toggle" onInput={inputHandler} defaultChecked={localStorage.getItem("europe") === "true"} />
                        <span class="slider round"></span>
                    </label>
                </div>
            </article>

            <article className="Options">
                <div className="Name"><img src={Logo} alt="Logo" className="Logo" />
                    <h3 className="Word">HEALTH</h3></div>
                <div>
                    <label class="switch">
                        <input type="checkbox" data-category="health" id="Toggle" onInput={inputHandler} defaultChecked={localStorage.getItem("europe") === "true"} />
                        <span class="slider round"></span>
                    </label>
                </div>
            </article>
            <article className="Options">
                <div className="Name"><img src={Logo} alt="Logo" className="Logo" />
                    <h3 className="Word">SPORT</h3></div>
                <div>
                    <label class="switch">
                        <input type="checkbox" data-category="sports" id="Toggle" onInput={inputHandler} defaultChecked={localStorage.getItem("europe") === "true"} />
                        <span class="slider round"></span>
                    </label>
                </div>
            </article>
            <article className="Options">
                <div className="Name"><img src={Logo} alt="Logo" className="Logo" />
                    <h3 className="Word">BUSINESS</h3></div>
                <div>
                    <label class="switch">
                        <input type="checkbox" data-category="business" id="Toggle" onInput={inputHandler} defaultChecked={localStorage.getItem("europe") === "true"} />
                        <span class="slider round"></span>
                    </label>
                </div>
            </article>
            <article className="Options">
                <div className="Name"><img src={Logo} alt="Logo" className="Logo" />
                    <h3 className="Word">TRAVEL</h3></div>
                <div>
                    <label class="switch">
                        <input type="checkbox" data-category="travel" id="Toggle" onInput={inputHandler} defaultChecked={localStorage.getItem("europe") === "true"} />
                        <span class="slider round"></span>
                    </label>
                </div>

            </article>
            <div className="Swich"><button className="Light" ><h3>Toggle dark mode</h3></button></div >

            <div>

            </div>








        </>




    )
}