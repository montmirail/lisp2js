const controller = require('../../src/controllers/isValidLisp');

describe('Controller: isValidLisp', () => {

    it('should send a success response with valid Lisp', () => {
        const lisp = `(defun area(a, b) ((* a b)))`;
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
        expect(call.valid).toBe(true);
    });

    it('should send an error response with a invalid Lisp', () =>{
        const lisp = `(defun area(a, b) (* a b)))`;
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
        const statusCall = status.mock.calls[0][0];
        expect(call.valid).toBe(false);
        expect(statusCall).toBe(400);
    });
});