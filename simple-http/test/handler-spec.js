const handlers = require('../handler');
const expect = require('expect');

describe('handlers', () => {
  describe('greeting', () => {
    it('should call cb', (done) => {
      const event = {};
      const context = {};

      handlers.greeting(event, context, (err, result) => {
        expect(err).toBe(null);
				expect(result).toEqual({ body: '{"message":"Hello!!!"}', statusCode: 200 });
        done();
      });

    });
  });

  describe('personal greeting', () => {
    it('should call cb', (done) => {
			const event = { body: JSON.stringify({ name: 'Kevin' }) };
			const context = {};

      handlers.personalGreeting(event, context, (err, result) => {
        expect(err).toBe(null);
				expect(result).toEqual({ body: '{"message":"Hello Kevin!!!"}', statusCode: 200 });
        done();
      });

    });
  });

  describe('personal greeting - error', () => {
    it('should call cb', (done) => {
			const event = {};
			const context = {};

      handlers.personalGreeting(event, context, (err, result) => {
				expect(result).toEqual({ body: 'Please post a name in the body', statusCode: 400 });
        done();
      });

    });
  });
});
