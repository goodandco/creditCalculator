function p(sum, percent) {
   return sum / 100 * percent;
}

function calculateCredit (carPrice, carPercent, bankComPer, kaskoPer, livePer, pfPer, durationMonthes, creditPercentYearMap, isAnuitet = false) {

   const carFirstSum = p(carPrice, carPercent);
  
   const creditSum = carPrice - carFirstSum;
  
   const bankCom = p(creditSum, bankComPer);
   const kasko = p(carPrice, kaskoPer);
   const live = p(creditSum, livePer);
   const pf = p(carPrice - p(carPrice, 20), pfPer);
   const other =  5000 + 750 + 1800; // register, gov rejectr, osago
   const startDopTaxes = bankCom + kasko + live + pf + other;
  
  const firstPayment = carFirstSum + startDopTaxes;
  let leftSum = creditSum
  let year = 1;
  const monthlySum = creditSum / durationMonthes;

console.log("Средняя сумма для оплаты в месяц, без процентов", monthlySum);
  let percentSumTotal = 0;
  let monthlySumAndPercentTotal = 0;
  let percent = creditPercentYearMap[year];
  let creditForCalculate  = leftSum;
  let percentSum = p(creditForCalculate, percent);

console.log(`Месяц  |  Процент  |  Сумма с процентами  |  Остаток`);


  for (let month = 1; month <= durationMonthes; month++){
     
     const monthlySumAndPercent = percentSum / 12 + monthlySum;
     
     leftSum -= monthlySum;
       
     console.log(`${month}  |  ${percent}% ${percentSum}  |  ${Math.round(monthlySumAndPercent)}  | ${Math.round(leftSum)}`);
     
     if (month / 12 > year) {
       year +=1;

       percent = creditPercentYearMap[year];

       creditForCalculate  = isAnuitet ? creditSum : leftSum;
       percentSum = p(creditForCalculate, percent);
     }

    

     percentSumTotal += percentSum / 12;
     monthlySumAndPercentTotal += monthlySumAndPercent;
  }
 
const total = Math.round(firstPayment + monthlySumAndPercentTotal);
  console.log(`
       Стартовый взнос за авто: ${carFirstSum}
       Остаток стоимости авто в кредит ${creditSum}
       Стартовый платеж: ${firstPayment} грн из них:
        - комиссия ${bankCom} грн
        - КАСКО ${kasko} грн
        - Страхование жизни ${live} грн
        - Пенсионный фонд ${pf} грн
        - Регистрация, реестр, ОСАГО ${other} грн
       Заплачено в кредите: ${Math.round(monthlySumAndPercentTotal)} грн
          из них процентов: ${Math.round(percentSumTotal)} грн
         
       Всего: ${total} грн.
     `);

}

// calculateCredit (1018000, 30, 2.5, 6.89, 1.99, 5, 36, {1: 0.1, 2: 0.1, 3: 0.1}, false)
