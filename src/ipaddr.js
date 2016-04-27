#!/usr/bin/env node

var os = require('os');

// Returns an object in which the keys are the names of the network interfaces
// and the values are the IPv4 addresses (as strings).
function getExternalIpv4Addresses() {
    "use strict";

    var foundInterfaces = {},
        networkInterfaces = os.networkInterfaces(),
        curInterfaceName,
        addrArray,
        curAddrIndex,
        curAddr;

    for (curInterfaceName in networkInterfaces) {
        addrArray = networkInterfaces[curInterfaceName];

        for (curAddrIndex = 0; curAddrIndex < addrArray.length; ++curAddrIndex) {
            curAddr = addrArray[curAddrIndex];

            // We are only interested in IPv4 address that are external (not internal).
            if ((curAddr.family === 'IPv4') && (!curAddr.internal)) {
                foundInterfaces[curInterfaceName] = curAddr.address;
            }
        }
    }
    return foundInterfaces;
}

function doIt() {
    var interfaces = getExternalIpv4Addresses(),
        curInterfaceName;

    console.log('Found ' + Object.keys(interfaces).length + ' network interface(s).');

    for (curInterfaceName in interfaces) {
        console.log(curInterfaceName + '  ' + interfaces[curInterfaceName]);
    }
}

doIt();
