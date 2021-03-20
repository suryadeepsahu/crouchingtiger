angular
.module('theme.pages-signup',[])
.factory('signUpWebService', function($http, ApiParam) {
	'use strict';
	var signUpWebService = {};


	signUpWebService.getGeoArea = function (val) {
		var req = {
			method  : 'GET',
			url     : ApiParam.baseURL() + "/v1/signup/npa/"+val,
		};
		return $http(req);
	};

	signUpWebService.getIndustry = function (data) {
		var req = {
			method  : 'GET',
			url     : ApiParam.baseURL() + "/v1/signup",
			data    : data
		};
		return $http(req);
	};

	signUpWebService.getUserEmail = function (data) {
		var req = {
			method  : 'GET',
			url     : ApiParam.baseURL() + "/v1/signup/"+data,
		};
		return $http(req);
	};

	signUpWebService.saveuser = function (data) {
		var req = {
			method  : 'POST',
			url     : ApiParam.baseURL() + "/v1/signup",
			data    : data
		};
		return $http(req);
	};
	return  signUpWebService;
})

.controller('signUpController', ['$scope','$global','$window','signUpWebService','pinesNotifications','$location', '$cookies',  function($scope,$global,$window,signUpWebService,pinesNotifications, $location, $cookies ) {
	'use strict';

	var env = $cookies.get('name');
	var year = new Date().getFullYear();
	var range = [];
	var monthRange = [];
	var cardLength ="";
	var arrError = [];

	$global.set('fullscreen', true);
	$scope.creditCardTypes = ['Visa','MasterCard','AmericanExpress','Discover'];
	$scope.countries = ['United States','Canada'];
	$scope.united = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
	$scope.canada = ['Alberta','British Columbia','Manitoba','New Brunswick','Newfoundland','Northwest Territories','Nova Scotia','Ontario','Prince Edward Island','Quebec','Saskatchewan','Yukon'];
	$scope.tollFree = ["800", "844", "855", "866", "877", "888","833","822"];
	// $scope.emailFormat = /^[a-zA-Z]+[a-zA-Z0-9._]+@[a-zA-Z]+\.[a-zA-Z.]{2,5}$/;
	$scope.showSignUpPage       = true;
	$scope.showcreditDetailPage = false;
	$scope.showalreadyEmail = false;
	$scope.showNext = true;
	$scope.mask = "'mask':'999999999999999'";
	$scope.cvvMask = "'mask':'999'";
	$scope.AccountTier = "Tier 4 = >$29-$500";
	$scope.stateName ='State';
	$scope.zipType = "/^(\d{5}([\-]\d{4})?)*$/";
	$scope.zipError = "Zip Code";
	$scope.zipLength= 5;
	$scope.num ="/^\d+$";
	$scope.cardNumMin =16;
	$scope.cardNumMax =16;
	$scope.disableSignup= false;
	$scope.encryptionKey = $cookies.get('encryptionKey');
	if(!$location.search().subscription_id && $location.path() === "/signup"){
		$location.search("subscription_id",16);
	}
	if(!$location.search().free_trial && $location.path() === "/signup"){
		$location.search("free_trial","no");
	}
	$scope.subscription_id = $location.search().subscription_id ? parseInt($location.search().subscription_id) : 16;
	$scope.isFreeTrial = $location.search().free_trial;
	$scope.free_trial = $location.search().free_trial === "yes" ? true : false;

	if($scope.free_trial){
		$scope.AccountTier = "Marketing Qualified Lead";
	}else{
		$scope.AccountTier = "Tier 4 = >$29-$500";
	}

  	$scope.lable = "Start with Convirza because you deserve";
	$scope.lable1 = "the best call analytics on the market today!";
	$scope.navigateToLogin = function() {
		$location.path('/login');
	};

	range.push(year);
	 var i;
	for(i=1;i<20;i++)
		range.push(year + i);
	$scope.years = range;

	var currentMonth = 1;
	var currentYear = (new Date()).getFullYear();
	for(i=currentMonth; i<13; i++)
		monthRange.push(i);
	$scope.months = monthRange;

	var regExpressions = {
         "Visa": /^4\d{3}-?\d{4}-?\d{4}-?\d{4,7}$/,
         // Visa: length 16, prefix 4, dashes optional.
         "MasterCard": /^5[1-5]\d{2}-?\d{4}-?\d{4}-?\d{4}$/,
         // Mastercard: length 16, prefix 51-55, dashes optional.
         "Discover": /^(?:6011-?\d{4}-?\d{4}-?\d{4}|5[0-9]\d{13})$/,
	 		 	// Discover: length 16, prefix 6011, dashes optional.
         "AmericanExpress": /^3[4,7]\d{13}$/,
         // American Express: length 15, prefix 34 or 37.
				 "None": /^[1,2,7,8,9,0]\d{15}|[1,2,7,8,9,0]\d{14}|[1,2,7,8,9,0]\d{18}|[3][0,1,2,3,5,6,8,9]\d{13}|[6][1,2,3,4,5,6,8,9]\d{13}$/,
     };

	$scope.changeDate =function(expirationYear){
		currentMonth = (new Date()).getMonth()+1;
		if(currentYear == $scope.expirationYear && $scope.expirationMonth < currentMonth){
			pinesNotifications.notify({
				title:'Sign up',
				text: "Credit Card is Expired ",
				type: 'error'
			});
			$scope.expirationMonth = '';
			return false;
		}
  };

	// In this function card type is assinging on credit card type field and min and max length of card number is also assign
	$scope.cardValidate = function(cardNumber){
		 cardLength =cardNumber.split("_").join("");
		if(cardLength.length < 20 && cardLength.length > 14){
			for (var cardType in regExpressions) {
					var exp = regExpressions[cardType];
					if (exp.test(cardNumber)) {
							$scope.cardType = cardType;   	// Here card type is assign to CardType field of UI
							break;
					}
					continue;
			}
		}

		if((cardLength.length === 14 && $scope.cardType !== "Visa") || (cardLength.charAt(0) === "5" && cardLength.charAt(1) < 9)){
			$scope.cardNumMin =16;
			$scope.cardNumMax =16;
		}
		if((cardLength.charAt(0) === "5" && (cardLength.charAt(1) > 5 || cardLength.charAt(1) === 0)) || (cardLength.charAt(0) === "3" && (cardLength.charAt(1) === "4" || cardLength.charAt(1) === "7"))){
			$scope.cardNumMin =15;
			$scope.cardNumMax =15;
		}
		if(cardLength.charAt(0) === "4"){
			$scope.cardNumMin =16;
			$scope.cardNumMax =19;
		}

		if($scope.cardType === "None" && cardLength.length > 14 ){
			arrError.push("Invalid Credit Card Number");
		}

		// Validation massage for Invalid card number
		if(arrError.length)
		{
			pinesNotifications.notify({
			 title:'Sign up',
			 text: "Invalid Credit Card Number",
			 type: 'error'
		 });
		 $scope.cardNumber ='';
		 $scope.cardType ='';
		 $scope.securityCode='';
		 $scope.cardNumMin =16;
		 $scope.cardNumMax =16;
		 arrError.pop();
		 console.log(arrError.length);
		}
	};

	$scope.selectcountry = function(country){
		console.log('SELECT COUNTRY FIRED:', country);
		 if(country === "United States"){
			 	 $scope.zipType="";
				 $scope.zipCode ="";
				 $scope.stateName  = "State";
				 $scope.zipError = "Zip Code";
				 $scope.statesData = $scope.united;
				 $scope.zipLength = 5;
				 $scope.zipType='^([0-9][0-9][0-9][0-9][0-9])*$';
			 }else if(country === "Canada"){
				 $scope.zipType="";
				 $scope.zipCode ="";
				 $scope.stateName  = "Province";
				 $scope.zipError = "Postal Code";
				 $scope.statesData = $scope.canada;
				 $scope.zipLength = 7;
				 $scope.zipType='^([A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9])*$';
			 }
		};
		$scope.phoneValidate = function(phoneNumber){
			var phoneNum =	phoneNumber.replace('(','').replace(')','').split("_").join("");
			if(phoneNum.length === 10){
				signUpWebService.getGeoArea(phoneNum.substring(0,3)).then(function(result){
					 if(!result.data && ($scope.tollFree.indexOf(phoneNum.substring(0,3))>-1 === false)){
						 pinesNotifications.notify({
							 title:'Sign up',
							 text: "Please Enter Valid Phone Number",
							 type: 'error'
						 });
						$scope.phone ='';
					 }
				});
			}
		};

	$scope.next = function() {
		signUpWebService.getUserEmail($scope.email).then(function(result){
			if(result.data){
				$scope.showSignUpPage       = false;
				$scope.showcreditDetailPage = true;
				$scope.showalreadyEmail = false;
				$scope.showNext = false;
				$scope.lable1 = '';
				if($scope.free_trial === true){
					$scope.lable = "You're almost done! Simply enter your credit card information to finish setting up your account. You won't be charged until after your free month ends.";
				}else{
					$scope.lable = "You're almost done! Simply enter your credit card information to finish setting up your account.";
				}
			}else{
				$scope.showalreadyEmail = true;
				$scope.showSignUpPage       = false;
				$scope.showcreditDetailPage = false;
				$scope.showNext = false;
				$scope.lable1 = '';
				$scope.lable = '';
			}
		});
	};

	$scope.cancel = function() {
		$scope.showSignUpPage       = true;
		$scope.showcreditDetailPage = false;
		$scope.showNext = true;
		$scope.showalreadyEmail = false;
		$scope.lable = "Start with Convirza because you deserve";
		$scope.lable1 = "the best call analytics on the market today!";
	};

	 $scope.$watch("cardType", function(newValue, oldValue) {
		 $scope.readonly = true;
		 $scope.cvvMask = "'mask':'999'";
		 $scope.cvvLength = "5";
		 $scope.securityCode = "";

		 switch (newValue) {
		    case 'AmericanExpress':
						$scope.cardNumMin =15;
						$scope.cardNumMax =15;
						$scope.cvvLength = "6";
						$scope.cvvMask = "'mask':'9999'";
		        break;
		    case 'Discover':
							$scope.cardNumMin =15;
						  $scope.cardNumMax =16;
						break;
		    case 'Visa':
						$scope.cardNumMin =16;
						$scope.cardNumMax =19;
		        break;
		    case 'MasterCard':
						$scope.cardNumMin =16;
						$scope.cardNumMax =16;
		        break;
				default:
						$scope.cardNumMin =16;
						$scope.cardNumMax =16;
						break;

			}
	});

	signUpWebService.getIndustry().then(function(result){
		if(result.status === 200){
				var organizedIndustries = {};
				var industryCategory, industrySpecific, industryOtherId, industryOtherCategory;
				_.each(result.data, function (industryObj) {
					industryCategory = industryObj.industry_group;
					industrySpecific = industryObj.industry_name;
					if (organizedIndustries[industryCategory] === undefined) {
						organizedIndustries[industryCategory] = {
							'name'  :industryCategory,
							specific:[]
						};
					}
					if (industryCategory !== 'Other') {
						organizedIndustries[industryCategory].specific.push({
							'name':" - "+industrySpecific,
							'id'  :industryObj.industry_id
						});
					} else {
						industryOtherId = industryObj.industry_id;
						industryOtherCategory = industryCategory;
					}
				});
				//add 'Other' object last so it appears last in the ng-repeat
				organizedIndustries.Other = {
					'name'  :industryOtherCategory,
					specific:[]
				};
				organizedIndustries.Other.specific.push({
					//'name':'Other',
					'id'  :industryOtherId
				});
				$scope.industryList = organizedIndustries;
		} else {
			pinesNotifications.notify({
				title: 'Sign up',
				text: result.data,
				type: 'error'
			});
		}
	});

	$scope.zipLen = function(){
		$scope.zipCode = $scope.zipCode.replace(/[@!&\/\\#,+()$~%.'":*?<>{}]/g,'');
		if($scope.country === "United States" && $scope.zipCode.length < 5)	{
			pinesNotifications.notify({
				title:'Sign up',
				text: "Zip Code field is invalid.",
				type: 'error'
			});
			return false;
		} else if($scope.country === "Canada" && $scope.zipCode.length < 7){
			pinesNotifications.notify({
				title:'Sign up',
				text: "Postal Code field is invalid.",
				type: 'error'
			});
			return false;
		} else {
			return true;
		}
	};
	$scope.signUp = function(){
		if(!$scope.zipLen()) {
			return false;
		}
		var numberOfDaysToAdd = 1;
		$scope.cardNumber = $scope.cardNumber.replace("_","");
		var activationDate = new Date();
		activationDate.setDate(activationDate.getDate() + numberOfDaysToAdd);
		var cardNumber = $scope.cardNumber.replace(/-/g, "");
		var CVVNumber = $scope.securityCode.replace(/-/g, "");
		var user = {};
		var signUpData = {
			"name"         : $scope.company,
			"currency"     : "USD",
			"billCycleDay" : activationDate.getDate(),
			"Industry_Id__c" : $scope.industry,
			"Account_Tier__c": $scope.AccountTier,
			"billToContact": {
			 	"firstName"   : $scope.firstName,
			 	"lastName"    : $scope.lastName,
			 	"state"       : $scope.state,
			 	"country"     : $scope.country,
			 	"workEmail"   : $scope.email,
			 	"mobilePhone" : $scope.phone
			},
			"creditCard": {
				"cardType"       : $scope.cardType,
				"cardNumber"     : encrypt(cardNumber),
				"securityCode"	 : encrypt(CVVNumber),
				"expirationMonth": encrypt($scope.expirationMonth.toString()),
				"expirationYear" : encrypt($scope.expirationYear.toString()),
				"cardHolderInfo" : {
					"cardHolderName": encrypt($scope.cardHolderName),
					"addressLine1"  : $scope.addressLine,
				 	"city"          : $scope.city,
					"state"         : $scope.state,
					"zipCode"       : $scope.zipCode,
					"country"       : $scope.country
				},
			}
		};
		user.userData = signUpData;
		user.subscriptionData = {
			"free_trial" : $scope.free_trial,
			"subscription_id" : $scope.subscription_id
		};
		$scope.disableSignup= true;
		signUpWebService.saveuser(user).then(function(result){
			if(result.data.success === true){
				$window.location.href = "#/thankyou";
			} else {
				pinesNotifications.notify({
					title: 'Sign up',
					text: result.data,
					type: 'error'
				});
			}
	  });
	};

	function encrypt(text) {
		return CryptoJS.AES.encrypt(text, $scope.encryptionKey).toString();
	}
}]);
