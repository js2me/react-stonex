"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strictEqual = function (a1, a2) { return a1 === a2; };
exports.shallowEqual = function (objA, objB) {
    if (exports.strictEqual(objA, objB))
        return true;
    if (typeof objA !== 'object' ||
        objA === null ||
        typeof objB !== 'object' ||
        objB === null) {
        return false;
    }
    var keysA = Object.keys(objA);
    var keysB = Object.keys(objB);
    if (keysA.length !== keysB.length)
        return false;
    for (var _i = 0, keysA_1 = keysA; _i < keysA_1.length; _i++) {
        var key = keysA_1[_i];
        if (!Object.prototype.hasOwnProperty.call(objB, key) || !exports.strictEqual(objA[key], objB[key])) {
            return false;
        }
    }
    return true;
};
//# sourceMappingURL=base.js.map