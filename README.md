ProductManager
==============

A Sample CRUD one-page web application structured by Backbone js and backed by a node restfull api, using Redis for data storage.

This repository is used strictly for learning purposes. 

It covers the basic usage of the following:

- <a href="http://www.expressjs.com">Express js</a>
- <a href="http://www.redis.io">Redis</a>
- <a href="http://www.backbonejs.org">Backbone js</a>

<hr>

To install and run the application follow these steps after installing the <b>node</b> platform and <b>npm</b>:

1. <h5>Install the required dependencies listed in <i>package.json</i></h5>
    <pre>
    npm install -g;
    </pre>

  This will install the following:
  - Express js
  - Redis
  - ejs
  - Q

2. <h5>Start the redis-server (see <a href="http://redis.io/topics/quickstart">here</a> for more details) :</h5>
  <pre>
   redis-server
   </pre>

3. <h5>Run the server:</h5>
  <pre>
  node app.js
  </pre>

  The http server will be listening for connections on port 8000.

4. <h5> Open your favorite browser and navigate to <code>http://localhost:8000</code></h5>
