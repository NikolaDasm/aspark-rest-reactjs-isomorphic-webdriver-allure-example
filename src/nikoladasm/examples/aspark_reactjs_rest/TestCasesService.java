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

import static java.nio.charset.StandardCharsets.UTF_8;
import static nikoladasm.aspark.ASpark.*;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.concurrent.ConcurrentNavigableMap;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;
import javax.script.SimpleBindings;

import org.mapdb.DB;
import org.mapdb.DBMaker;

import nikoladasm.aspark.ASpark;

public class TestCasesService {

	public static class Response {
		public int status;
		public String message;
		public String redirectUri;
		public String body;
		public String state;
	}
	
	private static final String INIT_SCRIPT =
		"var global = this;\n" +
		"var console = {};\n" +
		"console.debug = print;\n" +
		"console.warn = print;\n" +
		"console.log = print;\n" +
		"console.error = print;\n" +
		"var HashMap = Java.type(\"java.util.HashMap\");" +
		"function WeakMap() {return {" +
		"_map : new HashMap()," +
		"set : function(key, value) {this._map.put(key, value);}," +
		"get : function(key) {return this._map.get(key);}" +
		"}" +
		"}";

	private static final String BEFORE_APP =
		"<!DOCTYPE html>" +
		"<html>" +
		"<head>" +
		"<meta carset=\"utf-8\">" +
		"<meta http-equiv=\"Cache-Control\" content=\"no-cache, no-store, must-revalidate\"/>" +
		"<meta http-equiv=\"Pragma\" content=\"no-cache\"/>" +
		"<meta http-equiv=\"Expires\" content=\"0\"/>" +
		"<title>Test cases</title>" +
		"</head>" +
		"<body>" +
		"<div id=\"app\">";
	private static final String AFTER_APP_BEFORE_STATE =
		"</div>" +
		"<script type=\"application/javascript\">" +
		"window.__INITIAL_STATE__ =";
	private static final String AFTER_STATE =
		";</script>" +
		"<script src=\"/scripts/index.js\"></script>" +
		"<body>" +
		"</html>";
	
	private DB db;
	private String ipAddress;
	private int port;
	private ScriptEngine engine;
	private SimpleBindings bindings = new SimpleBindings();
	
	
	public TestCasesService(Config config) {
		this(config, DBMaker.fileDB(new File(config.dbFileName))
			.closeOnJvmShutdown()
			.make());
	}
	
	public TestCasesService(Config config, DB db) {
		this.db = db;
		ipAddress = config.ipAddress;
		port = config.port;
		try {
			engine();
		} catch (ScriptException | IOException e) {
			throw new RuntimeException("Can't initialize engine");
		}
	}
	
	private BufferedReader resourceReader(String resource) throws IOException {
		InputStream cis = this.getClass().getResourceAsStream(resource);
		InputStream clis = this.getClass().getClassLoader().getResourceAsStream(resource);
		InputStream is = null;
		if (cis != null) is = cis;
		else if (clis != null) is = clis;
		return new BufferedReader(new InputStreamReader(is, UTF_8));
	}
	
	private ScriptEngine engine() throws ScriptException, IOException {
		if (engine != null) return engine;
		engine = new ScriptEngineManager().getEngineByName("nashorn");
		engine.eval(INIT_SCRIPT, bindings);
		engine.eval(resourceReader("resources/internal/scripts/index.js"), bindings);
		return engine;
	}
	
	public void start() {
		ipAddress(ipAddress);
		port(port);
		staticFileLocation("resources/public");
		init();
		awaitInitialization();
		ConcurrentNavigableMap<Long, String> map = db.treeMap("testCases");
		ConcurrentNavigableMap<String, Long> index = db.treeMap("testCasesTitleIndex");
		TestCaseDao dao = new TestCaseDao(map, index, db);
		new ApiResource(
				new ApiService(dao)
			);
		bindings.put("dao", dao);
		try {
			engine.eval("global.testCaseDao = dao;", bindings);
		} catch (ScriptException e) {
			throw new RuntimeException("Can't bind dao");
		}
		get("/scripts/*", (request, response) -> {
			request.staticResource();
			return null;
		});
		get("/*", (request, response) -> {
			String path = (request.pathInfo().trim().isEmpty()) ? "/" : request.pathInfo();
			bindings.put("path", path);
			Response res = new Response();
			bindings.put("response", res);
			engine.eval("handle(path, response);", bindings);
			if (res.status == 500) {
				halt(500);
				return null;
			} else if (res.status == 302) {
				response.redirect(res.redirectUri, res.status);
				return null;
			} else if (res.status == 200) {
				response.type("text/html; charset=UTF-8");
				return BEFORE_APP + res.body +
					AFTER_APP_BEFORE_STATE + res.state + AFTER_STATE;
			} else {
				response.status(res.status);
				return res.body;
			}
		});
	}
	
	public void stop() {
		ASpark.stop();
		db.commit();
		db.close();
	}
	
	public void await() {
		ASpark.await();
	}
}
