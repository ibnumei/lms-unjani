const express = require('express');
const request = require('supertest');
const routes = require('../../../src/route/index');
const controller = require('../../../src/controller/index');

describe('techRoute.test.js', () => {
  test('techRoute.test.js.router', async () => {
    controller.techController.getEnv = jest.fn(() => {});
    await request(express().use(routes.techRoute)).get('/tech/env');

    controller.techController.getUserDb = jest.fn(() => {});
    await request(express().use(routes.techRoute)).get('/tech/db');
  });
});
