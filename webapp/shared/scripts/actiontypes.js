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

const ActionTypes = {
	ACTION_TYPE_NOP : 'action_nop',
	ACTION_TYPE_GET_TESTCASE_COUNT : 'get_testcase_count',
	ACTION_TYPE_TESTCASE_COUNT_LOADED : 'testcase_count_loaded',
	ACTION_TYPE_GET_TESTCASES : 'get_testcases',
	ACTION_TYPE_TESTCASES_LOADED : 'testcases_loaded',
	ACTION_TYPE_ADD_TESTCASE : 'add_testcase',
	ACTION_TYPE_ADD_TESTCASE_PROCESS_BEGIN : 'add_testcase_process_begin',
	ACTION_TYPE_TESTCASE_ADDED : 'testcase_added',
	ACTION_TYPE_TESTCASE_DIDNT_ADD : 'testcase_didnt_add',
	ACTION_TYPE_GET_TESTCASE : 'get_testcase',
	ACTION_TYPE_TESTCASE_LOADED : 'testcase_loaded',
	ACTION_TYPE_DELETE_TESTCASE : 'delete_testcase',
	ACTION_TYPE_DELETE_TESTCASE_PROCESS_BEGIN : 'delete_testcase_process_begin',
	ACTION_TYPE_TESTCASE_DELETED : 'testcase_deleted',
	ACTION_TYPE_EDIT_TESTCASE : 'edit_testcase',
	ACTION_TYPE_EDIT_TESTCASE_PROCESS_BEGIN : 'edit_testcase_process_begin',
	ACTION_TYPE_TESTCASE_EDITED : 'testcase_edited',
	ACTION_TYPE_TESTCASE_DIDNT_EDIT : 'testcase_didnt_edit',
	ACTION_TYPE_SAVE_TESTCASE_TITLE_FOR_FIND : 'save_testcase_title_for_find',
	ACTION_TYPE_GET_TESTCASE_BY_TITLE : 'get_testcase_by_title'
};

export default ActionTypes;