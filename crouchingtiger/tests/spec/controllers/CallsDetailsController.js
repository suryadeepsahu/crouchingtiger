describe('theme.callsdetails module', function(){
    var CallsDetailsWebService, pinesNotifications, rootScope, scope, ctrl, routeParams, ReportParam;
    beforeEach( function(){
        module('theme.callsdetails');
        module('theme.services');
        module('ngRoute');
		module('report-components');
        module('report-param');
        module('ui.bootstrap');
        inject(function($injector){
            rootScope              = $injector.get('$rootScope');
            CallsDetailsWebService = $injector.get('CallsDetailsWebService');
            ReportParam            = $injector.get('ReportParam');
            pinesNotifications     = $injector.get('pinesNotifications');
            scope                  = $injector.get('$rootScope').$new();
        })
    });

    describe('CallsDetailsController', function(){
        it('should load module successfully', function(){
            expect(CallsDetailsWebService).toBeDefined();
            expect(pinesNotifications).not.toBeUndefined();
            expect(ReportParam).not.toBeUndefined();
        })
    });
});
