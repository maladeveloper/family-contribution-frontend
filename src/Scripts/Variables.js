
const BASE_URL = 'https://family-contribution-backend.herokuapp.com/'
var getHistoryData = function(){

    //Make a new promise to get the item from the lab
    return new Promise((resolve)=>{

        //Make a URL
        const URL = BASE_URL+"previousDates"; 

        //Make a fetch request for the data
        fetch(URL).then(response => response.json()).then(data => 
            
            //Now resolve with the data that was returned 
            resolve(data)
        )
        })
}


var refreshDates = function(prevDates){
    return new Promise(function(resolve,reject){

                //Make the options required for a post request
                const requestOptions = {
                    method: 'POST', 
                    headers: {'Content-Type':'application/json'},
                    
                    //Put in all the form details here
                    body: JSON.stringify({info:prevDates})
                }

                //Make the URL
                const URL = BASE_URL +'refreshDates';
                //Now with all this information make the post request 
                fetch(URL, requestOptions).then(response => response.json()).then(data => resolve(data));
            })
}

var getDateUserSpecificData = function(date, userId){

    //Make a new promise to get the item from the lab
    return new Promise((resolve)=>{

        //Make a URL
        const URL = BASE_URL+"getDateUserSpecificData?date="+date+"&userId="+userId; 

        //Make a fetch request for the data
        fetch(URL).then(response => response.json()).then(data => 
            
            //Now resolve with the data that was returned 
            resolve(data)
        )
        })
}
export {getHistoryData,refreshDates,getDateUserSpecificData}; 