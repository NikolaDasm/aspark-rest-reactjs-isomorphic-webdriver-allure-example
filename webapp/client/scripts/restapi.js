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

class RestAPI {
	getTestCaseCount(onSuccess, onError) {
		let xhr = new XMLHttpRequest();
		xhr.open('GET', '/api/v1/testcases/count', true);
		xhr.onload = () => {
			let count = xhr.responseText;
			onSuccess(count);
		};
		xhr.send(null);
	}

	getTestCases(onSuccess, onError, startWith, count) {
		let xhr = new XMLHttpRequest();
		xhr.open('GET', '/api/v1/testcases/range/'+startWith+'/'+count, true);
		xhr.onload = () => {
			let testCases = JSON.parse(xhr.responseText);
			onSuccess(testCases);
		};
		xhr.send(null);
	}

	addTestCase(onSuccess, onError, testCase) {
		let xhr = new XMLHttpRequest();
		xhr.open('POST', '/api/v1/testcases', true);
		xhr.onload = () => {
			if (xhr.status >= 200 && xhr.status < 300)
				onSuccess();
			else
				onError((xhr.responseText) ? xhr.responseText : xhr.statusText);
		};
		try {
			xhr.send(JSON.stringify(testCase));
		} catch(e) {}
	}

	getTestCase(onSuccess, onError, id) {
		let xhr = new XMLHttpRequest();
		xhr.open('GET', '/api/v1/testcases/byid/'+id, true);
		xhr.onload = () => {
			let testCase = JSON.parse(xhr.responseText);
			onSuccess(testCase);
		};
		xhr.send(null);
	}

	deleteTestCase(onSuccess, onError, id) {
		let xhr = new XMLHttpRequest();
		xhr.open('DELETE', '/api/v1/testcases/'+id, true);
		xhr.onload = () => {
			onSuccess();
		};
		xhr.send(null);
	}

	editTestCase(onSuccess, onError, testCase) {
		let xhr = new XMLHttpRequest();
		xhr.open('PUT', '/api/v1/testcases', true);
		xhr.onload = () => {
			if (xhr.status >= 200 && xhr.status < 300)
				onSuccess();
			else
				onError((xhr.responseText) ? xhr.responseText : xhr.statusText);
		};
		try {
			xhr.send(JSON.stringify(testCase));
		} catch(e) {}
	}

	getTestCaseByTitle(onSuccess, onError, title) {
		let xhr = new XMLHttpRequest();
		xhr.open('POST', '/api/v1/testcases/bytitle', true);
		xhr.onload = () => {
			let testCase = JSON.parse(xhr.responseText);
			onSuccess(testCase);
		};
		xhr.setRequestHeader('X-HTTP-Method-Override', 'GET');
		xhr.send(title);
	}
}

export default new RestAPI();