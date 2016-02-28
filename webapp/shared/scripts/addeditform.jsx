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

export default class AddEditForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.state.testCase = (props.testCase) ? props.testCase : {};
		this.state.btnText = props.btnText;
		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
		this.handlePriorityChange = this.handlePriorityChange.bind(this);
		this.handleLocationChange = this.handleLocationChange.bind(this);
		this.handleStatusChange = this.handleStatusChange.bind(this);
		this.handleStepsChange = this.handleStepsChange.bind(this);
		this.handleExpectedResultsChange = this.handleExpectedResultsChange.bind(this);
		this.handleAssignedToChange = this.handleAssignedToChange.bind(this);
		this.handleOwnerChange = this.handleOwnerChange.bind(this);
		this.handleVersionChange = this.handleVersionChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({testCase : ((nextProps.testCase) ? nextProps.testCase : {})});
	}

	handleTitleChange(e) {
		let testCase = this.state.testCase;
		testCase.title = e.target.value;
		this.setState({testCase : testCase});
	}

	handleDescriptionChange(e) {
		let testCase = this.state.testCase;
		testCase.description = e.target.value;
		this.setState({testCase : testCase});
	}

	handlePriorityChange(e) {
		let testCase = this.state.testCase;
		testCase.priority = parseInt(e.target.value) || '';
		this.setState({testCase : testCase});
	}

	handleLocationChange(e) {
		let testCase = this.state.testCase;
		testCase.location = e.target.value;
		this.setState({testCase : testCase});
	}

	handleStatusChange(e) {
		let testCase = this.state.testCase;
		testCase.status = parseInt(e.target.value) || '';
		this.setState({testCase : testCase});
	}

	handleStepsChange(e) {
		let testCase = this.state.testCase;
		testCase.steps = e.target.value;
		this.setState({testCase : testCase});
	}

	handleExpectedResultsChange(e) {
		let testCase = this.state.testCase;
		testCase.expectedResults = e.target.value;
		this.setState({testCase : testCase});
	}

	handleAssignedToChange(e) {
		let testCase = this.state.testCase;
		testCase.assignedTo = e.target.value;
		this.setState({testCase : testCase});
	}

	handleOwnerChange(e) {
		let testCase = this.state.testCase;
		testCase.owner = e.target.value;
		this.setState({testCase : testCase});
	}

	handleVersionChange(e) {
		let testCase = this.state.testCase;
		testCase.version = parseInt(e.target.value) || '';
		this.setState({testCase : testCase});
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.submit(this.state.testCase);
	}

	render() {
		return <form onSubmit={this.handleSubmit}>
			<label htmlFor="title">title</label>
			<input
				type="text"
				name="title"
				placeholder="title"
				value={this.state.testCase.title}
				onChange={this.handleTitleChange}
				required/>
			<br/>
			<label htmlFor="description">description</label>
			<input
				type="text"
				name="description"
				placeholder="description"
				value={this.state.testCase.description}
				onChange={this.handleDescriptionChange}
				required/>
			<br/>
			<label htmlFor="priority">priority [1-5]</label>
			<input
				type="text"
				name="priority"
				placeholder="priority"
				value={this.state.testCase.priority}
				onChange={this.handlePriorityChange}
				required/>
			<br/>
			<label htmlFor="location">location</label>
			<input
				type="text"
				name="location"
				placeholder="location"
				value={this.state.testCase.location}
				onChange={this.handleLocationChange}
				required/>
			<br/>
			<label htmlFor="status">status [1-5]</label>
			<input
				type="text"
				name="status"
				placeholder="status"
				value={this.state.testCase.status}
				onChange={this.handleStatusChange}
				required/>
			<br/>
			<label htmlFor="steps">steps</label>
			<textarea
				name="steps"
				placeholder="steps"
				value={this.state.testCase.steps}
				onChange={this.handleStepsChange}
				required/>
			<br/>
			<label htmlFor="expected_results">expected results</label>
			<textarea
				name="expected_results"
				placeholder="expected results"
				value={this.state.testCase.expectedResults}
				onChange={this.handleExpectedResultsChange}
				required/>
			<br/>
			<label htmlFor="assigned_to">assigned to</label>
			<input
				type="text"
				name="assigned_to"
				placeholder="assigned to"
				value={this.state.testCase.assignedTo}
				onChange={this.handleAssignedToChange}
				required/>
			<br/>
			<label htmlFor="owner">owner</label>
			<input
				type="text"
				name="owner"
				placeholder="owner"
				value={this.state.testCase.owner}
				onChange={this.handleOwnerChange}
				required/>
			<br/>
			<label htmlFor="version">version</label>
			<input
				type="text"
				name="version"
				placeholder="version"
				value={this.state.testCase.version}
				onChange={this.handleVersionChange}
				required/>
			<br/>
			<button type="submit" value="Post">{this.state.btnText}</button>
		</form>
	}
}