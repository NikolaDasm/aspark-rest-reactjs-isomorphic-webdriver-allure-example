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
import Table from './table';

export default class Find extends React.Component {
	constructor (props) {
		super(props);
		this.store = props.store;
		this.onStoreChange = this.onStoreChange.bind(this);
		this.state = {};
		this.state.testCase = {};
	}

	onStoreChange() {
		let state = this.store.getState();
		this.setState({testCase : state.testCase});
	}

	componentDidMount() {
		this.store.addListener(this.onStoreChange);
		let state = this.store.getState();
		this.store.dispatch(ActionsCreator.getTestCaseByTitle(state.findTitle));
	}

	componentWillUnmount() {
		this.store.removeListener(this.onStoreChange);
	}

	render() {
		return <main>
			<Header text="Find result"/>
			<Table testCases={[this.state.testCase]} withLinks={false}/>
			<br/>
			<Link to="/">Main page</Link>
		</main>
	}
}