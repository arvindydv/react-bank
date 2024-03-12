import { useEffect, useState } from 'react';
import SliderWithInfo from '../components/SliderWithInfo';
import './HomeScreen.css'
import Select from '../components/Select';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import PieChart from '../components/PieChart';

Chart.register(CategoryScale);

function HomeScreen(){

    const [homeValue, setHomeValue] = useState(1000);
    const [downPayment, setDownPayment] = useState(1000 * (20 / 100));
    const [loanAmount, setLoanAmount] = useState(homeValue - downPayment);
    const [interestRate, setInterestRate] = useState(2);
    const [tenure, setTenure] = useState(5);
    // const [interestPerMonth, setinterestPerMonth] = useState(interestRate / 100 / 12);
    const [mountlyPayment, setMountlyPayment] = useState("");
    const [totalInterestGenerated, setTotalInterestGenerated] = useState("")
    const [chartData, setChartData] = useState({
        labels: ["Principle", "Interes"], 
        datasets: [
          {
            label: "Ratio of principle and interes ",
            data: [loanAmount,totalInterestGenerated],
            backgroundColor: ["red", "blue"],
            borderColor: "black",
            borderWidth: 2
          }
        ]
      })

      useEffect(()=>{

        const totalLoanMonths = tenure * 12;
        const interestPerMonth = interestRate / 100 / 12;
        const monthlyPayment = (loanAmount*interestPerMonth*(1+interestPerMonth)**totalLoanMonths) /  ((1 + interestPerMonth) ** totalLoanMonths - 1);
        const totalInterestGenerated = monthlyPayment * totalLoanMonths - loanAmount;

        setMountlyPayment(monthlyPayment.toFixed(2));
        setTotalInterestGenerated(totalInterestGenerated);
        setChartData({
            labels: ["Principle", "Total interest generated"], 
            datasets: [
              {
                label: "Ratio of principle and interest ",
                data: [homeValue,totalInterestGenerated],
                backgroundColor: ["red", "blue"],
                borderColor: "black",
                borderWidth: 2
              }
            ]
          })


      },[tenure,interestRate,loanAmount])

      useEffect(()=>{

        setDownPayment(homeValue * (20 / 100))

      },[homeValue])

      useEffect(()=>{

        setLoanAmount(homeValue - downPayment);

      },[downPayment])


    return(
        <>
            <header>
                <h1>Bank of React</h1>
            </header>
            <div id='container'>
                <div id='data-container'>
                    <SliderWithInfo label = "Home Value" min={1000} max = {10000} step = {100} value = {homeValue} symbol = {"$"} setValue = {setHomeValue} />

                    <SliderWithInfo label = "Down Payment" min={0} max = {homeValue} step = {100} value = {downPayment} symbol = {"$"} setValue={setDownPayment} />

                    <SliderWithInfo label = "Loan Amount" min={0} max = {homeValue} step = {100} value = {loanAmount} symbol = {"$"} setValue={setLoanAmount} />

                    <SliderWithInfo label = "Interest Rate" min={2} max = {18} step = {1} value = {interestRate} symbol = {"%"} setValue={setInterestRate} />

                    <Select value = {tenure} setValue = {setTenure}/>
                </div>
                <div id='chart-container' >
                    <PieChart chartData = {chartData} mountlyPayment = {mountlyPayment} />
                </div>
            </div>
        </>
    )
}

export default HomeScreen;