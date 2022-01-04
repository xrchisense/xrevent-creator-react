import { useState, useEffect } from 'react'

function PretixInfo(){
    const [pretixData, setPretixData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Retrieve some info on first render
    useEffect(function () {
        window.sessionStorage.getItem('access_token') != null ? getRessources() : console.log("[PretixInfo] There seems to be no token in session storage.")
	}, []);


    // Fetches some infos from pretix as token should be available in session storage
    async function getRessources(){
        // Retrieve the access_token from the session storage
        let access_token = window.sessionStorage.getItem('access_token')
        
       
        await fetch('/oauth.php?access_token=' + access_token
        )
        .then(function(response){
            if(response.ok){
                console.log(response)
                return response.json()
            }
            throw response // if not response ok throw error that we eill catch
        })
        .then(function(pretixJson){
            console.log(pretixJson)
            setPretixData(pretixJson)
        })
        .catch(function(error){
            console.error("Error fetching data: ", error)
            setError(error)
        })
        .finally(function(){
            setLoading(false)
        });
        
    }

    
    return(
        <>
            {loading &&  <p>Loading...</p>}
            {!loading && <div><p>{pretixData.fullname}</p>
                <p>{pretixData.email}</p></div>
            }
           
           
        </>
    );
}

export default PretixInfo;