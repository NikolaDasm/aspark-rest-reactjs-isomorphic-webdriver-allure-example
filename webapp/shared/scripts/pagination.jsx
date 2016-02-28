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
import { Link } from './../../shared/lib/react-router';

export default class Pagination extends React.Component {
	render() {
		if (this.props.pages.length<=1) return <ul></ul>;
		return <ul>
			{this.props.pages.map((page, i) => <li key={i}>{(this.props.currentPage == i+1) ?
				<span>{page}</span> : <Link to={`/page/${i+1}`}>{page}</Link>}</li>)}
		</ul>
	}
}