//const BASE_URL = 'https://family-contribution-backend.herokuapp.com/'
const BASE_URL = "http://127.0.0.1:5000/"

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

    UPDATE_INCOME:{
        method: "POST",
        URL:(argObject) => BASE_URL + "updateIncomeSubmission"
    }

    

}

export var webFuncInteraction = (backendWebVar, argObject) =>{

    return new Promise((resolve)=>{

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
                console.log(argObject)
                
                var requestOptionsVar = requestOptions;

                requestOptionsVar.body = argObject;

                fetch(backendWebVar.URL(argObject), requestOptionsVar).then(response => response.json()).then(data => resolve(data));
                
                break;
            }
        }

    })

}