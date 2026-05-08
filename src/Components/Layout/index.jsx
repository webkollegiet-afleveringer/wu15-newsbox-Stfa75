import { Outlet } from "react-router-dom";
import Header from "../Header";
import Navbar from "../Navbar";

export default function Layout() {
    return (
        <div className="app-container">
            <Header />
            
            <main>
                {/* Her bliver Home, Settings eller Archive vist */}
                <Outlet />
            </main>
            
            <Navbar />
        </div>
    );
}