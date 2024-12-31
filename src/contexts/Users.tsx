import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import { Member } from "../pages/Members/types";
import { useMount } from "react-use";

const DATABASE_NAME = "GymManagerDB";

interface UserContext {
  users: Member[];
  setUsers: (value: Member) => void;
}

const UserContext = createContext<UserContext>({
  users: [],
  setUsers: () => {},
});

export const useUser = () => {
  const { users } = useContext(UserContext);

  if (!users) {
    throw Error("Cannot access user outside!!");
  }

  return users ?? null;
};

export const useSetUser = () => useContext(UserContext).setUsers;

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const [users, setUsers] = useState<Member[]>([]);

  const addUser = (value: Member) => {
    const request = indexedDB.open(DATABASE_NAME, 1.0);

    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction("users", "readwrite");
      const store = tx.objectStore("users");
      console.log(store);
      store.add(value);
      const res = store.getAll("users");
      res.onsuccess = () => console.log("just after", res.result);
    };
    request.onerror = () => {
      console.error(request.error?.message);
    };
    setUsers((prevState) => [...prevState, value]);
  };

  useMount(() => {
    const request = indexedDB.open(DATABASE_NAME, 1.0);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains("users")) {
        db.createObjectStore("users", { keyPath: "phoneNumber" });
      }
    };

    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction("users", "readwrite");
      const store = tx.objectStore("users");
      const res = store.getAll();
      res.onsuccess = () => {
        setUsers(res.result);
      };
    };
    request.onerror = () => {
      console.error(request.error?.message);
    };
  });

  return (
    <UserContext.Provider value={{ users, setUsers: addUser }}>
      {children}
    </UserContext.Provider>
  );
};
