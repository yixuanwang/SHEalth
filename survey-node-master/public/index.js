$(function() {

    // Chart ages
    function ages(results) {
        // Collect age results
        var data = {};
        for (var i = 0, l = results.length; i<l; i++) {
            var ageResponse = results[i].responses[0];
            var k = String(ageResponse.answer);
            if (!data[k]) data[k] = 1;
            else data[k]++;
        }

        // Assemble for graph
        var labels = Object.keys(data);
        var dataSet = [];
        for (var k in data)
            dataSet.push(data[k]);

        // Render chart
        var ctx = document.getElementById('ageChart').getContext('2d');
        var ageChart = new Chart(ctx).Bar({
            labels: labels,
            datasets: [
                {
                    label: 'Ages',
                    data: dataSet
                }
            ]
        });
    }

    // Chart yes/no responses to lemur question
    function fatigue(results) {
        // Collect lemur kicking results
        var yes = 0, no = 0;
        for (var i = 0, l = results.length; i<l; i++) {
            var fatigueResponse = results[i].responses[1];
            fatigueResponse.answer ? yes++ : no++;
        }

        var ctx = document.getElementById('fatigueChart').getContext('2d');
        var ageChart = new Chart(ctx).Pie([
            { value: yes, label: 'Yes', color: 'gray', highlight: 'deepskyblue' },
            { value: no, label: 'No', color: 'black', highlight: 'deepskyblue' }
        ]);
    }

    function headache(results) {
        // Collect lemur kicking results
        var yes = 0, no = 0;
        for (var i = 0, l = results.length; i<l; i++) {
            var headacheResponse = results[i].responses[2];
            headacheResponse.answer ? yes++ : no++;
        }

        var ctx = document.getElementById('headacheChart').getContext('2d');
        var ageChart = new Chart(ctx).Pie([
            { value: yes, label: 'Yes', color: 'gray', highlight: 'azure' },
            { value: no, label: 'No', color: 'black', highlight: 'azure' }
        ]);
    }

    function vomited(results) {
        // Collect lemur kicking results
        var yes = 0, no = 0;
        for (var i = 0, l = results.length; i<l; i++) {
            var vomitedResponse = results[i].responses[3];
            vomitedResponse.answer ? yes++ : no++;
        }

        var ctx = document.getElementById('vomitedChart').getContext('2d');
        var ageChart = new Chart(ctx).Pie([
            { value: yes, label: 'Yes', color: 'gray', highlight: 'azure' },
            { value: no, label: 'No', color: 'black', highlight: 'azure' }
        ]);
    }

    function fever(results) {
        // Collect lemur kicking results
        var yes = 0, no = 0;
        for (var i = 0, l = results.length; i<l; i++) {
            var feverResponse = results[i].responses[4];
            feverResponse.answer ? yes++ : no++;
        }

        var ctx = document.getElementById('feverChart').getContext('2d');
        var ageChart = new Chart(ctx).Pie([
            { value: yes, label: 'Yes', color: 'gray', highlight: 'azure' },
            { value: no, label: 'No', color: 'black', highlight: 'azure' }
        ]);
    }

    function rashes(results) {
        // Collect lemur kicking results
        var yes = 0, no = 0;
        for (var i = 0, l = results.length; i<l; i++) {
            var rashesResponse = results[i].responses[5];
            rashesResponse.answer ? yes++ : no++;
        }

        var ctx = document.getElementById('rashesChart').getContext('2d');
        var ageChart = new Chart(ctx).Pie([
            { value: yes, label: 'Yes', color: 'gray', highlight: 'azure' },
            { value: no, label: 'No', color: 'black', highlight: 'azure' }
        ]);
    }

    function diarrhea(results) {
        // Collect lemur kicking results
        var yes = 0, no = 0;
        for (var i = 0, l = results.length; i<l; i++) {
            var diarrheaResponse = results[i].responses[6];
            diarrheaResponse.answer ? yes++ : no++;
        }

        var ctx = document.getElementById('diarrheaChart').getContext('2d');
        var ageChart = new Chart(ctx).Pie([
            { value: yes, label: 'Yes', color: 'gray', highlight: 'azure' },
            { value: no, label: 'No', color: 'black', highlight: 'azure' }
        ]);
    }

    function cough(results) {
        // Collect lemur kicking results
        var yes = 0, no = 0;
        for (var i = 0, l = results.length; i<l; i++) {
            var coughResponse = results[i].responses[7];
            coughResponse.answer ? yes++ : no++;
        }

        var ctx = document.getElementById('coughChart').getContext('2d');
        var ageChart = new Chart(ctx).Pie([
            { value: yes, label: 'Yes', color: 'gray', highlight: 'azure' },
            { value: no, label: 'No', color: 'black', highlight: 'azure' }
        ]);
    }

    function period(results) {
        // Collect lemur kicking results
        var yes = 0, no = 0;
        for (var i = 0, l = results.length; i<l; i++) {
            var periodResponse = results[i].responses[8];
            periodResponse.answer ? yes++ : no++;
        }

        var ctx = document.getElementById('periodChart').getContext('2d');
        var ageChart = new Chart(ctx).Pie([
            { value: yes, label: 'Yes', color: 'gray', highlight: 'azure' },
            { value: no, label: 'No', color: 'black', highlight: 'azure' }
        ]);
    }

    // poor man's html template for a response table row
    function row(response) {
        var tpl = '<tr><td>';
        tpl += response.answer || 'pending...' + '</td>';
        if (response.recordingUrl) {
            tpl += '<td><a target="_blank" href="'
                + response.recordingUrl 
                + '"><i class="fa fa-play"></i></a></td>';
        } else {
            tpl += '<td>N/A</td>';
        }
        tpl += '</tr>';
        return tpl;
    }

    // add text responses to a table
    function freeText(results) {
        var $responses = $('#turtleResponses');
        var content = '';
        for (var i = 0, l = results.length; i<l; i++) {
            var turtleResponse = results[i].responses[9];
            content += row(turtleResponse);
        }
        $responses.append(content);
    }

    // Load current results from server
    $.ajax({
        url: '/results',
        method: 'GET'
    }).done(function(data) {
        // Update charts and tables
        $('#total').html(data.results.length);
        headache(data.results);
        fatigue(data.results);
        ages(data.results);
        rashes(data.results);
        fever(data.results);
        vomited(data.results);
        diarrhea(data.results);
        cough(data.results);
        period(data.results);
        freeText(data.results);
    }).fail(function(err) {
        console.log(err);
        alert('failed to load results data :(');
    });
});