//describe('Unit: MainController', function() {
//    var ctrl, scope, global, element, compiled, compile, window, loggerService, timeout, location, progressLoader;
//
//    beforeEach( module('themesApp') );
//
//    beforeEach(inject(function($injector){
//        scope           = $injector.get('$rootScope').$new();
//        ctrl            = $injector.get('$controller')('MainController', {$scope: scope});
//        global          = $injector.get('$global');
//        compile         = $injector.get('$compile');
//        window          = $injector.get('$window');
//        loggerService   = $injector.get('loggerService');
//        timeout         = $injector.get('$timeout');
//        location        = $injector.get('$location');
//        progressLoader  = $injector.get('progressLoader');
//
//    }));
//
//
//    it('scope initials are set', function(){
//        expect(scope.style_fixedHeader).toEqual( global.get('fixedHeader') );
//        expect(scope.style_headerBarHidden).toEqual( global.get('headerBarHidden') );
//        expect(scope.style_layoutBoxed).toEqual( global.get('layoutBoxed') );
//        expect(scope.style_fullscreen).toEqual( global.get('fullscreen') );
//        expect(scope.style_leftbarCollapsed).toEqual( global.get('leftbarCollapsed') );
//        expect(scope.style_leftbarShown).toEqual( global.get('leftbarShown') );
//        expect(scope.style_rightbarCollapsed).toEqual( global.get('rightbarCollapsed') );
//        expect(scope.style_isSmallScreen).toBe(false);
//        expect(scope.style_showSearchCollapsed).toEqual( global.get('showSearchCollapsed') );
//        expect(scope.style_layoutHorizontal).toEqual( global.get('layoutHorizontal') );
//        expect(scope.events).toEqual([]);
//        expect(scope.rightbarAccordionsShowOne).toBe(false);
//        expect(scope.rightbarAccordions).toEqual( [{open:true},{open:true},{open:true},{open:true},{open:true},{open:true},{open:true}] );
//    });
//
//    describe('scope methods', function(){
//        it('scope methods exist', function(){
//            ['hideSearchBar', 'hideHeaderBar', 'showHeaderBar', 'toggleLeftBar', 'toggleRightBar'].forEach(function(methodName){
//                expect(scope[methodName]).not.toBeUndefined();
//            });
//        });
//
//        it('hideSearchBar method works', function(){
//            global.set('showSearchCollapsed', true);
//            scope.hideSearchBar();
//            expect(global.get('showSearchCollapsed')).toBe(false);
//        });
//
//        it('hideHeaderBar method works', function(){
//
//            global.set('headerBarHidden', false);
//            scope.hideHeaderBar();
//            expect(global.get('headerBarHidden')).toBe(true);
//        });
//
//        //working on
//        // it('showHeaderBar method works', function(){
//        //     var someEvent = scope.$broadcast('click');
//
//        //     spyOn(scope, 'showHeaderBar');
//        //     spyOn(someEvent, 'preventDefault');
//
//        //     scope.showHeaderBar(someEvent);
//
//        //     expect(scope.showHeaderBar).toHaveBeenCalled();
//        //     expect(someEvent.preventDefault).toHaveBeenCalled();
//
//        // });
//
//
//        it('toggleLeftBar method works', function(){
//            //focused on isSmallScreen being true
//            scope.style_isSmallScreen    = true;
//            scope.style_leftbarShown     = false;
//            scope.style_leftbarCollapsed = false;
//            global.set('leftbarShown', false);
//            global.set('leftbarCollapsed', false);
//            scope.toggleLeftBar();
//
//            expect(global.get('leftbarShown')).toBe(true);
//            expect(global.get('leftbarCollapsed')).toBe(false);
//
//
//            //focused on isSmallScreen being false
//            scope.style_isSmallScreen    = false;
//            scope.style_leftbarShown     = false;
//            scope.style_leftbarCollapsed = false;
//            global.set('leftbarShown', false);
//            global.set('leftbarCollapsed', false);
//            scope.toggleLeftBar();
//
//            expect(global.get('leftbarShown')).toBe(false);
//            expect(global.get('leftbarCollapsed')).toBe(true);
//        });
//
//        it('toggleRightBar method works', function(){
//            scope.style_rightbarCollapsed = false;
//            global.set('rightbarCollapsed', false);
//            scope.toggleRightBar();
//            expect(global.get('rightbarCollapsed')).toBe(true)
//        });
//
//        it('logOut method works', function(){
//            window.sessionStorage.token = 'abc123';
//            scope.logOut();
//            expect(window.sessionStorage.token).toBeUndefined();
//        });
//
//        it('logIn method works', function(){
//            scope.isLoggedIn = false;
//            scope.logIn();
//            expect(scope.isLoggedIn).toBe(true);
//        });
//
//        it('logger method works', function(){
//            spyOn(loggerService, 'logAction');
//
//            scope.logger('Voldemort', 'Avada Kadavre');
//            expect(loggerService.logAction).toHaveBeenCalledWith('Voldemort', 'Avada Kadavre')
//        });
//    });//end of scope methods
//
//    describe('broadcast event handlers', function(){
//
//        it('$idleTimeout triggered', function(){
//            spyOn(scope, 'logOut');
//            scope.$broadcast('$idleTimeout');
//            expect(scope.logOut).toHaveBeenCalled();
//        });
//
//        it('globalStyles:changed triggered', function(){
//            var temp = {key: 123, value: 'some NEW value'};
//            scope['style_'+temp.key] = 'teh OLD value';
//            scope.$broadcast('globalStyles:changed', temp);
//
//            expect(scope['style_'+temp.key]).toBe(temp.value);
//        });
//
//        // it('globalStyles:maxWidth767 triggered', function(){
//        //     var newVal = false;
//
//        //     //if branch
//        //     scope.style_isSmallScreen = true;
//        //     global.set('leftbarShown', true);
//        //     global.set('leftbarCollapsed', true);
//        //     scope.$broadcast('globalStyles:maxWidth767', newVal);
//        //     timeout.flush();
//        //     expect(scope.style_isSmallScreen).toBe(newVal);
//        //     expect(global.get('leftbarShown')).toBe(false);
//        //     expect(global.get('leftbarCollapsed')).toBe(true);
//
//
//        //     //else branch
//        //     newVal = true;
//        //     scope.style_isSmallScreen = false;
//        //     global.set('leftbarShown', true);
//        //     global.set('leftbarCollapsed', true);
//        //     scope.$broadcast('globalStyles:maxWidth767', newVal);
//        //     timeout.flush();
//        //     expect(scope.style_isSmallScreen).toBe(newVal);
//        //     expect(global.get('leftbarShown')).toBe(true);
//        //     expect(global.get('leftbarCollapsed')).toBe(false);
//        // });
//
//
//        it('$routeChangeStart triggered1/2', function(){
//            var next = {params: {templateFile:'jbieber'}};
//            delete window.sessionStorage.token;
//            spyOn(location, 'path');
//            scope.$broadcast('$routeChangeStart', next);
//            expect(location.path).toHaveBeenCalledWith('/login');
//
//            window.sessionStorage.token = 'abc123';
//        });
//
//        it('$routeChangeStart triggered2/2', function(){
//            var next = {params: {templateFile:'forgotpassword'}};
//            scope.isLoggedIn = false;
//            window.sessionStorage.token = 'abc123';
//            spyOn(progressLoader, 'start');
//            spyOn(progressLoader, 'set');
//            spyOn(scope, 'isLoggedIn');
//
//            scope.$broadcast('$routeChangeStart', next);
//
//            expect(progressLoader.start).toHaveBeenCalled();
//            expect(progressLoader.set).toHaveBeenCalledWith(50);
//            expect(scope.isLoggedIn).not.toEqual(false);
//            expect(scope.isLoggedIn).toEqual(window.sessionStorage.token);
//        });
//
//        it('$routeChangeSuccess triggered', function(){
//            spyOn(progressLoader, 'end');
//            scope.$broadcast('$routeChangeSuccess');
//            expect(progressLoader.end).toHaveBeenCalled();
//        });
//
//    });
//
//
//
//}); // end of Unit: MainController
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
