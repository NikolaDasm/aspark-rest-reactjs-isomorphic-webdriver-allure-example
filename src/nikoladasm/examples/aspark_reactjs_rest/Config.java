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

package nikoladasm.examples.aspark_reactjs_rest;

import nikoladasm.commons.configuration.properties.annotations.*;

@Resource("settings.properties")
public class Config {
	
	@Property("ipaddress.server")
	@DefaultValue("0.0.0.0")
	public String ipAddress;
	
	@Property("port.server")
	@DefaultValue("8080")
	public int port;
	
	@Property("filename.db")
	@DefaultValue("testdb")
	public String dbFileName;
}
