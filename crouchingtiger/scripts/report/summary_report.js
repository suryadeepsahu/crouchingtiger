

angular.module('theme.summary_report', ['theme.report_service'])
    .controller('SummaryReportController', function ($scope, $http, $routeParams, $window, $rootScope, ReportDataWebService, $location) {

        function getValidSecondaryGroupNames (reportName) {
            var secondaryGroupNamesByReportName = {
                "call_flow" : [],
                "group": []
            };
            return secondaryGroupNamesByReportName[reportName];
        }


        var validateQueryStrings = {};
        validateQueryStrings.secondary_group = function(reportName, secGroup){
            return _.contains(getValidSecondaryGroupNames(reportName), secGroup);
        };


        // use defaults at first, then if validate query string appear, then use those
        // start_date, end_date, secondary_group, whichReport
        function getDefaultReportDataParams () {
            return {
                start_date:      "",
                end_date:        "",
                secondary_group: null,
                report_name:     "call_flow"
            };
        }

        function getValidatedReportDataParams (defaultParams, tempParams) {
            var tempReportDatas = _.extend({}, $location.search());



            //return object with validated values
        }


        function initializeReportDataParams () {

            var validatedParams = getValidatedReportDataParams();

            $scope.report_name    = validatedParams.report_name;
            $scope.drt_start      = validatedParams.start_date;
            $scope.drt_end        = validatedParams.end_date;
            $scope.secondaryGroup = validatedParams.secondary_group;
        }

        function reloadPageWithNewParams () {
            // redirect page with new params
        }

        function getReportDefinitionObject (allData) {
            // return allData.rdo
            // but for now use HTTP to get
        }

        function getReportMetaData () {
            // secondary group list data
            // widget title names
            // adv filter config object

            // return metadata obj
        }

        function augmentReportDataset (ds, configObj) {
            // configObj
            // { joinPrimSecGroup:true, addSummaryValues: true }

            // if joinPrimSecGroup, add it on there
            // if addSummaryValues, do all of those

            // return ds
        }

        function getReportData() {
            // use webservice to get data&metaData

            // .then
            // getRDO(allData)
            // .then
            // getReportMetaData -> $scope.metaData
            // var newDs augmentReportDataset(ds)
            // create xf1(ds), dc1, chartconfig
        }





    });