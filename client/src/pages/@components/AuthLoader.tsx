import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { userAtom, UserModel } from 'src/atoms/user';
import { apiClient } from 'src/utils/apiClient';
import { returnNull } from 'src/utils/returnNull';
import { supabase } from 'src/utils/supabase';

export const AuthLoader = () => {
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_, session) => {
      if (session === null && user?.id !== null) {
        await apiClient.api.private.session.$delete().catch(returnNull);
        setUser(null);
      } else if (session !== null && user?.id !== session.user.id) {
        const jwt = session.access_token;
        await apiClient.api.private.session
          .$post({ body: { jwt } })
          .catch(returnNull);
        const { id, email, name } = session.user;
        setUser({ id, email, name } as UserModel);
      }
    });

    return () => subscription.unsubscribe();
  }, [user?.id, setUser]);

  return <></>;
};
