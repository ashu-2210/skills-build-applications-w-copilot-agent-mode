"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-tracker-backend' });
});
exports.default = router;
//# sourceMappingURL=health.js.map