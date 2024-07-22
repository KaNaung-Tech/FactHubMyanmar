import NetInfo from '@react-native-community/netinfo';

const isOffline = async () => {
  const state = await NetInfo.fetch();
  return !state.isConnected;
};

export { isOffline };
