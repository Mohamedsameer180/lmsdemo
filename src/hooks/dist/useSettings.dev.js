"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSettings = void 0;

var _react = require("react");

var _SettingsContext = require("../context/SettingsContext");

var useSettings = function useSettings() {
  var context = (0, _react.useContext)(_SettingsContext.SettingsContext);

  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }

  return context;
};

exports.useSettings = useSettings;
//# sourceMappingURL=useSettings.dev.js.map
