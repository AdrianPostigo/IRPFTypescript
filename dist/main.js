"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline = require("readline");
let PPPF = ""; //Plan de pensiones persona fisica
let PPE = ""; //Plan de pensiones de empresa
let PPA = ""; //Plan de pensiones de autonomo
let BI = ""; //Base imponible
let IRPF = 0;
let derecord = 0;
mainQuestions();
function mainQuestions() {
    return __awaiter(this, void 0, void 0, function* () {
        let sumatorio = 0;
        const rl = createInterface();
        do {
            console.log("1. Plan de pensiones persona fisica:");
            PPPF = yield askQuestion(rl, "Cuanto quieres aportar: ");
        } while (Number(PPPF) > 1500);
        do {
            console.log("2. Plan de pensiones de empresa:");
            PPE = yield askQuestion(rl, "Cuanto quieres aportar: ");
        } while (Number(PPE) > 8500);
        do {
            console.log("3. Plan de pensiones de autonomo:");
            PPA = yield askQuestion(rl, "Cuanto quieres aportar: ");
        } while (Number(PPA) > 5750);
        console.log("4. Total facturado/Base imponible:");
        BI = yield askQuestion(rl, "Cual es tu salario base: ");
        rl.close();
        IRPF = calculateIRPF(Number(BI));
        sumatorio = Number(PPPF) + Number(PPE) + Number(PPA);
        derecord = calculateDerecord(sumatorio, IRPF);
        console.log(Number(PPPF), Number(PPE), Number(PPA), Number(BI), IRPF + '%', derecord);
    });
}
function calculateIRPF(bi) {
    if (bi <= 12449)
        return 19;
    else if (bi >= 12450 && bi <= 20199)
        return 24;
    else if (bi >= 20200 && bi <= 35199)
        return 30;
    else if (bi >= 35200 && bi <= 59999)
        return 37;
    else if (bi >= 60000 && bi <= 299999)
        return 45;
    else if (bi >= 300000)
        return 47;
}
function calculateDerecord(sumatorio, irpf) {
    return (sumatorio + irpf) / 100;
}
function createInterface() {
    return readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
}
function askQuestion(rl, query) {
    return new Promise(resolve => rl.question(query, resolve));
}
