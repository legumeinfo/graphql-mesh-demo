// dependencies
const { DataSource } = require('apollo-datasource');
const { ApolloError } =require('apollo-server-errors');
const imjs = require('imjs');


const FIVE_MIN = 5 * 60;


class ImjsDataSource extends DataSource {

  constructor(root, {token, headers}={}) {
    // call the DataSource constructor
    super();
    // this is an abstract class
    if (this.constructor == ImjsDataSource) {
      throw new Error('Abstract classes can\'t be instantiated.');
    }
    // initialize the InterMine Service
    const options = {root, token, headers, errorHandler: this.errorHandler};
    this.service = new imjs.Service(options);
  }

  initialize(config) {
    this.context = config.context;
  }

  // private methods

  errorHandler(error) {
    throw new ApolloError(error);
  }

  // public methods

  parseResults(results, rowNames) {
    const result2object = (result) => {
        const entries = rowNames.map((e, i) => [e, result[i]]);
        return Object.fromEntries(entries);
      };
    return results.map(result2object);
  }

  // the imjs API

  doReq() {
    this.service.doReq();
  }

  // Convenience method for making basic POST requests.
  post(path, data) {
    return this.service.post(path, data);
  }

  // Convenience method for making basic GET requests.
  get(path, data) {
    return this.service.get(path, data);
  }

  // The generalised method through which ALL requests pass when using this class.
  makeRequest(method = 'GET', path = '', data = {}, cb = (function() {}), indiv = false) {
    return this.service.makeRequest(method, path, data, cb, indiv);
  }

  // TODO - when 14 is prevalent the fetchVersion can be removed.
  authorise(req) {
    this.service.authorise(req);
  }

  // Attach custom headers to the request that were supplied to the Service constructor via the options object.
  attachCustomHeaders(req) {
    this.service.attachCustomHeaders(req);
  }

  // Get the results of using a list enrichment widget to calculate statistics for a set of objects.
  enrichment(opts) {
    return this.service.enrichment(opts);
  }

  // Search for items in the database by any term or facet.
  search(options = {}) {
    return this.service.search(options);
  }

  // Make a PathInfo object from a string Sugar for service.fetchModel().then (m) -> m.makePath path, subclasses
  makePath(path, subclasses = {}) {
    return this.service.makePath(path, subclasses);
  }

  // Find out how many rows a given query would return when run.
  count(q) {
    return this.service.count(q);
  }

  // Retrieve a representation of a specific object.
  findById(type, id, fields = ['**']) {
    return this.service.findById(type, id, fields);
  }

  // Find all the objects in the database that match the search term.
  lookup(type, term, context) {
    return this.service.lookup(type, term, context);
  }

  // Find the single object that matches the given term, or report an error if none is found, or more than one is found.
  find(type, term, context) {
    return this.service.find(type, term, context);
  }

  // Retrieve information about the currently authenticated user.
  whoami() {
    return this.service.whoami();
  }

  // Alias for Service#whoami
  fetchUser(...args) {
    return this.fetchUser(...args);
  }

  // Retrieve a list of values that a path can have.
  pathValues(path, typeConstraints = {}) {
    return this.service.pathValues(path, typeConstraints);
  }

  // Private Perform a request for results that accepts a parameter specifying the page to fetch.
  doPagedRequest(q, path, page = {}, format) {
    return this.service.doPagedRequest(q, path, page, format);
  }

  // Get a page of results in jsontable format.
  table(q, page) {
    return this.service.table(q, page);
  }

  // Get a page of results in jsonobject format.
  records(q, page) {
    return this.service.records(q, page);
  }

  // Get a page of results in json format.
  rows(q, page, rowNames) {
    return this.service.rows(q, page)
      .then((results) => this.parseResults(results, rowNames));
  }

  // Get a page of values.
  values(q, opts) {
    return this.service.values(q, opts);
  }

  // Get a page of results suitable for building the cells in a table.
  tableRows(q, page) {
    return this.service.tableRows(q, page);
  }

  // Get the templates this user currently has access to.
  fetchTemplates() {
    return this.service.fetchTemplates();
  }

  // Get the lists this user currently has access to.
  fetchLists() {
    return this.service.fetchLists();
  }

  // Get the lists this user currently has access to which match the given name.
  findLists(name = '') {
    return this.service.findLists(name = '');
  }

  // Get a list by name.
  fetchList(name) {
    return this.service.fetchList(name);
  }

  // Get the lists that contain the given object.
  fetchListsContaining(opts) {
    return this.service.fetchListsContaining(opts);
  }

  // Combine two or more lists using the given operation.
  combineLists(operation, options) {
    return this.service.combineLists(operation, options);
  }

  // Combine two or more lists through a union operation.
  merge() {
    return this.service.merge();
  }

  // Combine two or more lists through an intersection operation.
  intersect() {
    return this.service.intersect();
  }

  // Combine two more lists through a symmetric difference operation.
  diff() {
    return this.service.diff();
  }

  // Create a new list from the complement of two groups of lists.
  complement(options = {}) {
    return this.service.complement(options);
  }

  // Fetch the list widgets that are available from this service.
  fetchWidgets() {
    return this.service.fetchWidgets();
  }

  // ...
  fetchWidgetMap() {
    return this.service.fetchWidgetMap();
  }

  // Fetch the description of the data model for this service.
  fetchModel() {
    return this.service.fetchModel();
  }

  // Fetch the configured summary-fields.
  fetchSummaryFields() {
    return this.service.fetchSummaryFields();
  }

  // Fetch the number that describes the web-service capabilities.
  fetchVersion() {
    return this.service.fetchVersion();
  }

  // ...
  fetchClassKeys() {
    return this.service.fetchClassKeys();
  }

  // ...
  fetchRelease() {
    return this.service.fetchRelease();
  }

  // Promise to make a new Query.
  query(options) {
    return this.service.query(options);
  }

  // Load a saved query by name.
  savedQuery(name) {
    return this.service.savedQuery(name);
  }

  // Load a template query by name.
  templateQuery(name) {
    return this.service.templateQuery(name);
  }

  // Private Perform operations on a user's preferences.
  manageUserPreferences(method, data) {
    return this.service.manageUserPreferences(method, data);
  }

  // Submit an ID resolution job.
  resolveIds(opts) {
    return this.service.resolveIds(opts);
  }

  // Retrieve an existing ID Resolution job
  resolutionJob(id) {
    return this.service.resolutionJob(id);
  }

  // Create a new list through the identifier upload service.
  createList(opts = {}, ids = '') {
    return this.service.createList(opts, ids);
  }

  // Return a new service with the same root url as this one, but connected as a different user.
  connectAs(token) {
    return this.service.connectAs(token);
  }

  // Create a new user at the current service.
  register(name, password) {
    return this.service.register(name, password);
  }

  // Promise to get a deregistration token.
  getDeregistrationToken(validity = FIVE_MIN) {
    return this.service.getDeregistrationToken(validity);
  }

  // Return a promise to delete a user account, and retrieve all of its data.
  deregister(token) {
    return this.service.deregister(token);
  }

  // Promise to return a service with the same root as this one, but associated with a different user account - the one specified by the login details.
  login(name, password) {
    return this.service.login(name, password);
  }

  // Promise to return a service with the same root as this one, but not associated with any user account.
  logout() {
    return this.service.logout();
  }

}

module.exports = { ImjsDataSource };
