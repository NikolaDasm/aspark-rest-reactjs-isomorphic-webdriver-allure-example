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

import ActionTypes from './../../shared/scripts/actiontypes';

const testCaseCountLoadedHandler = function (state, action) {
	if (action.type == ActionTypes['ACTION_TYPE_TESTCASE_COUNT_LOADED']) {
		return {...state, ...{testCasesCount : action.count}};
	}
	return state;
};

const testCasesLoadedHandler = function (state, action) {
	if (action.type == ActionTypes['ACTION_TYPE_TESTCASES_LOADED']) {
		return {...state, ...{testCases : action.testCases}};
	}
	return state;
};

const addTestCaseProcessBeginActionHandler = function (state, action) {
	if (action.type == ActionTypes['ACTION_TYPE_ADD_TESTCASE_PROCESS_BEGIN']) {
		return {...state, ...{isAddTestCaseProcessBegin : true}};
	}
	return state;
};

const testCaseLoadedHandler = function (state, action) {
	if (action.type == ActionTypes['ACTION_TYPE_TESTCASE_LOADED']) {
		return {...state, ...{testCase : action.testCase}};
	}
	return state;
};

const deleteTestCaseProcessBeginActionHandler = function (state, action) {
	if (action.type == ActionTypes['ACTION_TYPE_DELETE_TESTCASE_PROCESS_BEGIN']) {
		return {...state, ...{isDeleteTestCaseProcessBegin : true}};
	}
	return state;
};

const editTestCaseProcessBeginActionHandler = function (state, action) {
	if (action.type == ActionTypes['ACTION_TYPE_EDIT_TESTCASE_PROCESS_BEGIN']) {
		return {...state, ...{isEditTestCaseProcessBegin : true}};
	}
	return state;
};

export default [
	testCaseCountLoadedHandler,
	testCasesLoadedHandler,
	addTestCaseProcessBeginActionHandler,
	testCaseLoadedHandler,
	deleteTestCaseProcessBeginActionHandler,
	editTestCaseProcessBeginActionHandler,
];