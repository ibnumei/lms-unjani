const express = require('express');
const request = require('supertest');
const routes = require('../../../src/route/index');
const controller = require('../../../src/controller/index');

describe('pagingRoute.test.js', () => {
  test('pagingRoute.test.js.router', async () => {
    controller.getPicker = jest.fn(() => {});
    await request(express().use(routes.pagingRoute)).get('/paging/picker');

    controller.getPaging = jest.fn(() => {});
    await request(express().use(routes.pagingRoute)).post('/paging/fetch');

    controller.getReport = jest.fn(() => {});
    await request(express().use(routes.pagingRoute)).post('/paging/report');

    controller.getPopupOne = jest.fn(() => {});
    await request(express().use(routes.pagingRoute)).post('/paging/fetchOne');

    controller.getDropdown = jest.fn(() => {});
    await request(express().use(routes.pagingRoute)).post('/paging/dropdown');

    controller.getDropdownData = jest.fn(() => {});
    await request(express().use(routes.pagingRoute)).post('/paging/dropdownData');
  });
});
