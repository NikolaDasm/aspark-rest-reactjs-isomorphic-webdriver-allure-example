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

export default class FindForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.state.title = '';
		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleTitleChange(e) {
		this.setState({title : e.target.value});
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.submit(this.state.title);
	}

	render() {
		return <form onSubmit={this.handleSubmit}>
			<label htmlFor="title">title</label>
			<input type="text" name="title" placeholder="title" onChange={this.handleTitleChange} required/>
			<button type="submit" value="Post">Find</button>
		</form>
	}
}