import {useCallback, useEffect, useState} from "react";

export default function useHttp(url,config, initialValue){
    const [fetchedData, setFetchedData] = useState(initialValue);
    const [error,setError] = useState();
    const [isLoading,setIsLoading] = useState(false);

    function clearData(){
        setFetchedData(initialValue);
    }
    const fetchData = useCallback(async function (data) {
        setIsLoading(true);
        try {
            const response = await fetch(url,{...config, body:data});
            const responseData = await response.json();
            if(!response.ok){
                throw new Error('The response was not successful');
            }
            setFetchedData(responseData);
        } catch (error){
            setError({
                message: 'The URL to fetch data is not correct, please contact our support.'
            })
        } finally {
            setIsLoading(false);
        }
    },[url,config]);


    useEffect(() => {
        if(config && config.method === 'GET' || !config.method || !config){
            fetchData();
        }

    }, [fetchData,url]);


    return {fetchedData,error,isLoading,fetchData,clearData};
}