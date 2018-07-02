var expect = require('expect');

var {isRealString} = require('./validation');


//isRealSTring
//should reject non-string values
//should reject string wtih only spaces
//should allow string with non-space characters

describe('isRealString', ()=> {
	//no need to create done since its a synchronous message
	it('should reject non-string values', () => {
	
		var res = isRealString(98);
		expect(res).toBe(false);

	});
	it('should reject with only spaces', () => {
	
		var res = isRealString("      ");
		expect(res).toBe(false);

	});

	it('should allow string with non-space characters', () => {
	
		var res = isRealString("  Andrew    ");
		expect(res).toBe(true);

	});
});