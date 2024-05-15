export const useMainTable = () => {
  const handleToolClick = (domain: string, path: string) => {
    navigateTo({
      path: path,
      query: {
        search: domain,
      },
    });
  };

  return {
    handleToolClick,
  };
};