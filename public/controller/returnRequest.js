function returnRequest(fcn,args){
    return {
        chainCodeId : 'fabcar',
        fcn : fcn,
        args : args,
        chainId : 'myChannel',
    };
}

module.exports = returnRequest;