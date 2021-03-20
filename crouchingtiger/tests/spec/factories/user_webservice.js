/**
 * Created by brians on 10/1/15.
 */
/**
 * Created by bschermerhorn on 9/23/15.
 */
describe("UserWebservice factory", function () {

    beforeEach(module("users-builder"));
    var UserWebService, $window, $rootScope, baseUrl, $httpBackend, mockData, $q, returnedData;

    beforeEach(inject(function (_$window_, _UserWebService_, _$rootScope_, _$httpBackend_, _$q_) {
        UserWebService = _UserWebService_;
        $q = _$q_;
        $window = _$window_;
        $window.sessionStorage.token = "!@#$%";
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
        $rootScope.url = "http://localhost";
        $rootScope.port = 8000;
    }));

    beforeEach(function () {
        baseUrl        = $rootScope.url + ":" + $rootScope.port;
        mockData       = {'mock data': true};
        headerCallback = function(headers){
            return (headers.Authorization === 'bearer ' + $window.sessionStorage.token);
        };

        httpMock = function(method, theUrl, jsonInput) {
            $httpBackend.when(method, theUrl, (jsonInput || {}), headerCallback).respond(mockData);
        };
    });


    describe("UserWebService factory", function () {

        it(".getRoles makes GET request to /v1/role", function () {
            httpMock('GET', baseUrl + "/v1/role");
            UserWebService.getRoles().then(function (data) { returnedData = data; });
            $httpBackend.flush();
            expect(returnedData.data).toEqual(mockData);
        });

        it(".getUsers makes GET request to /v1/user?user_status=deleted&ct_user_ou_id= with ouid", function () {
            httpMock('GET', baseUrl + "/v1/user?user_status=deleted&ct_user_ou_id=" +1);
            UserWebService.getUsers(1).then(function (data) { returnedData = data; });
            $httpBackend.flush();
            expect(returnedData.data).toEqual(mockData);
        });

        it(".checkPassword makes POST request to /oauth/token with json obj", function () {

            // Breaking off the usual pattern since the httpMock abstraction assumes the header
            // contains the Authorization header with the token but this webservice method
            // won't have it since it trying to obtain it
            $httpBackend.when("POST", baseUrl + "/oauth/token", {a:1}, function (headers) {
                return headers["content-type"] === "application/json";
            }).respond(mockData);
            UserWebService.checkPassword({a:1}).then(function (data) { returnedData = data; });
            $httpBackend.flush();
            expect(returnedData.data).toEqual(mockData);
        });


        it(".getUser makes GET request to /v1/user/ with id", function () {
            httpMock('GET', baseUrl + "/v1/user/" +1);
            UserWebService.getUser(1).then(function (data) { returnedData = data; });
            $httpBackend.flush();
            expect(returnedData.data).toEqual(mockData);
        });


        it(".createUser makes POST request to /v1/user/ with json", function () {
            httpMock('POST', baseUrl + "/v1/user", {a:1});
            UserWebService.createUser({a:1}).then(function (data) { returnedData = data; });
            $httpBackend.flush();
            expect(returnedData.data).toEqual(mockData);
        });


        it(".updateUser makes PUT request to /v1/user with json", function () {
            httpMock('PUT', baseUrl + "/v1/user", {a:1});
            UserWebService.updateUser({a:1}).then(function (data) { returnedData = data; });
            $httpBackend.flush();
            expect(returnedData.data).toEqual(mockData);
        });


    });
});



















