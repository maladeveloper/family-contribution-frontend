const BASE_URL = 'https://family-contribution-backend.herokuapp.com/'
//const BASE_URL = "http://127.0.0.1:5000/"

var requestOptions = {
    method: 'POST', 
    headers: {'Content-Type':'application/json'},
    }


export var backendWebVars = {
    
    /////////////////////////////// BASICS ///////////////////////////////
    AUTH:{
        method:"GET",
        URL: (argObject) => BASE_URL + "basics/authId?userId="+ argObject.userId
    },

    INIT:{
        method:"GET",
        URL: (argObject) => BASE_URL +"basics/init?userId="+ argObject.userId
    },
    USER_INFO:{
        method:"GET",
        URL: (argObject) => BASE_URL+"basics/userInfo?userId="+ argObject.userId
    },

    PREV_DATES:{
        method: "GET",
        URL: (argObject) => BASE_URL + "basics/previousDates",
    },

    /////////////////////////////// PAYMENT ///////////////////////////////
    USER_SPEC_DATA:{
        method: "GET",
        URL: (argObject) => BASE_URL+"payment/dateUserSpecificData?date="+argObject.date+"&userId="+argObject.userId,
    },

    UPDATE_INCOME:{
        method: "POST",
        URL:(argObject) => BASE_URL + "payment/incomeUpdate"
    },

    PAY_INFO:{

        method:"GET",
        URL: (argObject) => BASE_URL + "payment/pendingPaymentUsers?date=" + argObject.date
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
                var requestOptionsVar = requestOptions;

                requestOptionsVar.body = JSON.stringify(argObject);

                fetch(backendWebVar.URL(argObject), requestOptionsVar).then(response => response.json()).then(data => resolve(data));
                
                break;
            }
        }

    })

}