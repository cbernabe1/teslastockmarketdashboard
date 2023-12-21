
var shareTime = [] // array for the share time
var shareVolume = [] // array for the volume
var shareHigh = [] // array for the high price
var shareLow = [] // array for the low price
function fetchData(){ // start of the function
    document.getElementById('form').style.visibility = "visible" // this code make the div visible cause of in the html the visibility of div is hidden
    var url = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=TSLA&interval=5min&apikey=LC62A0NFEP2XOMOH" //url of the api
    fetch(url) // fetch the url
    .then(response => response.json()) // the url fetch is converted into JSON
    .then(data => { // the code here is for viewing the data inside the JSON in able to view the data you must use the data
        var date = data['Meta Data']['3. Last Refreshed'] // the code here is for getting the last refreshed date in the api data
        document.getElementById('dateCard').innerHTML = `<h1> ${date} </h1` //after getting the data and putting it to variable date, it will be inserted into the 
        var myData = data['Time Series (5min)'] // this variable or data created is for fetching the Time series in the api fetched
        var key, count = 0 // this variable is used inside the loop in order to loop or get all the data inside the api
        for(key in myData){ // start of the loop
            if(myData.hasOwnProperty(key)){ // in this section this function checks if the data has its own property and if yes it will procceed to the code and if not it will stop
                var myKey = key.split(" ") // for spliting the key for example (1111000 200000) it uses split function by what type of separator you will use to split the data and in here it uses space in order to split the data
                shareTime[count] = myKey[1] // shareTime array is inserted a new data in which contains the splitted data above for the example above since it uses 1 so it will gets the 20000
                shareVolume[count] =  Number(myData[key]['5. volume']) // here is the volume of the data it gets the myData that contains the 5. volume
                shareHigh[count] = Number(myData[key]['2. high']) // same as above explanation
                shareLow[count] = Number(myData[key]['3. low']) // same as above explanation
                count ++ //for procceeding to the next data 
            }
        }
        var maxPrice = Math.max(...shareHigh) // this code is for getting the max price in the data in  the api
        var minPrice = Math.min(...shareLow) // this code is for getting the min price in the data in  the api
        document.getElementById('max').innerHTML = `<h3> Max: $ ${maxPrice} </h3>` // for displaying ht maxPrice in the html
        document.getElementById('min').innerHTML = `<h3> Min: $ ${minPrice} </h3>` // for displaying ht minPrice in the html

        google.charts.load('current', {'packages':['corechart']});  // start of fetching the price and this template comes from the google chart
        google.charts.setOnLoadCallback(drawChart);
        var dataRows = [['Time','Volume Traded']] // this variable is for the rows that need in the function drawChart the first is the Time and the second one is the volume traded
        for(var i = 0 ; i < count; i++){ // start of looping to all data in the api the count here is the variable used earlier and it contains the number of data presented in the api
            datRows.push([shareTime[i],shareVolume[i]]) //putting the data in the variable dataRows the shareTime is contained all the share time in the data apis while the shareVolume contains all the data in the share volume
        }
        function drawChart() {
          var data = google.visualization.arrayToDataTable(dataRows); // inputting the dataRows into the arrayTable in order to generate a table or chart
    
          var options = { //for styling the chart
            title: 'Tesla Performance',
            curveType: 'function',
            legend: { position: 'bottom' },
            backgroundColor: {fill: rgb(33, 32, 32)},
            hAxis: {
                textStyle: {color: "#FFF"}
            },
            vAxis: {
                textStyle: {color: "#FFF"}
            },
            titleTextStyle: {
                color: "#FFF",

            },
            legendTextStyle:{
                color: "#FFF"
            }
          };
    
          var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
    
          chart.draw(data, options);
        }
    
    })

}