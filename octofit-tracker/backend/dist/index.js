"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const health_1 = __importDefault(require("./api/health"));
const users_1 = __importDefault(require("./routes/users"));
const teams_1 = __importDefault(require("./routes/teams"));
const activities_1 = __importDefault(require("./routes/activities"));
const workouts_1 = __importDefault(require("./routes/workouts"));
require("./config/database");
const app = (0, express_1.default)();
const port = Number(process.env.PORT || 8000);
const host = '0.0.0.0';
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
app.use(express_1.default.json());
app.use('/api/health', health_1.default);
app.use('/api/users', users_1.default);
app.use('/api/teams', teams_1.default);
app.use('/api/activities', activities_1.default);
app.use('/api/workouts', workouts_1.default);
app.get('/', (_req, res) => {
    res.json({ message: 'OctoFit Tracker backend is running', baseUrl });
});
app.listen(port, host, () => {
    console.log(`Backend server listening on ${baseUrl}`);
});
//# sourceMappingURL=index.js.map