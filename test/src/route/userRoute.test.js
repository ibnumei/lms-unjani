const express = require('express');
const request = require('supertest');
const routes = require('../../../src/route/index');
const controller = require('../../../src/controller/index');

describe('userRoute.test.js', () => {
  test('userRoute.test.js.router', async () => {
    controller.userController.getUser = jest.fn(() => {});
    await request(express().use(routes.userRoute)).get('/user/getUser/1');
  });
});
