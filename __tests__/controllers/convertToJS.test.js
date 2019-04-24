const controller = require('../../src/controllers/convertToJS');

describe('Controller: convertToJS', () => {

    it('should send transpiled version of the lisp code', () => {
        const lisp = `(* 4 5 )`;
        const json = jest.fn();
        const status = jest.fn();

        const req = {
            body: {
                data: lisp
            }
        };

        const res = {
            json,
            status
        };

        controller(req, res);

        const call = json.mock.calls[0][0];
        expect(call.program).toBe(`(4 * 5)`);
    })

});