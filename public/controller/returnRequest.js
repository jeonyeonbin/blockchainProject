function returnRequest(fcn,args){
    return {
        chaincodeId : 'bc2018',
        fcn : fcn,
        args : args,
        chainId : 'bc2018channel',
    };
}

module.exports = returnRequest;