import fetchJsonp from 'fetch-jsonp';



export const callAPI = async (searchInput, apiKey) => {
    let url=`https://www.giantbomb.com/api/games/?format=jsonp&json_callback=responseObject&api_key=${apiKey}&filter=name:${searchInput}`
    let options = {
        jsonpCallbackFunction: 'responseObject'
      }

    let res = await fetchJsonp(url, options).then(function(response) {
          console.log(response.json());
          return response.json();
        })
    return res
}