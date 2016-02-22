This folder contains all of the modules present in your Node.js application
You must create a folder containing
(for each base class call class.clone to create a new one and override methods and variable)
a core file that implements module base class
a routing file containing the Routing base class
each module must have only one core file and none or only one routing file

in the module folder you can create a folder that contains all of your controllers but you must call it "controllers"
each controller implement the base class controller. You can do the operation for controllers and filters whose to type
have base class creating for the NodeServer application

in routing file you can access all of your controllers and filters by "this.controllers.theNameOfYourController" or
"this.filters.the.nameOfYourFilter" to access the methods

Example of the tree of a module:

Module/
    controllers/
    filters/
    managers/
    models/
    providers/
    core.js
    routing.js