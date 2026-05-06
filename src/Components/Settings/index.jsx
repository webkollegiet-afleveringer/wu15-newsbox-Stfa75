
import "./settings.scss"
import Header from "../Header"
import Navbar from "../Navbar"
export default function Settings() {

    return (

        <>
            <Header />
            <article className="Options">
                <h2>EUROPE</h2>
                <div>
                    <label class="switch">
                        <input type="checkbox" id="Toggle" />
                        <span class="slider round"></span>
                    </label>
                </div>
            </article>
            <article className="Options">
                <h2>HEALTH</h2>
                <div>
                    <label class="switch">
                        <input type="checkbox" id="Toggle" />
                        <span class="slider round"></span>
                    </label>
                </div>
            </article>
            <article className="Options">
                <h2>SPORT</h2>
                <div>
                    <label class="switch">
                        <input type="checkbox" id="Toggle" />
                        <span class="slider round"></span>
                    </label>
                </div>
            </article>
            <article className="Options">
                <h2>BUSINESS</h2>
                <div>
                    <label class="switch">
                        <input type="checkbox" id="Toggle" />
                        <span class="slider round"></span>
                    </label>
                </div>
            </article>
            <article className="Options">
                <h2>TRAVEL</h2>
                <div>
                    <label class="switch">
                        <input type="checkbox" id="Toggle" />
                        <span class="slider round"></span>
                    </label>
                </div>
            </article>
            <div>

            </div>
            <Navbar />







        </>




    )
}