describe('AdvFilSrvc Service', function() {
	beforeEach(function() {
		module('api-param');
		module('theme.services'); // Has pinesNotifications
		module('report-components');
		inject(function($injector) {
			advFilSrvc = $injector.get('advFilSrvc');
		});
	});

	describe('getAdvFilterDefinitions', function() {
		it('Should return the advFilDefinitions', function() {
			advFilSrvc.updateAdvFilterDefinitions([1, 2, 3, 4, 5]);
			expect(advFilSrvc.getAdvFilterDefinitions()).toEqual([1, 2, 3, 4, 5]);
		});
	});
});
