import { useState, useEffect, useRef } from 'react'

const useFetch = (url: string, options?: object) => {
  const [isLoading, setIsLoading] = useState(false)
  const [fetchError, setFetchError] = useState(false)
  const [fetchErrorMsg, setFetchErrorMsg] = useState('')
  const [data, setData] = useState<any>()

  useEffect(() => {
    fetchData()
  }, [url, options])

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(url, options)
      if (!response.ok) {
        throw new Error()
      }
      const fetchedData = await response.json()
      setData(fetchedData)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      setFetchError(true)
      setFetchErrorMsg('A problem has occurred while getting the data')
    }
  }

  return {
    isLoading,
    fetchError,
    fetchErrorMsg,
    data,
  }
}

export default useFetch
