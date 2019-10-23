import { fetchData } from './fetchdata';
import { GraphQLServer } from 'graphql-yoga';
import { stripIgnoredCharacters } from 'graphql';

// entry point
const url = 'https://swapi.co/api/people/';

const runApp = data => {

  const typeDefs = `
  type Query{
    test: String!
    planet(name: String!): Planet!
    planets(page: Int, pageSize: Int, diameter: Int): [Planet!]!
    planetsAlpha: [String!]!
    persons(page: Int, pageSize: Int, height: Int, mass: Int):[Person!]!
  }

  type Person{
    name: String!
    height: String!
    mass: String!

  }
  

  type Planet{
    name: String!
    climate: String!

  }
  
  

  `
  const resolvers = {
    Query: {
      test() {
        return ("artista");
      },

      planet: (parent, args, ctx, info) => {
        const result = data.find(obj => obj.name === args.name)
        return {
          name: result.name,
          climate: result.climate
        }
      },
      

      planets: (parent, args, ctx, info) => {
        const page = args.page || 1;
        const pageSize = args.pageSize || 20;

        const inicio = (page - 1) * pageSize;
        const fin = inicio + pageSize;

        const datos = data
          .filter(elem => args.diameter < elem.diameter)
          .slice(inicio, fin)
          .map(obj => {
            return {
              name: obj.name,
              climate: obj.climate
            }
          })
        return datos;
      },
      persons: (parent, args, ctx, info) => {
        const page = args.page || 1;
        const pageSize = args.pageSize || 20;

        const inicio = (page - 1) * pageSize;
        const fin = inicio + pageSize;


        const datos = data
          .filter(elem => args.height < elem.height)
          .filter(elem => args.mass < elem.mass)
          .slice(inicio, fin)
          .map(obj => {
            return {
              name: obj.name,
              height: obj.height,
              mass: obj.mass
            }
          })
        return datos;
      },

      planetsAlpha: (parent, args, ctx, info) => {
        let planet = [];
        data.forEach(element => {
          planet.push(element.name);

        });
        planet.sort();
        planet = [...new Set(planet)];
        return planet;
      }


    }
  }


  /*
    data.forEach(element => {
      console.log(`${element.name}`);
    });
  */

  const server = new GraphQLServer({ typeDefs, resolvers });
  server.start({ port: "4010" });
};


fetchData(runApp, url);