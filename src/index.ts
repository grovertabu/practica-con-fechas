import moment from "moment";
moment.locale("es");


function mesesInYear(year: number, mes: number, dias: number) {
  
  let typeYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 366 : 365;
  
  const daysInMonth: {[key: string]: number} = {};

// Itera sobre cada mes y almacena la cantidad de días en el objeto
  for (let month = 1; month <= 12; month++) {
    let mes:any = month < 10 ? `0${month}` : month;
    const days = moment(`${year}-${mes}-01`).daysInMonth();
    daysInMonth[month] = days;
  }

  if(dias == 31){
    daysInMonth[mes] = 1;
  }
  if((typeYear == 366 && mes == 2 && dias == 29) ){
    daysInMonth[mes] = 1;
  }   
  if(typeYear == 365 && mes == 2 && dias == 28){
    daysInMonth[mes] = 1;
  }
  if(dias==30){
    daysInMonth[mes] = 1;
  }
  if(dias< 30 && mes != 2){
    daysInMonth[mes] = dias/30;
  }
  return (daysInMonth[mes]);
}
function mesesInYearStart(year: number, mes: number, dias: number) {
  
  let typeYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 366 : 365;
  
  const daysInMonth: {[key: string]: number} = {};

// Itera sobre cada mes y almacena la cantidad de días en el objeto
  for (let month = 1; month <= 12; month++) {
    let mes:any = month < 10 ? `0${month}` : month;
    const days = moment(`${year}-${mes}-01`).daysInMonth();
    daysInMonth[month] = days;
  }

  if(dias == 1){
    daysInMonth[mes] = 1;
  }
  if(dias!=1){
    
    daysInMonth[mes] = ((30-dias)+1)/30;
  }
  return (daysInMonth[mes]);
}

let fechaInicio = moment('2022-12-31T04:00:00.000Z'); // '01/02/2023'
let fechaFin = moment('2023-12-31T04:00:00.000Z'); // '30/04/2023'


function calcularImporteTotal(fInicio:Date, fFin:Date, dias_pagados_mes:number){
    // Define las fechas de inicio y fin
    // 19/12/2022	31/03/2023
    let fechaInicio = moment(fInicio);
    let fechaFin = moment(fFin);

    const yearDays = 360;
    const monthDays = 30;
    
    let startDay = fechaInicio.date();
    let endDay = fechaFin.date();
    let startMonth = fechaInicio.month() + 1;
    let endMonth = fechaFin.month() + 1;
    let startYear = fechaInicio.year();
    let endYear = fechaFin.year();

    let dias_inicio_contrato = mesesInYearStart(startYear, startMonth, startDay);
    let dias_fin_contrato = mesesInYear(endYear, endMonth, endDay);

    let daysinMonthFechaInicio = fechaInicio.daysInMonth();
    let daysinMonthFechaFin = fechaFin.daysInMonth();
    

    const diffDays = fechaFin.diff(fechaInicio, 'days');
    // const diffmonths = fechaFin.diff(fechaInicio, 'months')+1;
    // console.log('diffmonths', diffmonths);


    const diffMonths = Math.floor(diffDays / monthDays);
    const diffYears = Math.floor(diffDays / yearDays);

    let months = diffMonths % 12;
    const days = diffDays - diffMonths * monthDays - diffYears * (yearDays - monthDays);

    if(dias_inicio_contrato != 1){
      months = months - 1;
      months= months + dias_inicio_contrato;
    }
    if(dias_fin_contrato != 1){
      months = months - 1;
      months= months + dias_fin_contrato;
    }
    console.log('months', months);
    
    // console.log(`${diffYears} años, ${months} meses y ${days} días`);
    let factor_calculo = dias_pagados_mes == 30 ? months+1 : months + dias_pagados_mes / 30;
    // console.log('factor_calculo', factor_calculo);

    console.table({
        // fechaInicio: fechaInicio.format('DD/MM/YYYY'),
        // fechaFin: fechaFin.format('DD/MM/YYYY'),
        months: months,
        days: days,
        factor_calculo: factor_calculo,
        sueldo: 1000*factor_calculo
    });
    

    return factor_calculo;
  }
  calcularImporteTotal(fechaInicio.toDate(), fechaFin.toDate(), 30);


  function calcularImporteTotal2() {

    // let fechaInicio = moment('2023-02-01T04:00:00.000Z').locale('es');
    // let fechaFin = moment('2023-04-30T04:00:00.000Z').locale('es');
    let fechaInicio = new Date('2023-02-01T04:00:00.000Z');
    let fechaFin = new Date('2023-04-30T04:00:00.000Z');

    const startYear = fechaInicio.getFullYear();
    const endYear = fechaFin.getFullYear();
    const startMonth = fechaInicio.getMonth() + 1;
    const endMonth = fechaFin.getMonth() + 1;
    const startDay = fechaInicio.getDate();
    const endDay = fechaFin.getDate();
    console.log({ startYear, endYear, startMonth, endMonth, startDay, endDay });


    const totalMonths = (endYear - startYear) * 12 + (endMonth - startMonth);
    let totalDays = endDay - startDay;
    if (totalDays < 0) {
      totalDays += 360;
    }
    const months = Math.floor(totalDays / 30);
    const days = totalDays % 30;

    console.table({ months: totalMonths + months, days: days });
  }

//   calcularImporteTotal2();





function salario(){
    const startDate = moment('2023-01-03');
    const endDate = moment('2023-04-30');
    const monthlySalary = 3200;
    const yearDays = 360;
    const monthDays = 30;

    let startDay = startDate.date();
    let endDay = endDate.date();
    let startMonth = startDate.month() + 1;
    let endMonth = endDate.month() + 1;
    let startYear = startDate.year();
    let endYear = endDate.year();

    let daysinMonthFechaInicio = startDate.daysInMonth();
    let daysinMonthFechaFin = endDate.daysInMonth();

    console.table({ 
        anioInicio:startYear, 
        anioFin :endYear, 
        mesInicio:startMonth, 
        mesFin:endMonth, 
        diaInicio:startDay, 
        diaFin:endDay,
        diasMesInicio:daysinMonthFechaInicio,
        diasMesFin:daysinMonthFechaFin
    });

    const diffDays = endDate.diff(startDate, 'days');
    const diffMonths = Math.floor(diffDays / monthDays);
    const diffYears = Math.floor(diffDays / yearDays);

    const months = diffMonths % 12;
    const days = diffDays - diffMonths * monthDays - diffYears * (yearDays - monthDays);

    console.log(`${diffYears} años, ${months} meses y ${days} días`);

    let factor_calculo = days >= 30 ? months+1 : months + days / 30;
    

    const totalDays = diffDays - days;
    // const totalDays = diffDays - (Math.max(startDate.daysInMonth(), 30) - 30) - (30 - Math.min(endDate.daysInMonth(), 30));
    const totalSalary = monthlySalary * (totalDays / yearDays) * 12;
    const totalSalary2 = monthlySalary * factor_calculo;
    
    
    console.log(`El salario total1 en el rango de fechas es: ${totalSalary.toFixed(2)}`);
    // console.log(`El salario total2 en el rango de fechas es: ${totalSalary2.toFixed(2)}`);
}

// salario();

function developer2(){
  console.log('developer2');
  
}
