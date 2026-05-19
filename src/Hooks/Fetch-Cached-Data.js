import { useEffect, useState } from "react";

export default function useFetchCachedData(key, url) {
    // En hjælpefunktion til at tjekke om der findes gyldig cache
    const getCachedData = () => {
        if (!key) return null;
        // RETTET: Ændret fra sessionStorage til localStorage, så det overlever lukning af browseren
        const cached = localStorage.getItem(key);
        const expires = localStorage.getItem(key + "_expires");
        
        if (cached && expires && Date.now() < parseInt(expires)) {
            return JSON.parse(cached);
        }
        return null;
    };

    // 1. Start-state tjekker cachen med det samme
    const [data, setData] = useState(() => getCachedData());
    const [pending, setPending] = useState(!data);
    const [error, setError] = useState(null);

    useEffect(function () {
        const validCache = getCachedData();
        if (validCache) {
            setData(validCache);
            setPending(false);
            return;
        }

        async function fetchData() {
            setPending(true);
            setError(null);
            try {
                const respons = await fetch(url);

                if (!respons.ok) {
                    setData(null);
                    throw new Error(`Error ${respons.status}`);
                }

                let result = null;
                const contentType = respons.headers.get("content-type");

                if (contentType && contentType.includes("application/json")) {
                    result = await respons.json();
                } else if (contentType && contentType.includes("text/plain")) {
                    result = await respons.text();
                }

                setData(result);

                if (key) {
                    // RETTET: Gemmer nu i localStorage
                    localStorage.setItem(key, JSON.stringify(result));
                    
                    // RETTET: Sat til at udløbe efter 6 timer (1000ms * 60s * 60m * 6) i stedet for 2 minutter
                    const sixHours = 1000 * 60 * 60 * 1;
                    localStorage.setItem(key + "_expires", (Date.now() + sixHours).toString());
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setPending(false);
            }
        }

        fetchData();
        
    }, [url, key]);

    return { data, pending, error };
}