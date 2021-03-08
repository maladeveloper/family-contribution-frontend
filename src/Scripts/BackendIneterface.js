const BASE_URL = 'https://family-contribution-backend.herokuapp.com/'


var requestOptions = {
    method: 'POST', 
    headers: {'Content-Type':'application/json'},
    }


export var backendWebVars = {

    PREV_DATES:{
        method: "GET",
        URL: (argObject) => BASE_URL + "previousDates",
    },

    USER_SPEC_DATA:{
        method: "GET",
        URL: (argObject) => BASE_URL+"getDateUserSpecificData?date="+argObject.date+"&userId="+argObject.userId,
    },

    USER_INFO:{
        method:"GET",
        URL: (argObject) =>BASE_URL+"getUserInfo?userId="+ argObject.userId
    },

    

}

export var webFuncInteraction = (backendWebVar, argObject) =>{

    return new Promise((resolve)=>{

        console.log(backendWebVar.method)
        switch(backendWebVar.method){

            case "GET":

                {

                //Make a fetch request for the data
                fetch(backendWebVar.URL(argObject)).then(response => response.json()).then(data => 
                    
                    //Now resolve with the data that was returned 
                    resolve(data)
                );

                break;
                }
            
            case "POST":

            {
                
                var requestOptionsVar = requestOptions;

                requestOptionsVar.body = backendWebVar.bodyInfo(argObject);

                fetch(backendWebVar.URL(argObject), requestOptionsVar).then(response => response.json()).then(data => resolve(data));
                
                break;
            }
        }

    })

}