angular
	.module('theme.form-directives', ['ngSanitize', 'ngCsv'])
	// .config(function($provide) {
 	// 	$provide.decorator('uibDatepickerPopupDirective', function($delegate) {
   	// 		var directive = $delegate[0];
   	// 		var link = directive.link;
    //         var today;
   	// 		directive.compile = function() {
    // 			return function(scope, element, attrs, ngModel) {
	//        			link.apply(this, arguments);
	//        			scope.select = function( date ) {
	// 		    		if (date === null) {
	// 		          		today = new Date();
	// 		          		//Here we set year to 1900 so that we can compare date in controller and
	// 		          		//perform action for never button clicked and again set date to null in controller.
	// 		            	today = today.setFullYear(1900);
	// 		            	date = new Date(new Date(today).setHours(0, 0, 0, 0));
	// 		        	}

	// 	        if (date === 'today') {
	// 	          today = moment().tz(attrs.timezone).format("YYYY-MM-DD HH:mm:ss");
	// 	          today = moment(today).toDate();
	// 	          if (angular.isDate(ngModel.$modelValue)) {
	// 	            date = new Date(ngModel.$modelValue);
	// 	            date.setFullYear(today.getFullYear(), today.getMonth(), today.getDate());
	// 	          } else {
	// 	            date = new Date(today.setHours(0, 0, 0, 0));
	// 	          }
	// 	        }
	// 	        scope.dateSelection( date );
	// 	      };
	//       };
	//     };
	//     return $delegate;
	//   });
	// })
	
	.directive('autosize', function () {
		'use strict';
		return {
			restrict: 'AC',
			link: function (scope, element, attr) {
				element.autosize({append: "\n"});
			}
		};
	})
	.directive('fullscreen', function () {
		'use strict';
		return {
			restrict: 'AC',
			link: function (scope, element, attr) {
				element.fseditor({maxHeight: 500});
			}
		};
	})
	.directive('colorpicker', function () {
		'use strict';
		return {
			restrict: 'AC',
			link: function (scope, element, attr) {
				element.colorpicker();
			}
		};
	})
	.directive('daterangepicker', function ($window) {
		'use strict';
		return {
			restrict: 'A',
			scope: {
				options: '=daterangepicker',
				start: '=dateBegin',
				end: '=dateEnd',
				onapplychange: '&'
			},
			link: function (scope, element, attr) {
				element.daterangepicker(
					scope.options,
					function (start, end) {
						if (scope.start) scope.start = start.format('MMMM D, YYYY');
						if (scope.end) scope.end = end.format('MMMM D, YYYY');
						// update bindings attached to this directive
						scope.$apply();
						scope.onapplychange();
					});
			}
		};
	})
	.directive('angularMultiselect', function ($timeout, $parse) {
		'use strict';
		return {
			restrict: 'A',
        	require: 'ngModel',
			scope: {
				ngModel: "=",
				multiSelectoptions: "=",
				campaignUsersMapping: "="
			},
			link: function (scope, multiselectElement, attr, ngModel) {
				var multiselectId = "#" + attr.id, options;
				multiselectElement.multiSelect({
					//action to be performed on click on dist list
					afterSelect: function(value){
						if(value[0].split("-")[0] === 'campaign'){
							var assignedUsers = [], selectedCampaignUsersName, appendhtml = "<div class='disabled' id='users'>";
							//compare selected campaign id from campaign-users maping and
							//generate html of all users, if campaign is selected
							_.each(scope.campaignUsersMapping, function(CUMaping){
								if (CUMaping.campaignid == value[0].split("-")[1]){
									//find assigned users of selected campaign
									assignedUsers = CUMaping.usersid.split(",");
									selectedCampaignUsersName = CUMaping.usersname.split(",");
									_.each(selectedCampaignUsersName, function(user){
										appendhtml +=  user + " </br> ";
									});
									appendhtml += " </div>";
								}
                        		});
								_.each(assignedUsers, function(assignedUser){
								options = angular.element(multiselectId).children();
									_.each(options, function(option, index){
									//hide all users form selected campaign in dist list
								        if (option.value !== undefined && option.value !== null && option.value === assignedUser){
								         	angular.element(".ms-elem-selectable").eq(index).css('display','none');
								        }
									//show all users from selected campaign in assigned users by appending generated html
									if(option.value !== undefined && option.value !== null && option.value == value){
										angular.element(".ms-elem-selection").eq(index).children("#users").remove();
										angular.element(".ms-elem-selection").eq(index).append(appendhtml);
									}
								});
                        	});
						}
					},

					//action to be performed when deselecting a campaign from assigned user list
					afterDeselect: function(value){
						//check if campaign is selected
						if(value[0].split("-")[0] === 'campaign'){
							var assignedCampaigns=[], assignedUsers=[], unAssignedUsers=[];
							//get seperate lists of assigned campaigns and users
							_.each(scope.ngModel, function(user){
								if(user.split("-")[0] === 'campaign'){
									assignedCampaigns.push(user.split("-")[1]);
								}
								else{
									assignedUsers.push({'id' : user});
								}
							});
							//get selected campaign users and assigned campaigns users from campaignUsersMapping
							var selectedCampaignUsers = [],	assignedCampaignsUsers = [];
							_.each(scope.campaignUsersMapping, function(CUMaping){
								if (CUMaping.campaignid == value[0].split("-")[1]){
									var deSelectedUsers = CUMaping.usersid.split(",");
									_.each(deSelectedUsers, function(deSelectedUser){
										selectedCampaignUsers.push({'id' : deSelectedUser});
									});
									}
								_.each(assignedCampaigns, function(campaignId){
									if (campaignId == CUMaping.campaignid){
										var SelectedUsers = CUMaping.usersid.split(",");
										_.each(SelectedUsers, function(user){
											assignedCampaignsUsers.push({'id' : user});
								});
									}
								});
							});
							//get unAssignedUsers which are not individualy assigned and also not in assigned campaign
							_.each(selectedCampaignUsers, function(user){
								if (!_.findWhere(assignedCampaignsUsers, user) && !_.findWhere(assignedUsers, user)){
									unAssignedUsers.push(user);
								}
							});
							//show unassigned user from selected campaign in dist list
							_.each(unAssignedUsers, function(unAssignedUser){
								options = angular.element(multiselectId).children();
									_.each(options, function(option, index){
									if (option.value !== undefined && option.value !== null && option.value === unAssignedUser.id){
											angular.element(".ms-elem-selectable").eq(index).css('display','block');
										}
								});
							});
						}
				  	}
				});

				//Fill the multiselect options
				_.each(scope.multiSelectoptions, function(option){
					angular.element(multiselectId).multiSelect('addOption', { value: option.key, text: option.text, index: 0 });
				});
				//find campaign from list and make it bold
				options = angular.element(multiselectId).children();
				_.each(options, function(option, index){
					if (option.value !== undefined && option.value !== null && option.value.split("-")[0] === 'campaign'){
						angular.element(".ms-elem-selectable").eq(index).css('font-weight','bold');
						angular.element(".ms-elem-selection").eq(index).css('font-weight','bold');
					}
				});

				//Action to be performed on Edit clicked
				$timeout(function() {
					var appendhtml,selectedCampaignUsers;
					var campaignIds=[], unAssignedUsers=[];
					_.each(scope.ngModel, function(user){
						if(user.split("-")[0] === 'campaign')
							campaignIds.push(user.split("-")[1]);
					});
					var listDetails = {
						'campaignIds' : campaignIds,
						'selectedCampaignId' : undefined
					};

					//get all users of assigned campaigns
					var campaignIdsUsers = [];
					_.each(scope.campaignUsersMapping, function(campaigndetails){
						_.each(campaignIds, function(campaignId){
							if (campaignId == campaigndetails.campaignid){
								var SelectedUsers = campaigndetails.usersid.split(",");
								_.each(SelectedUsers, function(user){
									campaignIdsUsers.push({'id' : user});
								});
							}
						});
					});
					//hide users from dist list which are allready selected
						_.each(campaignIdsUsers, function(user){
						options = angular.element(multiselectId).children();
							_.each(options, function(option, index){
								if (option.value !== undefined && option.value !== null && option.value === user.id){
									angular.element(".ms-elem-selectable").eq(index).css('display','none');
								}
							});
						});
				 	angular.element(multiselectId).multiSelect('select', scope.ngModel);
				  	options = angular.element(multiselectId).children();
				  	//get users from all assigned campaigns, generate html of users and append into campaign
					_.each(scope.ngModel, function(user){
						if(user.split("-")[0] === 'campaign'){
							appendhtml = "<div class='disabled' id='users'>";
							_.each(scope.campaignUsersMapping, function(campaigndetails){
								if (campaigndetails.campaignid == user.split("-")[1]){
									selectedCampaignUsers = campaigndetails.usersname.split(",");
									_.each(selectedCampaignUsers, function(user){
										appendhtml +=  user + " </br> ";
					});
									appendhtml += " </div>";
									_.each(options, function(option, index){
										if(option.value !== undefined && option.value !== null && option.value == user){
											angular.element(".ms-elem-selection").eq(index).children("#users").remove();
											angular.element(".ms-elem-selection").eq(index).append(appendhtml);
					}
									});
								}
							});
						}
					});
			    }, 0);

			}
		};
	})
	.directive('multiselect', function () {
		'use strict';
		return {
			restrict: 'A',
			link: function (scope, element, attr) {
				element.multiSelect();
			}
		};
	})
	.directive('wizard', function () {
		'use strict';
		return {
			restrict: 'A',
			scope: {
				options: '=wizard'
			},
			link: function (scope, element, attr) {
				if (scope.options) {
					element.stepy(scope.options);

					//Make Validation Compability - see docs
					if (scope.options.validate === true)
						element.validate({
							errorClass: "help-block",
							validClass: "help-block",
							highlight: function (element, errorClass, validClass) {
								$(element).closest('.form-group').addClass("has-error");
							},
							unhighlight: function (element, errorClass, validClass) {
								$(element).closest('.form-group').removeClass("has-error");
							}
						});
				}
				else {
					element.stepy();
				}
				//Add Wizard Compability - see docs
				element.find('.stepy-navigator').wrapInner('<div class="pull-right"></div>');
			}
		};
	})
	.directive('checklength', ['$parse', 'pinesNotifications', function ($parse, pinesNotifications) {
		'use strict';
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function (scope, element, attr, ctrl) {
				element.bind('blur, keyup', function () {
					if ($(this).attr('required')) {
						var phoneNum = element.val().replace(/[^0-9]+/g, '');
						if (phoneNum.length < parseInt(element.attr('checklength'))) {
							ctrl.$setValidity('phone', false);
						} else if(parseInt(phoneNum) < 1000000000) {
							ctrl.$setValidity('phone', false);
						} else {
							ctrl.$setValidity('phone', true);
							ctrl.$setValidity('maxlength', true);
						}
					} else {
						ctrl.$setValidity('maxlength', true);
					}
				});
			}
		};
	}
	])
	.directive('checkDuplicate', ['$parse', 'pinesNotifications', '$rootScope','UserWebService',function ($parse, pinesNotifications,$rootScope,UserWebService) {
		'use strict';
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function (scope, element, attr, ctrl) {
				element.bind('keyup, blur', function () {
					scope.isDupliNoPercentage=false;
					var index = parseInt(element.attr('check-duplicate'));
					if($rootScope.is_migrated === false || $rootScope.is_migrated === 'false'){
					for (var i = 0; i < scope.percentageRingtoNum.length; i++) {
						if (scope.percentageRingtoNum[index].ringtonum !== '' && scope.percentageRingtoNum[index].ringtonum !== undefined) {
							var numToCheck = parseInt(scope.percentageRingtoNum[index].ringtonum.replace(/[^0-9]+/g, ''));
							var num = parseInt(scope.percentageRingtoNum[i].ringtonum.replace(/[^0-9]+/g, ''));
							if (scope.percentageRingtoNum[index].ringtonum !== "" && num === numToCheck && index !== i) {
								scope.isDupliNoPercentage = true;
							}
						} else if (scope.percentageRingtoNum[index].ringtonum === '' || scope.percentageRingtoNum[index].ringtonum === undefined && (scope.percentageRingtoNum[index].percentage === '' || scope.percentageRingtoNum[index].percentage === undefined)) {
							var tot = 0;
							_.each(scope.percentageRingtoNum, function (ringToNum) {
								if ((ringToNum.percentage !== '' && ringToNum.percentage !== undefined)) {
									tot = tot + parseInt(ringToNum.percentage);
								}
							});
							if (100 === tot && (scope.percentageRingtoNum[index].ringtonum !== '' || scope.percentageRingtoNum[index].ringtonum === undefined)) {
								scope.numPer = index - 1;
							}
						}
					}
				}
				else if($rootScope.is_migrated === true || $rootScope.is_migrated ==='true'){
					
					var duplicateArr = [];
					var duplicateArrRingtoNum = [];
					var percentageRingToNumbers = _.pluck(scope.percentInfo,'ringToNum');
					_.each(percentageRingToNumbers,function(percentageRingToNumber){
						if(percentageRingToNumber !==undefined && percentageRingToNumber !=="")
						duplicateArrRingtoNum.push(UserWebService.unMaskData(percentageRingToNumber));
					});
					var duplicateNumber = findDuplicates(duplicateArrRingtoNum);
					_.each(duplicateNumber,function(duplicateNumber1){
						if(duplicateNumber1 !== '' && duplicateNumber1 !== undefined){
							duplicateArr.push(duplicateNumber1);
						}
					});
					if(duplicateArr.length > 0){
						pinesNotifications.notify({
							title: 'Percentage Call route',
							text: 'Duplicate ring to number '+ duplicateNumber.toString(),
							type: 'error'
						});
					}
				}
				if (scope.isDupliNoPercentage) {
					ctrl.$setValidity('maxlength', false);
					if (!element.hasClass('ng-invalid')) {
						pinesNotifications.notify({
							title: 'Tracking Number Details Form',
							text: 'Duplicate ring to number ' + scope.percentageRingtoNum[index].ringtonum,
							type: 'error'
						});
					}
				} else {
					ctrl.$setValidity('maxlength', true);
				}
				function findDuplicates(arra1) {
					var object = {};
					var result = [];
					arra1.forEach(function (item) {
						if(!object[item])
						object[item] = 0;
						object[item] += 1;
					});
					for (var prop in object) {
						if(object[prop] >= 2) {
							result.push(prop);
						}
					}
					return result;
				}
			});
		}
	};
	}
	])

	.directive('clearinputmask', function () {
		'use strict';
		return {
			restrict: 'A',
			// scope: {
			// 	ngModel: '='
			// },
			link: function (scope, element, attr) {
				element.bind("keydown keypress", function (event) {
					if(element.val().length === 0){
						scope[element.attr('ng-model')] = undefined;
					}
				});
			}
		};
	})

	.directive('maskinput', function () {
		'use strict';
		return {
			restrict: 'A',
			link: function (scope, element, attr) {
				var mask = element.attr('data-inputmask');
				var userMask;
				if(mask !== undefined){
					var newMask = mask.split(":");
					userMask = newMask[1].replace(/'/g, "");
					element.inputmask({
						"mask": userMask,
						oncleared: function () {
							scope.$data = " ";
						}
					});
				}else{
					var masks = element.attr('data-scopeinputmask');
					scope.$watch(masks, function() {
						if(scope[masks] !== undefined)
						userMask = scope[masks].split(":")[1].replace(/'/g, "");
						element.inputmask({
							"mask": userMask,
							oncleared: function () {
								scope.$data = " ";
							}
						});
					});
				}
			}
		};
	})

	.directive('numberOnly', function () {
		'use strict';
		return {
			restrict: 'A',
			link: function (scope, element, attr) {
				// element.inputmask();
				element.bind("keydown keypress", function (event) {
					var charCode = event.keyCode;
					if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
						event.preventDefault();
					}
				});
			}
		};
	})
	.directive('wysiwygCkeditor', function () {
		'use strict';
		return {
			restrict: 'A',
			scope: {
				options: '=wysiwygCkeditor'
			},
			link: function (scope, element, attr) {

				if (scope.options && scope.options.inline === true)
					return CKEDITOR.inline(attr.id || attr.name, scope.options);

                CKEDITOR.replace(attr.id || attr.name, scope.options);
			}
		};
	})

	//cant use this directive and a separate ng-pattern="" directive as well
	.directive("validateUtfEight", function ($compile) {
		'use strict';
		return {
			restrict: 'A',
			terminal: true,
			priority: 1000,
			compile: function compile(element, attrs) {
				element.attr('ng-pattern', '/^[\\x00-\\x7F]+$/');
				element.removeAttr('validate-utf-eight');
				return {
					pre: function preLink(scope, iElement, iAttrs, controller) {
					},
					post: function postLink(scope, iElement, iAttrs, controller) {
						$compile(iElement)(scope);
					}
				};
			}
		};
	})

	.directive('validateBlurForza', function (pinesNotifications) {
		'use strict';
		return {
			restrict: 'A',
			scope: {
				ngModel: '='
			},
			link: function link(scope, element, attrs) {
				var longDistanceMins = {
					"Alaska": ["907", "250", "385"]
				};
				var formNameAndFieldName = attrs.validateBlurForza.split(',').map(function (val) {
					return val.trim();
				});
				var formName = formNameAndFieldName[0];
				var fieldName = formNameAndFieldName[1];
				//var flag = true;
				element.bind('keyup, change', function () {
					element.closest('div').removeClass('has-error');
					if (element.next().hasClass('editable-error')) {
						element.next().remove();
					}
					scope.$apply(function () {
						element.hasFocus = true;
					});
				});
				element.bind('blur', function () {
					var blurElement = element.val();
					var elementValue = '';
					var flag = true;
					if (blurElement) {
						elementValue = (element.val()).trim();
					}
					// if (element.context.name == "org_unit_name"){// validation for subGroup name
					// 	var re = new RegExp("([-a-z0-9A-Z,@\xAE ])+$");
					// 	if (re.test(elementValue)) {
    				// 		flag = true;
					// 	} else {
    				// 		flag = false;
					// 	}
					// }
					
					if (element.hasClass('ng-invalid') && (elementValue.length || angular.isUndefined(scope.ngModel))) {
						if (element.hasClass('ng-invalid-required') && !element.hasClass('ng-invalid-number')) {
							/*  pinesNotifications.notify({
							 title: formName + ' form',
							 text:  '\'' + fieldName + '\' field is required.',
							 type:  'error'
							 });*/
						} else {

							pinesNotifications.notify({
								title: attrs.validateBlurForza.split(',')[0].trim() + ' Form',
								text: "'" + attrs.validateBlurForza.split(',')[1].trim() + "' field is invalid.",
								type: 'error'
							});
						}
					}
				});
			}
		};
	})

	.directive('applyCss', function (pinesNotifications) {
		'use strict';
		return {
			restrict: 'A',
			scope: {
				ngModel: '='
			},
			link: function link(scope, element, attrs) {
				console.log(element.hasClass("invalidTag"));
				if(element.hasClass("invalidTag")){
					element.closest('li').addClass('invalidList');	
				}
			}
		};
	})

	.directive('remainingText', function (pinesNotifications) {
		'use strict';
		return {
			restrict: 'A',
			scope: {
				ngModel: '='
			},
			link: function link(scope, element, attrs) {
				element.siblings();
				
			}
		};
	})

	.directive('removeErrorBlur', function () {
		'use strict';
		return {
			restrict: 'A',
			link: function link(scope, element, attrs) {
				element.bind('change, keyup', function () {
					element.closest('div').removeClass('has-error');
					if (element.next().hasClass('editable-error')) {
						element.next().remove();
					}
					scope.$apply(function () {
						element.hasFocus = true;
					});
				});
			}
		};
	})

	.directive('autoComplete', ['pinesNotifications', function (pinesNotifications) {
		'use strict';
		return {
			restrict: 'A',
			scope: {
				ngModel: '=',
				dtId: '=',
				uiItems: '=',
				addCallAction: '='
			},
			link: function link(scope, iElement, iAttrs) {
				var source2 = [];
				var term = "";
				var evt;
				var flag;
				var select = false;
				var autocompleteString;

				iElement.autocomplete({
					source: function (request, response) {
						scope.addCallAction.callActionFormSubmitted[scope.dtId] = false;
						select = false;
						if (angular.isUndefined(autocompleteString)) {
							if (angular.isUndefined(scope.ngModel)) {
								autocompleteString = "";
							} else {
								if (scope.ngModel != request.term) {
									autocompleteString = scope.ngModel;
								} else {
									autocompleteString = "";
								}
							}
						}

						if (autocompleteString.length === 0) {
							source2 = Object.keys(scope.uiItems.fields);
							term = request.term;
						}
						else {
							term = request.term.substring(0, iElement.caret("pos"));
							term = term.substring(term.lastIndexOf(" "), iElement.caret("pos")).trim();
							var temp = autocompleteString.substring(0, iElement.caret("pos"));
							if (autocompleteString.length < iElement.caret("pos"))
								temp = temp.trim().replace(/ and/g, ' .');
							else
								temp = temp.substring(0, temp.lastIndexOf(" ")).trim().replace(/ and/g, ' .');
							temp = temp.replace(/ or/g, ' .');

							var indices = [];
							_.each(temp, function (val, index) {
								if (val === ".") {
									indices.push(i + 1);
								}
							});

							//for(var i=0; i<temp.length;i++) {
							//    if (temp[i] === ".") indices.push(i+1);
							//}

							var start, end;

							if (indices.length === 0) {
								start = 0;
								end = autocompleteString.length;
							} else if (indices[indices.length - 1] < iElement.caret("pos")) {
								start = indices[indices.length - 1];
								end = iElement.caret("pos");
							} else {
								for (var i = 0; i < indices.length; i++) {
									if (indices[i] < iElement.caret("pos") && indices[i + 1] > iElement.caret("pos")) {
										start = indices[i];
										end = iElement.caret("pos");
									}
								}
							}

							var autocompleteStringArray;
							if (temp.substring(start, end).length === 0) {
								autocompleteStringArray = [];
							} else {
								autocompleteStringArray = temp.substring(start, end).trim().split(/ \s*/);
							}

							if (autocompleteStringArray.length === 0) {
								source2 = Object.keys(scope.uiItems.fields);
							} else if (autocompleteStringArray.length === 1) {
								source2 = scope.uiItems.operators[autocompleteStringArray[0].replace("_", " ")];
							} else if (autocompleteStringArray.length === 2) {
								source2 = scope.uiItems.enum[autocompleteStringArray[0].replace("_", " ")];
							} else {
								source2 = ["and", "or"];
							}
						}

						if (source2.length > 0) {
							flag = false;
							//for(var i=0; i < source2.length; i++){
							//    if(source2[i].indexOf(term) > -1){
							//        flag = true;
							//    }
							//}
							_.each(source2, function (val, index) {
								if (val.indexOf(term) > -1) {
									flag = true;
								}
							});


						} else {
							flag = true;
						}

						if (flag === false) {
							pinesNotifications.notify({
								title: "Invalid",
								text: term + ' is invalid.',
								type: 'error'
							});
							flag = true;
						}

						response($.ui.autocomplete.filter(
							source2, term));
					},
					select: function (event, ui) {
						flag = false;
						select = true;
						if (autocompleteString.length === 0) {
							autocompleteString = ui.item.value.replace(" ", "_");
						} else if (autocompleteString.length > iElement.caret("pos")) {
							var n1 = autocompleteString.substring(0, iElement.caret("pos"));
							var n2 = autocompleteString.substring(iElement.caret("pos"), autocompleteString.length);
							autocompleteString = n1.substring(0, n1.lastIndexOf(" ")) + " " + ui.item.value.replace(" ", "_") + " " + n2.substring(n2.indexOf(" "), autocompleteString.length).trim();
						}
						else {
							autocompleteString = autocompleteString + " " + ui.item.value.replace(" ", "_");
						}
						this.value = autocompleteString.replace(/_/g, ' ').trim();
						return false;
					}
				});
				iElement.bind("keydown keypress", function (evt) {
					evt = evt;
					if (source2.length > 0) {
						if (evt.keyCode == 32 && !angular.isUndefined(autocompleteString) && !select) {
							autocompleteString = autocompleteString + " " + term;
							iElement.siblings('input').val(autocompleteString);
						}
					} else {
						if (evt.keyCode == 32 && !angular.isUndefined(autocompleteString)) {
							autocompleteString = autocompleteString + " " + term;
							iElement.siblings('input').val(autocompleteString);
						}
					}

					if (evt.keyCode == 8 && !angular.isUndefined(autocompleteString) && autocompleteString.length !== 0) {
						autocompleteString = autocompleteString.substr(0, iElement.caret("pos") - 2) + "" + autocompleteString.substr(iElement.caret("pos"), autocompleteString.length);
					}
				});

			}
		};
	}])

	.directive('enableSave', ['pinesNotifications', function (pinesNotifications) {
		'use strict';
		return {
			restrict: 'A',
			scope: {
				ngModel: '=',
				dtId: '=',
				uiItems: '=',
				addCallAction: '='
			},
			link: function link(scope, iElement, iAttrs) {
				iElement.bind("keydown keypress change", function (evt) {
					 scope.addCallAction.callActionFormSubmitted[scope.dtId] = false;
				});

			}
		};
	}])

	.directive('persistentScrollBar', ['pinesNotifications', function (pinesNotifications) {
		'use strict';
		return {
			restrict: 'A',
			scope: {
				ngModel: '=',
				dtId: '=',
				uiItems: '=',
				addCallAction: '='
			},
			link: function link(scope, iElement, iAttrs) {
				iElement.floatingScroll();
			}
		};
	}])

	.directive('validSubmit', ['$parse', 'pinesNotifications', function ($parse, pinesNotifications) {
		return {
			require: 'form',
			// one time action per form
			link: function (scope, element, iAttrs, form) {
				form.$submitted = false;
				// get a hold of the function that handles submission when form is valid
				var fn = $parse(iAttrs.validSubmit);
				// register DOM event handler and wire into Angular's lifecycle with scope.$apply
				element.on('submit', function (event) {
					scope.$apply(function () {
						var formId = iAttrs.id;
						form.$valid = true;
						var arrInvalid = [];
						var arrRequired = [];
						var formName = '';
						var arrDateInvalid = [];
						var formNameAndFieldName, fieldName, messageText;
						var tempFieldName=''; 
						var tempFormName='';
						$("form#" + formId + " :input, select").each(function () {
							if ($(this).attr('required') !== undefined && $(this).is(':visible')) {
								var input = $(this).val();
								var fieldvalue;
								formNameAndFieldName = $(this).attr('validate-blur-forza').split(',').map(function (val) {
									return val.trim();
								});

								tempFormName = formNameAndFieldName[0];
								tempFieldName = formNameAndFieldName[1];
								fieldvalue = $(this).val();
								if (input !== null) {
									fieldvalue = ($(this).val()).trim();
								}
								if (fieldvalue === '' || fieldvalue === null || fieldvalue === '?') {
									if (arrRequired.indexOf(tempFieldName) === -1){
										arrRequired.push(tempFieldName);
										formName=tempFormName;
										fieldName=tempFieldName;
									}

								} else if ($(this).hasClass('ng-invalid')) {
									if (arrInvalid.indexOf(tempFieldName) === -1){
										arrInvalid.push(tempFieldName);
										formName=tempFormName;
										fieldName=tempFieldName;
									}
								}
							}else if ($(this).hasClass('ng-invalid') && $(this).is(':visible')) {
								if (arrInvalid.indexOf(tempFieldName) === -1){
									arrInvalid.push(tempFieldName);
									formName=tempFormName;
									fieldName=tempFieldName;
								}
							}

							if ($(this).attr('datepicker-popup') !== undefined && $(this).is(':visible') && !$(this).attr('disabled')) {
								var date = $(this).val();
								var timezone = $(this).attr('timezone');
								var actualDate = moment.tz(moment(date).format("YYYY-MM-DD HH:mm:ss"), timezone);
								var currentDate = moment.tz(moment().tz(timezone).format("YYYY-MM-DD"), timezone);

								if (actualDate.isBefore(currentDate)) {
									formNameAndFieldName = $(this).attr('date-attribute').split(',').map(function (val) {
										return val.trim();
									});
									formName = formNameAndFieldName[0];
									fieldName = formNameAndFieldName[1];
									arrDateInvalid.push(fieldName);
								}
							}
						});
						if (arrDateInvalid.length) {
							form.$valid = false;
							messageText = 'is of past';
							pinesNotifications.notify({
								title: formName + ' Form',
								text: '\'' + arrDateInvalid.join(', ') + '\' ' + messageText,
								type: 'error'
							});
						}

						if (arrRequired.length) {
							form.$valid = false;
							messageText = 'field is required.';
							if (arrRequired.length > 1) {
								messageText = 'fields are required.';
							}
							pinesNotifications.notify({
								title: formName + ' Form',
								text: '\'' + arrRequired.join(', ') + '\' ' + messageText,
								type: 'error'
							});
						}
						// console.log(arrInvalid);

						if (arrInvalid.length) {
							form.$valid = false;
						}
						// on submit event, set submitted to true (like the previous trick)
						form.$submitted = true;
						if (formId == 'singlecallForm') {
							scope.submitted1 = true;
						}
						scope.submitted = true;
						// if form is valid, execute the submission handler function and reset form submission state
						if (form.$invalid && form.$error.phone !== undefined && form.$error.required === false)
							form.$valid = true;

						if (form.$valid) {
							form.$invalid = false;
							fn(scope, {$event: event});
							form.$submitted = false;
							if (formId == 'singlecallForm') {
								scope.formSubmit1 = true;
							}
							scope.formSubmit = true;
						}
					});
				});
			}
		};
	}])
	.directive('ngEnter', function () {
		return function (scope, element, attrs) {
			element.bind("keydown keypress", function (event) {
				if (event.which === 13 || event.which === 9) {
					scope.$apply(function () {
						scope.$eval(attrs.ngEnter);
					});
					var rowid = attrs.rowid;
					$("#percentage" + rowid).focus();
					event.preventDefault();
				}
			});
		};
	})

	.directive('focus', function () {
		return {
			restrict: 'A',
			link: function ($scope, elem, attrs) {
				elem.bind('keydown keypress', function (e) {
					var code = e.keyCode || e.which;
					var eleToFocus = elem.parent().parent().next('div').find('input');
					if (code === 13) {
						e.preventDefault();
						eleToFocus.focus();
					}
				});
			}
		};
	})
	.directive('dcChart', function ($window, $interpolate) {
		"use strict";




		// scope.$watch is necessary to trigger the compilation
		// of the directive after it receives the dataset from chartconfig in the parent controller
		function compile() {
			return function (scope, element, attrs) {
				scope.$watch('chartconfig', function (newVal) {
					if (newVal) {
						renderChart(scope, element, attrs);
					}
				});
			};
		}

		function renderChart(scope, element, attrs) {
			var chartConfig, xf, dimension, group, localDc, color, width,
				height, square, cssSelector, $chart, timeFormat, formatToDay, toPercentage;
			var count = 0;


			//function getHeaderNamesByGroupingKeyName (primaryGroup, secondaryGroup) {
			//
			//    var headerNames = {};
			//
			//    // primaryGroup -> route_name -> "Call Flow Name"
			//    //
			//    function getNameByKey (groupKeyName) {
			//        return {
			//            "route_name":     "Call Flow Name",
			//            "ring_to_number": "Ring To Number"
			//        }[groupKeyName];
			//    }
			//
			//    headerNames[primaryGroup]    = getNameByKey(primaryGroup);
			//    headerNames[secondaryGroup]  = getNameByKey(secondaryGroup);
			//    headerNames.total_count      = "Total Calls";
			//    headerNames.lead_count       = "# Leads";
			//    headerNames.leads_prcnt      = "% of Leads";
			//    headerNames.avg_lead_qual    = "Avg Lead Quality";
			//    headerNames.conversion_count = "Conversion";
			//    headerNames.conversion_prcnt = "Conversion %";
			//    headerNames.avg_call_time    = "Avg Duration";
			//    headerNames.unique_calls     = "Unique Calls";
			//
			//    return headerNames;
			//}
			//
			//scope.dataTableHeaderNames = getHeaderNamesByGroupingKeyName(scope.primgroup, scope.secgroup);

			cssSelector = '#' + attrs.id;
			$chart = $(cssSelector);
			chartConfig = scope.chartconfig;


			height = chartConfig.height;
			//height = $chart.closest('div .panel-body').innerHeight() * 0.95;
			width = $chart.closest('div .panel-body').innerWidth() * 0.95;


			xf = scope.xf;
			localDc = scope.dc;
			color = d3.scale.category20();

			//height = chartConfig.height;
			//width = chartConfig.width;
			square = Math.min(width, height);

			//$chart.outerWidth(width + 'px');
			//$chart.outerHeight(chartConfig.height + 'px');

			$chart.find(".title").text(chartConfig.name);
			var customXTicksQuantity = function (n_xitems) {
				// Special cases
				var maxPossibleTicks = 9;
				if (n_xitems > maxPossibleTicks) {
					return maxPossibleTicks;
				}

				// Default case
				return n_xitems - 1;
			};

			//////////////////
			//CREATE DIMENSION
			//////////////////

			// d3.time.month --> Rounds the day down and the HMS to first day of the month
			// d3.time.day   --> take Date obj rounds the HMS off that day
			// d3.time.year  --> take Date obj rounds the Month, day, HMS off and puts it to the first day of the year
			toPercentage = d3.format(',%');
			timeFormat = d3.time.format("%H:%M:%S");
			formatToDay = d3.time.format('%b-%d');
			var format3 = d3.time.format('%Y-%m-%d');
			if (chartConfig.dimensiontype !== 'time') {
				//dimension = xf.dimension(localDc.pluck(chartConfig.dimension));
				dimension = xf.dimension(function (d) {
					return d[chartConfig.dimension];
				});
			}

			// dimensiontype is time
			else {

				if (chartConfig.interval === "day") {
					dimension = xf.dimension(function (d) {
						// passed into the moment object first because firefox's Date object doesn't like the format it's receiving
						var momDateObj = moment(d.date, "YYYY-MM-DD hh:mm:ss").toDate();
						d.d3datetime = d3.time.day(momDateObj);
						//d.d3datetime = d3.time.day(new Date(d.date));
						return d.d3datetime;
					});
				}
				else if (chartConfig.interval === "hour") {
					dimension = xf.dimension(function (d) {

						d.date = d3.time.hour(timeFormat.parse(d[chartConfig.dimension].split(" ")[1].toString()));
						d.hours = d.date.getHours();
						return d.hours;
					});
				}
				else if (chartConfig.interval === "timezer") {
					dimension = xf.dimension(function (d) {

						return d.date;
					});
				}
				else if (chartConfig.interval === 'weekzer') {
					dimension = xf.dimension(function (d) {
						// passed into the moment object first because firefox's Date object doesn't like the format it's receiving
						//var dayAsNum = d.d3datetime.getDay(),
						var dayAsNum = moment(d.date, "YYYY-MM-DD hh:mm:ss").day(),
							name = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
						return dayAsNum + '.' + name[dayAsNum];
					});
				}
			}

			//////////////////
			//FILTERS
			//////////////////
			if (chartConfig.filtertype !== undefined) {
				switch (chartConfig.filtertype) {
					case 'none':
						break;
					case 'match':
						dimension = dimension.filter(function (d) {
							if (d.disposition === d[chartConfig.filterkey])
								return d;
						});
						break;
					default:
						break;
				}
			}


			//////////////////
			//CREATE GROUP
			//////////////////
			switch (chartConfig.grouptype) {
				case 'none':
					group = function (d) {
						return null;
					};
					break;

				case 'none2':
					group = dimension.group();
					break;

				case 'all':
					group = dimension.groupAll();
					break;

				case 'value':
					group = function (d) {
						return d[chartConfig.group];
					};
					break;

				case 'count':
					group = dimension.group().reduceCount(localDc.pluck(chartConfig.group));
					break;

				case 'sum':

					//group = dimension.group().reduceSum(localDc.pluck(chartConfig.group));
					group = dimension.group().reduceSum(function (d) {
						return d[chartConfig.group];
					});
					break;

				case 'dayWeekReduce':
					group = dimension.group().reduce(
						function (p, v) {
							p.total_calls += v.total_calls || 0;
							return p;
						},

						function (p, v) {
							p.total_calls -= v.total_calls || 0;
							return p;
						},
						function () {
							return {total_calls: 0};
						}
					);
					break;

				case 'reduce':
					group = dimension.group().reduce(
						function (p, v) {

							p.total += zeroIfNanOrNull(parseInt(v[chartConfig.group]), 1);
							p.secondTotal += zeroIfNanOrNull(parseInt(v[chartConfig.averageDenominator]), 1);
							p.average = zeroIfNanOrNull(p.total, p.secondTotal);
							return p;
						},
						function (p, v) {
							p.total -= zeroIfNanOrNull(parseInt(v[chartConfig.group]), 1);
							p.secondTotal -= zeroIfNanOrNull(parseInt(v[chartConfig.averageDenominator]), 1);
							p.average = zeroIfNanOrNull(p.total, p.secondTotal);
							return p;
						},
						function () {
							return {total: 0, average: 0, secondTotal: 0};
						}
					);
					break;
				case "reducePercent":
					group = dimension.group().reduce(scope.reducers.increment, scope.reducers.decrement, scope.reducers.initial);
					break;
				default:
					// throw Error('no group type defined');
					break;
			}

			var minDate, maxDate, minKey, maxKey, dat, min, max, value;
			var indexToHide, quantXitems;

			//////////////////
			//CREATE CHART
			//////////////////

			var uniqueNumDays;
			var numXTicks;


			if (dimension.bottom(1)[0] !== undefined)
				minDate = dimension.bottom(1)[0].d3datetime;
			if (dimension.top(1)[0] !== undefined)
				maxDate = dimension.top(1)[0].d3datetime;

			if (chartConfig.type === "bar2") {
				chartConfig.chart = localDc.barChart(cssSelector).width(width).height(height).margins({
					left: 35,
					top: 0,
					bottom: 20,
					right: 20
				})
					.dimension(dimension)
					.group(group)
					.xUnits(d3.time.days)
					.centerBar(true)
					.gap(20)
					.x(d3.time.scale().domain([minDate, maxDate]))
				;


				// Need to hide the last artificially created day to help the brush work
				quantXitems = group.all().length;



				indexToHide = quantXitems - 1;


				chartConfig.chart
					.xAxis().tickFormat(function (d, index, b) {
						if (index === indexToHide) {
							return ""; // return empty string so no x tick value is displayed
						}
						else {
							return formatToDay(d); // show the date label for that day
						}
					})
					.ticks(customXTicksQuantity(quantXitems))//TODO GHERE
				;





				chartConfig.chart
					.yAxis().ticks(3)
				;


				if (customXTicksQuantity(quantXitems) === 1) {
					chartConfig.chart
						.renderlet(function(chart){
							chart.selectAll("rect.bar")
								.attr("width", 15)
								.attr("x", 2.5);
							//chart.selectAll("rect.bar");
						});
				}


			}

			/*
			*
			* If we want to add a "multi series" chart" then here is an example from the official site
			* also it goes byt he name of composite chart
			* https://github.com/dc-js/dc.js/blob/master/web/examples/composite.html
			*
			* */
			else if (chartConfig.type === "timeline") {

				chartConfig.chart = localDc.lineChart(cssSelector).width(width).height(height)
					.margins({
						left:   35,
						top:    10,
						bottom: 16,
						right:  19
					})
					.dimension(dimension)
					.group(group)
					.transitionDuration(1000)
					.valueAccessor(function (d) { return d.value.conversion_percent * 100; })
					.xUnits(d3.time.days)

					//.round(d3.time.day.round)
					//
					.renderHorizontalGridLines(true)


					// If we want flexible y chart, we need elasticY true
					// If we want a static fixed y domain, however, then we need it commented out, as it will
					// override any domain inputed

					.elasticY(true)
					//.y(d3.scale.linear().domain([0, 100]));
					//.renderVerticalGridLines(true)
					//.renderArea(false)


				;





				// Need to hide the last artificially created day to help the brush work
				quantXitems = group.all().length;
				chartConfig.chart.x(d3.time.scale().domain([minDate, maxDate]));



				// show a dot on the y axis at point 0 for the x axis since we don't have a line (can't since we have only one point)
				// this mimicks having a scatterplot for this one point
				if (customXTicksQuantity(quantXitems) === 1) {
					chartConfig.chart
						.brushOn(false) // must be off to show a dot
						.dotRadius(10)
						.renderlet(function(chart){
							chart.selectAll("circle.dot").style("fill-opacity", 1)

								// added this beause there is an event listener somewhere that makes it disappear as soon as your mouse leaves the dot...
								// it's probably just toggling it, which is bad for us, so we're forcing it to just stay colored if mouse leaves
								.on("mouseout", function () {
									d3.select(this).style("fill-opacity", 1);
								});
						});
				}




				indexToHide = quantXitems - 1;
				chartConfig.chart.xAxis()
					.tickFormat(function (v, index) {
						return (index === indexToHide)
							? "" // return empty string so no x tick value is displayed
							: moment(v).format("M/D"); // show the date label for that day
					})
					.ticks(customXTicksQuantity(quantXitems));


				// once again, need to hide the SVG line portion of the "hidden" x tick, since
				// it creates it even if we are kind of hiding it
				chartConfig.chart.defined(function (a, index) {
					return index !== indexToHide;
				});
				chartConfig.chart.yAxisLabel("% of Conversions ");
			}

			// Used for the Row chart for Days of the week
			else if (chartConfig.type === "row2") {
				chartConfig.chart = localDc.rowChart(cssSelector).width(width).height(height)
					.dimension(dimension)
					.group(group)
					.elasticX(true)
					.valueAccessor(function (d) {
						return d.value.total_calls;
					})
					.label(function (d) {
						return d.key.split(".")[1];
					}) // value displayed inside bar
					.title(function (d) {
						return d.key.split(".")[1] + " - " + d.value.total_calls + " calls";
					}) // value displayed on HOVER of bar
					.ordering(function (d) {
						return d.key.split(".")[0];
					})
				;
				chartConfig.chart
					.xAxis().ticks(5)
				;
			}

			else if (chartConfig.type === "pie" ||
				chartConfig.type === "donut") {
				chartConfig.chart = localDc.pieChart(cssSelector)
					.width(width)
					.height(height)
					.dimension(dimension)
					.group(group)
					.radius(square / 2)
					.innerRadius(chartConfig.type === "pie" ? 0 : square / 5)
					.legend(localDc.legend())
				;
			}

			else if (chartConfig.type === "row") {
				var quantityBars = group.all().length;
				var barHeight = 40;
				var paddingBetweenBars = 5;
				var roomForXAxis = 10;

				// for fitting to the container size responsively
				var heightContainerBox = $chart.closest('div .panel-body').innerHeight() * 0.88;

				// For when we have a enough bars to exceed container size
				var dynamicHeight = quantityBars * (barHeight + paddingBetweenBars) + roomForXAxis;

				dynamicHeight = dynamicHeight > heightContainerBox ? dynamicHeight : heightContainerBox;

				chartConfig.chart = localDc.rowChart(cssSelector)
					.width(width)
					.height(dynamicHeight)
					.dimension(dimension)
					.group(group)
					.elasticX(true)
					.rowsCap(35)
					.othersGrouper(false)
					.ordering(function (d) {
						return d;
					})
				;

				chartConfig.chart
					.xAxis().ticks(5)
				;
			}

			else if (chartConfig.type === "number") {

				chartConfig.chart = localDc.numberDisplay(cssSelector)
					.width(width)
					.height(height)
					.group(group)
					.valueAccessor(function (d) {

						if (d === undefined) {
							console.log("Number widget 0 for", chartConfig.name);
							return 0;
						}


						if (d.key !== undefined) {
							if (isNaN(d.value)) {

								return chartConfig.averageDenominator
									? zeroIfNanOrNull(d.value.average, 1)
									: zeroIfNanOrNull(d.value.total, 1);
							}
							else {
								for (var item in chartConfig.chart.group().all()) {
									if (chartConfig.chart.group().all()[item].key === chartConfig.groupkey) {
										return chartConfig.chart.group().all()[item].value;
									}
								}
								return 0;
							}
						}
					})
					.formatNumber(d3.format(chartConfig.format ? chartConfig.format : ""))
				;

				if (chartConfig.format === "HH:mm:ss") {
					chartConfig.chart
						.formatNumber(
						function (d) {
							return moment.utc(parseInt(d.toFixed()) * 1000).format('HH:mm:ss');
						}
					);
				}

			}


			else if (chartConfig.type === "line") {
				dat = group.top(Infinity);
				min = +Infinity;
				max = -Infinity;

				minKey = d3.min(group.all(), function (d) {
					return d.key;
				});
				maxKey = d3.max(group.all(), function (d) {
					return d.key;
				});

				for (var d = 0; d < dat.length; d++) {
					value = parseFloat(dat[d].value);
					if (min > value) min = value;
					if (max < value) max = value;
				}

				chartConfig.chart = localDc.lineChart(cssSelector)
					.renderArea(false)
					.width(width)
					.height(height)
					.dimension(dimension)
					.group(group)
					.x(
					chartConfig.dimension !== 'date'
						? d3.scale.linear().domain([minKey, maxKey])
						: d3.time.scale().domain([minDate, maxDate])
				)
					.y(d3.scale.linear().domain([min, max]))
					.renderHorizontalGridLines(true)
				;

				chartConfig.chart
					.valueAccessor(function (d) {
						return d.value;
					})
					.elasticY(true)
					.elasticX(false)
					.brushOn(true)
				;
			}


			else if (chartConfig.type === "bar") {
				dat = group.top(Infinity);
				min = +Infinity;
				max = -Infinity;
				minKey = d3.min(group.all(), function (d) {
					return d.key;
				});
				maxKey = d3.max(group.all(), function (d) {
					return d.key;
				});
				minDate = d3.min(group);

				//for (var d = 0; d < dat.length; d++) {
				//
				//}

				_.each(dat, function (val) {
					value = parseFloat(dat[d].value);
					if (min > value)
						min = value;
					if (max < value)
						max = value;
				});


				chartConfig.chart = localDc.barChart(cssSelector)
					.width(width)
					.height(height)
					.dimension(dimension)
					.group(group)
					.centerBar(true)
					.brushOn(true)
					.elasticY(true)
					.x(
					chartConfig.dimension !== 'date' ? d3.scale.linear().domain([minKey, maxKey]) : d3.time.scale().domain([minKey, maxKey])
				)
					//.renderHorizontalGridLines(true)
					//.outerPadding(1)
					//.gap(1)
				;






			}


			// for use with the separate data table chart
			chartConfig.chart.on("filtered", function () {
				scope.redotable();
			});


			//else if (chartConfig.type === "datagrid") {
			//    chartConfig.chart = localDc.dataTable(cssSelector)
			//        .width(width)
			//        .height(height)
			//        .dimension(dimension)
			//        .group(group)
			//        //.group(function (d) { return d.route_name; })
			//        .size(41)
			//        .columns([
			//            function (d) { return d.call_started; },
			//            function (d) { return d.campaign_name; },
			//            function (d) { return d.category + ":" + d.sub_category; },
			//            function (d) { return d.source; },
			//            function (d) { return d.tracking; },
			//            function (d) { return d.ring_to_name; },
			//            function (d) { return d.duration; },
			//            function (d) { return d.recording_file; },
			//            function (d) { return d.repeat_call; },
			//            function (d) { return "<audio id='audio1'><source src='" + d.s3URL + "'></source></audio>" +
			//            "<a class='btn btn-default btn-sm' style='' ng-click='playVoiceAudio($index)'>Play<i class='fa fa-play' style='margin-left:5px;'></i></a>"; }
			//        ]);
			//        /*
			//        <a class="btn btn-default btn-sm" style="" ng-disabled="!canModify|| voicetextChanged" ng-click="playVoiceAudio()">Play<i class="fa fa-play" style="margin-left:5px;"></i></a>
			//        <a class='btn btn-default btn-sm' style='' ng-click='playVoiceAudio()'>Play<i class='fa fa-play' style='margin-left:5px;'></i></a>
			//
			//
			//        */
			//        //.renderlet(function (table) { table.selectAll(cssSelector).classed("info", true); });
			//}


			if (chartConfig.chart !== null && chartConfig.type !== "number" && chartConfig.type !== "datagrid" && chartConfig.type !== "timeline") {
			   chartConfig.chart
			       .transitionDuration(1000)
			       .colors(color);

			   if (chartConfig.sort === "asc") {
			       chartConfig.chart.ordering(function (d) { return d.value; });
			   }

			   else if (chartConfig.sort === "desc") {
			       chartConfig.chart.ordering(function (d) { return -d.value; });
			   }

			   if (chartConfig.top === "top") {
			       group.value = parseInt(chartConfig.top_value);
			       chartConfig.chart.data(function (group) {
			           return group.top(group.value);
			       });
			   }
			   else if (chartConfig.top === "bottom") {
			       group.value = -parseInt(chartConfig.top_value);
			       chartConfig.chart.data(function (group) {
			           return group.top(Infinity).splice(group.value);
			       });
			   }
			}

			//scope.exportToCsv = function () {
			//
			//
			//    // Must return objects with properties ASSIGNED in the order that you want them to appear
			//    // in the order for the columns in the CSV, and Crossfilter doesnt have them organized as they appear in the data grid already
			//    // so it's necessary to create a new object with their values
			//    return _.map(dimension.top(Infinity), function (rowInDataTable) {
			//        // create a new object and take values from rowInDataTable and assign with new property and, and in desired order
			//        var rowNewColumnOrder = {};
			//        _.each(scope.dataTableHeaderNames, function (headerName, propertyName) {
			//            rowNewColumnOrder[propertyName] = rowInDataTable[propertyName];
			//        });
			//        return rowNewColumnOrder;
			//    });
			//};
			//
			//scope.getCsvHeader = function () {
			//    return _.map(scope.dataTableHeaderNames, function(headerName) { return headerName; });
			//};

			function zeroIfNanOrNull(numerator, denominator) {

				var result = numerator / denominator;
				var notNaNResult = (isNaN(result) || (result === null)) ? 0 : result;
				return notNaNResult;
			}


			if (scope.chartcollection !== undefined) {
				scope.chartcollection.push({
					chart: chartConfig.chart,
					selector: cssSelector
				});
			}

			localDc.renderAll();
		}

		function templater(tElem, tAttrs) {
			var standardTemplate, datatableTemplate, noneTemplate, templates;

			standardTemplate = [
				"<div class='chart'>",
				"<span class='handle'>",
				"<span class='title'></span>",
				"<span class='button'>",
				//"<i class='uk-icon-gears' onclick='javascript:chartSettings(_id)'title='Settings'></i>",
				"</span>",
				"</span>",
				"</div>"
			].join('');

			//datatableTemplate = [
			//    "<table class='chart table table-hover'>",
			//    "<thead>",
			//    "<tr><th><button ng-csv='exportToCsv()' filename='filtered_data_table.csv' csv-header='getCsvHeader()'>Export to CSV</button></th></tr>",
			//    "<tr class='header'>",
			//    "<th>"+ "{{dataTableHeaderNames.date}}" +"</th>",
			//    "<th>"+ "{{dataTableHeaderNames.route_name}}" +"</th>",
			//    "<th>    Sec Group</th>",
			//    "<th>"+ "{{dataTableHeaderNames.total_count}}" +"</th>",
			//    "<th>"+ "{{dataTableHeaderNames.lead_count}}" +"</th>",
			//    "<th>"+ "{{dataTableHeaderNames.leads_prcnt}}" +"</th>",
			//    "<th>"+ "{{dataTableHeaderNames.avg_lead_qual}}" +"</th>",
			//    "<th>"+ "{{dataTableHeaderNames.conversion_count}}" +"</th>",
			//    "<th>"+ "{{dataTableHeaderNames.conversion_prcnt}}" +"</th>",
			//    "<th>"+ "{{dataTableHeaderNames.avg_call_time}}" +"</th>",
			//    "<th>"+ "{{dataTableHeaderNames.unique_calls}}" +"</th>",
			//    "</tr>",
			//    "</thead>",
			//    "</table>"
			//].join('');

			noneTemplate = [
				"<span>",
				"</span>"
			].join('');

			templates = {
				"standard": standardTemplate,
				"datatable": datatableTemplate,
				"none": noneTemplate
			};

			return templates[tAttrs.template];
		}


		return {
			restrict: 'E',
			replace: true,
			//link:     link,
			compile: compile,
			scope: {
				"chartconfig":     '=',
				"xf":              '=',
				"dc":              '=',
				"secgroup":        '=',
				"primgroup":       '=',
				"chartcollection": '=',
				"redotable":       '=',
				"reducers":        "="
			},
			template: templater
		};
	})


	// Example usage <export-element-pdf selector="#myDataTable" precallback="" postcallback="">
	.directive("exportElementPdf", [function () {

		//return {
		//    restrict: "E",
		//    scope: {
		//        selector: "=",
		//
		//    }
		//};
	}])









	// Example
	/*
	 Hey <span click-tip="Founder of the beloved Microsoft">Bill Gates</span>, what are you doing?

	 You can hover over the words 'Bill Gates' for the tip that appears and leaves after you unhover it (by way of this directive adding the title attribute),
	 or click on it to add/remove a custom tip span which is controlled by the .title class in CSS
	 */
	// CLICK TIP DIRECTIVE
	.directive("clickTip", function () {
		var link = function(scope, element, attrs) {
			element.addClass("tip");
			element.attr("title", attrs.clickTip);
			element.bind("click", function(){
				var tipblip = element.find("span");
				if (tipblip.length) {
					tipblip.remove();
				} else {
					element.append('<span class="title">'+attrs.clickTip+'</span>');
				}
			});
		};
		return {
			restrict: "A",
			scope: {},
			link: link
		};
	})

	// although we have the HTML 5 'max length' property, it isn't working in IE 11 or something, so this
	// is a potential workaround to brousers not working with that
	.directive("myMaxLength", function () {

		var link = function (scope, element, attrs) {
			element.bind("input", function() {
				if (this.value && this.value.length > attrs.myMaxLength) {
					this.value = this.value.slice(0, attrs.myMaxLength);
				}
			});
		};
		return { link: link };
	})


	// example
	// <input type="text" enter-press="someFunction(thisTextBox)" ng-model="thisTextBox" />
	// think of it like ng-click, but for the Enter/Return key instead
	.directive("enterPress", function () {
		function link (scope, element, attrs) {
			element.bind("keyup", function (event) {
				if (event.keyCode === 13) {
					scope.$apply(function () {
						scope.$eval(attrs.enterPress, {"event": event});
					});
					event.preventDefault();
				}
			});
		}
		return { link: link };
	})

	.directive('multipleEmails', function () {
        var EMAIL_REGEXP = /^[-._a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,7})$/;
        function validateAll(ctrl, validatorName, value) {
            var validity = ctrl.$isEmpty(value) || value.split(',').every(
                function (email) {
                    return EMAIL_REGEXP.test(email.trim());
                }
            );

            ctrl.$setValidity(validatorName, validity);
            return validity ? value : undefined;
        }

        return {
            restrict: 'A',
            require: 'ngModel',
            link: function postLink(scope, elem, attrs, modelCtrl) {
                function multipleEmailsValidator(value) {
                    return validateAll(modelCtrl, 'multipleEmails', value);
                }

                modelCtrl.$formatters.push(multipleEmailsValidator);
                modelCtrl.$parsers.push(multipleEmailsValidator);
            }
        };
    })
    .directive('validateEmail', function () {
        var EMAIL_REGEXP = /^[-._a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,7})$/;
        function validateAll(ctrl, validatorName, value) {
            var validity = ctrl.$isEmpty(value) || EMAIL_REGEXP.test(value.trim());
            ctrl.$setValidity(validatorName, validity);
            return validity ? value : undefined;
        }
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function postLink(scope, elem, attrs, modelCtrl) {
                function validateEmailValidator(value) {
                    return validateAll(modelCtrl, 'validateEmail', value);
                }
                modelCtrl.$formatters.push(validateEmailValidator);
                modelCtrl.$parsers.push(validateEmailValidator);
            }
        };
    })
    .directive('disableComma', function (pinesNotifications) {
		'use strict';
		return {
			restrict: 'A',
			link: function (scope, element, attr, ctrl) {
				//keyCode for comma is 188
				element.bind("keyup change", function (event) {
					var formNameAndFieldName = attr.validateBlurForza.split(',').map(function (val) {
						return val.trim();
					});
					var formName = formNameAndFieldName[0];
					var fieldName = formNameAndFieldName[1];
					if (element.val().indexOf(',') > -1) {
						element.addClass("ng-invalid ng-dirty");
						element.removeClass("ng-valid");
					}else{
						element.removeClass("ng-invalid ng-dirty");
						element.addClass("ng-valid");
					}
				});
			}
		};
	})
	.directive('validateMaskedPhoneNumber', function (pinesNotifications) {
		'use strict';
		return {
			restrict: 'A',
			link: function (scope, element, attr, ctrl) {				
				//keyCode for comma is 188
				element.bind("keyup change", function (event) {					
					var referralNumber = element.val().replace(/\D/g, "");
					var required = element.attr("required");
					if (referralNumber.length > 0){
					if (referralNumber.length !== 10 || element.val().charAt(1)=='0') {	
						element.addClass("ng-invalid ng-dirty");
						element.removeClass("ng-valid");
					}else{
						element.removeClass("ng-invalid");
						element.addClass("ng-valid ng-dirty");
					}
				}else{
					if(required){
					element.addClass("ng-invalid ng-dirty");
					element.removeClass("ng-valid");
					}
					else{
						element.removeClass("ng-invalid");
						element.addClass("ng-valid ng-dirty");
					}	
				}
				});
			}
		};
	})
	.directive("customizeFilter",function customizeFilter() {
        var link = function (scope,element,attrs) {
            element.on('click',function(event){      
                var sortData = JSON.parse(attrs.customizeFilter);
                if(sortData.label !== 'Actions'&& sortData.label !== 'Play Call'&& sortData.label !=="Status"&& !scope.isPendingReq){                    
                    //to scroll top                     
                    $("html, body").animate({ scrollTop: 0 }, "slow");

                    var headerArray, clickedColumnKey, iteratedColumnKey;
                    scope.sortOrder = !scope.sortOrder;
                    scope.urlParams.order = sortData.key;
                    scope.urlParams.orderBy = scope.sortOrder ? 'ASC' : 'DESC';
                    headerArray = JSON.parse(attrs.headerList);
                    clickedColumnKey = Array.isArray(sortData.key) ? JSON.stringify(sortData.key) : sortData.key; 
                    $(this).removeClass('hoverDiv');
                    
                    headerArray.forEach( function(ele,index) {
                        iteratedColumnKey = Array.isArray(ele.key) ? JSON.stringify(ele.key) : ele.key; 
                        $('#arrow-'+index).removeClass('glyphicon glyphicon-chevron-up');
                        $('#arrow-'+index).removeClass('glyphicon glyphicon-chevron-down');
                        
                        if (clickedColumnKey === iteratedColumnKey) {
                           	if(scope.urlParams.orderBy === 'ASC') 
                           		$('#arrow-'+index).addClass('glyphicon glyphicon-chevron-up');
                           	else 
                           		$('#arrow-'+index).addClass('glyphicon glyphicon-chevron-down');                            
                        } else  
                            $('#header-'+index).addClass('hoverDiv');                        
                    });
               		scope.getDataforSorting();
                }
        	});
        };

        return {
            require: 'ngModel',
            link : link           
        };
	})
	.directive("pageLoader",function pageLoader(){
		var link = function(scope) {
	           	//$(".pageProgressLoader").show();
	           	$(".pageProgressLoader").css("display","block");

	            $("#progressLoader").css("opacity","0");
	            $(".table>tbody>tr>td").css("border-top","none");
            // }
           
            scope.$watch('isLoadingApi', function() {
			   console.log('hey, isLoadingApi has changed!',scope.isLoadingApi);
        if(!scope.isLoadingApi){
            	//$(".pageProgressLoader").hide();
	           	$(".pageProgressLoader").css("display","none");

                $("#progressLoader").css("opacity","1");
                $(".table>tbody>tr>td").css("border-top","1px solid #e9ecf0");
			 }
			 else{
				$(".pageProgressLoader").css("display","block");
			 }
    });

        };

        return {
            restrict: "E",
            link: link,
            scope: {
                   isLoadingApi: "=",
                   
            },
            template: '<div class="pageProgressLoader">'+
                       ''+
                       ' </div>'
        };
	});
	
