// angular.module("report-components")
// 	.service('advFilSrvc', function ($rootScope, $window, $http, $location, ApiParam, pinesNotifications, $q) {

// 		console.log('@@@@@@@@@@@@@@@@ Advanced Filter Service Loaded @@@@@@@@@@@@@@@@');

// 		// ----- *** START OF ADV FILTER DATA *** ----- //
// 		var getJsonConfig = function() {
// 			var config = {
// 				headers: {
// 					'content-type': 'application/json',
// 					'Authorization': 'bearer ' + $window.sessionStorage.token
// 				}
// 			};
// 			return config;
// 		};

// 		var getFilterData = function(filter_id) {
// 			$http.defaults.useXDomain = true;
// 			return $http.get($rootScope.url + ":" + $rootScope.port + "/v1/report/filter/" + filter_id, getJsonConfig());
// 		};

// 		var getAdSources = function () {
// 			return $http.get(ApiParam.baseURL()+'/v1/report/channellist', ApiParam.headerConfig());
// 		};

// 		// Columns
// 		// Shared columns between call_detail and call_back
// 		var cd_cb_columns = [
// 			{label: 'Call ID', value: 'call.call_id'},            		{label: 'Date', value: 'call.call_started'},
// 			{label: 'Group Name', value: 'ou.org_unit_name'},     		{label: 'Campaign Name', value: 'c.campaign_name'},
// 			{label: 'Ad Source', value: 'ch.channel_id'},				{label: 'Caller ID', value: 'call.source'},
// 			{label: 'Tracking No.', value: 'call.tracking'},      		{label: 'Destination Name', value: 'cd.ring_to_name'},
// 			{label: 'Destination Number', value: 'call.ring_to'}, 		{label: 'Duration', value: 'call.duration'},
// 			{label: 'Route Name', value: 'pr.provisioned_route_name'}, 	{label: 'Tag', value: 't.tag_name'}
// 		];

//         var call_flow_columns = [
//             {label: 'CallFlow ID', value: 'pr.provisioned_route_id'},           {label: 'CallFlow Name', value: 'pr.provisioned_route_name'},
//             {label: 'Phone Number', value: 'pn.number_str'},                    {label: 'Type', value: 'cf.routable_type'},
//             {label: 'Ring-to', value: 'cf.default_ringto'},                     {label: 'Ad Source', value: 'ch.channel_id'},
//             {label: 'CallFlow Status', value: 'pr.provisioned_route_status'},   {label: 'Group name',value: 'ou.org_unit_name'},
//             {label: 'Campaign Name', value: 'c.campaign_name'},                 {label: 'DNI Type', value: 'ds.dni_type'},
//             {label: 'Host Domain', value: 'ds.destination_url'},                {label: 'Referring Website', value: 'ds.referrer'},
//             {label: 'Html Class', value: 'ds.dni_element'},                     {label: 'Custom Parameters', value: 'dou.custom_params'},
//         	{label: 'Play Disclaimer', value: 'cf.play_disclaimer'},  			{label: 'Voice Prompt', value: 'cf.message_enabled'},
// 			{label: 'Whisper Message', value: 'cf.whisper_enabled'},			{label: 'Record Call', value: 'cf.record_until'}
//         ];

// 		var group_activity_columns = [
// 			{label: 'Group ID', value: 'ou.org_unit_id'},
// 			{label: 'Group Name', value: 'ou.org_unit_name'},
// 			{label: 'Group Ext ID', value: 'ou.org_unit_ext_id'},
// 			{label: 'Calls', value: 'COUNT(cd.call_id)'},
// 			{label: 'Billable Minutes', value: 'COALESCE(SUM(cd.bill_second) - 0)::float/60'},
// 			{label: 'Leads', value: 'COUNT(CASE WHEN lead_score.score_value > 50 THEN 1 END)'},
// 			{label: 'Conversions', value: 'COUNT(CASE WHEN conversion.score_value > 50 THEN 1 END)'},
// 			{label: 'Call Value', value: 'COALESCE(SUM(cd.call_value)-0 )'},
// 			{label: 'Unique', value: 'COUNT(CASE WHEN call.repeat_call = false THEN 1 END)'},
// 			{label: 'Voicemail', value: "COUNT(CASE WHEN call.disposition = 'NO ANSWER' THEN 1 END)"},
// 			{label: 'Answered', value: "COUNT(CASE WHEN call.disposition = 'ANSWERED' THEN 1 END)"}
// 		];

// 		var acquisition_columns = [
// 			{label: 'Total Calls', value: 'total_calls'},
// 			{label: 'Total Leads', value: 'lead_count'},           {label: '% of Leads', value: 'percent_of_leads'},
// 			{label: 'Avg Lead Quality', value: 'avg_lead_quality'}, {label: 'Conversion', value: 'conversion_count'},
// 			{label: 'Conversion %', value: 'conversion_percent'},   {label: 'Avg Duration', value: 'average_duration'},
// 			{label: 'Unique calls', value: 'unique_calls'},
// 		];

// 		var group_activity_acquisition_columns = {
// 			call_flow : [{label: 'Call Flows', value:"pr.provisioned_route_name"}, {label: 'Tracking Number', value: 'pn.number'}],
// 			campaign : [{label: 'Campaign', value:'c.campaign_name'}, {label: 'Campaign Ext ID', value: 'c.campaign_ext_id'}]
// 		};

// 		var acq_sec_columns = [
// 			{label: 'Campaign', value: 'campaign_name', grouping_val : "acq_campaign"}, {label: 'Call Flow', value: 'call_flow_name', grouping_val : "acq_callflow"},
// 			{label: 'Keyword', value: 'keyword', grouping_val : "acq_keyword"}, {label: 'Ad Source', value: 'dynamicsource', grouping_val : "dynamicsource"},
// 			{label: 'Ad Source', value: 'channel', grouping_val : "channel"}, {label: 'Ring To Number', value: 'ring_to_number', grouping_val : "ring_to_number"},
// 			{label: 'Last Page', value: 'last_page', grouping_val : "last_page"}, {label: 'First Page', value: 'first_page', grouping_val : "first_page"},
// 			{label: 'Source', value: 'source', grouping_val : "source"}, {label: 'Medium', value: 'medium', grouping_val : "medium"},
// 			{label: 'Source/Medium', value: 'source_medium', grouping_val : "source_medium"}
// 		];

// 		var select_ad_names = [];
// 		// ----- *** Columns *** ----- //

// 		// ----- *** Operators *** ----- //
// 		// Allowed operators based on type of user_input and column name
// 		var containsTextMatch = {type: 'text', options: [{label: 'Contains', value: '~*'}, {label: 'Equals', value: '='}]};
// 		var specificTextMatch = {type: 'text', options: [{label: 'Equals', value: '='}]};
// 		var flexibleTextMatch = {type: 'text', options: [{label: 'Equals', value: '='}, {label: 'Greater than and Equals', value: '>='}, {label: 'Less than and Equals', value: '<='}]};

// 		var selectMatchLarge = {type: 'select-large', options: [{label: 'Equals', value: '='}]};
// 		var selectMatchSmall = {type: 'select-small', options: [{label: 'Equals', value: '='}]};

// 		var calendarMatch = {type: 'calendar', options: [{label: 'Equals', value: '='}, {label: 'Greater than and Equals', value: '>='}, {label: 'Less than and Equals', value: '<='}]};

// 		var containsIntMatch = {type: 'int', options: [{label: 'Contains', value: '~*'}, {label: 'Equals', value: '='}]};
// 		var specificIntMatch = {type: 'int', options: [{label: 'Equals', value: '='}]};
// 		var flexibleIntMatch = {type: 'int', options: [{label: 'Equals', value: '='}, {label: 'Greater than and Equals', value: '>='}, {label: 'Less than and Equals', value: '<='}]};
// 		var booleanMatch = {type: 'boolean', options: [{label: 'Equals', value: '='}]};
// 		// ----- *** Operators *** ----- //
// 		// ----- *** END OF ADV FILTER DATA *** ----- //

// 		// ----- *** START OF ADV FILTER LOGIC *** ----- //
// 		var advFilterDefinitions = [];
// 		var AFD_inclusivity, AFD_columns, AFD_operators, AFD_select_ad_names, AFD_select_options;
// 		var globalReportScope = {};

// 		// Update the global report scope from any outside controller
// 		this.updateGlobalReportScope = function(reportScope) {
// 			globalReportScope = reportScope;
// 		};

// 		// Get the advanced filter definitions from any outside controller
// 		this.getAdvFilterDefinitions = function() { return advFilterDefinitions; };

// 		// Update the advanced filter definitions from any outside controller
// 		this.updateAdvFilterDefinitions = function(definitions) { advFilterDefinitions = definitions; };

// 		// Set timezone if undefined (Used for CT-Report Engine)
// 		if (!$rootScope.timezone) { $window.sessionStorage.timezone = 'America/Chicago'; }

// 		// Send the parsed and formatted data to the requesting controller from scope.dataToVariable
// 		this.sanitizeDbFilterData = function(data) {
// 			var retData = dataToVariable(data);
// 			console.log('INSIDE sanitizeDbFilterData IN advFilSrvc.js: Sending back sanitized filter data:', retData);

// 			return retData;
// 		};

// 		// data is the return data from the API that contains the 'filter' object and 'filter_rule' array of objects
// 		var dataToVariable = function(data) {
// 		 	console.log('INSIDE dataToVariable IN advFilSrvc.js: Data:', data);
// 			var ret = { vars: {} };

// 			// set date values
// 			var yearmonth;
// 			var fd = data.filter;
// 			if (Array.isArray(fd)) { fd = fd[0]; }

// 			if (fd.filter_range !== null) {
// 				ret.vars.end_date = moment().endOf('day');

// 				// set the start time
// 				if (fd.filter_range === 'today') {
// 					ret.vars.start_date = moment().startOf('day');

// 				} else if (fd.filter_range === 'yesterday') {
// 					ret.vars.start_date = moment().subtract(1, 'days').startOf('day');
// 					ret.vars.end_date = moment().subtract(1, 'days').endOf('day');

// 				} else if (fd.filter_range === 'last_week') {
// 					ret.vars.start_date = moment().subtract(7, 'days').startOf('day');
// 					ret.vars.end_date = moment().subtract(1, 'days').endOf('day');

// 				} else if (fd.filter_range === 'last_30') {
// 					ret.vars.start_date = moment().subtract(30, 'days').startOf('day');
// 					ret.vars.end_date = moment().subtract(1, 'days').endOf('day');

// 				} else if (fd.filter_range === 'this_month') {
// 					ret.vars.start_date = moment().startOf('month').startOf('day');
// 					ret.vars.end_date = moment().endOf('month').endOf('day');

// 				} else if (fd.filter_range === 'last_month') {
// 					ret.vars.start_date = moment().subtract(1, 'month').startOf('month').startOf('day');
// 					ret.vars.end_date = moment().subtract(1, 'month').endOf('month').endOf('day');
// 				}
// 			} else {
// 				ret.vars.start_date = moment(fd.filter_start).startOf('day');
// 				ret.vars.end_date = moment(fd.filter_end).endOf('day');
// 			}
// 			// ret.vars.start_date = moment(ret.vars.drp_start);
// 			// ret.vars.end_date = moment(ret.vars.end_date);

// 			ret.drp_start = moment(ret.vars.start_date).format('MMMM D, YYYY');
// 			ret.drp_end = moment(ret.vars.end_date).format('MMMM D, YYYY');
// 			ret.vars.start_date = moment(ret.vars.start_date).format('YYYY-MM-DD');
// 			ret.vars.end_date = moment(ret.vars.end_date).format('YYYY-MM-DD');

// 			/*ret.vars.drp_options = {
// 				startDate   : moment(ret.vars.start_date),
// 				endDate     : moment(ret.vars.end_date)
// 			};
// 			*/

// 			if (data.filter_rule !== undefined) {
// 				var filterDef = [];
// 				var filter = [];

// 				angular.forEach(data.filter_rule, function (rule, key) {
// 					// console.log('parsing rule', (key + 1), rule.filter_key, rule.comparator, rule.filter_value);
// 					if (rule.filter_type === 'advanced_filter' || rule.filter_type === 'having_advanced_filter') {
// 						if(rule.filter_type === "advanced_filter" ) {
// 							ret.vars.filtertype = "a" ;
// 						} else {
// 							ret.vars.filtertype = "ha" ;
// 						}

// 						var tmpDef = {
// 							filter_key  : rule.filter_key,
// 							comparator  : rule.comparator,
// 							filter_value: rule.filter_value,
// 							filter_join : rule.filter_join,
// 							filter_type : rule.filter_type
// 						};
// 						filterDef.push(tmpDef);

// 						filter.push(rule.filter_key);
// 						filter.push(rule.comparator);
// 						filter.push(rule.filter_value);
// 						filter.push(rule.filter_join);

// 					} else if (rule.filter_type === 'basic_filter') {
// 						console.log('######### BASIC FILTER SPOTTED #########', rule, key);
// 						ret.vars.filter = rule.filter_value;
// 						ret.vars.filtertype = 's';

// 					} else {
// 						ret.vars[rule.filter_key] = rule.filter_value;
// 					}
// 				});

// 				ret.filterRule = filterDef;
// 				if (filter.length > 0) { ret.vars.filter = filter.join(','); }
// 			}

// 			if (Array.isArray(data.filter)) {
// 				data.filter = data.filter[0];
// 			}

// 			if (data.filter !== undefined) {
// 				ret.filterData = data.filter;
// 				if (data.filter.report_used !== undefined) { ret.vars.report = data.filter.report_used; }
// 				this.reportScope = ret.vars;
// 			}
// 			if (data.schedule !== undefined) { ret.scheduleData = data.schedule; }
// 			if (data.report !== undefined) { ret.reportData = data.report; }

// 			console.log('INSIDE dataToVariable IN advFilSrvc.js: Returning:', ret);
// 			return ret;
// 		};
// 		this.dataToVariable = dataToVariable;

// 		// Get all dynamic lists options, filter them down to unique options only, arrange in alpha and numerical order, as soon as advanced filter loads in
// 		this.getAllDynamicLists = function () {
// 			getAdSources().then(function (r) {
// 				var uniqueNames = [];
// 				AFD_select_ad_names = [];

// 				for (var i in r.data.json) {
// 					if (uniqueNames.indexOf(r.data.json[i].cat_combo) === -1) {
// 						AFD_select_ad_names.push({
// 							label: r.data.json[i].cat_combo,
// 							value: r.data.json[i].channel_id
// 						});
// 						uniqueNames.push(r.data.json[i].cat_combo);
// 					}
// 				}
// 			});
// 		}();

// 		// Set select options based on page
// 		var setSelectOptions = function () {
// 			console.log('INSIDE setSelectOptions IN advFilSrvc.js: Setting select options for', globalReportScope.report);
// 			AFD_inclusivity = [{label: 'Include', value: 'include'}, {label: 'Exclude', value: 'exclude'}];
// 			var columns = [];
// 			switch (globalReportScope.report) {
// 				case 'call_detail':
// 					AFD_columns = cd_cb_columns;
// 					break;
// 				case 'call_back':
// 					AFD_columns = cd_cb_columns;
// 					break;
// 				case 'callflow_setting':
// 					AFD_columns = call_flow_columns;
// 					break;
// 				case 'group_activity':
// 					AFD_columns = group_activity_columns;
// 					if(globalReportScope.secondary !== undefined && globalReportScope.secondary !== "none"){
// 						console.log(group_activity_acquisition_columns[globalReportScope.secondary]);
// 						AFD_columns = group_activity_acquisition_columns[globalReportScope.secondary].concat(AFD_columns);
// 					}
// 					break;
// 				case 'set-schedule-builder':
// 					// scope.columns get's defined when the user selects a report type. ( $rootScope.$on('schedule_builder_report_changed') )
// 					break;
// 				case 'acq_group':
// 					columns.push({label: 'Group Name', value: 'org_unit_name'});
// 					break;
// 				case 'acq_campaign':
// 					columns.push({label: 'Campaign', value: 'campaign_name'});
// 					break;
// 				case 'acq_callflow':
// 					columns.push({label: 'Call Flow', value: 'call_flow_name'});
// 					break;
// 				case 'acq_keyword':
// 					columns.push({label: 'Keyword', value: 'keyword'});
// 					break;
// 				case 'acq_source':
// 					columns.push({label: 'Source', value: 'dynamicsource'});
// 					break;
// 			}
// 			if(globalReportScope.secondary !== undefined && globalReportScope.secondary !== "none" && globalReportScope.report.split("_")[0] === "acq"){
// 				var sec_grp = globalReportScope.secondary;
// 				var sec_acq_col = _.find(acq_sec_columns, function(item) {
// 				   	if(item.grouping_val == sec_grp)
// 				   		return {"label" : item.label, "value": item.grouping_val};
// 				});
// 				columns.push(sec_acq_col);
// 			} else if(globalReportScope.report !== undefined && globalReportScope.report.split("_")[0] === "acq")
// 				AFD_columns = acquisition_columns;

// 			if (columns.length > 0) {
// 				columns = columns.concat(acquisition_columns);
// 				AFD_columns = columns;
// 			}
// 		};
// 		this.setSelectOptions = setSelectOptions;

// 		// Add Advanced Filter Definition / Initialize Advanced Filter
// 		var addFilterDefinition = function (initialize) {
// 			// console.log('INSIDE addFilterDefinition IN advFilSrvc: Adding filter definition');
// 			// Set defaults for Date/Time picker
// 			var dateTime = {};
// 			dateTime.date = new Date();
// 			dateTime.dateOptions = {formatYear: 'yy', startingDay: 1};
// 			dateTime.format = 'dd-MMMM-yyyy';
// 			dateTime.open = function (e, $index) {
// 				this.opened = true;
// 				for (var i in this.advFilterDefinitions) {
// 					if (i != $index) {
// 						advFilterDefinitions[i].dateTime.opened = false;
// 					}
// 				}
// 			};
// 			dateTime.opened = false;

// 			if (initialize) {
// 				advFilterDefinitions.push({
// 					inclusivity         : AFD_inclusivity,
// 					columns             : AFD_columns,
// 					operators           : AFD_operators,
// 					selected_inclusivity: AFD_inclusivity[0],
// 					dateTime            : dateTime
// 				});
// 			} else {
// 				// Check to see if a rule has been selected on the last rule - (true - add a new definition, false - display error pine notification)
// 				if (advFilterDefinitions[advFilterDefinitions.length-1].rule || advFilterDefinitions.length == 1) {
// 					advFilterDefinitions.push({
// 						inclusivity         : AFD_inclusivity,
// 						columns             : AFD_columns,
// 						operators           : AFD_operators,
// 						selected_inclusivity: AFD_inclusivity[0],
// 						dateTime            : dateTime,
// 						rule                : 'AND'
// 					});
// 				} else {
// 					pinesNotifications.notify({
// 						title: 'Advanced Filter',
// 						text : 'Please complete the required join type before adding a new filter.',
// 						type : 'error'
// 					});
// 				}
// 			}
// 		};
// 		this.addFilterDefinition = addFilterDefinition;

// 		// Remove Advanced Filter Definition
// 		this.removeFilterDefinition = function ($index) {
// 			advFilterDefinitions.splice($index, 1);
// 			advFilterDefinitions[0].rule = '';
// 		};

// 		// Update selectable operators based on which column is selected
// 		var updateOperators = function (preloading, selected, $index) {
// 			console.log('INSIDE updateOperators IN advFilSrvc.js: Updating:', preloading, selected, $index);
// 			var updatedOperators, switcher;

// 			if (preloading) {
// 				switcher = selected.value;
// 				$index = 0;
// 			} else {
// 				switcher = selected.selected_column.value;
// 			}

// 			var selectMatches = ['ch.cat_combo', 'cf.routable_type', 'pr.provisioned_route_status', 'ds.dni_type','ch.channel_id', 'cf.play_disclaimer', 'cf.message_enabled', 'cf.whisper_enabled', 'cf.record_until'];
// 			var calendarMatches = ['call.call_started'];

// 			var specificIntMatches = ['pr.provisioned_route_id', 'cf.default_ringto', 'call.call_id'];
// 			var specificTextMatches = ['call.source', 'cf.record_until', 't.tag_name'];

// 			var containIntMatches = ['call.tracking', 'call.ring_to', 'pn.number_str'];
// 			var containTextMatches = [	'ou.org_unit_name', 'org_unit_name', 'c.campaign_name',
// 										'cd.ring_to_name', 'ds.destination_url', 'ds.referrer', 'ds.dni_element', 'dou.custom_params',
// 										'ou.org_unit_ext_id', 'group', 'campaign_name', 'call_flow_name', 'keyword', 'dynamicsource','channel','source','medium',
// 										'source_medium','first_page','last_page','ring_to_number','c.campaign_name','c.campaign_ext_id','pr.provisioned_route_name'
// 									];

// 			var flexibleIntMatches = ['ou.org_unit_id','COUNT(cd.call_id)', 'COALESCE(SUM(cd.bill_second) - 0)::float/60', 'COUNT(CASE WHEN lead_score.score_value > 50 THEN 1 END)', 'COUNT(CASE WHEN conversion.score_value > 50 THEN 1 END)',
// 									  'COALESCE(SUM(cd.call_value)-0 )', 'COUNT(CASE WHEN call.repeat_call = false THEN 1 END)',
// 									  'total_calls', 'percent_of_leads', 'avg_lead_quality', 'conversion_count',
// 									  'conversion_percent', 'COUNT(CASE WHEN call.repeat_call = false THEN 1 END)', "COUNT(CASE WHEN call.disposition = 'ANSWERED' THEN 1 END)",
// 									  "COUNT(CASE WHEN call.disposition = 'NO ANSWER' THEN 1 END)",'pn.number'];

// 			var flexibleTextMatches = ['call.duration','unique_calls', 'bill_minutes', 'lead_count', 'conversion', 'unique_calls', 'voicemail', 'answered', 'average_duration'];

// 			if (selectMatches.indexOf(switcher) !== -1) {
// 				switch (switcher) {
// 					case 'ch.cat_combo':
// 						updatedOperators = selectMatchLarge;
// 						AFD_select_options = AFD_select_ad_names;
// 						break;
// 					case 'ch.channel_id':
// 						updatedOperators = selectMatchLarge;
// 						AFD_select_options = AFD_select_ad_names;
// 						break;
// 					case 'dynamicsource':
// 						updatedOperators = selectMatchLarge;
// 						AFD_select_options = AFD_select_ad_names;
// 						break;
// 					case 'cf.routable_type':
// 						updatedOperators = selectMatchSmall;
// 						AFD_select_options = [
// 							{label: 'Local', value: 'SimpleRoute'},					{label: 'TollFree', value: 'tollfree'},
// 							{label: 'Geo Route', value: 'GeoRoute'},				{label: 'IVR', value: 'IvrRoute2'},
// 							{label: 'Percentage', value: 'PercentageBasedRoute'},	{label: 'Hang Up', value: 'Hangup'},
// 							{label: 'Number Pool', value: 'number_pool'}
// 						];
// 						break;
// 					case 'pr.provisioned_route_status':
// 						updatedOperators = selectMatchSmall;
// 						AFD_select_options = [
// 							{label: 'Active', value: 'active'}, 	{label: 'Inactive', value: 'inactive'}, 	{label: 'Referral', value: 'referral'}
// 						];
// 						break;
// 					case 'ds.dni_type':
// 						updatedOperators = selectMatchSmall;
// 						AFD_select_options = [
// 							{label: 'Source', value: 'source'}, 	{label: 'Session', value: 'session'},
// 							{label: 'Url', value: 'url'}
// 						];
// 						break;
// 					case 'cf.play_disclaimer':
// 						updatedOperators = selectMatchSmall;
// 						AFD_select_options = [
// 							{label: 'Before', value: 'before'}, {label: 'After', value: 'after'}, {label: 'Never', value: 'never'}
// 						];
// 						break;
// 					case 'cf.message_enabled':
// 						updatedOperators = selectMatchSmall;
// 						AFD_select_options = [
// 							{label: 'Yes', value: '1'}, {label: 'No', value: '0'}
// 						];
// 						break;
// 					case 'cf.whisper_enabled':
// 						updatedOperators = selectMatchSmall;
//                         AFD_select_options = [
//                             {label: 'Yes', value: '1'}, {label: 'No', value: '0'}
//                         ];
//                         break;
// 					case 'cf.record_until':
// 						updatedOperators = selectMatchSmall;
// 						AFD_select_options = [
// 							{label: 'Yes', value: '1'}, {label: 'No', value: '0'}
// 						];
// 				}
// 			} else if (calendarMatches.indexOf(switcher) !== -1) {
// 				updatedOperators = calendarMatch;
// 			} else if (specificIntMatches.indexOf(switcher) !== -1) {
// 				updatedOperators = specificIntMatch;
// 			} else if (specificTextMatches.indexOf(switcher) !== -1) {
// 				updatedOperators = specificTextMatch;
// 			} else if (containIntMatches.indexOf(switcher) !== -1) {
// 				updatedOperators = containsIntMatch;
// 			} else if (containTextMatches.indexOf(switcher) !== -1) {
// 				updatedOperators = containsTextMatch;
// 			} else if (flexibleIntMatches.indexOf(switcher) !== -1) {
// 				updatedOperators = flexibleIntMatch;
// 			} else if (flexibleTextMatches.indexOf(switcher) !== -1) {
// 				updatedOperators = flexibleTextMatch;
// 			}

// 			// Set operator options and pre-selected operator
// 			if (preloading) {
// 				return updatedOperators;
// 			} else {
// 				advFilterDefinitions[$index].selected_operator = updatedOperators.options[0];
// 				advFilterDefinitions[$index].operators = updatedOperators;
// 				advFilterDefinitions[$index].show_operators = true;
// 				advFilterDefinitions[$index].select_options = AFD_select_options;
// 			}
// 		};
// 		this.updateOperators = updateOperators;

// 		// Reset the Advanced Filter
// 		this.resetAdvFilter = function () {
// 			// Remove all definitions and add a default one
// 			advFilterDefinitions = [];
// 			setSelectOptions();
// 			addFilterDefinition(true);
// 		};

// 		// Validate the Advanced Filter
// 		var validateFilters = function () {
// 			console.log('INSIDE validateFilters IN advFilSrvc.js: Validating:', globalReportScope.advFilterDefinitions);
// 			var error = {};
// 			var labels = ['first', 'second', 'third', 'fourth', 'fifth'];

// 			for (var i = 0; i < globalReportScope.advFilterDefinitions.length; i++) {
// 				if (!globalReportScope.advFilterDefinitions[i].selected_inclusivity) {
// 					error.title = 'Missing inclusivity';
// 					error.text = 'Please make sure you have selected an inclusivity for your '+labels[i]+' filter.';
// 					error.found = true;
// 					break;
// 				} else if (!globalReportScope.advFilterDefinitions[i].selected_column) {
// 					error.title = 'Missing column';
// 					error.text = 'Please make sure you have selected a column for your '+labels[i]+' filter.';
// 					error.found = true;
// 					break;
// 				} else if (!globalReportScope.advFilterDefinitions[i].selected_operator) {
// 					error.title = 'Missing comparator';
// 					error.text = 'Please make sure you have selected an comparator for your '+labels[i]+' filter.';
// 					error.found = true;
// 					break;
// 				} else if (!globalReportScope.advFilterDefinitions[i].user_input) {
// 					if(globalReportScope.advFilterDefinitions[i].user_input !== 0) {
// 						error.title = 'Missing input';
// 						error.text = 'Please make sure you have filled out the required input for your '+labels[i]+' filter.';
// 						error.found = true;
// 					}
// 					break;
// 				} else if (!globalReportScope.advFilterDefinitions[i].rule && i !== 0) {
// 					error.title = 'Missing filter rule';
// 					error.text = 'Please make sure you have selected a join type for you '+labels[i]+' filter.';
// 					error.found = true;
// 					break;
// 				}
// 			}

// 			if (!error.found) {
// 				return true;
// 			} else {
// 				return {
// 					title: error.title,
// 					text : error.text
// 				};
// 			}
// 		};
// 		this.validateFilters = validateFilters;

// 		// Sanitize the Advanced Filter
// 		var sanitizeFilters = function () {
// 			var filters = [];
// 			var operator;

// 			console.log('INSIDE sanitizeFilters IN advFilSrvc.js: Sanitizing:', globalReportScope.advFilterDefinitions);
// 			// Inverse operator if exclude
// 			for (var i in globalReportScope.advFilterDefinitions) {
// 				operator = globalReportScope.advFilterDefinitions[i].selected_operator.value;
// 				if (globalReportScope.advFilterDefinitions[i].selected_inclusivity.value === 'exclude') {
// 					console.log('INSIDE sanitizeFilters IN advFilSrvc.js: Inversing operator:', globalReportScope.advFilterDefinitions[i]);
// 					switch (globalReportScope.advFilterDefinitions[i].selected_operator.value) {
// 						case '=':
// 							operator = '!=';
// 							break;
// 						case '!=':
// 							operator = "=";
// 							break;
// 						case '~*':
// 							operator = "!~*";
// 							break;
// 						case '!~*':
// 							operator = "~*";
// 							break;
// 						case '>=':
// 							operator = "<=";
// 							break;
// 						case '<=':
// 							operator = '>=';
// 							break;
// 					}
// 				}

// 				// Check to see if input type is int. ParseInt user input.
// 				if (globalReportScope.advFilterDefinitions[i].operators.type === "int") {
// 					var regObj =  /^\(?\d{3}\)?[\s\-]\d{3}[\s\-]\d{4}\$/;
// 					if ( regObj.test(globalReportScope.advFilterDefinitions[i].user_input) ) {
// 						console.log('@@@@@@@@@ PHONE NUMBER SPOTTED @@@@@@@@@');
// 					}
// 					// // (999)-999-9999
// 					// if (.test(globalReportScope.advFilterDefinitions[i].user_input) ) {
// 					//
// 					// }
// 					globalReportScope.advFilterDefinitions[i].user_input = parseInt(globalReportScope.advFilterDefinitions[i].user_input);
// 				}
// 				// Sanitize advFilterDefinitions into what the backend is looking for.
// 				filters.push({
// 					"filter_key"  : globalReportScope.advFilterDefinitions[i].selected_column.value,
// 					"comparator"  : operator,
// 					"filter_value": globalReportScope.advFilterDefinitions[i].user_input,
// 					"filter_join" : (!globalReportScope.advFilterDefinitions[i].rule ? 'NONE' : globalReportScope.advFilterDefinitions[i].rule),
// 					"filter_type" : globalReportScope.report !== "group_activity" ? "advanced_filter" : "having_advanced_filter"
// 				});
// 			}

// 			console.log('INSIDE sanitizeFilters IN advFilSrvc.js: Sanitized Definitions:', filters);
// 			return filters;
// 		};
// 		this.sanitizeFilters = sanitizeFilters;

// 		this.urlStringToData = function() {
// 			var qstr = $location.search();
// 			console.log('INSIDE urlStringToData IN directives.js: Qstr:', qstr);
// 			if (Object.keys(qstr).length < 1) {
// 				qstr.filter = decodeURIComponent(qstr.filter);
// 			}
// 		};

// 		// Request scope variables needed for query string and set to an object
// 		var setUrlParams = function (sanitizedDefinitions) {
// 			console.log("INSIDE setUrlParams IN advFilSrvc.js: Using report scope", globalReportScope);

// 			// This depends on the return value being populated with this
// 			var sv = globalReportScope;
// 			var parseAdv = false;
// 			var params = {};
// 			var advRule = [];
// 			var filterRule = [];
// 			// set advanced / basic filter vars
// 			if (angular.isDefined(globalReportScope.advFilterDefinitions) && globalReportScope.advFilterDefinitions.length > 0 && validateFilters() === true) {
// 				// console.log('filter is using advanced filter');

// 				var adv = false;
// 				var filtertype = "a";
// 				//console.log('setting adv filter rules');
// 				// cycle through filter rules
// 				angular.forEach(globalReportScope.advFilterDefinitions, function (rule, key) {
// 					if (rule.selected_column !== undefined) {
// 						adv = true;

// 						// console.log('RULE', rule);
// 						// advRule.push(rule.selected_column.value);
// 						if (sanitizedDefinitions) {
// 							advRule.push(sanitizedDefinitions[key].filter_key);
// 							advRule.push(sanitizedDefinitions[key].comparator);

// 							if(sanitizedDefinitions[key].filter_type === 'advanced_filter') {
// 								filtertype = 'a' ;
// 							}
// 							else {
// 								filtertype = 'ha';
// 							}
// 						} else {
// 							advRule.push(rule.selected_column.value);
// 							advRule.push(rule.selected_operator.value);
// 						}
// 						if (rule.operators.type === "calendar") {
// 							rule.user_input = moment(rule.user_input).format('YYYY-MM-DD');
// 						}
// 						advRule.push(rule.user_input);
// 						advRule.push(rule.rule);

// 						filterRule.push(rule);
// 					}
// 				});
// 				if (adv) {
// 					params.filtertype = filtertype;
// 					params.filter = advRule.join(',');
// 				}

// 			} else if (sv.filter !== undefined && sv.filter !== '') {
// 				console.log('filter is set in scope');
// 				// check if we need to parse advanced filters
// 				if (sv.filtertype !== undefined && (sv.filtertype === 'a' || sv.filtertype === 'ha')) {
// 					params.filter = decodeURIComponent(sv.filter);
// 					parseAdv = true;
// 		  params.filtertype = sv.filtertype;
// 				} else {
// 					params.filtertype = 's';
// 				}
// 			} else if ($location.search().filter) {
// 				console.log('filter is set in query string');
// 				if ($location.search().filtertype === 'a') {
// 					params.filter = unescape($location.search().filter);
// 					parseAdv = true;
// 		  params.filtertype = 'a';
// 				} else {
// 					params.filtertype = 's';
// 				}
// 			} else { //if (this.simpleSearchFilter !== '') {
// 				console.log('SIMPLE FILTER DEFAULT', globalReportScope.simpleSearchFilter);
// 				params.filtertype = 's';
// 			}

// 			// handle conversion of filter rules into array of objects
// 			if (parseAdv) {
// 				// params.filtertype = sv.filtertype;
// 				advRule = params.filter.split(',');

// 				while (advRule.length >= 4) {
// 					var rule = {};
// 					rule.filter_key = advRule.shift();
// 					rule.comparator = advRule.shift();
// 					rule.filter_value = advRule.shift();
// 					rule.filter_join = advRule.shift();
// 					filterRule.push(rule);
// 				}
// 			} else if (params.filtertype === 's') {
// 				params.filter = (globalReportScope.simpleSearchFilter !== '' ? globalReportScope.simpleSearchFilter : '');
// 				// console.log('Have simple filter', params.filter, this.simpleSearchFilter);
// 			}

// 			// set the other URL params
// 			//params.filterRule = filterRule;
// 			// console.log('filterRule in setUrlParams in directive', filterRule);
// 			// console.log('FILTER', params.filter, 'FILTERTYPE', params.filtertype);

// 			// set 'secondary',  'exportData' 'filtertype', 'filter'
// 			if (angular.isDefined(sv.exportData)) { params.exportData = sv.exportData; }
// 			//if (angular.isDefined(sv.filtertype)) {  params.filtertype = sv.filtertype; }
// 			//if (angular.isDefined(sv.filter)) { params.filter = sv.filter; }
// 			params.secondary = (angular.isDefined(sv.secondary) ? sv.secondary : 'none');

// 			// set start_date
// 			if (angular.isDefined(sv.drp_start)) {
// 				params.start_date = moment(sv.drp_start, "MMMM D, YYYY").format('YYYY-MM-DD');
// 				// console.log('start date from drp_start', params.start_date);
// 			} else if ($location.search().start_date) {
// 				params.start_date = $location.search().start_date;
// 				// console.log('start date from query string', params.start_date);
// 			} else if ($window.sessionStorage.report_start_date) {
// 				params.start_date = moment($window.sessionStorage.report_start_date, 'MMMM D, YYYY').format('YYYY-MM-DD');
// 			} else {
// 				params.start_date = moment().subtract(1, 'weeks').format('YYYY-MM-DD');
// 				// console.log('start date set to default', params.start_date);
// 			}
// 			// set end_date
// 			if (angular.isDefined(sv.drp_end)) {
// 				params.end_date = moment(sv.drp_end, "MMMM D, YYYY").format('YYYY-MM-DD');
// 			} else if ($location.search().end_date) {
// 				params.end_date = $location.search().end_date;
// 			} else if ($window.sessionStorage.report_end_date) {
// 				params.end_date = moment($window.sessionStorage.report_end_date).format('MMMM D, YYYY');
// 			} else {
// 				params.end_date = moment().format('YYYY-MM-DD');
// 			}
// 			// set report
// 			if (angular.isDefined(sv.report)) {
// 				params.report = sv.report;
// 			} else if ($location.search().report) {
// 				params.report = $location.search().report;
// 			}
// 			// set timezone
// 			if (angular.isDefined(sv.timezone)) {
// 				// console.log('FROM VARIABLE', sv.timezone);
// 				params.timezone = sv.timezone;
// 			} else if ($location.search().timezone) {
// 				params.timezone = decodeURIComponent($location.search().timezone);
// 				// console.log('FROM QSTR', params.timezone);
// 			} else if (angular.isDefined($rootScope.timezone)) {
// 				params.timezone = $rootScope.timezone;
// 				// console.log('ROOTSCOPE', params.timezone);
// 			}
// 			// set limit
// 			if (angular.isDefined(sv.limit)) {
// 				params.limit = sv.limit;
// 			} else if ($location.search().limit) {
// 				params.limit = $location.search().limit;
// 			} else {
// 				params.limit = 100;
// 			}
// 			// set offset
// 			if (angular.isDefined(sv.offset)) {
// 				params.offset = sv.offset;
// 			} else if ($location.search().offset) {
// 				params.offset = $location.search().offset;
// 			} else {
// 				params.offset = 0;
// 			}

// 			/*params.drp_options = {
// 				startDate   : moment(params.start_date),
// 				endDate     : moment(params.end_date),
// 				ranges: {
// 					'Today': [ moment().startOf('day'), moment().endOf('day') ],
// 					'Yesterday': [moment().subtract(1, 'days').startOf('day'), moment().subtract(1, 'days').endOf('day')],
// 					'Last 7 Days': [moment().subtract(7, 'days').startOf('day'), moment().endOf('day')],
// 					'Last 30 Days': [moment().subtract(29, 'days').startOf('day'), moment().endOf('day')],
// 					'This Month': [moment().startOf('month').startOf('day'), moment().endOf('month').endOf('day')],
// 					'Last Month': [moment().subtract(1, 'month').startOf('month').startOf('day'), moment().subtract(1, 'month').endOf('month').endOf('day')]
// 				},
// 				opens: 'left'
// 			};
// 			*/
// 			params.drp_start = moment(params.start_date).format('MMMM D, YYYY');
// 			params.drp_end = moment(params.end_date).format('MMMM D, YYYY');
// 			var ret = {
// 				drp_start               : moment(params.start_date).format('MMMM D, YYYY'),
// 				drp_end                 : moment(params.end_date).format('MMMM D, YYYY'),
// 				vars                    : params,
// 				filterRule              : filterRule
// 			};

// 			this.reportScope = ret.vars;
// 			console.log('return from setUrlParams', ret.vars);
// 			return ret;
// 		};
// 		this.setUrlParams = setUrlParams;

// 		// Apply basic or advanced filter
// 		this.applyFilter = function(reportScope) {
// 			globalReportScope = reportScope;
// 			if (globalReportScope.advFilterDefinitions.length > 0 && globalReportScope.advFilterDefinitions[0].selected_column && globalReportScope.showAdvFilter) {
// 				var validated = validateFilters();
// 				if (validated === true) {
// 					var sanitizedDefinitions = sanitizeFilters();
// 					return setUrlParams(sanitizedDefinitions);
// 				} else {
// 					pinesNotifications.notify({
// 						title: validated.title,
// 						text : validated.text,
// 						type : 'error'
// 					});
// 					return false;
// 				}
// 			} else if (globalReportScope.advFilterDefinitions.length > 0 && globalReportScope.showAdvFilter) {
// 				var error = validateFilters();
// 				pinesNotifications.notify({
// 					title: error.title,
// 					text : error.text,
// 					type : 'error'
// 				});
// 				return false;
// 			} else {
// 				return setUrlParams();
// 			}
// 		};

// 		// Initialize Advanced Filter
// 		var initializeAdvFil = function (filters) {
// 			if (filters) { console.log('INSIDE initializeAdvFil IN advFilSrvc.js: Initializing filter with', filters); }

// 			advFilterDefinitions = [];
// 			setSelectOptions();

// 			if (!filters) {
// 				addFilterDefinition(true);
// 			} else if (Array.isArray(filters) && filters.length > 0) {
// 				// console.log('PRELOADING FILTER IN INITIALIZE FILTER', filters);
// 				for (var i = 0; i < filters.length; i++) {
// 					var selected_column, operators, selected_operator, rule, selected_inclusivity = AFD_inclusivity[0];
// 					// Determine which column should be selected
// 					for (var j in AFD_columns) {
// 						// console.log(scope.columns[j]);
// 						if (AFD_columns[j].value === filters[i].filter_key) {
// 							selected_column = AFD_columns[j];
// 						}
// 					}

// 					if (!selected_column) {
// 						console.log('No match found for', filters[i].filter_key, AFD_columns);
// 						break;
// 					} else {
// 						operators = updateOperators(true, selected_column);
// 					}

// 					switch (filters[i].comparator) {
// 						case '!=':
// 							filters[i].comparator = "=";
// 							selected_inclusivity = AFD_inclusivity[1];
// 							break;
// 						case '!~*':
// 							filters[i].comparator = "~*";
// 							selected_inclusivity = AFD_inclusivity[1];
// 							break;
// 					}

// 					for (var l in operators.options) {
// 						if (operators.options[l].value === filters[i].comparator) {
// 							selected_operator = operators.options[l];
// 						}
// 					}

// 					advFilterDefinitions.push({
// 						inclusivity         : AFD_inclusivity,
// 						columns             : AFD_columns,
// 						operators           : operators,
// 						show_operators      : true,
// 						select_options		: (AFD_select_options ? AFD_select_options : ''),
// 						selected_inclusivity: selected_inclusivity,
// 						selected_column     : selected_column,
// 						selected_operator   : selected_operator,
// 						user_input          : filters[i].filter_value,
// 						rule                : (i !== 0 ? filters[i].filter_join : '')
// 					});
// 				}
// 			} else {
// 				addFilterDefinition(true);
// 			}

// 			console.log('INSIDE initializeAdvFil IN advFilSrvc.js: advFilterDefinitions:', advFilterDefinitions);
// 		};

// 		// Determine whether to preload or normal load the advanced filter
// 		this.determineInitializationMethod = function(reportScope) {
// 			if (reportScope) { globalReportScope = reportScope; } else { console.log('INSIDE determineInitializationMethod IN advFilSrvc.js: No reportScope found.'); }
// 			var defferedObj = $q.defer();
// 			if ($location.search().filter_id) {
// 				console.log('INSIDE determineInitializationMethod IN advFilSrvc.js: Loading using filter_id method:', $location.search().filter_id);
// 				// make call to API for filter data
// 				getFilterData($location.search().filter_id).then(function (result) {
// 					if (result.data.result === 'success') {
// 						// call function to convert the data to variables format
// 						// console.log('got filter data', result.data.json);
// 						var retData = dataToVariable(result.data.json);
// 						var filters = [];
// 						if(retData.vars.secondary)
// 							globalReportScope.secondary = retData.vars.secondary;
// 						if (retData.filterRule.length >= 1) {
// 							console.log('advFilterDefinitions spotted');
// 							initializeAdvFil(retData.filterRule);
// 						} else {
// 							initializeAdvFil();
// 						}

// 						console.log('INSIDE determineInitializationMethod IN advFilSrvc.js: Returning retData', retData);
// 						defferedObj.resolve(retData);
// 					} else {
// 						pinesNotifications.notify({
// 							title: 'Filter data',
// 							text : 'Failed to load filter data',
// 							type : 'error'
// 						});
// 					}
// 				});

// 				return defferedObj.promise;
// 			} else {
// 				console.log('INSIDE determineInitializationMethod IN advFilSrvc.js: Loading using scope and qstr');
// 				var retData = setUrlParams();
// 				defferedObj.resolve(retData);

// 				if (angular.isDefined(retData.filterRule) && retData.filterRule.length > 0) {
// 					initializeAdvFil(retData.filterRule);
// 				} else {
// 					initializeAdvFil();
// 				}

// 				return defferedObj.promise;
// 			}
// 		};

// 		// Only allow 0 - 9 and backspace on user int inputs
// 		this.validateInput = function (e) {
// 			var key = e.which || e.charCode;

// 			if (e.keyCode != 8 && (key < 48 || key > 57)) {
// 				e.preventDefault();
// 			}
// 		};
// 	});
