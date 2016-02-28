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


const privateProps = new WeakMap();
const isArray = function(obj) {
	if (typeof Array.isArray === 'undefined')
		return Object.prototype.toString.call(obj) === '[object Array]';
	else
		return Array.isArray(obj);
	};

const next = function (action, index, actionPreprocessors, iDispatch, getState, dispatch) {
		if (actionPreprocessors.length === 0 ||
			index == actionPreprocessors.length) {
			return iDispatch(action);
		}
		actionPreprocessors[index](action,
			getState,
			dispatch,
			(a) => next(a, index+1, actionPreprocessors, iDispatch, getState, dispatch));
	};

class StoreImpl {
	constructor(handlers, initialState, actionPreprocessors) {
		this.newHandlers = this.handlers = (isArray(handlers)) ? handlers : [handlers];
		this.newState = this.state = (typeof initialState === 'undefined') ? {} : initialState;
		this.newActionPreprocessors = this.actionPreprocessors =
			(typeof actionPreprocessors === 'undefined') ? [] :
				(isArray(actionPreprocessors)) ? actionPreprocessors : [actionPreprocessors];
		this.newListeners = this.listeners = [];
		this.isDispatching = false;
	}

	cloneListeners() {
		if (this.newListeners === this.listeners)
			this.newListeners = this.listeners.slice();
		return this.newListeners;
	}

	cloneHandlers() {
		if (this.newHandlers === this.handlers)
			this.newHandlers = this.handlers.slice();
		return this.newHandlers;
	}

	cloneActionPreprocessors() {
		if (this.newActionPreprocessors === this.actionPreprocessors)
			this.newActionPreprocessors = this.actionPreprocessors.slice();
		return this.newActionPreprocessors;
	}

	getState() {
		return this.state;
	}

	dispatch(action) {
		return next(action,
			0,
			this.actionPreprocessors,
			(a) => this.iDispatch(a),
			() => this.getState(),
			(a) => this.dispatch(a));
	}

	iDispatch(action) {
		if (this.isDispatching)
			throw new Error('Parallel dispatch call is unacceptable');
		try {
			this.isDispatching = true;
			var state = this.state;
			for (let i in this.handlers)
				state = this.handlers[i](state, action);
			this.newState = state;
		} finally {
			this.isDispatching = false;
		}
		this.handlers = this.newHandlers;
		this.listeners = this.newListeners;
		if (this.newState !== this.state) {
			this.state = this.newState;
			for (let i in this.listeners) this.listeners[i]();
		}
		return action;
	}

	addListener(listener) {
		this.cloneListeners().push(listener);
	}

	removeListener(listener) {
		var i = this.newListeners.indexOf(listener);
		this.newListeners.splice(i, (i >= 0) ? 1 : 0);
	}

	replaceHandlers(handlers) {
		this.newHandlers = handlers;
	}

	addHandler(handler) {
		this.cloneHandlers().push(handler);
	}

	removeHandler(handler) {
		let i = this.newHandlers.indexOf(handler);
		this.newHandlers.splice(i, (i >= 0) ? 1 : 0);
	}

	replaceActionPreprocessors(actionPreprocessors) {
		this.newActionPreprocessors = actionPreprocessors;
	}

	addActionPreprocessors(actionPreprocessor) {
		this.cloneActionPreprocessors().push(actionPreprocessor);
	}

	removeActionPreprocessors(actionPreprocessor) {
		let i = this.newActionPreprocessors.indexOf(actionPreprocessor);
		this.newActionPreprocessors.splice(i, (i >= 0) ? 1 : 0);
	}
}

export default class Store {
	constructor(handlers, initialState, actionPreprocessors) {
		privateProps.set(this, new StoreImpl(handlers, initialState, actionPreprocessors));
	}

	getState() {
		return privateProps.get(this).getState();
	}

	dispatch(action) {
		return privateProps.get(this).dispatch(action);
	}	

	addListener(listener) {
		return privateProps.get(this).addListener(listener);
	}

	removeListener(listener) {
		return privateProps.get(this).removeListener(listener);
	}

	replaceHandlers(handlers) {
		return privateProps.get(this).replaceHandlers(handlers);
	}

	addHandler(handler) {
		return privateProps.get(this).addHandler(handler);
	}

	removeHandler(handler) {
		return privateProps.get(this).removeHandler(handler);
	}

	replaceActionPreprocessors(actionPreprocessors) {
		return privateProps.get(this).replaceActionPreprocessors(actionPreprocessors);
	}

	addActionPreprocessors(actionPreprocessor) {
		return privateProps.get(this).addActionPreprocessors(actionPreprocessor);
	}

	removeActionPreprocessors(actionPreprocessor) {
		return privateProps.get(this).removeActionPreprocessors(actionPreprocessor);
	}
}
