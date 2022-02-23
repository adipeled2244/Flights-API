const express = require("express");
const Logger = require('./utils/logs');
const { flightsRouter } = require("./routers/flightRouter");
const { authRouter } = require("./routers/authRouter");
const { checkKey } = require("./middleware/checkKey");
const logger = new Logger("index");


const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger.logDetailsReq);
app.use(checkKey);
app.use('/api/flights', flightsRouter);
app.use('/api/auth', authRouter);
app.use((req, res) => {
    res.status(404).send(`Page not found`);
});

app.listen(port, () => console.log(`Express server is running on port ${port}`));