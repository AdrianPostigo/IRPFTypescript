import * as readline from 'readline';

let PPPF: string = ""; //Plan de pensiones persona fisica
let PPE: string = ""; //Plan de pensiones de empresa
let PPA: string = ""; //Plan de pensiones de autonomo
let BI: string = ""; //Base imponible
let IRPF: number = 0;
let derecord: number = 0;

mainQuestions();

async function mainQuestions(): Promise<void>{
    let sumatorio: number = 0

    const rl = createInterface();
    do {
        console.log("1. Plan de pensiones persona fisica:");
        PPPF = await askQuestion(rl,"Cuanto quieres aportar: ")
    }while(Number(PPPF)> 1500);
    do {
        console.log("2. Plan de pensiones de empresa:");
        PPE = await askQuestion(rl,"Cuanto quieres aportar: ")
    }while(Number(PPE)> 8500);
    do {
        console.log("3. Plan de pensiones de autonomo:");
        PPA = await askQuestion(rl,"Cuanto quieres aportar: ")
    }while(Number(PPA)> 5750);
    console.log("4. Total facturado/Base imponible:");
    BI = await askQuestion(rl,"Cual es tu salario base: ")

    rl.close();
    IRPF = calculateIRPF(Number(BI));
    sumatorio = Number(PPPF) + Number(PPE) + Number(PPA)
    derecord = calculateDerecord(sumatorio, IRPF)
    console.log(Number(PPPF)+"PPPF", Number(PPE)+"PPE", Number(PPA)+"PPA", Number(BI)+"BI", IRPF+'%', derecord+"derecord")
}

function calculateIRPF(bi: number): number{

    if(bi<=12449) return 19
    else if (bi>=12450 && bi<=20199) return 24
    else if (bi>=20200 && bi<=35199) return 30
    else if (bi>=35200 && bi<=59999) return 37
    else if (bi>=60000 && bi<=299999) return 45
    else if (bi>=300000) return 47
}

function calculateDerecord(sumatorio: number, irpf: number): number{
    return (sumatorio * irpf)/100
}

function createInterface() {
    return readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
}

function askQuestion(rl: readline.Interface, query: string): Promise<string> {
    return new Promise(resolve => rl.question(query, resolve));
}