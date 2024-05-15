import { storeToRefs } from "pinia";

// Store
import { useUserStore } from "~/store/user";


export const useAuth = () => {
  const route = useRoute();
  const { auth, profile } = route.query;
  
  const userStore = useUserStore();
  const { userAcessToken, userData } = storeToRefs(userStore);
  
  const authState = ref<string | undefined>(auth as string);
  const profileState = ref<string | undefined>(profile as string);
  
  const handleLogin = () => {
    navigateTo({
      query: {
        auth: 'login',
      },
    });
  };
  
  const handleCloseAuthModal = () => {
    navigateTo({
      query: undefined,
    });
  };
  
  const handleSettingsClick = () => {
    navigateTo({
      query: {
        profile: 'settings',
      },
    });
  };
  
  const handleChangePasswordClick = () => {
    navigateTo({
      query: {
        profile: 'changepassword',
      },
    });
  };
  
  const handleCloseProfileModal = () => {
    navigateTo({
      query: undefined,
    });
  };
  
  watch(route, (value) => {
    const { auth, profile } = value.query;
    authState.value = auth as string;
    profileState.value = profile as string;
  }, {
    deep: true,
    immediate: true,
  });

  return {
    authState,
    profileState,
    userAcessToken,
    userData,
    handleLogin,
    handleCloseAuthModal,
    handleSettingsClick,
    handleChangePasswordClick,
    handleCloseProfileModal,
  };
};