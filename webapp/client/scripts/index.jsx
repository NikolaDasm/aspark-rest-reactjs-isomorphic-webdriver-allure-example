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
import ReactDOM from './../../shared/lib/react-dom';
import { Router, browserHistory, match } from './../../shared/lib/react-router';
import store from './appstore';
import routes from './../../shared/scripts/routes';

function createElement(Component, props) {
	return <Component {...props}  store={store}/>
}

match({ history : browserHistory, routes : routes }, (error, redirectLocation, renderProps) => {
	ReactDOM.render(<Router {...renderProps} createElement={createElement}/>, document.getElementById('app'));
});