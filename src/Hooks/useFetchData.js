import { useEffect, useState } from "react";

export default function useFetchData(url) {

    const [data, setData] = useState(null)
    const [pending, setPending] = useState(false)
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
