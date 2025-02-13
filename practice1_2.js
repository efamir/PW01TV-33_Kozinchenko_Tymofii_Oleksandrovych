"use strict";

function getInpValues() {
    let result = {};
    result['c'] = document.getElementById("c").value;
    result['h'] = document.getElementById("h").value;
    result['o'] = document.getElementById("o").value;
    result['s'] = document.getElementById("s").value;
    result['v'] = document.getElementById("v").value;
    result['heat_fuel'] = document.getElementById("inp_heat_fuel").value;
    result['work_humidity'] = document.getElementById("inp_work_humidity").value;
    result['zol_dry'] = document.getElementById("zol_dry").value;

    return result;
}

function calc_work(value, work_humidity, zol_dry) {
    return value * (100 - work_humidity - zol_dry) / 100;
}

function calc_work_heat(fuel_heat, w_r, a_r) {
    return fuel_heat*((100 - w_r - a_r) / 100) - 0.025*w_r;
}

function calculate() {
    let data = getInpValues();

    data['c_p'] = calc_work(data['c'], data['work_humidity'], data['zol_dry']);
    data['h_p'] = calc_work(data['h'], data['work_humidity'], data['zol_dry']);
    data['o_p'] = calc_work(data['o'], data['work_humidity'], data['zol_dry']);
    data['s_p'] = calc_work(data['s'], data['work_humidity'], data['zol_dry']);
    data['v_p'] = calc_work(data['v'], data['work_humidity'], 0);
    data['zol_dry_p'] = calc_work(data['zol_dry'], data['work_humidity'], 0);

    document.getElementById("composition_work").innerText = `Вуглець = ${data['c_p'].toFixed(2)}%; ` +
        `Водень = ${data['h_p'].toFixed(2)}%; ` + `Кисень = ${data['o_p'].toFixed(2)}%; ` +
        `Сірка = ${data['s_p'].toFixed(2)}%; ` + `Зола = ${data['zol_dry_p'].toFixed(2)}%; ` +
        `Ванадій = ${data['v_p'].toFixed(2)} мг/кг; `;

    document.getElementById("heat_work").innerText =
        calc_work_heat(data['heat_fuel'], data['work_humidity'], data['zol_dry']).toFixed(4) + " МДж/кг";
}


