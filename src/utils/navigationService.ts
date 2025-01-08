import {
  CommonActions,
  NavigationAction,
  NavigationState,
} from '@react-navigation/native';
import {createRef} from 'react';

export const navigationRef = createRef<any>();

export function navigate(
  routeName: string,
  params: {[key: string]: object | string | undefined | boolean} = {},
): void {
  navigationRef.current?.navigate(routeName, params);
}
export function goBack() {
  return navigationRef?.current.goBack();
}

export const reset = (routeName: string, params: any | null = {}) => {
  navigationRef?.current?.dispatch({
    ...CommonActions.reset({
      index: 0,
      routes: [{name: routeName, params: params}],
    }),
  });
};

export const getRecentRoutes = () => {
  const rootState = navigationRef.current?.getRootState();
  const routes = rootState?.routes;
  const previousRoute = routes?.[routes?.length - 2];
  const currentRoute = routes?.[routes?.length - 1];
  return {
    //@ts-ignore
    currentRoute:
      currentRoute?.state?.index > -1 && currentRoute?.state?.routes
        ? currentRoute?.state?.routes?.[currentRoute?.state?.index]
        : currentRoute,
    //@ts-ignore
    previousRoute:
      previousRoute?.state?.index > -1 && previousRoute?.state?.routes
        ? previousRoute?.state?.routes?.[previousRoute?.state?.index]
        : previousRoute,
  };
};

export function replace(
  routeName: string,
  params: {[key: string]: object | string | undefined} = {},
): void {
  navigationRef.current?.reset(routeName, params);
}

export function dispatch(
  action: NavigationAction | ((state: NavigationState) => NavigationAction),
): void {
  navigationRef.current?.dispatch(action);
}

export const canGoBack = () => {
  return navigationRef?.current?.canGoBack();
};
