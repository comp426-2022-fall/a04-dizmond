import { roll } from './lib/lib/roll.js';
import minimist from 'minimist';
import express from 'express';

const app = express();
const args = minimist(process.argv.slice(2));
const port = args.port || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// endpoint at '/app' should return 200 OK
app.get('/app', (req, res) => {
    res.status(200).send('200 OK');
});

/* endpoint '/app/roll' returns JSON for default roll
of 2 six-sided dice one time */
app.get('/app/roll/', (req, res) => {
    const json_file = roll(6, 2, 1);
    res.send(JSON.stringify(json_file));
});

app.post('/app/roll', (req, res, next) => {
    const json_file = roll(parseInt(req.body.sides), parseInt(req.body.dice), parseInt(req.body.rolls));
    res.status(200).send(json_file);
});

app.get('/app/roll/:sides', (req, res) => {
    const json_file = roll(parseInt(req.params.sides), 2, 1);
    res.send(JSON.stringify(json_file));
});

app.get('/app/roll/:sides/:dice', (req, res) => {
    const json_file = roll(parseInt(req.params.sides), parseInt(req.params.dice), 1);
    res.send(JSON.stringify(json_file));
});

app.get('/app/roll/:sides/:dice/:rolls', (req, res) => {
    const json_file = roll(parseInt(req.params.sides), parseInt(req.params.dice), parseInt(req.params.rolls));
    res.send(JSON.stringify(json_file));
});

/*default api endpoint that returns 404 NOT FOUND for
endpoints that aren't defined */
app.all('*', (req, res) => {
    res.status(404).send('404 NOT FOUND');
});

app.listen(port);