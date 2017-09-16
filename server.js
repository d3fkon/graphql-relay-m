import express from 'express';
import graphqlHTTP from 'express-graphql';
import path from 'path';
import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import {
    schema
} from './data/schema';

const APP_PORT = 3000;
const GRAPHQL_PORT = 8000;

const graphQLServer = express();

graphQLServer.use('/', graphqlHTTP({
    schema,
    pretty: true,
    graphiql: true
}))

graphQLServer.listen(GRAPHQL_PORT, () => {
    console.log(`listening on https://localhost:${GRAPHQL_PORT}`)
});

const compiler = webpack({
    entry: ['whateg-fetch', path.resolve(__dirname, 'src', 'app.js')],
    module: {
        loaders: [{
            exclude: /node_modules/,
            loader: 'babel-loader',
            test: /\/js$/
        }]
    },
    output: {
        filename: 'app.js',
        path: '/'
    }
});

const app = new webpackDevServer(compiler, {
    contentBase: '/public/',
    proxy: {
        '/graphql': `http://localhost:${APP_PORT}`
    },
    publicPath: '/src/',
    stats: {
        colors: true
    }
});

app.use('/', express.static(path.resolve(__dirname, 'public')));
app.listen(APP_PORT, () => {
    console.log(`APP is running on http:localhost:${APP_PORT}`)
})