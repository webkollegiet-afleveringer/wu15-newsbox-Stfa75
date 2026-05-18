import { useEffect, useState } from "react";

export default function useFetchCachedData(key, url, options = {}) {

    const [data, setData] = useState(null);
    const [pending, setPending] = useState(true);
    const [error, setError] = useState(null);

    async function fetchData() {
        setPending(true);
        setError(null); // Nulstil fejl ved nyt fetch
        try {
            const respons = await fetch(url, options);

            if (!respons.ok) {
                setData(null);
                throw new Error(`Error ${respons.status}`);
            }

            let result = null;
            // RETTET: "Response" ændret til "respons" med lille r
            if (respons.headers.get("content-type") && respons.headers.get("content-type").includes("application/json")) {
                result = await respons.json();
            } else if (respons.headers.get("content-type") && respons.headers.get("content-type").includes("text/plain")) {
                result = await respons.text(); // RETTET: tekst.plain ændret til text/plain
            }

            setData(result);

            if (key) {
                sessionStorage.setItem(key, JSON.stringify(result));
                sessionStorage.setItem(key + "_expires", (Date.now() + 1000 * 60 * 2).toString());
            }

        }
        catch (error) {
            setError(error.message);
        } finally {
            // RETTET: setLoading ændret til setPending
            setPending(false);
        }
    }

    useEffect(function () {
        let cachedData = null;
        let cacheExpires = null;

        if (key) {
            cachedData = sessionStorage.getItem(key);
            cacheExpires = sessionStorage.getItem(key + "_expires");
        }

        // Hvis der er cache, OG det ikke er udløbet, så brug det
        if (cachedData && cacheExpires && Date.now() < parseInt(cacheExpires)) {
            setData(JSON.parse(cachedData));
            setPending(false);
            return;
        }

        fetchData(); // Kør fetch, hvis der ikke var noget i cachen
    }, [url, key]);

    return { data, pending, error };
}