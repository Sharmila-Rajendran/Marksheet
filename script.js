document.addEventListener("DOMContentLoaded", function() {
    const theory = document.querySelectorAll(".theory");
    const practicals = document.querySelectorAll(".prac");
    const total = document.querySelectorAll(".tot");
    const totalinwords = document.querySelectorAll(".words");
    const grandtotElem = document.querySelector(".grandtot span");
    const grandwords = document.querySelector(".inwords span");
    const result = document.querySelector(".res span");
    const percentage = document.querySelector(".perc span");
    const grade = document.querySelector(".grade span");
  
    theory.forEach((input, index) => {
        input.addEventListener("input", Totals);
        practicals[index].addEventListener("input", Totals);
    });
  
    function Totals() {
        let grandTotalMarks = 0;
        theory.forEach((theory, index) => {
            const pracInput = practicals[index];
            const totElem = total[index];
            const totalWords = totalinwords[index];
            const theoryMarks = parseInt(theory.value) || 0;
            const practicalMarks = parseInt(pracInput.value) || 0;
            const totalMarks = theoryMarks + practicalMarks;
            totElem.textContent = totalMarks;
            totalWords.textContent = num2words(totalMarks);
            grandTotalMarks += totalMarks;
        });
        grandtotElem.textContent = grandTotalMarks;
        grandwords.textContent = num2words(grandTotalMarks);
        Result(grandTotalMarks);
    }
  
    function Result(grandTotalMarks) {
        const maxTotal = theory.length * 100;
        const perc = (grandTotalMarks / maxTotal) * 100;
        result.textContent = perc >= 40 ? "Pass" : "Fail";
        percentage.textContent = perc.toFixed(2) + "%";
        grade.textContent = Grade(perc);
    }
  
    function Grade(percentage) {
        if (percentage >= 95) return "O";
        if (percentage >= 90) return "A+";
        if (percentage >= 85) return "A";
        if (percentage >= 80) return "B+";
        if (percentage >= 75) return "B";
        if (percentage >= 70) return "C+";
        if (percentage >= 65) return "C";
        if (percentage >= 60) return "D+";
        return "F";
    }
  
    function num2words(num) {
        const ones = [
            "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"
        ];
        const teens = [
            "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
            "Seventeen", "Eighteen", "Nineteen"
        ];
        const tens = [
            "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty",
            "Ninety"
        ];
        const thousands = [
            "", "Thousand", "Million", "Billion"
        ];
  
        if (num === 0) return "Zero";
        let words = "";
        let i = 0;
        while (num > 0) {
            if (num % 1000 !== 0) {
                words = conversion(num % 1000) + " " + thousands[i] + " " + words;
            }
            num = Math.floor(num / 1000);
            i++;
        }
        return words.trim();
  
        function conversion(num) {
            if (num === 0) return "";
            if (num < 10) return ones[num];
            if (num < 20) return teens[num - 10];
            if (num < 100) return tens[Math.floor(num / 10)] + " " + conversion(num % 10);
            return ones[Math.floor(num / 100)] + " Hundred" + " " + conversion(num % 100);
        }
    }
});
