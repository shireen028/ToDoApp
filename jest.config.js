module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|react-native-vector-icons|react-native-elements|react-native-ratings|react-native-size-matters|react-native-option-menu|react-native-modal|react-native-animatable)/)',
  ],
};
