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

import React from './../../shared/lib/react';
import ReactDOMServer from './../../shared/lib/react-dom-server';
import { match, RouterContext } from './../../shared/lib/react-router'
import createStore from './appstore';
import routes from './../../shared/scripts/routes';

function handle(path, response) {
	let store = createStore();
	function createElement(Component, props) {
		return <Component {...props}  store={store}/>
	}

	match({ routes : routes, location: path }, (error, redirectLocation, renderProps) => {
		if (error) {
			response.status = 500;
			response.message = error.message;
		} else if (redirectLocation) {
			response.status = 302;
			response.redirectUrl = redirectLocation.pathname + redirectLocation.search;
		} else if (renderProps) {
			response.status = 200;
			response.body = ReactDOMServer.renderToString(<RouterContext {...renderProps}  createElement={createElement}/>);
			response.state = JSON.stringify(store.getState());
		} else {
			response.status = 404;
			response.body = 'Not found';
		}
	});
}

global.handle = handle;