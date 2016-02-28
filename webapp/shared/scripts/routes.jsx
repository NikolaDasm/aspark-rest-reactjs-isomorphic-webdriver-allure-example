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
import { Route, IndexRoute } from './../../shared/lib/react-router';
import App from './app';
import Home from './home';
import Page from './page';
import Add from './add';
import Delete from './delete';
import Edit from './edit';
import Find from './find';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Home}/>
		<Route path="page/:page" component={Page}/>
		<Route path="addtestcase" component={Add}/>
		<Route path="deletetestcase/:id" component={Delete}/>
		<Route path="edittestcase/:id" component={Edit}/>
		<Route path="findtestcase" component={Find}/>
	</Route>
);
