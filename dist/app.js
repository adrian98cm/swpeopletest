"use strict";

var _fetchdata = require("./fetchdata");

var _graphqlYoga = require("graphql-yoga");

var _graphql = require("graphql");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// entry point
var url = 'https://swapi.co/api/people/';

var runApp = function runApp(data) {
  var typeDefs = "\n  type Query{\n    test: String!\n    planet(name: String!): Planet!\n    planets(page: Int, pageSize: Int, diameter: Int): [Planet!]!\n    planetsAlpha: [String!]!\n    persons(page: Int, pageSize: Int, height: Int, mass: Int):[Person!]!\n  }\n\n  type Person{\n    name: String!\n    height: String!\n    mass: String!\n\n  }\n  \n\n  type Planet{\n    name: String!\n    climate: String!\n\n  }\n  \n  \n\n  ";
  var resolvers = {
    Query: {
      test: function test() {
        return "artista";
      },
      planet: function planet(parent, args, ctx, info) {
        var result = data.find(function (obj) {
          return obj.name === args.name;
        });
        return {
          name: result.name,
          climate: result.climate
        };
      },
      planets: function planets(parent, args, ctx, info) {
        var page = args.page || 1;
        var pageSize = args.pageSize || 20;
        var inicio = (page - 1) * pageSize;
        var fin = inicio + pageSize;
        var datos = data.filter(function (elem) {
          return args.diameter < elem.diameter;
        }).slice(inicio, fin).map(function (obj) {
          return {
            name: obj.name,
            climate: obj.climate
          };
        });
        return datos;
      },
      persons: function persons(parent, args, ctx, info) {
        var page = args.page || 1;
        var pageSize = args.pageSize || 20;
        var inicio = (page - 1) * pageSize;
        var fin = inicio + pageSize;
        var datos = data.filter(function (elem) {
          return args.height < elem.height;
        }).filter(function (elem) {
          return args.mass < elem.mass;
        }).slice(inicio, fin).map(function (obj) {
          return {
            name: obj.name,
            height: obj.height,
            mass: obj.mass
          };
        });
        return datos;
      },
      planetsAlpha: function planetsAlpha(parent, args, ctx, info) {
        var planet = [];
        data.forEach(function (element) {
          planet.push(element.name);
        });
        planet.sort();
        planet = _toConsumableArray(new Set(planet));
        return planet;
      }
    }
  };
  /*
    data.forEach(element => {
      console.log(`${element.name}`);
    });
  */

  var server = new _graphqlYoga.GraphQLServer({
    typeDefs: typeDefs,
    resolvers: resolvers
  });
  server.start({
    port: "4010"
  });
};

(0, _fetchdata.fetchData)(runApp, url);