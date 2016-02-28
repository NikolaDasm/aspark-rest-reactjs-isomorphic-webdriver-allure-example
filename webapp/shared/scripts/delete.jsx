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
import Header from './header';
import Table from './table';
import ActionsCreator from './actions';

export default class Delete extends React.Component {
	constructor (props) {
		super(props);
		this.store = props.store;
		this.history = props.history;
		this.onStoreChange = this.onStoreChange.bind(this);
		this.onPropsChange = this.onPropsChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {};
		this.state.id = props.routeParams.id;
		this.store.dispatch(ActionsCreator.deleteTestCaseProcessBegin());
		this.store.dispatch(ActionsCreator.getTestCase(this.state.id));
		this.state.testCase = this.store.getState().testCase;
	}

	onStoreChange() {
		let state = this.store.getState();
		if (!state.isDeleteTestCaseProcessBegin && !state.isDeleteTestCase) {
			this.history.pushState(null, '/');
		}
		if (state.isDeleteTestCaseProcessBegin)
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

	componentWillReceiveProps(nextProps) {
		this.onPropsChange(nextProps);
	}

	componentWillUnmount() {
		this.store.removeListener(this.onStoreChange);
	}

	handleSubmit(e) {
		e.preventDefault();
		this.store.dispatch(ActionsCreator.deleteTestCase(this.state.id));
	}

	render() {
		return <main>
			<Header text="Delete this test case"/>
			<Table testCases={[this.state.testCase]} withLinks={false}/>
			<form onSubmit={this.handleSubmit}>
				<button type="submit" value="Post">Delete</button>
			</form>
			<br/>
			<Link to="/">Main page</Link>
		</main>
	}
}