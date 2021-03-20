"use strict";
var _grid_size = 8;
var _chart_padding = 16;
var _z_index = 1000;

function createCrossFilter(dataResult) {
    var data = dataResult;

    try {
        var r = eval(init);
    }
    catch (e) {
    }

    var timeFormat = d3.time.format("%H:%M:%S");

    xf = crossfilter(data);
    dimension = [];
    group = [];
    columns = [];
    for (var k in data[0]) {
        columns.push(k);
    }

    //Loop through Report Template Chart Objects
    for (var i = 0; i < charts.length; i++) {

        //**************
        //Create Dimensions
        //**************
        dimension[i] = xf.dimension(dc.pluck(charts[i].dimension));

        if (charts[i].dimensiontype === "time") {
            if (charts[i].interval === "day") {
                dimension[i] = xf.dimension(function (d) {
                    d.d3datetime = d3.time.day(timeFormat.parse(d[charts[i].dimension].split(" ")[0].toString()));
                    d.days = d.d3datetime.getDays();
                    return d.days;
                });
            }
            if (charts[i].interval === "hour") {
                dimension[i] = xf.dimension(function (d) {
                    d.d3datetime = d3.time.hour(timeFormat.parse(d[charts[i].dimension].split(" ")[1].toString()));
                    d.hours = d.d3datetime.getHours();
                    return d.hours;
                });
            }
        }

        //**************
        //Create Groups
        //**************

        //Group None
        if (charts[i].grouptype === "none") {
            group[i] = dimension[i].groupAll();
        }

        //Group Count
        if (charts[i].grouptype === "count") {
            group[i] = dimension[i].group().reduceCount(dc.pluck(charts[i].group));
        }

        //Group Sum
        if (charts[i].grouptype === "sum") {
            group[i] = dimension[i].group().reduceSum(dc.pluck(charts[i].group));
        }
        //Group Reduce - can point to a number type
        if (charts[i].grouptype === "reduce") {
            var chartGroup = charts[i];
            group[i] = dimension[i].group().reduce(
                function (p, v) {
                    console.log(p, 'blah')
                    // console.log('dcpluck->>', chartGroup.group )
                    ++p.count;
                    p.number = v[chartGroup.group];
                    p.total += p.number;
                    p.average = p.total / p.count;
                    return p;
                },
                function (p, v) {
                    --p.count;
                    p.number = v[chartGroup.group];
                    p.total -= p.number;
                    p.average = p.total / p.count;
                    return p;
                },
                function () {
                    return {count: 0, total: 0, number: 0, average: 0};
                }
            );
        }


        var color = d3.scale.category20();
        var width = $("#chart" + i).outerWidth();
        var height = $("#chart" + i).outerHeight();
        height -= _chart_padding;
        var square = Math.min(width, height);


        //**************
        //Create Charts
        //**************

        //Pie & Donut Charts
        if (charts[i].type === "pie" ||
            charts[i].type === "donut") {
            charts[i].chart = dc.pieChart("#chart" + i)
                .width(width)
                .height(height - _chart_padding)
                .dimension(dimension[i])
                .group(group[i])
                .radius(square / 2 - _chart_padding)
                .innerRadius(charts[i].type === "pie" ? 0 : square / 5)
                .legend(dc.legend())
            ;
        }

        //Row Charts
        if (charts[i].type === "row") {
            charts[i].chart = dc.rowChart("#chart" + i)
                .width(width)
                .height(height - _chart_padding)
                .dimension(dimension[i])
                .group(group[i])
                .elasticX(true)
            ;
        }

        //Number Charts
        if (charts[i].type === "number") {
            charts[i].chart = dc.numberDisplay("#chart" + i)
                .width(width)
                .height(height - _chart_padding)
                //.dimension(dimension[i])
                .valueAccessor(function (d) {
                    return d.value;
                })
                .group(group[i])
            ;

            //.elasticX(true)
            //;
        }

        //Line Charts
        if (charts[i].type === "line") {
            var dat = group[i].top(Infinity);
            var min = +Infinity;
            var max = -Infinity;

            var minKey = d3.min(group[i].all(), function (d) {
                return d.key;
            });
            var maxKey = d3.max(group[i].all(), function (d) {
                return d.key;
            });

            for (var d = 0; d < dat.length; d++) {
                var value = parseFloat(dat[d].value);
                if (min > value)
                    min = value;
                if (max < value)
                    max = value;
            }

            charts[i].chart = dc.lineChart("#chart" + i)
                .renderArea(false)
                .width(width)
                .height(height - _chart_padding)
                .dimension(dimension[i])
                .group(group[i])
                .x(d3.scale.linear().domain([minKey, maxKey]))
                .y(d3.scale.linear().domain([min, max]))
                .renderHorizontalGridLines(true);
            charts[i].chart
                .valueAccessor(function (d) {
                    return d.value;
                })
                .elasticY(true)
                .elasticX(false)
                .brushOn(true)
            ;
        }

        //Bar Charts
        if (charts[i].type === "bar") {
            var dat = group[i].top(Infinity);
            var min = +Infinity;
            var max = -Infinity;

            var minKey = d3.min(group[i].all(), function (d) {
                return d.key;
            });

            var maxKey = d3.max(group[i].all(), function (d) {
                return d.key;
            });

            for (var d = 0; d < dat.length; d++) {
                var value = parseFloat(dat[d].value);
                if (min > value)
                    min = value;
                if (max < value)
                    max = value;
            }

            charts[i].chart = dc.barChart("#chart" + i)
                .width(width)
                .height(height - _chart_padding)
                .dimension(dimension[i])
                .group(group[i])
                .centerBar(true)
                .brushOn(true)
                .elasticY(true)
                .x(d3.scale.linear().domain([minKey, maxKey]))
                .renderHorizontalGridLines(true)

                .outerPadding(1)

                .gap(1);

        }

        if (charts[i].type === "datagrid") {

            charts[i].chart = dc.dataTable("#chart" + i)
                .width(width)
                .height(height - _chart_padding)
                .dimension(dimension[i])
                .group(function (d) {
                    return d.hour;
                })
                .size(20)
                .columns([
                    function (d) {
                        return d.call_flow;
                    },
                    function (d) {
                        return d.phone_number;
                    },
                    function (d) {
                        return d.answered;
                    },
                    function (d) {
                        return d.unique;
                    },
                    function (d) {
                        return d.duration;
                    }
                ])
                .renderlet(function (table) {
                    table.selectAll("#chart" + i).classed("info", true);
                });

        }


        if (charts[i].chart != null && charts[i].type != "number" && charts[i].type != "datagrid") {

            //console.log(charts[i].type);

            charts[i].chart
                .transitionDuration(1000)
                .colors(color);

            if (charts[i].sort === "asc") {
                charts[i].chart.ordering(function (d) { return d.value; })
            }

            else if (charts[i].sort === "desc") {
                charts[i].chart.ordering(function (d) { return -d.value; })
            }

            if (charts[i].top === "top") {
                group[i].value = parseInt(charts[i].top_value);
                charts[i].chart.data(function (group) {
                    return group.top(group.value);
                });
            }
            else if (charts[i].top === "bottom") {
                group[i].value = -parseInt(charts[i].top_value);
                charts[i].chart.data(function (group) {
                    return group.top(Infinity).splice(group.value);
                });
            }
        }
    }

    dc.renderAll();

}


function createChart(data) {
    var count = charts.length;
    var html = $('#chart-template').html().replace(/_id/g, count);
    $('#chart-container').append(html);

    var chart = $('#chart' + count);

    if (data.maximize_width) {
        var width = $(document).width();
        chart.outerWidth(width - data.x - _grid_size);
    }
    else {
        if (data.width) {
            chart.outerWidth(data.width + 'px');
        }
    }

    if (data.maximize_height) {
        var height = $(document).height();
        chart.outerHeight(height - data.y - _grid_size);
    }
    else {
        if (data.height) {
            chart.outerHeight(data.height + 'px');
        }
    }

    chart.find(".title").text(data.name);
    charts.push(data);
}

