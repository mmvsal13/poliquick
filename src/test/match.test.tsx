/*tests for matching algorithm*/
import { match } from '../ElectionsPage/match'
import React from 'react'

/*test for miami politicians*/
//neutral or skip is -1 for 1-20, 0 for 20-21
var politician1 = [3, 4, 3, 4, 2, 4, 4, 4, 4, 2, 1, 1, 1, 1, 2, 3, 2, 1, 1, 4, 3, 4, 1, 5, 3, 5, 4, 5];
var politician2 = [1, 2, 1, 1, 4, 2, 2, 2, 1, 4, 3, 3, 3, 1, 3, 1, 1, 3, 4, 1, 4, 3, 3, 1, 3, 4, 2, 2];
var politician3 = [4, 4, 4, 4, 1, 4, 4, 4, 4, 1, 1, 1, 1, 4, 1, 4, 4, 1, 1, 4, 3, 4, 0, 5, 3, 5, 5, 5];
var politician4 = [1, 1, 1, 4, 1, 1, 4, 1, 1, 4, 1, 1, 1, 1, 4, 4, 4, 1, 4, 1, 3, 3, 3, 1, 2, 3, 2, 2];
var allSD = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0];
var allSA = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5];
var allA = [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4];
var allD = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1];
var all_skips = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0];
var random = [-1, 3, 3, 4, 2, 4, 4, -1, 1, 2, 1, 2, 2, 1, 2, 3, 2, 1, 1, 3, 3, 4, 1, 4, 3, 4, 4, 4];

/*test for perfect match*/
test('politician1 as user, politician1 as politician', () => {
    var result = match(politician1, politician1);
    expect(result).toEqual(100.0);
});

test('politician1 as user, politician2 as politician', () => {
    var result = match(politician1, politician2);
    expect(result).toEqual(47.0);
});

test('random user with skips, politician1 as politician', () => {
    var result = match(random, politician1);
    expect(result).toEqual(93.1);
});

test('politician1 as user, politician3 as politician', () => {
    var result = match(politician1, politician3);
    expect(result).toEqual(91.0);
});

test('politician1 as user, politician4 as politician', () => {
    var result = match(politician1, politician4);
    expect(result).toEqual(56.0);
});

test('complete opposite 1', () => {
    var result = match(allSA, allSD);
    expect(result).toEqual(0.0);
})

test('generally agree -- all agree', () => {
    var result = match(allA, allSA);
    expect(result).toEqual(86.0);
});

test('generally agree -- all disagree', () => {
    var result = match(allD, allSD);
    expect(result).toEqual(86.0);
});

test('generally disagree', () => {
    var result = match(allD, allA);
    expect(result).toEqual(56.0);
});

test('complete opposite 2', () => {
    var result = match(allSD, allSA);
    expect(result).toEqual(0.0);
})

test('complete opposite with skips', () => {
    var result = match(all_skips, allSA);
    expect(result).toEqual(0.0);
})

test('perfect match with skips', () => {
    var result = match(all_skips, allSD);
    expect(result).toEqual(100.0);
})
