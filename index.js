import Tricker from './bot/trickers/Trickers';


//Tricker.RetrieverByPair('USD-EUR');

//Tricker.RetrieverByPair('BTC-USD');

Tricker.RetrieverByArrayOfCurrency(['USD-EUR','BTC-USD','ETH-USD'],5,0.01);

