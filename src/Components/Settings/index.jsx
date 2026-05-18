import { useEffect, useRef } from "react"
import "./settings.scss"
import Logo from "../../img/logo.png"

export default function Settings({ isDark, onToggle }) {
    console.log(onToggle);

    function inputHandler(event) {
        localStorage.setItem(event.target.dataset.category, event.target.checked)


    }

    return (
        <>
            <h3 className="Subheading">Categories</h3>

            {/* EUROPE */}
            <article className="Options">
                <div className="Name">
                    <img src={Logo} alt="Logo" className="Logo" />
                    <h3 className="Word">EUROPE</h3>
                </div>
                <div>
                    <label className="switch">
                        <input type="checkbox" data-category="europe" onInput={inputHandler} defaultChecked={localStorage.getItem("europe") === "true"} />
                        <span className="slider round"></span>
                    </label>
                </div>
            </article>

            {/* HEALTH */}
            <article className="Options">
                <div className="Name">
                    <img src={Logo} alt="Logo" className="Logo" />
                    <h3 className="Word">HEALTH</h3>
                </div>
                <div>
                    <label className="switch">
                        <input type="checkbox" data-category="health" onInput={inputHandler} defaultChecked={localStorage.getItem("health") === "true"} />
                        <span className="slider round"></span>
                    </label>
                </div>
            </article>

            {/* SPORT */}
            <article className="Options">
                <div className="Name">
                    <img src={Logo} alt="Logo" className="Logo" />
                    <h3 className="Word">SPORT</h3>
                </div>
                <div>
                    <label className="switch">
                        <input type="checkbox" data-category="sports" onInput={inputHandler} defaultChecked={localStorage.getItem("sports") === "true"} />
                        <span className="slider round"></span>
                    </label>
                </div>
            </article>

            {/* BUSINESS */}
            <article className="Options">
                <div className="Name">
                    <img src={Logo} alt="Logo" className="Logo" />
                    <h3 className="Word">BUSINESS</h3>
                </div>
                <div>
                    <label className="switch">
                        <input type="checkbox" data-category="business" onInput={inputHandler} defaultChecked={localStorage.getItem("business") === "true"} />
                        <span className="slider round"></span>
                    </label>
                </div>
            </article>

            {/* TRAVEL */}
            <article className="Options">
                <div className="Name">
                    <img src={Logo} alt="Logo" className="Logo" />
                    <h3 className="Word">TRAVEL</h3>
                </div>
                <div>
                    {/* HER VAR FEJLEN: className s="switch" er rettet til className="switch" */}
                    <label className="switch">
                        <input type="checkbox" data-category="travel" onInput={inputHandler} defaultChecked={localStorage.getItem("travel") === "true"} />
                        <span className="slider round"></span>
                    </label>
                </div>
            </article>

            {/* DARK MODE KNAP - Nu med onClick! */}
            <div className="Swich">
                <button className="Light" onClick={onToggle}>
                    <h3>{isDark ? "SWITCH TO LIGHT" : "SWITCH TO DARK"}</h3>
                </button>

            </div>
        </>
    )
}