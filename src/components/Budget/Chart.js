
import {Bar, Doughnut, Line} from 'react-chartjs-2';
import { GlobalContext } from '../../context/GlobalState_budget';
import { ColourGenerator } from './ColourGenerator';
import React, { useContext } from 'react';

export const Chart = () => {
    const { budgets } = useContext(GlobalContext);

    function groupBudgets(budgets) {
        var groups = {};

        budgets.forEach(function (i) {
            if (groups.hasOwnProperty(i.category)) {
                groups[i.Category] += i.Amount;
            } else {
                groups[i.Category] = i.Amount;
            }
        });

        var result = [];

        for (var g in groups) {
            result.push({ Category: g, Amount: groups[g].toFixed(2) });
        }

        return result;
    }

    const grouped = groupBudgets(budgets);
    const colours = ColourGenerator.getInstance(grouped.length);

    const state = {
    labels: grouped.map(b => b.Category),
    datasets: [
        {
        label: 'Budgets',
        backgroundColor: colours[0],
        hoverBackgroundColor: colours[1],
        data: grouped.map(b => b.Amount)
        }
    ]
    }

    const per_day = {
        labels:['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [
            {
            label: 'Budgets_per_day',
            data: [180, 150, 390, 270, 200, 430, 380]    
            }
        ]
    }

    const options = {
        title: {
            display: true,
            text:'',
            fontSize:20
            },
        legend: {
            display: true,
            position:'right'
            }
    }

    return (
    <h2>
        <Doughnut
        data={state}
        options={options}
        />
        <Bar
            data={state}
            width={100}
            height={50}
            options={options}
        />
        <h2>Daily Spend</h2>
        <Line
            data={per_day}
            width = {100}
            height={50}
            options = {options}
        />
    </h2>
    )
}
  

