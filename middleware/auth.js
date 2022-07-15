export default function (context) {
  context.$axios.setHeader(
    "Authorization",
    "Bearer " + localStorage.getItem("access_token")
  );
  
  context.$axios.onError((error) => {
    if (
      error.response.status === 401 &&
      context.route.name !== "account-login"
    ) {
      localStorage.clear();
      return context.redirect("/account/login/");
    }
  })
  
  if (!localStorage.getItem("access_token")) {
    if (context.route.name !== 'account-login') {
      localStorage.clear();
      return context.redirect("/account/login/"); 
    }
  } else {
    if (context.route.name === 'account-login') {
      return context.redirect(context.from.fullpath)
    }
  }

  if (
    context.route.name === "forms-event" ||
    context.route.name === "forms-agreement" ||
    context.route.name === "forms-meeting" ||
    context.route.name.includes('evaluate')
  ) {
    if (!localStorage.getItem("beEvaluatedUserId")) {
      return context.redirect('/')
    }
  }

  if (localStorage.getItem('isEvalTime') === 'false' && context.route.name === "evaluate") {
    return context.redirect('/');
  }
}