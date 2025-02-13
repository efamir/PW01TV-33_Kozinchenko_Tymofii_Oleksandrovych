"use strict";

const inpValuesNames = ['C', 'H', 'S', 'N', 'O', 'W', 'A'];
const compositionDryNames = ['C', 'H', 'S', 'N', 'O', 'A'];
const compositionFuelNames = ['C', 'H', 'S', 'N', 'O'];

function getInpValues() {
    let result = {};
    let sum = 0;
    inpValuesNames.forEach(
        (inpValue) => {
            let value = +document.getElementById(`inp_${inpValue.toLowerCase()}`).value;
            sum += value;
            result[inpValue] = value;
        });

    if (Math.abs(sum - 100) > 1e-3) {
        alert("Сума значень повина дорівнювати 100%.\n" +
            `А зараз сума дорівнює ${sum.toFixed(3)}%`);
        return;
    }
    return result;
}

function getCompositionDry (inpValues, kWorkToDry) {
    let compositionDry = {};
    compositionDryNames.forEach(
        (inpValue) => compositionDry[inpValue] = inpValues[inpValue] * kWorkToDry
    );
    return compositionDry;
}

function getCompositionFuel (inpValues, kWorkToFuel) {
    let compositionFuel = {};
    compositionFuelNames.forEach(
        (inpValue) => compositionFuel[inpValue] = inpValues[inpValue] * kWorkToFuel
    );
    return compositionFuel;
}

function getHeatWork(inpValues) {
    return 339*inpValues['C'] + 1030*inpValues['H'] - 108.8*(inpValues['O'] - inpValues['S']) - 25*inpValues['W'];
}

function getDryWorkByHeatWork(heatWork, inpValues) {
    console.log(heatWork);
    console.log(inpValues['W']);
    return (heatWork + 0.025*inpValues['W'])*(100/(100 - inpValues['W']));
}

function getFuelWorkByHeatWork(heatWork, inpValues) {
    return (heatWork + 0.025*inpValues['W'])*(100/(100 - inpValues['W'] - inpValues['A']));
}

function calculate() {
    let inpValues = getInpValues();
    if (!inpValues) return;
    let {C, H, S, N, O, W, A} = inpValues;

    let kWorkToDry = (100/(100 - W));
    document.getElementById("k_work_to_dry").innerText = String(kWorkToDry.toFixed(2));

    let kWorkToFuel = (100/(100 - W - A));
    document.getElementById("k_work_to_fuel").innerText = String(kWorkToFuel.toFixed(2));

    let dryCompositionValues = getCompositionDry(inpValues, kWorkToDry);
    let drySpan = document.getElementById("composition_dry")
    drySpan.innerText = ""
    compositionDryNames.forEach((dryName) => {
        drySpan.innerText += ` ${dryName}_C = ${dryCompositionValues[dryName].toFixed(2)}%;`
    });

    let fuelCompositionValues = getCompositionFuel(inpValues, kWorkToFuel);
    let fuelSpan = document.getElementById("composition_fuel")
    fuelSpan.innerText = ""
    compositionFuelNames.forEach((fuelName) => {
        fuelSpan.innerText += ` ${fuelName}_Г = ${fuelCompositionValues[fuelName].toFixed(2)}%;`
    });

    let heatWork = getHeatWork(inpValues) / 1000;
    document.getElementById("heat_work").innerText = (heatWork).toFixed(4) + " МДж/кг";

    let dryWork = getDryWorkByHeatWork(heatWork, inpValues);
    document.getElementById("heat_dry").innerText = (dryWork).toFixed(4) + " МДж/кг";

    let fuelWork = getFuelWorkByHeatWork(heatWork, inpValues);
    document.getElementById("heat_fuel").innerText = (fuelWork).toFixed(4) + " МДж/кг";
}