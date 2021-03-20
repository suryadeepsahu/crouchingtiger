describe('Unit: OrgUnitWebService', function() {
    var values, OrgUnitWebService, $httpBackend, $rootScope, $window, $http, baseUrl, mockData,
        headerCallback, getConfig, returnedData, httpMock, idToHit, OrgUnitLocal, BreadcrumbWebService;

    beforeEach(function() {
        module('org-unit');
        inject(function($injector) {
            $rootScope           = $injector.get('$rootScope');
            $window              = $injector.get('$window');
            $httpBackend         = $injector.get('$httpBackend');
            $http                = $injector.get('$http');
            OrgUnitWebService    = $injector.get('OrgUnitWebService');
            OrgUnitLocal         = $injector.get('OrgUnitLocal');
            BreadcrumbWebService = $injector.get('BreadcrumbWebService');
        });

        $window.sessionStorage.token = 'abc123';
        $rootScope.url               = 'https://api2.convirza.js';
        $rootScope.port              = '443';
        baseUrl                      = $rootScope.url +":"+ $rootScope.port;
        mockData                     = {'mock data': true};
        headerCallback               = function(headers){
            return (headers.Authorization === 'bearer ' + $window.sessionStorage.token);
        };

        getConfig = function() {
            var config =  {
                headers: {
                    'content-type':  'application/json',
                    'Authorization': 'bearer ' + $window.sessionStorage.token
                }
            };
            return config;
        };

        httpMock = function(method, theUrl) {
            $httpBackend.when(method, theUrl, {}, headerCallback).respond(mockData);
        };
    });

    describe('OrgUnitWebService methods', function(){

        it('its methods exist', function() {
            ['getOrgUnitById', 'getOrgUnitById', 'updateOrgUnit', 'getChildrenOUs', 'infoAboutOuAndChildren', 'deleteOU', 'getIndustries', 'parseIndustries', 'createOrgUnit']
	            .forEach(function(methodName) {
                expect(OrgUnitWebService[methodName]).not.toBeUndefined();
            });
        });

        it('getJsonConfig', function() {
            expect(OrgUnitWebService.getJsonConfig()).toEqual(getConfig());
        });

        it('getUserHighestOrgUnit', function() {
            idToHit = 12;
            httpMock('GET', baseUrl + '/v1/orgUnit/' + idToHit);

            OrgUnitWebService.getOrgUnitById(idToHit)
            .then(function(data) {
                returnedData = data;
            });
            $httpBackend.flush();
            expect(returnedData.data).toEqual(mockData);
        });

        it('updateOrgUnit', function() {
            httpMock('PUT', baseUrl + '/v1/orgUnit/');

            OrgUnitWebService.updateOrgUnit()
            .then(function(data) {
                returnedData = data;
            });
            $httpBackend.flush();
            expect(returnedData.data).toEqual(mockData);
        });

        it('createOrgUnit', function() {
            httpMock('POST', baseUrl + '/v1/orgUnit/');
            OrgUnitWebService.createOrgUnit()
            .then(function(data) {
                returnedData = data;
            });

            $httpBackend.flush();
            expect(returnedData.data).toEqual(mockData);
        });

    });
}); // end of Unit: Org Unit Factory






























