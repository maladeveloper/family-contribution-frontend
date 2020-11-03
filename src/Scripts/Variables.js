
const BASE_URL = 'https://family-contribution-backend.herokuapp.com/'
var getHistoryData = function(documentId,fieldId){

    //Make a new promise to get the item from the lab
    return new Promise((resolve)=>{

        //Make a URL
        const URL = BASE_URL+"HistoryData/"+documentId+"?id="+fieldId; 

        //Make a fetch request for the data
        fetch(URL).then(response => response.json()).then(data => 
            
            //Now resolve with the data that was returned 
            resolve(data)
        )
        })
}

export {getHistoryData}; 