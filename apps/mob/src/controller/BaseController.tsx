// import * as SecureStore from 'expo-secure-store';

type Token = string | null | void;

/**
 * Abstract Class BaseController.
 *
 * @class BaseController
 */

// This is a legacy controller to be removed as soon as LoginController is refactored into Redux implementation
 export default abstract class BaseController {
    // constructor() {
    //   if (this.constructor == BaseController) {
    //     throw new Error("Abstract classes can't be instantiated.");
    //   }
    // };

    logError = (error: any) => {
      console.error(this.constructor.name + ': ' + error);
    };

    logWarning = (warning: any) => {
      console.warn(this.constructor.name + ': ' + warning);
    };

    logInfo = (info: any) => {
      console.log(this.constructor.name + ': ' + info);
    };
      
    // storeToken = async (token: string) => {
    //   await SecureStore.setItemAsync('secure_token', token)
    //     .catch(error => this.logError("Could not save secure access token: " + error));
    // };

    // fetchToken = async () : Promise<Token> => {
    //   return SecureStore.getItemAsync('secure_token')
    //                   .catch(error => this.logError("Could not retrieve secure access token: " + error));
    // };
  }