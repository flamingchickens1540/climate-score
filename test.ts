async function getWalkscore(lat: number, long: number) {
    fetch(`https://ipapi.co/${ip}/json/`).then((res) => res.json());
    let data: any = await fetch(`https://api.walkscore.com/score?format=json&lat=${lat}&lon=${long}&wsapikey=${}`, {method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": 'https://api.walkscore.com/',
                 // 'Content-Type': 'application/x-www-form-urlencoded',
            }
        }).then((res: { json: () => any; }) => res.json())

    if (data.status != 1) { console.log("WalkScore Problem"); throw Error("Walkscore Problem"); }
    if (DEBUG) console.log(data);
    return {
        "walkscore": data.walkscore,
            "walkscoreDescription": data.description
    }
}