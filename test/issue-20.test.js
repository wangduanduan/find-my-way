'use strict'

const t = require('tap')
const test = t.test
const FindMyWay = require('../')

test('Standard case', t => {
  t.plan(1)
  const findMyWay = FindMyWay({
    defaultRoute: (req, res) => {
      t.fail('Should not be here')
    }
  })

  findMyWay.on('GET', '/a/:param', (req, res, params) => {
    t.equal(params.param, 'perfectly-fine-route')
  })

  findMyWay.lookup({ method: 'GET', url: '/a/perfectly-fine-route' }, null)
})

test('Should be 404 / 1', t => {
  t.plan(1)
  const findMyWay = FindMyWay({
    defaultRoute: (req, res) => {
      t.pass('Everything good')
    }
  })

  findMyWay.on('GET', '/a/:param', (req, res, params) => {
    t.fail('We should not be here')
  })

  findMyWay.lookup({ method: 'GET', url: '/a' }, null)
})

test('Should be 404 / 2', t => {
  t.plan(1)
  const findMyWay = FindMyWay({
    defaultRoute: (req, res) => {
      t.pass('Everything good')
    }
  })

  findMyWay.on('GET', '/a/:param', (req, res, params) => {
    t.fail('We should not be here')
  })

  findMyWay.lookup({ method: 'GET', url: '/a-non-existing-route' }, null)
})

test('Should be 404 / 3', t => {
  t.plan(1)
  const findMyWay = FindMyWay({
    defaultRoute: (req, res) => {
      t.pass('Everything good')
    }
  })

  findMyWay.on('GET', '/a/:param', (req, res, params) => {
    t.fail('We should not be here')
  })

  findMyWay.lookup({ method: 'GET', url: '/a//' }, null)
})

test('Should get an empty parameter', t => {
  t.plan(1)
  const findMyWay = FindMyWay({
    defaultRoute: (req, res) => {
      t.fail('We should not be here')
    }
  })

  findMyWay.on('GET', '/a/:param', (req, res, params) => {
    t.equal(params.param, '')
  })

  findMyWay.lookup({ method: 'GET', url: '/a/' }, null)
})
