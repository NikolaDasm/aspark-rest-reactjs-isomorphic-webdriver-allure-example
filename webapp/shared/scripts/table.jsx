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

class ExtLink extends React.Component {
	render () {
		if (this.props.hide) return null;
		return <Link to={this.props.href}>{this.props.text}</Link>;
	}
}

class TableRow extends React.Component {
	render() {
		return <tr>
			<td>{this.props.testCase.id}</td>
			<td>{this.props.testCase.title}</td>
			<td>{this.props.testCase.description}</td>
			<td>{this.props.testCase.owner}</td>
			<td>{this.props.testCase.priority}</td>
			<td>{this.props.testCase.location}</td>
			<td>{this.props.testCase.status}</td>
			<td>{this.props.testCase.steps}</td>
			<td>{this.props.testCase.expectedResults}</td>
			<td>{this.props.testCase.assignedTo}</td>
			<td>{this.props.testCase.version}</td>
			<td><ExtLink hide={!this.props.withLinks} href={`/edittestcase/${this.props.testCase.id}`} text="edit"/></td>
			<td><ExtLink hide={!this.props.withLinks} href={`/deletetestcase/${this.props.testCase.id}`} text="delete"/></td>
		</tr>
	}
}

export default class Table extends React.Component {
	constructor () {
		super();
		this.columnNames = ['id', 'Title', 'Desctiption', 'Owner', 'Priority',
			'Location', 'Status', 'Steps', 'Expected results', 'Assigned to', 'Version', '', ''];
	}
	render() {
		return <table>
			<thead><tr>{this.columnNames.map((name, i) => <td key={i}>{name}</td>)}</tr></thead>
			<tbody>
				{this.props.testCases.map((testCase, i) =>
					<TableRow withLinks={this.props.withLinks} testCase={testCase} key={i}/>)}
			</tbody>
		</table>
	}
}