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

const javaToJSTestCase = (javaTestCase) => {
	return {
		id : javaTestCase.id,
		title : javaTestCase.title,
		description : javaTestCase.description,
		owner : javaTestCase.owner,
		priority : javaTestCase.priority,
		location : javaTestCase.location,
		status : javaTestCase.status,
		steps : javaTestCase.steps,
		expectedResults : javaTestCase.expectedResults,
		assignedTo : javaTestCase.assignedTo,
		version : javaTestCase.version
	};
};

class RestAPI {
	getTestCaseCount(onSuccess, onError) {
		onSuccess(testCaseDao.getTestCaseCount());
	}

	getTestCases(onSuccess, onError, startWith, count) {
		let javaTestCases = testCaseDao.getTestCases(startWith, count);
		let jsTestCases = [];
		for (let i in javaTestCases) jsTestCases.push(javaToJSTestCase(javaTestCases.get(i)));
		onSuccess(jsTestCases);
	}
	
	getTestCase(onSuccess, onError, id) {
		onSuccess(javaToJSTestCase(testCaseDao.getTestCase(parseInt(id) || '')));
	}
}

export default new RestAPI();