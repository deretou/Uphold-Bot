
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
     * Verify Token
     * @param {object} arrayOfPairs 
     * @param {object} res 
     * @param {object} next
     * @returns {void} 
     */
     static RetrieverByArrayOfCurrency(pai) {
        
        let isItTheFirstCall = true;
        let firstBid = {};
    }

}

export default Tricker;