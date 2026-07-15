const nodeFetch = require('node-fetch');

const API_KEY = process.env.TE_API_KEY || '';

/**
 * Wraps node-fetch and injects TE_API_KEY into the API key query param.
 * Handles both `?c=` (key is the first param) and `&c=` (key follows other params).
 * URLs in test files can keep their literal `?c=` / `&c=` placeholder.
 */
const fetch = (url, options) => {
    const urlWithKey = url
        .replace('?c=', `?c=${API_KEY}`)
        .replace('&c=', `&c=${API_KEY}`);
    return nodeFetch(urlWithKey, options);
};

/**
 * Use instead of `describe` for all integration tests.
 * Skips the entire suite when TE_API_KEY is not set.
 */
const describeIntegration = API_KEY ? describe : describe.skip;

module.exports = { API_KEY, fetch, describeIntegration };
