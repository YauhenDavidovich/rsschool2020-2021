import comunicator from "../logic/apiCommunicator";
import formatInt from "../logic/format";

function lastUpdate() {
    const curentdate = new Date();
    const datetime = `${curentdate.getMonth() +1 }/${ 
        curentdate.getDate() }/${ 
        curentdate.getFullYear() }`;
    return datetime
}

async function globalCases() {
    try {
        const dataComunicator = await comunicator.loadGeneralData();
        let cases = 0;

        for (let i = 0; i < dataComunicator.length; i++) {
            cases += (dataComunicator[i].cases)
        }
        document.querySelector(".global__count").innerHTML = formatInt(cases);
        document.querySelector(".update__wrapper").innerHTML = lastUpdate();

    } catch (e) {
        document.querySelector(".global__country").innerHTML = "table";
    }
}

export default globalCases