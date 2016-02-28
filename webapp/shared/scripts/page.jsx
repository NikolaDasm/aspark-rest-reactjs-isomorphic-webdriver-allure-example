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
import Pagination from './pagination';
import FindForm from './findform';
import ActionsCreator from './actions';

export default class Page extends React.Component {
	constructor (props) {
		super(props);
		this.store = props.store;
		this.history = props.history;
		this.onStoreChange = this.onStoreChange.bind(this);
		this.onPropsChange = this.onPropsChange.bind(this);
		this.getState = this.getState.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {};
		this.state.currentPage = (props.currentPage) ?
			props.currentPage : props.routeParams.page;
		this.store.dispatch(ActionsCreator.getTestCaseCount());
		this.store.dispatch(ActionsCreator.getTestCases(this.state.currentPage));
		this.getState(this.state);
	}

	getState(cState) {
		let state = this.store.getState();
		cState.pageCount = state.testCasesCount/state.testCasesPerPage;
		if (cState.pageCount < 1) cState.pageCount = 1;
		cState.pages = [];
		for (let i=0; i<cState.pageCount; i++) cState.pages.push(i+1); 
		cState.testCases = state.testCases;
	}

	onStoreChange() {
		let state = {};
		this.getState(state);
		this.setState(state);
	}

	onPropsChange(props) {
		let currentPage = (props.currentPage) ?
			props.currentPage : props.routeParams.page;
		this.setState({currentPage : currentPage});
		this.store.dispatch(ActionsCreator.getTestCaseCount());
		this.store.dispatch(ActionsCreator.getTestCases(currentPage));
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

	handleSubmit(title) {
		this.store.dispatch(ActionsCreator.saveTestCaseTitleForFind(title));
		this.history.pushState(null, '/findtestcase');
	}

	render() {
		return <main>
			<Header text="Test cases list"/>
			<FindForm submit={(t) => this.handleSubmit(t)}/>
			<Table testCases={this.state.testCases} withLinks={true}/>
			<Pagination pages={this.state.pages} currentPage={this.state.currentPage}/>
			<br/>
			<Link to="/addtestcase">Add new test case</Link>
		</main>
	}
}