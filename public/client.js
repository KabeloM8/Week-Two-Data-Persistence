console.log('Client-side code running');

const button = document.getElementById('readFile');
button.addEventListener('click', function(e) {
  console.log('I was clicked');

  fetch('/readFile', {method: 'GET'})
    .then(function(response) {
      if(response.ok) return response.json();
      throw new Error('Request failed.');
    })
    .then(function(data) {
        students = data.students.map(({ id, ...item }) => item);
        studentsAvg = data.studentsAvg;
        console.log(students);

        // Create table for input data
        createTable('inputTable', Object.keys(students[0]), students);

        document.getElementById('inputTable').style.display = 'block';
        document.getElementById('saveFile').style.display = 'block';

        // Create table for output data
        createTable('outputTable', Object.keys(studentsAvg[0]), studentsAvg)

        document.getElementById('saveFile').style.display = 'block';
    })
    .catch(function(error) {
      console.log(error);
    });
});

const button2 = document.getElementById('saveFile');
button2.addEventListener('click', function(e) {
  console.log('I was clicked2');

  fetch('/saveCsvFile', {method: 'GET'})
    .then(function(response) {
      if(response.ok) return response.json();
      throw new Error('Request failed.');
    })
    .then(function(data) {
        studentsAvgCsv = Papa.unparse({
            data: data
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
    })
    .catch(function(error) {
      console.log(error);
    });
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

// const button = document.getElementById('myButton');
// button.addEventListener('click', function(e) {
//   console.log('button was clicked');

//   fetch('/clicked', {method: 'POST'})
//     .then(function(response) {
//       if(response.ok) {
//         console.log('Click was recorded');
//         studentsAvgCsv = Papa.unparse({
//             data: studentsAvg
//         });
    
//         var csvData = new Blob([studentsAvgCsv], {type: 'text/csv;charset=utf-8;'});
//         var csvURL =  null;
//         if (navigator.msSaveBlob)
//         {
//             csvURL = navigator.msSaveBlob(csvData, 'output.csv');
//         }
//         else
//         {
//             csvURL = window.URL.createObjectURL(csvData);
//         }
    
//         var tempLink = document.createElement('a');
//         tempLink.href = csvURL;
//         tempLink.download = 'output.csv';
//         tempLink.click();
//         return;
//       }
//       throw new Error('Request failed.');
//     })
//     .catch(function(error) {
//       console.log(error);
//     });
// });