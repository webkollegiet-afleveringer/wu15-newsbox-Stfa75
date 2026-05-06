import { useEffect, useState } from "react";
import { TRUE } from "sass";

export default function useFetchCachedData(key, url) {

    const [data, setData] = useState(null)
    const [pending, setPending] = useState(true)
    const [error, setError] = useState(null)


    useEffect(() => {
        async function fetchData() {
            setPending(true)
            try {

                const respons = await fetch(url)

                if (!respons.ok) {
                    setData(null)
                    throw new Error(`Error ${respons.status}`)
                }
                let result = null;

                result = await respons.json()
                setData(result)
                if (key) {
                    sessionStorage.setItem(key, JSON.stringify(result))
                    sessionStorage.setItem(key + "_expires", Date.now() + 1000 * 60 * 10)
                }

            }


            catch (error) {
                setPending(false)
                setError(error.message)
            }

        }

        fetchData()

    }, [url])

    return { data, pending, error }
}
