const users = require('../src/data-access/dynamoDb');
const mockUser = require('./mockUser.json');
const mockUsers = require('./mockUsers.json');
test('validar obtejer usuario', () => {
    const req={body:{
        userId:"cramirez"
    }};
    const res={};
    expect(users.GetUser(req, res)).toBe(mockUser);

});

test('validar obtejer usuarios', () => {
    const req={};
    const res={};
    expect(users.GetUser(req, res)).toBe(mockUsers);
});