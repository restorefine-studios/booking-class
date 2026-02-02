export default {
  routes: [
    {
      method: "POST",
      path: "/custom-auth/forgot-password",
      handler: "auth.forgotPassword",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
