import { useEffect, useRef } from "react"
import "./settings.scss"
import Header from "../Header"
import Navbar from "../Navbar"


export default function Settings() {

    function inputHandler(event) {
        localStorage.setItem(event.target.dataset.category, event.target.checked)//her skal stå en key og en værdi
    }

    return (

        <>

            <article className="Options">
                <h2>EUROPE</h2>
                <div>
                    <label class="switch">
                        <input type="checkbox" data-category="europe" id="Toggle" onInput={inputHandler} defaultChecked={localStorage.getItem("europe") === "true"} />
                        <span class="slider round"></span>
                    </label>
                </div>
            </article>
            <article className="Options">
                <h2>HEALTH</h2>
                <div>
                    <label class="switch">
                        <input type="checkbox" data-category="health" id="Toggle" onInput={inputHandler} defaultChecked={localStorage.getItem("europe") === "true"} />
                        <span class="slider round"></span>
                    </label>
                </div>
            </article>
            <article className="Options">
                <h2>SPORT</h2>
                <div>
                    <label class="switch">
                        <input type="checkbox" data-category="sports" id="Toggle" onInput={inputHandler} defaultChecked={localStorage.getItem("europe") === "true"} />
                        <span class="slider round"></span>
                    </label>
                </div>
            </article>
            <article className="Options">
                <h2>BUSINESS</h2>
                <div>
                    <label class="switch">
                        <input type="checkbox" data-category="business" id="Toggle" onInput={inputHandler} defaultChecked={localStorage.getItem("europe") === "true"} />
                        <span class="slider round"></span>
                    </label>
                </div>
            </article>
            <article className="Options">
                <h2>TRAVEL</h2>
                <div>
                    <label class="switch">
                        <input type="checkbox" data-category="travel" id="Toggle" onInput={inputHandler} defaultChecked={localStorage.getItem("europe") === "true"} />
                        <span class="slider round"></span>
                    </label>
                </div>
            </article>
            <div>

            </div>








        </>




    )
}