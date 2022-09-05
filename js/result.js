/*
 *		Lambton College
 *		CSD 2103 - Front End Web Development II
 *		Term project
 *		Hugo Beltran Escarraga - C0845680
 *		Juan Luis Casanova Romero - C0851175
 */
 
 $(document).ready(function() {
    checkCookie();
    displayTotals();
	createChart();
    // Return to Home
    const returnBtn = document.querySelector("#return-btn");
        returnBtn.addEventListener("click", function(e) {
        window.location.href = "index.html";
    });
});
var totalRules;
var totalSigns;
var total;
var correctRules;
var incorrectRules;
var correctSigns;
var incorrectSigns;
var correctTotal;
var incorrectTotal;
var checkRandom;
var checkEmail

function createChart() {
    var xValues = ["Rules - Correct", "Signs- Correct", "Signs - Incorrect", "Rules - Incorrect"];
    var yValues = [correctRules, correctSigns, incorrectSigns, incorrectRules];
    var barColors = [
    "#01A775",
    "#6495ED",
    "#FFC300",
    "#db2e3f" 
    ];

    new Chart("myChart", {
    type: "pie",
    data: {
        labels: xValues,
        datasets: [{
        backgroundColor: barColors,
        data: yValues
        }]
    },
    options: {
        title: {
        display: true,
        text: "Driver License Knowledge Practice Test Results"
        }
    }
    });
}

function checkCookie() {
    totalRules = Number(getCookie("rules-questions"));
    totalSigns = Number(getCookie("signs-questions"));
    correctRules = Number(getCookie("correct-rules"));
    correctSigns = Number(getCookie("correct-signs"));
    checkRandom = getCookie("random") == "1" ? true : false;
    checkEmail = getCookie("send-email") == "1" ? true : false;
};

function getCookie(c_name)
{
    if (document.cookie.length > 0)
    {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1)
        {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1)
            {
                c_end=document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

function displayTotals() {
    incorrectRules = totalRules - correctRules;
    incorrectSigns = totalSigns - correctSigns;
    total = totalRules + totalSigns;
    correctTotal = correctRules + correctSigns;
    incorrectTotal = incorrectRules + incorrectSigns;
    document.getElementById("correct-rules").innerHTML = correctRules;
    document.getElementById("incorrect-rules").innerHTML = incorrectRules;
    document.getElementById("correct-signs").innerHTML = correctSigns;
    document.getElementById("incorrect-signs").innerHTML = incorrectSigns;
    document.getElementById("correct-total").innerHTML = correctTotal;
    document.getElementById("incorrect-total").innerHTML = incorrectTotal;
    document.getElementById("percentage-rules").innerHTML = Number(100 * correctRules / totalRules) + "%";
    document.getElementById("percentage-signs").innerHTML = Number(100 * correctSigns / totalSigns) + "%";
    document.getElementById("percentage-total").innerHTML = Number(100 * correctTotal / total) + "%";
}
