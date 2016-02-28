/*
 *  Examples: ASpark REST ReactJS Isomorphic WEBDriver Allure
 *  Copyright (C) 2016  Nikolay Platov
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import ActionTypes from './actiontypes';

const ActionsCreator = {
	nop : () =>
		({
			type : ActionTypes['ACTION_TYPE_NOP']
		}),
	getTestCaseCount : () =>
		({
			type : ActionTypes['ACTION_TYPE_GET_TESTCASE_COUNT']
		}),
	testCaseCountLoaded : (c) =>
		({
			type : ActionTypes['ACTION_TYPE_TESTCASE_COUNT_LOADED'],
			count : c
		}),
	getTestCases : (p) =>
		({
			type : ActionTypes['ACTION_TYPE_GET_TESTCASES'],
			page : p
		}),
	testCasesLoaded : (tc) =>
		({
			type : ActionTypes['ACTION_TYPE_TESTCASES_LOADED'],
			testCases : tc
		}),
	addTestCase : (tc) =>
		({
			type : ActionTypes['ACTION_TYPE_ADD_TESTCASE'],
			testCase : tc
		}),
	addTestCaseProcessBegin : () =>
		({
			type : ActionTypes['ACTION_TYPE_ADD_TESTCASE_PROCESS_BEGIN']
		}),
	testCaseAdded : () =>
		({
			type : ActionTypes['ACTION_TYPE_TESTCASE_ADDED']
		}),
	testCaseDidntAdd : (msg) =>
		({
			type : ActionTypes['ACTION_TYPE_TESTCASE_DIDNT_ADD'],
			message : msg
		}),
	getTestCase : (id) =>
		({
			type : ActionTypes['ACTION_TYPE_GET_TESTCASE'],
			id : id
		}),
	testCaseLoaded : (tc) =>
		({
			type : ActionTypes['ACTION_TYPE_TESTCASE_LOADED'],
			testCase : tc
		}),
	deleteTestCase : (id) =>
		({
			type : ActionTypes['ACTION_TYPE_DELETE_TESTCASE'],
			id : id
		}),
	deleteTestCaseProcessBegin : () =>
		({
			type : ActionTypes['ACTION_TYPE_DELETE_TESTCASE_PROCESS_BEGIN']
		}),
	testCaseDeleted : () =>
		({
			type : ActionTypes['ACTION_TYPE_TESTCASE_DELETED']
		}),
	editTestCase : (tc) =>
		({
			type : ActionTypes['ACTION_TYPE_EDIT_TESTCASE'],
			testCase : tc
		}),
	editTestCaseProcessBegin : () =>
		({
			type : ActionTypes['ACTION_TYPE_EDIT_TESTCASE_PROCESS_BEGIN']
		}),
	testCaseEdited : () =>
		({
			type : ActionTypes['ACTION_TYPE_TESTCASE_EDITED']
		}),
	testCaseDidntEdit : (msg) =>
		({
			type : ActionTypes['ACTION_TYPE_TESTCASE_DIDNT_EDIT'],
			message : msg
		}),
	saveTestCaseTitleForFind : (t) =>
		({
			type : ActionTypes['ACTION_TYPE_SAVE_TESTCASE_TITLE_FOR_FIND'],
			title : t
		}),
	getTestCaseByTitle : (t) =>
		({
			type : ActionTypes['ACTION_TYPE_GET_TESTCASE_BY_TITLE'],
			title : t
		})
};

export default ActionsCreator;