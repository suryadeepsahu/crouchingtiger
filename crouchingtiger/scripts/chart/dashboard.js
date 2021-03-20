//"use strict";
//
//var doc_s = '1';
//var doc = doc_s === '' ? 0 : parseInt(doc_s);
//var charts = [];
//var data = [];
//var xf;
//var dimension;
//var group;
//var columns;
//var data_type = 'file';
//
//
//$.ajaxSetup({cache: false});
//
//$(document).ready(function() {
//    try {
//        less.modifyVars();
//    }
//    catch (e) {}
//
//    main();
//});
//
//
//function main() {
//
//    while (charts.length > 0) {
//        charts.pop();
//    }
//
//    $.ajax({
//        url: "reportconfigCallFlow.json",
//        type: 'GET',
//        dataType: "json",
//        crossDomain: true
//    }).success(function (data) {
//        $.each(data.chartobjs, function (index, value) {
//            createChart(data.chartobjs[index]);
//        });
//    });
//
//    start();
//}
//
//function start() {
//    if (data_type === 'file') {
//        $.ajax({
//            url: "callFlowData.js",
//            type: 'GET',
//            dataType: "json",
//            crossDomain: true
//        }).success(function (data) {
//
//            createCrossFilter(data.json);
//        }).fail(function (err) {
//            alert("error loading config.json");
//            console.log(err);
//        });
//    }
//    else
//    if (data_type === 'url') {
//        var url = $('#settings [name=url]').val();
//        url = url.replace(/\n/g, '');
//        $.getJSON(url, createCrossFilter);
//    }
//}