var studentsAvg = [];
var SUBJECTS_NUM = 4;

document.getElementById('readFile').addEventListener('click', () => {
    Papa.parse(document.getElementById('uploadFileInput').files[0],
    {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: function(results){
            for(i = 0; i < results.data.length; i++){
                
                //Set students average
                let avg = Math.round(((parseInt(results.data[i].Algebra) + parseInt(results.data[i].Calculus)
                + parseInt(results.data[i].Databases) + parseInt(results.data[i].Programming))/SUBJECTS_NUM)*10)/10;

                // Get grade
                let grade;
                if (80 <= avg && avg < 100){
                    grade = 'A';
                }
                else if (70 <= avg && avg < 80){
                    grade = 'B';
                }
                else if (60 <= avg && avg < 70){
                    grade = 'C';
                }
                else if (50 <= avg && avg < 60){
                    grade = 'D';
                }
                else if (40 <= avg && avg < 50){
                    grade = 'E';
                }
                else if (0 <= avg && avg < 40){
                    grade = 'F';
                }
                else{
                    grade = 'Unknown'
                }
                
                // Set students average csv data
                studentsAvg[i] = {
                    Firstname: results.data[i].Firstname,
                    Surname: results.data[i].Surname,
                    Avarage: avg,
                    Grade: grade
                }
            }

            // Create table for input csv data
            createTable('csvInputTable', results.meta['fields'], results.data);

            document.getElementById('inputTableLabel').style.display = 'block';
            document.getElementById('showAvg').style.display = 'block';
        }
    });
});

document.getElementById('showAvg').addEventListener('click', () => {
    // Create table for output csv data
    createTable('csvOutputTable', Object.keys(studentsAvg[0]), studentsAvg)

    document.getElementById('outputTableLabel').style.display = 'block';
    document.getElementById('saveFile').style.display = 'block';
});

document.getElementById('saveFile').addEventListener('click', () => {
    studentsAvgCsv = Papa.unparse({
        data: studentsAvg
    });

    var csvData = new Blob([studentsAvgCsv], {type: 'text/csv;charset=utf-8;'});
    var csvURL =  null;
    if (navigator.msSaveBlob)
    {
        csvURL = navigator.msSaveBlob(csvData, 'output.csv');
    }
    else
    {
        csvURL = window.URL.createObjectURL(csvData);
    }

    var tempLink = document.createElement('a');
    tempLink.href = csvURL;
    tempLink.download = 'output.csv';
    tempLink.click();
});

function createTable(tableID , header, data){
    csvTable = document.getElementById(tableID);
    csvTable.innerHTML = "";

    // Set table header
    csvTable.insertAdjacentHTML(
        "afterbegin",
        `
            <thead>
                <tr>
                    ${header.map((text) => `<th>${text}</th>`).join("")}
                </tr>
            </thead>
        `
    );

    // Set table body
    const rowsHtml = data.map((row) => {
    return `
                <tr>
                    ${Object.keys(row).map((text,) => `<td>${row[text]}</td>`).join("")}
                </tr>
            `;
    });

    csvTable.insertAdjacentHTML(
    "beforeend",
    `
            <tbody>
                ${rowsHtml.join("")}
            </tbody>
        `
    );
}
