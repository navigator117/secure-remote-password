/* eslint-env mocha */

const assert = require('assert')

const client = require('./client')
const server = require('./server')
const SRPInteger = require('./lib/srp-integer')

describe('Secure Remote Password', () => {
    it('should authenticate a user', () => {
        const username = 'linus@folkdatorn.se'
        const password = '$uper$ecure'

        const salt = client.generateSalt()
        const privateKey = client.derivePrivateKey(salt, username, password)
        const verifier = client.deriveVerifier(privateKey)

        const clientEphemeral = client.generateEphemeral()
        const serverEphemeral = server.generateEphemeral(verifier)

        clientSession = null;
        client.deriveSession(clientEphemeral.secret, serverEphemeral.ephemeral, salt, username, privateKey, function(error, session) {
            assert.strictEqual(error, null)
            clientSession = session
        })
        server.deriveSession(serverEphemeral.secret, clientEphemeral.ephemeral, salt, username, verifier, clientSession.proof, function(error, session) {
            assert.strictEqual(error, null)            
            serverSession = session
        })
        client.verifySession(clientEphemeral.ephemeral, clientSession, serverSession.proof, function(error) {
            assert.strictEqual(error, null);
        })
        assert.strictEqual(clientSession.key, serverSession.key)
    })
})

describe('SRPInteger', () => {
    it('should keep padding when going back and forth', () => {
        assert.strictEqual(SRPInteger.fromHex('a').toHex(), 'a')
        assert.strictEqual(SRPInteger.fromHex('0a').toHex(), '0a')
        assert.strictEqual(SRPInteger.fromHex('00a').toHex(), '00a')
        assert.strictEqual(SRPInteger.fromHex('000a').toHex(), '000a')
        assert.strictEqual(SRPInteger.fromHex('0000a').toHex(), '0000a')
        assert.strictEqual(SRPInteger.fromHex('00000a').toHex(), '00000a')
        assert.strictEqual(SRPInteger.fromHex('000000a').toHex(), '000000a')
        assert.strictEqual(SRPInteger.fromHex('0000000a').toHex(), '0000000a')
        assert.strictEqual(SRPInteger.fromHex('00000000a').toHex(), '00000000a')
    })
})
