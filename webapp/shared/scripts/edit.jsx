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
import ActionsCreator from './actions';
import Header from './header';
import AddEditForm from './addeditform';

export default class Edit extends React.Component {
	constructor(props) {
		super(props);
		this.history = props.history;
		this.store = props.store;
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onStoreChange = this.onStoreChange.bind(this);
		this.onPropsChange = this.onPropsChange.bind(this);
		this.state = {};
		this.state.message = "Edit test case";
		this.state.id = props.routeParams.id;
		this.store.dispatch(ActionsCreator.editTestCaseProcessBegin());
		this.store.dispatch(ActionsCreator.getTestCase(this.state.id));
		this.state.testCase = this.store.getState().testCase;
	}

	onStoreChange() {
		let state = this.store.getState();	
		if (!state.isEditTestCaseProcessBegin && !state.isEditTestCase) {
			if (state.editErrMsg === '')
				this.history.pushState(null, '/');
			else {
				this.setState({message : ("Error! " + state.editErrMsg)});
			}
		}
		if (state.isEditTestCaseProcessBegin)
			this.setState({testCase : state.testCase});
	}

	onPropsChange(props) {
		this.setState({id : props.routeParams.id});
		this.store.dispatch(ActionsCreator.getTestCase(props.routeParams.id));
	}

	componentDidMount() {
		this.store.addListener(this.onStoreChange);
		this.onStoreChange();
	}

	componentWillUnmount() {
		this.store.removeListener(this.onStoreChange);
	}

	componentWillReceiveProps(nextProps) {
		this.onPropsChange(nextProps);
	}

	handleSubmit(testCase) {
		testCase.id = this.state.testCase.id;
		this.setState({testCase : testCase});
		this.store.dispatch(ActionsCreator.editTestCase(testCase));
	}

	render() {
		return <main>
			<Header text={this.state.message}/>
			<AddEditForm testCase={this.state.testCase} btnText="Edit" submit={(tc) => this.handleSubmit(tc)}/>
			<br/>
			<Link to="/">Main page</Link>
		</main>
	}
}