var themeTablesEditable = angular.module('theme.tables-editable', []);
  themeTablesEditable.controller('TablesEditableController', ['$scope', '$filter', function ($scope, $filter) {
  	'use strict';
    $scope.myData = [{name: "Moroni", age: 50},
                     {name: "Tiancum", age: 43},
                     {name: "Jacob", age: 27},
                     {name: "Nephi", age: 29},
                     {name: "Enos", age: 34}];
    $scope.gridOptions = {
        data: 'myData',
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEditOnFocus: true,
        columnDefs: [{field: 'name', displayName: 'Name', enableCellEdit: true},
                     {field:'age', displayName:'Age', enableCellEdit: true}]
    };

	$scope.showCallFlow = false;
	$scope.showCallActions = false;
	$scope.showMultiPass = false;
	$scope.selectedCallFlow = {};

	$scope.loadCallFlow = function(passedPnumber) {
		//alert(passedPnumber.id);
		$scope.selectedCallFlow = passedPnumber;
		$scope.showCallFlow = true;
		$scope.showCallActions = false;
		$scope.showMultiPass = false;
		setTimeout(function() {
			$('html, body').animate({
				scrollTop: ($("#callFlow").offset().top)-50
			}, 1000);
		},100);
	};

	$scope.loadCallActions = function() {
		$scope.showCallActions = true;
		$scope.showMultiPass = false;
		$scope.showCallFlow = false;
		setTimeout(function() {
			$('html, body').animate({
				scrollTop: ($("#callActions").offset().top)-50
			}, 1000);
		},100);
	};

	$scope.loadMultiPass = function() {
		$scope.showMultiPass = true;
		$scope.showCallActions = false;
		$scope.showCallFlow = false;
		setTimeout(function() {
			$('html, body').animate({
				scrollTop: ($("#multiPass").offset().top)-50
			}, 1000);
		},100);
	};

	$scope.addAction = function() {
		/*var maxValue = 0;
		$.each($scope.callActions, function(index,value) {
			alert(value.id);
			maxValue = ((maxValue < value.id) ? value.id : maxValue);
			alert(maxValue);
		});*/
		if($scope.callActions.length >=3) {
			alert('Sorry, there is a limit of three actions');
		}
		else {
			var addedAction = {id: ($scope.callActions.length+1)};
			$scope.callActions.push(addedAction);
		}

	};

	$scope.removeAction = function(actionId) {
		var keepLooking = true;
		$.each($scope.callActions, function(index,value) {
			//alert(index);
			if(keepLooking && value.id == actionId) {
				$scope.callActions.splice(index,1);
				keepLooking = false;
			}
		});

		$.each($scope.callActions, function(index,value) {
			if(value.id > actionId) {
				$scope.callActions[index].id = (value.id-1);
			}
		});
		//console.log($scope.callActions);
	};

	$scope.showNumber = function(actionNumber) {
		if(actionNumber == 1) return 'First';
		else if(actionNumber == 2) return 'Second';
		else if(actionNumber == 3) return 'Third';
		else return '';
	};

	$scope.phoneNumbers = [
      {id: 1, phone: '435-715-2543', name: 'Mailer 4', channel: 1, status: false, value: '$65.00', rinterval: '120', status2: 'inactive', group: 4, groupName: 'admin'},
	  {id: 2, phone: '435-673-4967', name: 'Mailer 1a', channel: 2, status: true, value: '$10.00', rinterval: '60', status2: 'active', group: 4, groupName: 'admin'},
      {id: 3, phone: '866-111-9999', name: 'Retargeting', channel: 7, status: true, value: '$6.00', rinterval: '3245', status2: 'active', group: 3, groupName: 'vip'},
      {id: 4, phone: 'Session Pool 2', name: 'Website DNI2', channel: 8, status: true, value: '$94.00', rinterval: '40', status2: 'active', group: 3, groupName: 'vip'}
    ];

	$scope.callActions = [
		{id: 1 }
	];

    $scope.users = [
      {id: 1, phone: '888-123-4567', name: 'Mailer 1a', status: 2, value: '$12.00', rinterval: '60', status2: 'active', group: 4, groupName: 'admin'},
      {id: 2, phone: '855-222-9874', name: 'Facebook', status: 1, value: '$24.50', rinterval: '3245', status2: 'active', group: 3, groupName: 'vip'},
      {id: 3, phone: '818-111-4597', name: 'Email 2-21', status: 2, value: '$5.00', rinterval: '480', status2: 'active', group: null}
    ];

	$scope.whispers = [
      {id: 1, filename: 'some_whisper_msg.mp3'},
      {id: 2, filename: 'another_whisper_msg.mp3'},
      {id: 3, filename: 'more_whisper_msg.mp3'}
    ];
	$scope.saveWhisper = function(data, id) {
      //$scope.user not updated yet
      angular.extend(data, {id: id});
      // return $http.post('/saveUser', data);
    };
	$scope.addWhisper = function() {
      $scope.inserted = {
        id: $scope.whispers.length+1,
        name: '',
        status: null,
        group: null
      };
      $scope.whispers.push($scope.inserted);
    };
	$scope.removeWhisper = function(index) {
      $scope.whispers.splice(index, 1);
    };

	$scope.prompts = [
      {id: 1, filename: 'some_voice_prompt.mp3'},
      {id: 2, filename: 'some_IVR_recording.mp3'},
      {id: 3, filename: 'another_IVR.mp3'}
    ];
	$scope.savePrompt = function(data, id) {
      //$scope.user not updated yet
      angular.extend(data, {id: id});
      // return $http.post('/saveUser', data);
    };
	$scope.addPrompt = function() {
      $scope.inserted = {
        id: $scope.prompts.length+1,
        name: '',
        status: null,
        group: null
      };
      $scope.prompts.push($scope.inserted);
    };
	$scope.removePrompt = function(index) {
      $scope.prompts.splice(index, 1);
    };

	$scope.users2 = [
      {id: 1, phone: '801-123-5557', name: 'Mailer 2', status: 5, value: '$75.00', rinterval: '120', status2: 'active', group: 4, groupName: 'admin'},
      {id: 2, phone: 'Session Pool 1', name: 'Website DNI', status: 1, value: '$44.00', rinterval: '40', status2: 'active', group: 3, groupName: 'vip'}
    ];

    $scope.channels = [
      {value: 1, text: 'Online: Paid Search'},
      {value: 2, text: 'Online: Organic Search'},
      {value: 3, text: 'Online: Display'},
      {value: 4, text: 'Online: Email'},
      {value: 5, text: 'Offline: Direct Mail'},
      {value: 6, text: 'Offline: Magazine'},
      {value: 7, text: 'Mobile: Paid Search'},
      {value: 8, text: 'Mobile: Organic Search'}
    ];

    $scope.groups = [
      {id: 1, text: 'active'},
      {id: 2, text: 'inactive'}
    ];

    $scope.showGroup = function(user) {
      if(user.group && $scope.groups.length) {
        var selected = $filter('filter')($scope.groups, {id: user.group});
        return selected.length ? selected[0].text : 'Not set';
      } else {
        return user.groupName || 'Not set';
      }
    };

    $scope.showChannel = function(user) {
      var selected = [];
      if(user.channel) {
        selected = $filter('filter')($scope.channels, {value: user.channel});
      }
      return selected.length ? selected[0].text : 'Not set';
    };

    $scope.saveUser = function(data, id) {
      //$scope.user not updated yet
      angular.extend(data, {id: id});
      // return $http.post('/saveUser', data);
    };

    // remove user
    $scope.removeNumber = function(index) {
      $scope.users.splice(index, 1);
    };

    // add user
    $scope.addUser = function() {
      $scope.inserted = {
        id: $scope.users.length+1,
        name: '',
        status: null,
        group: null
      };
      $scope.users.push($scope.inserted);
    };
  }]);
//-----------Table editable controller 2
  themeTablesEditable.controller('TablesEditableController2', ['$scope', '$filter', function ($scope, $filter) {

	$scope.showCallFlow = false;
	$scope.showCallActions = false;
	$scope.showMultiPass = false;
	$scope.selectedCallFlow = {};

	$scope.loadCallFlow = function(passedPnumber) {
		//alert(passedPnumber.id);
		$scope.selectedCallFlow = passedPnumber;
		$scope.showCallFlow = true;
		$scope.showMultiPass = false;
		setTimeout(function() {
			$('html, body').animate({
				scrollTop: ($("#callFlow").offset().top)-50
			}, 1000);
		},100);
	};

	$scope.loadCallActions = function() {
		$scope.showCallActions = true;
		setTimeout(function() {
			$('html, body').animate({
				scrollTop: ($("#callActions").offset().top)-50
			}, 1000);
		},100);
	};

	$scope.loadMultiPass = function() {
		$scope.showMultiPass = true;
		$scope.showCallFlow = false;
		setTimeout(function() {
			$('html, body').animate({
				scrollTop: ($("#multiPass").offset().top)-50
			}, 1000);
		},100);
	};

	$scope.addAction = function() {
		if($scope.callActions.length >=3) {
			alert('Sorry, there is a limit of three actions');
		}
		else {
			var addedAction = {id: ($scope.callActions.length+1)};
			$scope.callActions.push(addedAction);
		}
	};

	$scope.removeAction = function(actionId) {
		var keepLooking = true;
		$.each($scope.callActions, function(index,value) {
			//alert(index);
			if(keepLooking && value.id == actionId) {
				$scope.callActions.splice(index,1);
				keepLooking = false;
			}
		});

		$.each($scope.callActions, function(index,value) {
			if(value.id > actionId) {
				$scope.callActions[index].id = (value.id-1);
			}
		});
		//console.log($scope.callActions);
	};

	$scope.showNumber = function(actionNumber) {
		if(actionNumber == 1) return 'First';
		else if(actionNumber == 2) return 'Second';
		else if(actionNumber == 3) return 'Third';
		else return '';
	};

	$scope.phoneNumbers = [
      {id: 1, phone: '435-715-2543', name: 'Mailer 4', channel: 1, status: false, value: '$65.00', rinterval: '120', status2: 'inactive', group: 4, groupName: 'admin'},
	  {id: 2, phone: '435-673-4967', name: 'Mailer 1a', channel: 2, status: true, value: '$10.00', rinterval: '60', status2: 'active', group: 4, groupName: 'admin'},
      {id: 3, phone: '866-111-9999', name: 'Retargeting', channel: 7, status: true, value: '$6.00', rinterval: '3245', status2: 'active', group: 3, groupName: 'vip'},
      {id: 4, phone: 'Session Pool 2', name: 'Website DNI2', channel: 8, status: true, value: '$94.00', rinterval: '40', status2: 'active', group: 3, groupName: 'vip'}
    ];

	$scope.callActions = [
		{id: 1 }
	];

    $scope.channels = [
      {value: 1, text: 'Online: Paid Search'},
      {value: 2, text: 'Online: Organic Search'},
      {value: 3, text: 'Online: Display'},
      {value: 4, text: 'Online: Email'},
      {value: 5, text: 'Offline: Direct Mail'},
      {value: 6, text: 'Offline: Magazine'},
      {value: 7, text: 'Mobile: Paid Search'},
      {value: 8, text: 'Mobile: Organic Search'}
    ];

    $scope.groups = [
      {id: 1, text: 'active'},
      {id: 2, text: 'inactive'}
    ];



    $scope.showChannel = function(user) {
      var selected = [];
      if(user.channel) {
        selected = $filter('filter')($scope.channels, {value: user.channel});
      }
      return selected.length ? selected[0].text : 'Not set';
    };

    $scope.saveUser = function(data, id) {
      //$scope.user not updated yet
      angular.extend(data, {id: id});
      // return $http.post('/saveUser', data);
    };

    // remove user
    $scope.removeNumber = function(index) {
      $scope.users.splice(index, 1);
    };

    // add user
    $scope.addUser = function() {
      $scope.inserted = {
        id: $scope.users.length+1,
        name: '',
        status: null,
        group: null
      };
      $scope.users.push($scope.inserted);
    };
  }]);

  //-----------Table editable controller 3
  themeTablesEditable.controller('TablesEditableController3', ['$scope', '$filter', function ($scope, $filter) {

  	'use strict';
	$scope.showCallFlow = false;
	$scope.showCallActions = false;
	$scope.showMultiPass = false;
	$scope.selectedCallFlow = {};
	$scope.currentCallFlow = null;

	$scope.loadCallFlow = function(passedPnumber) {
		//alert(passedPnumber.id);
		$scope.selectedCallFlow = passedPnumber;
		if($scope.currentCallFlow == passedPnumber.id) {
			$scope.showCallFlow = false;
			$scope.currentCallFlow = null;
		}
		else{
			$scope.showCallFlow = true;
			$scope.showMultiPass = false;
			$scope.currentCallFlow = passedPnumber.id;
		}

		setTimeout(function() {
			$('html, body').animate({
				scrollTop: ($("#callFlow").offset().top)-50
			}, 1000);
		},100);
	};

	$scope.loadCallActions = function() {
		$scope.showCallActions = !$scope.showCallActions;
		setTimeout(function() {
			$('html, body').animate({
				scrollTop: ($("#callActions").offset().top)-50
			}, 1000);
		},100);
	};

	$scope.loadMultiPass = function() {
		$scope.showMultiPass = !$scope.showMultiPass;
		$scope.showCallFlow = false;
		setTimeout(function() {
			$('html, body').animate({
				scrollTop: ($("#multiPass").offset().top)-50
			}, 1000);
		},100);
	};

	$scope.addAction = function() {
		if($scope.callActions.length >=3) {
			alert('Sorry, there is a limit of three actions');
		}
		else {
			var addedAction = {id: ($scope.callActions.length+1)};
			$scope.callActions.push(addedAction);
		}
	};

	$scope.removeAction = function(actionId) {
		var keepLooking = true;
		$.each($scope.callActions, function(index,value) {
			//alert(index);
			if(keepLooking && value.id == actionId) {
				$scope.callActions.splice(index,1);
				keepLooking = false;
			}
		});

		$.each($scope.callActions, function(index,value) {
			if(value.id > actionId) {
				$scope.callActions[index].id = (value.id-1);
			}
		});
		//console.log($scope.callActions);
	};

	$scope.showNumber = function(actionNumber) {
		if(actionNumber == 1) return 'First';
		else if(actionNumber == 2) return 'Second';
		else if(actionNumber == 3) return 'Third';
		else return '';
	};

	$scope.phoneNumbers = [
      {id: 1, phone: '435-715-2543', name: 'Mailer 4', channel: 1, status: false, value: '$65.00', rinterval: '120', status2: 'inactive', group: 4, groupName: 'admin'},
	  {id: 2, phone: '435-673-4967', name: 'Mailer 1a', channel: 2, status: true, value: '$10.00', rinterval: '60', status2: 'active', group: 4, groupName: 'admin'},
      {id: 3, phone: '866-111-9999', name: 'Retargeting', channel: 7, status: true, value: '$6.00', rinterval: '3245', status2: 'active', group: 3, groupName: 'vip'},
      {id: 4, phone: 'Session Pool 2', name: 'Website DNI2', channel: 8, status: true, value: '$94.00', rinterval: '40', status2: 'active', group: 3, groupName: 'vip'}
    ];

	$scope.callActions = [
		{id: 1 }
	];

    $scope.channels = [
      {value: 1, text: 'Online: Paid Search'},
      {value: 2, text: 'Online: Organic Search'},
      {value: 3, text: 'Online: Display'},
      {value: 4, text: 'Online: Email'},
      {value: 5, text: 'Offline: Direct Mail'},
      {value: 6, text: 'Offline: Magazine'},
      {value: 7, text: 'Mobile: Paid Search'},
      {value: 8, text: 'Mobile: Organic Search'}
    ];

    $scope.groups = [
      {id: 1, text: 'active'},
      {id: 2, text: 'inactive'}
    ];



    $scope.showChannel = function(user) {
      var selected = [];
      if(user.channel) {
        selected = $filter('filter')($scope.channels, {value: user.channel});
      }
      return selected.length ? selected[0].text : 'Not set';
    };

    $scope.saveUser = function(data, id) {
      //$scope.user not updated yet
      angular.extend(data, {id: id});
      // return $http.post('/saveUser', data);
    };

    // remove user
    $scope.removeNumber = function(index) {
      $scope.users.splice(index, 1);
    };

    // add user
    $scope.addUser = function() {
      $scope.inserted = {
        id: $scope.users.length+1,
        name: '',
        status: null,
        group: null
      };
      $scope.users.push($scope.inserted);
    };
  }]);

  //-----------User Table editable controller
  themeTablesEditable.controller('UserTablesEditableController', ['$scope', '$filter', function ($scope, $filter) {
  	'use strict';


	$scope.users = [
      {id: 1, fname: 'Bernard', lname: 'Beaver', email: 'bernie@logmycalls.com', phonenumber: '888-555-1212', role: 1, group: 1, campaign: 1, }
    ];

    $scope.roles = [
      {id: 1, text: 'Admin'},
      {id: 2, text: 'Standard'},
	  {id: 3, text: 'Read-Only'}
    ];

    $scope.groups = [
      {id: 1, text: 'active'},
      {id: 2, text: 'inactive'}
    ];

    $scope.campaigns = [
      {value: 1, text: 'Yes'},
      {value: 2, text: 'No'}
    ];

    $scope.showGroups = function(user) {
      if(user.group && $scope.groups.length) {
        var selected = $filter('filter')($scope.groups, {id: user.group});
        return selected.length ? selected[0].text : 'Not set';
      } else {
        return user.group || 'Not set';
      }
    };

	$scope.showRoles = function(user) {
      if(user.role && $scope.roles.length) {
        var selected = $filter('filter')($scope.roles, {id: user.role});
        return selected.length ? selected[0].text : 'Not set';
      } else {
        return user.role || 'Not set';
      }
    };

    $scope.showCampaigns = function(user) {
      var selected = [];
      if(user.campaign) {
        selected = $filter('filter')($scope.campaigns, {value: user.campaign});
      }
      return selected.length ? selected[0].text : 'Not set';
    };

    $scope.saveUser = function(data, id) {
      //$scope.user not updated yet
      angular.extend(data, {id: id});
      // return $http.post('/saveUser', data);
    };

    // remove user
    $scope.removeUser = function(index) {
      $scope.users.splice(index, 1);
    };

    // add user
    $scope.addUser = function() {
      $scope.inserted = {
        id: $scope.users.length+1,
        name: '',
        status: null,
        group: null
      };
      $scope.users.push($scope.inserted);
    };
  }]);
