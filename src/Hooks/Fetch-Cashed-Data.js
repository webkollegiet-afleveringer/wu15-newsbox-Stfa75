import { useEffect, useState } from "react";
import { TRUE } from "sass";

export default function useFetchData(url, key) {

    const [data, setData] = useState(null)
    const [pending, setPending] = useState(true)
    const [error, setError] = useState(null)
    let result = null;

    useEffect(() => {
        async function fetchData() {
            setPending(true)
            try {

                const respons = await fetch(url)

                if (!respons.ok) {
                    setData(null)
                    throw new Error(`Error ${respons.status}`)
                }
                const json = await respons.json()
                setPending(false)
                setData(json)
                setError(null)
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
