function returnRequest(fcn,args){
    return {
        chaincodeId : 'fabcar',
        fcn : fcn,
        args : args,
        chainId : 'myChannel',
    };
}

module.exports = returnRequest;