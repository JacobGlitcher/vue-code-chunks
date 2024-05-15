import { UseFetchOptions } from "nuxt/app";
import { KeysOf } from "nuxt/dist/app/composables/asyncData";
import { _Transform } from "nuxt/dist/app/composables/asyncData";


// TODO change options type from any to its exact UseFetchOptions type with its all correct generics
export const useRequest = <T = any>(url: string, options?: any) => {
  const runtimeConfig = useRuntimeConfig();

  let headers;
  
  const accessToken = localStorage.getItem('access_token');
  if (accessToken) {
    headers = {
      Authorization: `Bearer ${accessToken}`
    };
  }

  return useFetch<T>(url, {
    ...options,
    baseURL: runtimeConfig.public.apiBaseUrl,
    headers,
  });
};