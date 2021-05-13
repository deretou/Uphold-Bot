
import axios from 'axios';

class Tricker  {        
    
    /**
     * Retrieve the rate every 5 seconds for a pair
     * @param {string} pair
     * @returns {void} 
     */
    static RetrieverByPair(pair) {

        let isItTheFirstCall = true;
        let firstBid = 0;
        setInterval(async ()=>{

            const config = {
                method: 'get',
                url: 'https://api.uphold.com/v0/ticker/'+pair
            }

            let res = await axios(config);
            

            if(res.status == 200){  

                if(isItTheFirstCall){

                    firstBid = res.data.bid;
                    isItTheFirstCall =false;

                }else{

                    const oscillation = res.data.bid - firstBid;
                    const checker = Math.abs(oscillation) > 0.01;

                    if(checker){
                        console.log("#########################################");
                        console.log("Oscillation ==> "+oscillation); 
                        console.log("#########################################");

                        if(oscillation > 0){                    
                            console.log("+++++++++++++++++++++++++++++++++++++++++");
                            console.log("First Bid ==> "+firstBid); 
                            console.log("Current Bid ==> "+res.data.bid);                             
                            console.log("Price goes up for the pair "+pair);            
                        }
    
                        if(oscillation < 0){
                            console.log("--------------------------------------"); 
                            console.log("First Bid ==> "+firstBid); 
                            console.log("Current Bid ==> "+res.data.bid);
                            console.log("Price goes down for the pair "+pair);            
                        }

                    }
                    
                     }

             }
                                        
        },5000);
        
    }


    /**
     * Handle multiple currency pairs at the same time
     * @param {object} arrayOfPairs 
     * @param {object} fetchInterval in second
     * @param {object} oscillation
     * @returns {void} 
     */
     static RetrieverByArrayOfCurrency(arrayOfPairs,fetchInterval,oscillation) {
        
 console.log(arrayOfPairs);

        if(Array.isArray(arrayOfPairs)){

            
             let isItTheFirstCall ={};
             let firstBid = {};

             // initiation of the first call boolean
             arrayOfPairs.forEach(pa =>{
                isItTheFirstCall[pa]=true;
             });


            setInterval(()=>{                    

                    arrayOfPairs.forEach(pair =>{

                        //console.log("Pair "+pair);            
                        const config = {
                            method: 'get',
                            url: 'https://api.uphold.com/v0/ticker/'+pair
                        }
            
                        axios(config).then(res =>{
                            
                            if(res.status == 200){  
            
                                if(isItTheFirstCall[pair]){
                
                                    firstBid[pair] = res.data.bid;
                                    isItTheFirstCall[pair] =false;
                
                                }else{
                
                                    const oscillated = res.data.bid - firstBid[pair];
                                    const checker = Math.abs(oscillated) > oscillation;
                
                                    if(checker){
                                        console.log("################ "+ pair+ " #####################");
                                        console.log("Oscillation ==> "+oscillated); 
                                        console.log("#########################################");
                
                                        if(oscillated > 0){                    
                                            console.log("+++++++++++++++++++++++++++++++++++++++++");
                                            console.log("First Bid ==> "+firstBid[pair]); 
                                            console.log("Current Bid ==> "+res.data.bid);                             
                                            console.log("Price goes up for the pair "+pair);            
                                        }
                    
                                        if(oscillated < 0){
                                            console.log("--------------------------------------"); 
                                            console.log("First Bid ==> "+firstBid[pair]); 
                                            console.log("Current Bid ==> "+res.data.bid);
                                            console.log("Price goes down for the pair "+pair);            
                                        }
                
                                    }
                                    
                                    }
                
                            }
                        });
                                                                    
                    });
                

            },fetchInterval*1000);

        }


    }

}

export default Tricker;