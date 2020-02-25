export interface IApplicationStore {
  route: IRouter5State
}


interface IRouter5State {
  route: any;
  previousRoute: any;
  transitionRoute: any;
  transitionError: any;
}