import { UsersLoginInfo } from "@/data/User";
import { IAuthContext, States } from "@/interfaces/IAuthContext.interface";
import { IUser, IUserLoginInfo } from "@/types/User.type";
import { createContext, PropsWithChildren, useContext, useState } from "react";

//* Context created
const AuthContext = createContext<IAuthContext>({} as IAuthContext);
//* Hook to use the context
export const useAuthContext = () => useContext(AuthContext);

export default function AuthContextProvider({ children }: PropsWithChildren) {
  //* This state manages the user info (username, email)
  const [user, setUser] = useState<IUser>();
  //* This state manages the currrent authorization state (verifying, authorized, notAuthorized)
  const [authState, setAuthState] = useState<States>(States.verifying);
  //* This state manages errors during the authentication process
  const [authError, setAuthError] = useState<string | null>(null);


  //* This method logs in the user finding the username and email througout the data setting the auth state and user 
  const login = async (email: string, password: string): Promise<boolean> => {
    setAuthError(null);
    let flag = false;
    const loggedUser: IUserLoginInfo | undefined = UsersLoginInfo.find(
      (u) => u.email === email && u.password === password
    );

    if (loggedUser) {
      const newUserLogin: IUser = {
        username: loggedUser.username,
        email: loggedUser.email,
      };
      setUser(newUserLogin);
      setAuthState(States.authorized);
      flag = true;
    } else {
      setAuthError("Username or Password are not correct. Please try again!");
      setAuthState(States.notAuthorized);
      setUser(undefined);
    }
    return flag;
  };


  //* Method that logs out the user
  const logout = () => {
    setAuthError(null);
    setUser(undefined);
    setAuthState(States.notAuthorized);
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        user,
        logout,
        isAuthenticated: authState === States.authorized,
        isChecking: authState === States.verifying,
        error: authError,
        authState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
