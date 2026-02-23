const Environment = require('jest-environment-jsdom').default;

class CustomTestEnvironment extends Environment {
    async setup() {
        await super.setup();
        if (typeof this.global.TextEncoder === 'undefined') {
            const { TextEncoder, TextDecoder } = require('util');
            this.global.TextEncoder = TextEncoder;
            this.global.TextDecoder = TextDecoder;
        }
        if (typeof this.global.fetch === 'undefined') {
            const { fetch, Request, Response, Headers } = require('undici');
            this.global.fetch = fetch;
            this.global.Request = Request;
            this.global.Response = Response;
            this.global.Headers = Headers;
        }
    }
}

module.exports = CustomTestEnvironment;
