import {
  IForgotPasswordData,
  IResetPasswordData,
  IUserSignInData,
  IUserSignUpData,
  IUserState,
} from '~/types';

import type { Data as LoginResponse } from '~/server/api/login.post'
import type { Data as RegisterResponse } from '~/server/api/register.post'
import type { Data as SessionResponse } from 'server/api/session.get'
import type { Data as ResetPasswordResponse } from 'server/api/password-reset.post'

export const useUserStore = defineStore('user', {
  state: (): Partial<IUserState> => {
    return {
      id: undefined,
      has_account: undefined,
      email: undefined,
      first_name: undefined,
      last_name: undefined,
      metadata: undefined,
    };
  },
  getters: {

  },
  actions: {
    _update(data?: SessionResponse) {
      this.id = data?.id;
      this.has_account = data?.has_account;
      this.first_name = data?.first_name;
      this.last_name = data?.last_name;
      this.email = data?.email;
      this.metadata = data?.metadata;
    },
    async addToWishlist(id: string) {
      localStorage.setItem(`wish_${id}`, id);

      // const { data, error } = await useFetch<SessionResponse>('/api/wish', {
      //   method: 'POST',
      //   body: {
      //     product_id: id,
      //     metadata: this.metadata,
      //   }
      // });

      // if (error.value) {
      //   throw new Error(error.value?.message);
      // }

      // if (data.value) {
      //   this._update(data.value);
      // }
    },
    async removeFromWishlist(id: string) {
      localStorage.removeItem(`wish_${id}`);

      // const { data, error } = await useFetch<SessionResponse>('/api/wish', {
      //   method: 'DELETE',
      //   body: {
      //     product_id: id,
      //     metadata: this.metadata,
      //   }
      // });

      // if (error.value) {
      //   throw new Error(error.value?.message);
      // }

      // if (data.value) {
      //   this._update(data.value);
      // }
    },
    async signInWithSid() {
      try {
        const { data, error } = await useFetch<SessionResponse>('/api/session');

        if (error.value) {
          throw new Error(error.value?.message);
        }

        if (data.value) {
          this._update(data.value);
        }
      } catch (e) {
        console.error(e);
      }
    },
    async signIn(body: IUserSignInData) {
      try {
        const { data, error } = await useFetch<LoginResponse>('/api/login', {
          body,
          method: 'POST',
        });

        if (error.value) {
          throw new Error(error.value?.message);
        }

        if (data.value) {
          this._update(data.value);
        }
      } catch (e) {
        console.error(e);
      }
    },
    async signUp(body: IUserSignUpData) {
      try {
        const { data, error } = await useFetch<RegisterResponse>('/api/register', {
          body,
          method: 'POST',
        });

        if (error.value) {
          throw new Error(error.value?.message);
        }

        if (data.value) {
          this._update(data.value as any);
        }
      } catch (e) {
        console.error(e);
      }
    },
    async signOut() {
      try {
        const { error } = await useFetch('/api/session', {
          method: 'DELETE'
        });

        if (error.value) {
          throw new Error(error.value?.message);
        }

        this._update(undefined);
      } catch (e) {
        console.error(e);
      }
    },
    async forgotPassword(body: IForgotPasswordData) {
      try {
        const { error } = useRequest<string>('api/password-token', {
          method: 'POST',
          body
        });

        if (error.value) {
          throw new Error(error.value?.message);
        }
      } catch (e) {
        console.error(e);
      }
    },
    async resetPassword(body: IResetPasswordData) {
      try {
        const { data, error } = await useFetch<ResetPasswordResponse>('/api/password-reset', {
          body,
          method: 'POST',
        });

        if (error.value) {
          throw new Error(error.value?.message);
        }

        if (data.value) {
          this._update(data.value as any);
        }
      } catch (e) {
        console.error(e);
      }
    },
  },
});
