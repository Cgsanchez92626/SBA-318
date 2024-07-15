# SBA-318
In this assignement for creating a Node and express Server Application.
The app.js file was added to the package.json file to start when npm is started
I chose to use the EJS View Engine
app.js also has Restful API using a mock set of objects for a Customer Relationship Management (CRM) used for Real Estate. Made up of Agent Data, Contact Data, and Property Data and the ability for handling CRUD requests and responses.
I first added the Home page '/', that rendered a simple HTML page which allows the user to enter thier Name, for the purpose of submitting a form (submit).
The page also has a couple of links on it to mange some additional navigation.
The "About Page" '/about', again to illustrate rendering template views.
and a Link to the Login page '/login' - Used passport and session middleware, and also flash to handle some flash errors I encountered. The login uses a mock users database that is hardcoded in the 'app.js' to authenticate against. Upon successful login you are taken to your "dashboard", where I passed the username into the Welcome message. The dashboard also brings in the data in the CRM for display and allows the user to add new agent data via a form at the bottom. When an agent is added, the added agent data will display on a new page, if you go back a page and refresf, you will see your new agent added on the list of agents. The page also has a couple of links to navigate back home (bottom) or to the "logout' (top) page, which simply takes you back to the 'login' page.
