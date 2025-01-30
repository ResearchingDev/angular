import { join } from 'path';

export const entry = {
    main: './app.js'
};
export const output = {
    path: join(__dirname, 'dev-build'),
    publicPath: '/',
    filename: '[name].js',
    clean: true
};
export const mode = 'development';
export const target = 'node';
export const module = {
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
        }
    ]
};
export const externals = {
    bcrypt: 'commonjs bcrypt',
    'pg-native': 'commonjs pg-native'
};
